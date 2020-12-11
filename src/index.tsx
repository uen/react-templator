import React, { createContext, ReactElement } from 'react';

const formContext = createContext({});

interface Props {
  text: string;
}

export const ExampleComponent = ({ text }: Props) => {
  return <div>Example Component: {text}</div>;
};

interface IForm {
  schema: IFormSchema;
}
export const Form = ({ schema }: IForm) => {
  // <formContext.provider
  return (
    <>
      {schema.map((element) => {
        if (!elements[element.type])
          console.error(
            `react-form-templator: Element ${element.type} has not been registered`
          );
        return renderElement(elements[element.type], element);
      })}
    </>
  );
};

function renderElement(
  render: (props: IElementProps) => ReactElement,
  element: IElementSchema
) {
  return (
    <formContext.Consumer>
      {(formService) => {
        const Element = React.cloneElement(render(element));
        return Element;
      }}
    </formContext.Consumer>
  );
}

export interface IElementSchema {
  type: string;
  [data: string]: any;
}

export interface IFormSchema extends Array<IElementSchema> {}

const elements: Record<string, (props: IElementProps) => ReactElement> = {};

export function registerElement(
  type: string,
  render: (props: IElementProps) => ReactElement
): void {
  elements[type] = render;
}

interface IElementProps {
  name: string;
  [data: string]: any;
}

// registerElement("text-input", ({value}) => (
//   <TextInput
//     value={props.value}

// )
