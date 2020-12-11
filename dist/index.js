var React = require('react');

var ExampleComponent = function ExampleComponent(_ref) {
  var text = _ref.text;
  return React.createElement("div", null, "Example Component: ", text);
};
var Form = function Form(_ref2) {
  var schema = _ref2.schema;
  return React.createElement("p", null, "hi ", JSON.stringify(schema));
};
function registerElement(type, render) {
}

exports.ExampleComponent = ExampleComponent;
exports.Form = Form;
exports.registerElement = registerElement;
//# sourceMappingURL=index.js.map
