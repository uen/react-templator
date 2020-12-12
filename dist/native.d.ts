import { IElementSchema, ILayoutSchema, IFormSchema, registerElement, registerLayoutElement, IForm } from './templator';
export declare function Form({ schema, onSubmit, dynamicProps, ...props }: IForm): JSX.Element;
export type { IElementSchema, ILayoutSchema, IFormSchema };
export { registerElement, registerLayoutElement };
