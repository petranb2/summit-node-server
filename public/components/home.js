export function fetch() {
  console.log("fetch component data");
}

export function render() {
  console.log("in render");
}

export default class Component extends SummitComponent {
  // constructor() {
  //   super()
  // }
  render() {
    console.log("render");
  }
  fetchData() {
    console.log("fetchData");
    return {
      name: "petros",
      user: {
        name: "petros",
      },
    };
  }
}
