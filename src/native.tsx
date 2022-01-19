import React from 'react';
import { View } from 'react-native';

import {
  IElementSchema,
  IFormSchema,
  ILayoutSchema,
  ILayoutProps,
  IElementProps,
  IForm
} from './interfaces';

import { Templator, FormProvider } from './templator';


export function NativeForm({
  schema,
  onSubmit,
  dynamicProps,
}: IForm) {
  return (
    <Templator
      onSubmit={onSubmit}
      dynamicProps={dynamicProps}
      schema={schema}
      formElement={() => <View />}
    />
  );
}

export type {
  IElementSchema,
  ILayoutSchema,
  IFormSchema,
  ILayoutProps,
  IElementProps
};
export { FormProvider };
