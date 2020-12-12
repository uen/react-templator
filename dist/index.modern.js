import React, { memo, useState, createRef, Fragment } from 'react';

const validators = {
  required: (label, input, _) => !input && `${label} must have a value`,
  minLength: (label, input, length) => input && input.length < length && `${label} must be at least ${length} characters`,
  maxLength: (label, input, length) => input && input.length > length && `${label} must not be more than ${length} characters`,
  number: (label, input, _) => isNaN(input) && `${label} must be a number`
};

const Templator = memo(({
  schema,
  onSubmit,
  dynamicProps: _dynamicProps = {},
  formElement
}) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const context = {
    values,
    errors,
    inputs: schema.reduce((obj, item) => ({ ...obj,
      [item.name]: createRef()
    }), {}),
    setValue: (name, value) => {
      setValues({ ...values,
        [name]: value
      });
    }
  };

  function validateInput(element, setError, refocus) {
    const elementErrors = Object.keys(validators).map(validator => element[validator] && validators[validator](element.label, values[element.name], element[validator])).filter(error => error);
    console.log(elementErrors);

    if (element.validator) {
      const customError = element.validator(element.label ? element.label : element.name, values[element.name]);
      if (customError) elementErrors.push(customError);
    }

    const error = elementErrors && elementErrors.length > 0 && elementErrors[0];

    if (setError) {
      if (refocus && error && context.inputs[element.name].current) context.inputs[element.name].current.focus();
      setErrors({ ...errors,
        [element.name]: error ? `${error}` : undefined
      });
    }

    return {
      name: element.name,
      error: elementErrors && elementErrors.length > 0 ? elementErrors[0] : undefined
    };
  }

  function getInputs(schema) {
    const inputs = [];
    schema.forEach(element => {
      if (element.name) inputs.push(element);
      if (element.content) inputs.push(...getInputs(element.content));
    });
    return inputs;
  }

  function onFormSubmit() {
    const errors = getInputs(schema).map(element => validateInput(element)).filter(element => element.error).reduce((obj, item) => ({ ...obj,
      [item.name]: item.error
    }), {});
    setErrors(errors);
    const errorFields = Object.keys(errors);

    if (errorFields.length > 0) {
      context.inputs[errorFields[0]].current.focus();
      return;
    }

    onSubmit(values, setErrors);
  }

  function renderLayout(schema) {
    return React.createElement(Fragment, null, schema && schema.map((element, index) => {
      if (!elements[element.type] && !layoutElements[element.type]) return console.error(`react-form-templator: Element ${element.type} has not been registered`);

      if (element.content) {
        return React.cloneElement(layoutElements[element.type]({ ...element.content,
          children: renderLayout(element.content)
        }));
      }

      const formElement = element;
      const props = {
        tabIndex: index + 1,
        error: errors[formElement.name],
        ref: context.inputs[formElement.name],
        ...(_dynamicProps[formElement.name] ? _dynamicProps[formElement.name] : {}),
        validate: refocus => validateInput(formElement, true, refocus),
        submit: onFormSubmit,
        onChange: value => {
          setErrors({ ...errors,
            [formElement.name]: undefined
          });
          context.setValue(formElement.name, value);
        },
        value: values[formElement.name]
      };
      return React.cloneElement(elements[formElement.type]({ ...formElement,
        ...props
      }));
    }));
  }

  return React.cloneElement(formElement(onFormSubmit), {
    children: renderLayout(schema)
  });
});
const elements = {};
const layoutElements = {};
function registerElement(type, render) {
  elements[type] = render;
}
function registerLayoutElement(type, render) {
  layoutElements[type] = render;
}

function Form({
  schema,
  onSubmit,
  dynamicProps
}) {
  return React.createElement(Templator, {
    onSubmit: onSubmit,
    dynamicProps: dynamicProps,
    schema: schema,
    formElement: submit => React.createElement("form", {
      onSubmit: e => {
        e.preventDefault();
        submit();
      }
    })
  });
}

export { Form, registerElement, registerLayoutElement };
//# sourceMappingURL=index.modern.js.map
