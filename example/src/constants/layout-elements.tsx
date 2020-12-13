import { ReactElement } from 'react';
import { Section } from '../components/Section';
import { ILayoutProps } from 'react-templator';

export const LAYOUT_ELEMENTS: Record<
  string,
  (props: ILayoutProps) => ReactElement
> = {
  section: Section
};
