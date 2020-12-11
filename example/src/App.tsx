import React from 'react';

import {
  ExampleComponent,
  IFormSchema,
  Form,
  registerElement
} from './modules/react-form-templator';

registerElement('text-input', (props) => {
  return <input type='text' name={props.name} />;
});

const schema: IFormSchema = [
  {
    type: 'text-input',
    name: 'shit'
  }
];

const App = () => {
  return (
    <>
      <Form schema={schema} />
      <ExampleComponent text='Create React Library Example 😄' />
    </>
  );
};

export default App;
