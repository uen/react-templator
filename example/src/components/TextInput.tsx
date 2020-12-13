import React, { ReactElement } from 'react';
import { IElementProps } from 'react-templator';

export const textInput = ({
  ref,
  name,
  label,
  error,
  value,
  validate,
  tabIndex,
  onChange
}: IElementProps): ReactElement => (
  <div className='input-container'>
    <div className='field is-horizontal'>
      <div className='field-label is-normal'>
        <label className='label'>{label}</label>
      </div>
      <div className='field-body'>
        <div className='field'>
          <p className='control'>
            <input
              ref={ref}
              type='text'
              className={`input ${error ? 'is-danger' : ''}`}
              name={name}
              value={value}
              tabIndex={tabIndex}
              onChange={(event) => {
                onChange(event.currentTarget.value);
              }}
              onBlur={() => validate(false)}
            />
            {error && <span className='error'>{error}</span>}
          </p>
        </div>
      </div>
    </div>
  </div>
);
