import React, { ReactElement, ReactNode } from 'react';
export interface IForm {
    schema: IFormSchema;
    dynamicProps?: Record<string, any>;
    onSubmit: (values: Record<string, string>, setErrors: (errors: Record<string, string | undefined>) => void) => void;
    [props: string]: any;
}
interface ITemplator extends IForm {
    formElement: (submit: () => void) => ReactElement;
}
export declare const Templator: React.MemoExoticComponent<({ schema, onSubmit, dynamicProps, formElement }: ITemplator) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>>;
export interface IElementSchema {
    type: string;
    name: string;
    label?: string;
    validator?: (label: string, input: string) => {};
    [data: string]: any;
}
export interface ILayoutSchema {
    type: string;
    content: IFormSchema;
    [data: string]: any;
}
export interface IFormSchema extends Array<IElementSchema | ILayoutSchema> {
}
export declare function registerElement(type: string, render: (props: IElementProps) => ReactElement): void;
interface ILayoutProps {
    children: ReactNode;
    [data: string]: any;
}
export declare function registerLayoutElement(type: string, render: (props: ILayoutProps) => ReactElement): void;
interface IElementProps {
    [data: string]: any;
}
export {};
