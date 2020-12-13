import React, { useState } from 'react';
import { FORM_SCHEMA } from './constants/form';
import { ELEMENTS } from './constants/form-inputs';
import { LAYOUT_ELEMENTS } from './constants/layout-elements';

import 'bulma/css/bulma.css';
import { Form, FormProvider } from 'react-templator';

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const colors = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' }
  ];

  return (
    <>
      <FormProvider elements={ELEMENTS} layoutElements={LAYOUT_ELEMENTS}>
        <div className='container'>
          <div className='columns is-centered'>
            <div className='column is-6'>
              <div className='card' style={{ marginTop: 100 }}>
                <header className='card-header'>
                  <p className='card-header-title'>React Templator Example</p>
                </header>
                <div className='card-content'>
                  <Form
                    schema={FORM_SCHEMA}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default App;
