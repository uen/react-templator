import React, { FormEvent, useState } from 'react';

import {
  IFormSchema,
  Form,
  registerLayoutElement,
  registerElement,
  registerElements
} from './modules/react-form-templator';

// registerElement('text-input', (props) => {
//   return (
//     <div>
//       {props.label}
//       <input
//         type='text'
//         name={props.name}
//         tabIndex={props.tabIndex}
//         ref={props.ref}
//         onChange={(event: FormEvent<HTMLInputElement>) =>
//           props.onChange(event.currentTarget.value)
//         }
//         onBlur={() => props.validate(false)}
//         // onBlur={() => props.validate(true)}
//       />
//       {props.error}
//     </div>
//   );
// });

// registerElement('submit', (props) => {
//   return (
//     <input type='submit' value={props.isLoading ? 'loading' : props.name} />
//   );
// });

// registerLayoutElement('inline', ({ children }) => {
//   return (
//     <div
//       style={{
//         flex: 1,
//         backgroundColor: 'blue',
//         justifyContent: 'space-between'
//       }}
//     >
//       {children}
//     </div>
//   );
// });

registerElements({
  'text-input': ({
    name,
    label,
    tabIndex,
    error,
    ref,
    value,
    onChange,
    validate,
    yourProp
  }) => (
    <div>
      {yourProp} {label}
      <input
        type='text'
        name={name}
        value={value}
        tabIndex={tabIndex}
        ref={ref}
        onChange={(event) => {
          onChange(event.currentTarget.value);
        }}
        onBlur={() => validate(false)}
      />
      {error}
    </div>
  ),
  submit: () => <input type='submit' />
});

const schema: IFormSchema = [
  {
    label: 'hello',
    type: 'text-input',
    name: 'firstname',
    required: true,
    minLength: 5
  },
  {
    type: 'inline',
    content: [
      {
        label: 'another',
        type: 'text-input',
        name: 'lastname',
        required: true
      },
      {
        label: 'anotherxx',
        type: 'text-input',
        name: 'lastnamxxxe',
        required: true
      }
    ]
  },

  {
    label: 'fuck',
    type: 'text-input',
    name: 'fuck',
    number: true,
    required: true
  },
  {
    label: 'custom validator',
    type: 'text-input',
    required: true,
    name: 'cusddtom',
    validator: (label: string, input: string) =>
      input !== 'vrondakis' && `${label} must be vrondakis`
  },
  {
    type: 'submit',
    name: 'shit'
  }
];

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      <Form
        schema={schema}
        onSubmit={(
          data: Record<string, any>,
          setErrors: (errors: Record<string, string>) => void
        ) => {
          console.log('on submit', data);
          setIsLoading(true);
          setTimeout(() => {
            // Simulate the server returning an error
            setErrors({ lastname: 'CUNT' });
            setIsLoading(false);
          }, 2000);
        }}
        dynamicProps={{
          shit: { isLoading }
        }}
      />
    </>
  );
};

export default App;
