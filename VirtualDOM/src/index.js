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

  if (node.props) {
    applyClass(element, node);
    Object.keys(node.props).map(key => {
      element.setAttribute(key, node.props[key]);
    });
  }

  element.append(children);
  return element;
};

const applyClass = (element, node) => {
  if (node.props.class) {
    element.setAttribute('class', node.props.class);
  }
};

const title = (
  <h1 class="title" style="text-decoration: underline;">
    Hello world..!!
  </h1>
);
document.body.append(render(title));
console.log(title);
