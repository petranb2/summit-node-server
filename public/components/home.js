// export function fetch() {
//   console.log("fetch component data");
// }

export function render() {
  console.log("in render");
}

export default class Component extends SummitComponent {
  // constructor() {
  //   super()
  // }
  render(data) {
    let array = [];
    for (let i = 0; i <= 5; i++) {
      array.push(`<p class="text-4xl ">petros koulianos</p>`);
    }
    if (data) {
      array.push(`<p class="text-xl">${data.id}</p>`);
      array.push(`<p class="text-2xl">${data.title}</p>`);
      array.push(`<p class="text-3xl">${data.completed}</p>`);
    }

    return array;
  }
  async fetchData() {
    // try {
    //   let response = await fetch(
    //     "https://jsonplaceholder.typicode.com/todos/1"
    //   );
    //   let data = await response.json();
    //   console.log(data);
    //   return data;
    // } catch (err) {
    //   console.log(err);
    //   return null;
    // }
    return fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
}
