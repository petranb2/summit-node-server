// configuration consts
// the dir of the components at the server
const BASE_COMPONENT_DIR = "components";
// the main component to render components with router
const MAIN_COMPONENT_ID = "main";

//framework consts
const CACHE_COMPONENTS = new Map();
const INITIAL_RENDER_COMPONENT = true;

// Read the url of the rendered page and render the components
window.onload = function () {
  let path = document.location.pathname;
  if (path !== "/") {
    var root = document.getElementById(MAIN_COMPONENT_ID);
    // set the main component element to render the hashPage component
    let componentKey = `${BASE_COMPONENT_DIR}${path}.html`;
    root.setAttribute("html", componentKey);
    fetchComponents();
  } else {
    fetchComponents();
  }
  initializeRouter();
};

// The framework router
function initializeRouter() {
  window.onpopstate = function (event) {
    let path = document.location.pathname;
    if (path === "/") {
      path = "/index";
    }
    console.log(JSON.stringify(event.state));
    var root = document.getElementById(MAIN_COMPONENT_ID);
    // set the main component element to render the hashPage component
    let componentKey = `${BASE_COMPONENT_DIR}${path}.html`;
    root.setAttribute("html", componentKey);
    fetchComponents();
  };
}

/**
 * Fetch the components from the server
 * The components are fetch from the server on demand (lazy components)
 * After a component is fetched stored in a Map to be cached
 */
async function fetchComponents() {
  let componentsArray = document.getElementsByTagName("component");
  for (let i = 0; i < componentsArray.length; i++) {
    let node = componentsArray[i];
    let componentKey = node.getAttribute("html");
    if (componentKey) {
      if (CACHE_COMPONENTS.get(componentKey)) {
        renderComponent(
          node,
          CACHE_COMPONENTS.get(componentKey),
          !INITIAL_RENDER_COMPONENT
        );
        //recursion to fetch any inner components
        fetchComponents();
        continue;
      }

      try {
        let response = await fetch(componentKey);
        let component = await response.text();
        renderComponent(node, component, INITIAL_RENDER_COMPONENT);
        CACHE_COMPONENTS.set(componentKey, component);
        //recursion to fetch any inner components
        fetchComponents();
      } catch (err) {
        renderComponent(node, "Component not found", INITIAL_RENDER_COMPONENT);
      }
      return;
    }
  }
}

/**
 * This function renders components and it's js and css files
 * @param {Element} node element to render the component
 * @param {string} component the html to render
 * @param {boolean} initialRender
 */
async function renderComponent(node, component, initialRender = true) {
  //render component to node
  node.innerHTML = component;
  node.removeAttribute("html");

  let jsFile = node.getAttribute("js");
  // load js file
  if (jsFile != null && initialRender) {
    let script = document.createElement("script");
    script.setAttribute("src", jsFile);
    script.setAttribute("type", "module");
    document.head.appendChild(script);
    node.removeAttribute("js");
    let comp = await import("../components/home.js");
    comp.fetch();
    comp.render();
    let user = new comp.Component();
    user.render();
    node.innerHTML = "js loaded";
  }
  let cssFile = node.getAttribute("css");
  // load css file
  if (cssFile != null && initialRender) {
    let css = document.createElement("link");
    css.setAttribute("href", cssFile);
    css.setAttribute("rel", "stylesheet");
    document.head.appendChild(css);
    node.removeAttribute("css");
  }
}

function summitRouter(path, replaceId) {
  history.pushState({}, "", path);
  var popStateEvent = new PopStateEvent("popstate", { state: replaceId });
  dispatchEvent(popStateEvent);
}
