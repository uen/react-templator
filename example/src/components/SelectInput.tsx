import React, { ReactElement } from 'react';
import { IElementProps } from '../modules/react-form-templator/src/interfaces';

export const selectInput = ({
  name,
  label,
  tabIndex,
  error,
  validate,
  ref,
  value,
  onChange,
  colors = []
}: IElementProps): ReactElement => (
  <div>
    <div className='input-container'>
      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>{label}</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <p className='control'>
              <div className={`select ${error ? 'is-danger' : ''}`}>
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
                    <option key={color.value} value={color.value}>
                      {color.label}
                    </option>
                  ))}
                </select>
                <div className='error'>{error}</div>
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
