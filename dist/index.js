function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var validators = {
  required: function required(label, input, _) {
    return !input && label + " must have a value";
  },
  minLength: function minLength(label, input, length) {
    return input && input.length < length && label + " must be at least " + length + " characters";
  },
  maxLength: function maxLength(label, input, length) {
    return input && input.length > length && label + " must not be more than " + length + " characters";
  },
  number: function number(label, input, _) {
    return isNaN(input) && label + " must be a number";
  }
};

var Templator = React.memo(function (_ref) {
  var schema = _ref.schema,
      onSubmit = _ref.onSubmit,
      _ref$dynamicProps = _ref.dynamicProps,
      dynamicProps = _ref$dynamicProps === void 0 ? {} : _ref$dynamicProps,
      formElement = _ref.formElement;

  var _useState = React.useState({}),
      values = _useState[0],
      setValues = _useState[1];

  var _useState2 = React.useState({}),
      errors = _useState2[0],
      setErrors = _useState2[1];

  var context = {
    values: values,
    errors: errors,
    inputs: schema.reduce(function (obj, item) {
      var _extends2;

      return _extends({}, obj, (_extends2 = {}, _extends2[item.name] = React.createRef(), _extends2));
    }, {}),
    setValue: function setValue(name, value) {
      var _extends3;

      setValues(_extends({}, values, (_extends3 = {}, _extends3[name] = value, _extends3)));
    }
  };

  function validateInput(element, setError, refocus) {
    var elementErrors = Object.keys(validators).map(function (validator) {
      return element[validator] && validators[validator](element.label, values[element.name], element[validator]);
    }).filter(function (error) {
      return error;
    });
    console.log(elementErrors);

    if (element.validator) {
      var customError = element.validator(element.label ? element.label : element.name, values[element.name]);
      if (customError) elementErrors.push(customError);
    }

    var error = elementErrors && elementErrors.length > 0 && elementErrors[0];

    if (setError) {
      var _extends4;

      if (refocus && error && context.inputs[element.name].current) context.inputs[element.name].current.focus();
      setErrors(_extends({}, errors, (_extends4 = {}, _extends4[element.name] = error ? "" + error : undefined, _extends4)));
    }

    return {
      name: element.name,
      error: elementErrors && elementErrors.length > 0 ? elementErrors[0] : undefined
    };
  }

  function getInputs(schema) {
    var inputs = [];
    schema.forEach(function (element) {
      if (element.name) inputs.push(element);
      if (element.content) inputs.push.apply(inputs, getInputs(element.content));
    });
    return inputs;
  }

  function onFormSubmit() {
    var errors = getInputs(schema).map(function (element) {
      return validateInput(element);
    }).filter(function (element) {
      return element.error;
    }).reduce(function (obj, item) {
      var _extends5;

      return _extends({}, obj, (_extends5 = {}, _extends5[item.name] = item.error, _extends5));
    }, {});
    setErrors(errors);
    var errorFields = Object.keys(errors);

    if (errorFields.length > 0) {
      context.inputs[errorFields[0]].current.focus();
      return;
    }

    onSubmit(values, setErrors);
  }

  function renderLayout(schema) {
    return React__default.createElement(React.Fragment, null, schema && schema.map(function (element, index) {
      if (!elements[element.type] && !layoutElements[element.type]) return console.error("react-form-templator: Element " + element.type + " has not been registered");

      if (element.content) {
        return React__default.cloneElement(layoutElements[element.type](_extends({}, element.content, {
          children: renderLayout(element.content)
        })));
      }

      var formElement = element;

      var props = _extends({
        tabIndex: index + 1,
        error: errors[formElement.name],
        ref: context.inputs[formElement.name]
      }, dynamicProps[formElement.name] ? dynamicProps[formElement.name] : {}, {
        validate: function validate(refocus) {
          return validateInput(formElement, true, refocus);
        },
        submit: onFormSubmit,
        onChange: function onChange(value) {
          var _extends6;

          setErrors(_extends({}, errors, (_extends6 = {}, _extends6[formElement.name] = undefined, _extends6)));
          context.setValue(formElement.name, value);
        },
        value: values[formElement.name]
      });

      return React__default.cloneElement(elements[formElement.type](_extends({}, formElement, props)));
    }));
  }

  return React__default.cloneElement(formElement(onFormSubmit), {
    children: renderLayout(schema)
  });
});
var elements = {};
var layoutElements = {};
function registerElement(type, render) {
  elements[type] = render;
}
function registerLayoutElement(type, render) {
  layoutElements[type] = render;
}

function Form(_ref) {
  var schema = _ref.schema,
      onSubmit = _ref.onSubmit,
      dynamicProps = _ref.dynamicProps;
  return React__default.createElement(Templator, {
    onSubmit: onSubmit,
    dynamicProps: dynamicProps,
    schema: schema,
    formElement: function formElement(submit) {
      return React__default.createElement("form", {
        onSubmit: function onSubmit(e) {
          e.preventDefault();
          submit();
        }
      });
    }
  });
}

exports.Form = Form;
exports.registerElement = registerElement;
exports.registerLayoutElement = registerLayoutElement;
//# sourceMappingURL=index.js.map
