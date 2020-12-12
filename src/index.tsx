import React from 'react';
import {
  Templator,
  IForm,
  IElementSchema,
  ILayoutSchema,
  IFormSchema,
  registerElement,
  registerLayoutElement
} from './templator';

export function Form({ schema, onSubmit, dynamicProps }: IForm) {
  return (
    <Templator
      onSubmit={onSubmit}
      dynamicProps={dynamicProps}
      schema={schema}
      formElement={(submit: () => void) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        />
      )}
    />
  );
}

export type { IElementSchema, ILayoutSchema, IFormSchema };
export { registerElement, registerLayoutElement };
