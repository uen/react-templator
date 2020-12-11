import { createElement } from 'react';

const ExampleComponent = ({
  text
}) => {
  return createElement("div", null, "Example Component: ", text);
};
const Form = ({
  schema
}) => {
  return createElement("p", null, "hi ", JSON.stringify(schema));
};
function registerElement(type, render) {
}

export { ExampleComponent, Form, registerElement };
//# sourceMappingURL=index.modern.js.map
