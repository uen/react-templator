interface Props {
    text: string;
}
export declare const ExampleComponent: ({ text }: Props) => JSX.Element;
interface IForm {
    schema: IFormSchema;
}
export declare const Form: ({ schema }: IForm) => JSX.Element;
export interface IElementSchema {
    type: string;
    [data: string]: any;
}
export interface IFormSchema extends Array<IElementSchema> {
}
export declare function registerElement(type: string, render: (props: IElementProps) => {}): void;
interface IElementProps {
    name: string;
    [data: string]: any;
}
export {};
