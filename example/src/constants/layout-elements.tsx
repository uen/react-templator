import { ReactElement } from 'react';
import { Section } from '../components/Section';
import { ILayoutProps } from '../modules/react-form-templator/src/interfaces';

export const LAYOUT_ELEMENTS: Record<
  string,
  (props: ILayoutProps) => ReactElement
> = {
  section: Section
};
