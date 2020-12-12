import React from 'react';
import { View } from 'react-native';

import {
  Templator,
  IForm,
  IElementSchema,
  ILayoutSchema,
  IFormSchema,
  registerElement,
  registerLayoutElement
} from './templator';

export function Form({ schema, onSubmit, dynamicProps, ...props }: IForm) {
  return (
    <Templator
      onSubmit={onSubmit}
      dynamicProps={dynamicProps}
      schema={schema}
      formElement={() => <View {...props} />}
    />
  );
}

export type { IElementSchema, ILayoutSchema, IFormSchema };
export { registerElement, registerLayoutElement };
