import React, {
  createRef,
  Fragment,
  memo,
  ReactElement,
  ReactNode,
  RefObject,
  useState
} from 'react';

import { validators } from './validators';

export interface IForm {
  schema: IFormSchema;
  dynamicProps?: Record<string, any>;
  onSubmit: (
    values: Record<string, string>,
    setErrors: (errors: Record<string, string | undefined>) => void
  ) => void;
  [props: string]: any;
}

interface ITemplator extends IForm {
  formElement: (submit: () => void) => ReactElement;
}

interface IFormContext {
  values: Record<string, any>;
  errors: Record<string, string | undefined>;
  setValue: (name: string, value: any) => void;
  inputs: Record<string, RefObject<HTMLFormElement>>;
}

export const Templator = memo(
  ({ schema, onSubmit, dynamicProps = {}, formElement }: ITemplator) => {
    const [values, setValues] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string | undefined>>(
      {}
    );

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

      console.log(elementErrors);

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
        if (refocus && error && context.inputs[element.name].current)
          context.inputs[element.name].current!.focus();

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
        if ((element as ILayoutSchema).content)
          inputs.push(...getInputs(element.content as ILayoutSchema));
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
        context.inputs[errorFields[0]].current!.focus();
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
                    `react-form-templator: Element ${element.type} has not been registered`
                  );

                if (element.content) {
                  return React.cloneElement(
                    layoutElements[element.type]({
                      ...element.content,
                      children: renderLayout(element.content)
                    })
                  );
                }

                const formElement = element as IElementSchema;

                const props = {
                  tabIndex: index + 1,
                  error: errors[formElement.name],
                  ref: context.inputs[formElement.name],
                  ...(dynamicProps[formElement.name]
                    ? dynamicProps[formElement.name]
                    : {}),

                  validate: (refocus: boolean) =>
                    validateInput(formElement, true, refocus),
                  submit: onFormSubmit,
                  onChange: (value: any) => {
                    setErrors({ ...errors, [formElement.name]: undefined });
                    context.setValue(formElement.name, value);
                  },
                  value: values[formElement.name]
                };

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

export interface IElementSchema {
  type: string;
  name: string;
  label?: string;
  validator?: (label: string, input: string) => {};
  [data: string]: any;
}

export interface ILayoutSchema {
  type: string;
  content: IFormSchema;
  [data: string]: any;
}

export interface IFormSchema extends Array<IElementSchema | ILayoutSchema> {}

const elements: Record<string, (props: IElementProps) => ReactElement> = {};
const layoutElements: Record<
  string,
  (props: ILayoutProps) => ReactElement
> = {};

export function registerElement(
  type: string,
  render: (props: IElementProps) => ReactElement
): void {
  if (layoutElements[type] || elements[type])
    return console.error(`Element type '${type}' is already registered`);
  elements[type] = render;
}

interface ILayoutProps {
  children: ReactNode;
  [data: string]: any;
}
export function registerLayoutElement(
  type: string,
  render: (props: ILayoutProps) => ReactElement
): void {
  if (layoutElements[type] || elements[type])
    return console.error(
      `react-templator: Element type '${type}' is already registered`
    );
  layoutElements[type] = render;
}

interface IElementProps {
  [data: string]: any;
}
