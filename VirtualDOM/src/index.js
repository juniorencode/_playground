/** @jsx virtualDOM */

const virtualDOM = (type, props, ...args) => {
  const children = [...args];
  return {
    type,
    props,
    children
  };
};

const render = node => {
  const element = document.createElement(node.type);
  const children = document.createTextNode(node.children);
  element.append(children);
  return element;
};

const title = <h1>Hello world..!!</h1>;
document.body.append(render(title));
console.log(title);
