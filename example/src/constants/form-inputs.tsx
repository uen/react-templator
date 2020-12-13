import { ReactElement } from 'react';
import { selectInput } from '../components/SelectInput';
import { submitInput } from '../components/SubmitInput';
import { textInput } from '../components/TextInput';
import { IElementProps } from 'react-templator';

export const ELEMENTS: Record<
  string,
  (props: IElementProps) => ReactElement
> = {
  'text-input': textInput,
  select: selectInput,
  submit: submitInput
};
