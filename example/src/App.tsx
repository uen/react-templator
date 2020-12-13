import React, { ReactElement, useState } from 'react';

import './index.css';

import {
  IFormSchema,
  Form,
  FormProvider
} from './modules/react-form-templator';
import { IElementProps } from './modules/react-form-templator/dist/interfaces';
import { ILayoutProps } from './modules/react-form-templator/src/interfaces';

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

// registerElements({
//   'text-input': ({
//     name,
//     label,
//     tabIndex,
//     error,
//     ref,
//     value,
//     onChange,
//     validate,
//     yourProp
//   }) => (
//     <div>
//       {yourProp} {label}
//       <input
//         type='text'
//         name={name}
//         value={value}
//         tabIndex={tabIndex}
//         ref={ref}
//         onChange={(event) => {
//           onChange(event.currentTarget.value);
//         }}
//         onBlur={() => validate(false)}
//       />
//       {error}
//     </div>
//   ),
//   submit: () => <input type='submit' />
// });

const elements: Record<string, (props: IElementProps) => ReactElement> = {
  'text-input': ({
    name,
    label,
    tabIndex,
    error,
    yourProp,
    ref,
    value,
    onChange,
    validate
  }) => (
    <div className='input-container'>
      {yourProp} {label}
      <input
        type='text'
        name={name}
        tabIndex={tabIndex}
        value={value}
        ref={ref}
        onChange={(event) => {
          onChange(event.currentTarget.value);
        }}
        onBlur={() => validate(false)}
      />
      {error && <span className='error'>{error}</span>}
    </div>
  ),

  select: ({
    name,
    label,
    tabIndex,
    error,
    validate,
    ref,
    value,
    onChange,

    // Dynamic props
    colors = []
  }) => (
    <div>
      {label}
      <select
        ref={ref}
        name={name}
        value={value}
        tabIndex={tabIndex}
        onBlur={() => validate(false)}
        onChange={(event) => {
          onChange(event.currentTarget.value);
        }}
      >
        <option disabled selected></option>
        {colors.map((color: Record<string, string>) => (
          <option value={color.value}>{color.label}</option>
        ))}
      </select>

      <div className='error'>{error}</div>
    </div>
  ),
  submit: ({
    label,
    tabIndex,

    // Dynamic props
    isLoading
  }) => (
    <input
      type='submit'
      tabIndex={tabIndex}
      value={isLoading ? 'Loading...' : label}
    />
  )
};

const layoutElements: Record<string, (props: ILayoutProps) => ReactElement> = {
  section: ({ children, yourProp }) => (
    <div
      style={{
        backgroundColor: 'rgba(255,0,0,.4)',
        padding: 20,
        marginTop: 10,
        marginBottom: 10
      }}
    >
      <h1>{yourProp}</h1>
      <div>{children}</div>
    </div>
  )
};

// const schema: IFormSchema = [
//   {
//     label: 'First name',
//     type: 'text-input',
//     name: 'first_name',
//     required: true,
//     minLength: 5
//   },
//   {
//     type: 'inline',
//     content: [
//       {
//         label: 'another',
//         type: 'text-input',
//         name: 'lastname',
//         required: true
//       },
//       {
//         label: 'anotherxx',
//         type: 'text-input',
//         name: 'lastnamxxxe',
//         required: true
//       }
//     ]
//   },

//   {
//     label: 'fuck',
//     type: 'text-input',
//     name: 'fuck',
//     number: true,
//     required: true
//   },
//   {
//     label: 'custom validator',
//     type: 'text-input',
//     required: true,
//     name: 'cusddtom',
//     validator: (label: string, input: string) =>
//       input !== 'vrondakis' && `${label} must be vrondakis`
//   },
//   {
//     type: 'submit',
//     name: 'shit'
//   }
// ];

const schema: IFormSchema = [
  {
    // Required fields
    type: 'text-input',
    name: 'first_name',
    label: 'First name',

    // Validators
    required: true,
    minLength: 2,
    maxLength: 50
  },
  {
    type: 'text-input',
    name: 'last_name',
    label: 'Last name',
    required: true
  },
  {
    type: 'select',
    name: 'fave_color',
    label: 'Color',

    required: true
  },

  {
    type: 'section',
    yourProp: 'Your dog',
    children: [
      {
        type: 'text-input',
        name: 'dog-name',
        label: 'Name',
        required: true
      },

      {
        type: 'text-input',
        name: 'breed',
        label: 'Breed',
        required: true
      }
    ]
  },

  {
    type: 'submit',
    name: 'submit'
  }
];

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const colors = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' }
  ];

  console.log('colors r', colors);

  return (
    <>
      <FormProvider elements={elements} layoutElements={layoutElements}>
        <Form
          schema={schema}
          dynamicProps={{
            fave_color: { colors },
            submit: {
              isLoading
            }
          }}
          onSubmit={(
            data: Record<string, any>,
            setErrors: (errors: Record<string, string>) => void
          ) => {
            // console.log('on submit', data);
            setIsLoading(true);

            setTimeout(() => {
              setIsLoading(false);

              if (data.last_name !== 'vrondakis') {
                return setErrors({
                  last_name: "Last name must be 'vrondakis'"
                });
              }

              alert(`Form submitted! Data: ${JSON.stringify(data)}`);
            }, 2000);
          }}
        />
      </FormProvider>
    </>
  );
};

export default App;
