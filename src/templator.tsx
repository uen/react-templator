import React, {
  createContext,
  createRef,
  Fragment,
  memo,
  ReactElement,
  ReactNode,
  RefObject,
  useContext,
  useState
} from 'react';

import {
  IElementProps,
  IElementSchema,
  IForm,
  IFormSchema,
  ILayoutProps,
  ILayoutSchema
} from './interfaces';

import { validators } from './validators';

interface FormContext {
  elements?: Record<string, (props: IElementProps) => ReactElement>;
  layoutElements?: Record<string, (props: ILayoutProps) => ReactElement>;
}

const formContext = createContext<FormContext>({
  elements: {},
  layoutElements: {}
});

interface IFormProvider extends FormContext {
  children: ReactNode;
}

export function FormProvider({
  elements = {},
  layoutElements = {},
  children
}: IFormProvider) {
  return (
    <formContext.Provider value={{ elements, layoutElements }}>
      {children}
    </formContext.Provider>
  );
}

interface IFormContext {
  values: Record<string, any>;
  errors: Record<string, string | undefined>;
  setValue: (name: string, value: any) => void;
  inputs: Record<string, RefObject<HTMLFormElement>>;
}

interface ITemplator extends IForm {
  formElement: (submit: () => void) => ReactElement;
}

export const Templator = memo(
  ({ schema, onSubmit, dynamicProps = {}, formElement }: ITemplator) => {
    const [values, setValues] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string | undefined>>(
      {}
    );

    const { layoutElements = {}, elements = {} } = useContext(formContext);

    const context: IFormContext = {
      values,
      errors,
      inputs: schema.reduce(
        (obj, item) => ({
          ...obj,
          [item.name]: createRef()
        }),
        {}
      ),
      setValue: (name: string, value: any) => {
        setValues({ ...values, [name]: value });
      }
    };

    function validateInput(
      element: IElementSchema,
      setError?: boolean,
      refocus?: boolean
    ) {
      console.log('validaiting');
      const elementErrors = Object.keys(validators)
        .map(
          (validator) =>
            element[validator] &&
            validators[validator](
              element.label,
              values[element.name],
              element[validator]
            )
        )
        .filter((error) => error);

      if (element.validator) {
        const customError = element.validator(
          element.label ? element.label : element.name,
          values[element.name]
        );
        if (customError) elementErrors.push(customError);
      }

      const error =
        elementErrors && elementErrors.length > 0 && elementErrors[0];

      if (setError) {
        if (refocus) {
          if (error && context.inputs[element.name].current) {
            context.inputs[element.name].current!.focus();
          } else if (!error) {
            const inputs = getInputs(schema);

            context.inputs[
              inputs[inputs.indexOf(element) + 1].name
            ].current!.focus();
          }
        }

        setErrors({
          ...errors,
          [element.name]: error ? `${error}` : undefined
        });
      }

      return {
        name: element.name,
        error:
          elementErrors && elementErrors.length > 0
            ? elementErrors[0]
            : undefined
      };
    }

    function getInputs(schema: IFormSchema | ILayoutSchema): IElementSchema[] {
      const inputs: IElementSchema[] = [];
      schema.forEach((element: IElementSchema | ILayoutSchema) => {
        if ((element as IElementSchema).name)
          inputs.push(element as IElementSchema);
        if ((element as ILayoutSchema).children)
          inputs.push(...getInputs(element.children as ILayoutSchema));
      });

      return inputs;
    }

    function onFormSubmit() {
      const errors = getInputs(schema)
        .map((element) => validateInput(element))
        .filter((element) => element.error)
        .reduce(
          (obj, item) => ({
            ...obj,
            [item.name]: item.error
          }),
          {}
        );

      setErrors(errors);
      const errorFields = Object.keys(errors);
      if (errorFields.length > 0) {
        context.inputs[errorFields[0]]!.current!.focus();
        return;
      }

      onSubmit(values, setErrors);
    }

    function renderLayout(schema: IFormSchema) {
      return (
        <Fragment>
          {schema &&
            schema.map(
              (element: ILayoutSchema | IElementSchema, index: number) => {
                if (!elements[element.type] && !layoutElements[element.type])
                  return console.error(
                    `react-form-templator: Element '${element.type}' has not been registered`
                  );

                if (element.children) {
                  return React.cloneElement(
                    layoutElements[element.type]({
                      ...element.children,
                      ...element,
                      children: renderLayout(element.children)
                    })
                  );
                }

                const formElement = element as IElementSchema;

                console.log(
                  'ydnamic props for elements',
                  formElement.name,
                  dynamicProps[formElement.name]
                );

                const props = {
                  tabIndex: index + 1,
                  submit: onFormSubmit,
                  value: values[formElement.name],
                  error: errors[formElement.name],
                  ref: context.inputs[formElement.name],
                  validate: (refocus: boolean) =>
                    validateInput(formElement, true, refocus),
                  onChange: (value: any) => {
                    setErrors({ ...errors, [formElement.name]: undefined });
                    context.setValue(formElement.name, value);
                  },
                  ...(dynamicProps[formElement.name]
                    ? dynamicProps[formElement.name]
                    : {})
                };

                if (!elements[formElement.type])
                  return console.error(
                    `react-templator: Element ${formElement.type} does not exist!`
                  );

                return React.cloneElement(
                  elements[formElement.type]({ ...formElement, ...props })
                );
              }
            )}
        </Fragment>
      );
    }

    return React.cloneElement(formElement(onFormSubmit), {
      children: renderLayout(schema)
    });
  }
);
