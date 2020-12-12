import { IForm, IElementSchema, ILayoutSchema, IFormSchema, registerElement, registerLayoutElement } from './templator';
export declare function Form({ schema, onSubmit, dynamicProps }: IForm): JSX.Element;
export type { IElementSchema, ILayoutSchema, IFormSchema };
export { registerElement, registerLayoutElement };
