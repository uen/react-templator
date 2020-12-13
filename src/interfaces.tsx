import { ReactNode } from 'react';

export interface IElementSchema {
  type: string;
  name: string;
  label?: string;
  validator?: (label: string, input: string) => {};
  [data: string]: any;
}

export interface IElementProps {
  [data: string]: any;
}

export interface ILayoutSchema {
  type: string;
  children: IFormSchema;
  [data: string]: any;
}

export interface IFormSchema extends Array<IElementSchema | ILayoutSchema> {}

export interface IForm {
  schema: IFormSchema;
  dynamicProps?: Record<string, any>;
  onSubmit: (
    values: Record<string, string>,
    setErrors: (errors: Record<string, string | undefined>) => void
  ) => void;
  [props: string]: any;
}

export interface ILayoutProps {
  children: ReactNode;
  [data: string]: any;
}
