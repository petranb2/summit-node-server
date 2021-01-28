export function fetch() {
  console.log("fetch component data");
}

export function render() {
  console.log("in render");
}

export class Component {
  constructor() {}
  render() {
    console.log("render user");
  }
  fetchData() {
    console.log("render user");
    return {
      name: "petros",
      user: {
        name: "petros",
      },
    };
  }
}
