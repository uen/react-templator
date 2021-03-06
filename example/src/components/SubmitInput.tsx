import React from 'react';
import { ReactElement } from 'react';
import { IElementProps } from 'react-templator';

export const submitInput = ({
  label,
  tabIndex,
  isLoading
}: IElementProps): ReactElement => (
  <div className='has-text-right'>
    <button
      type='submit'
      tabIndex={tabIndex}
      className={`button is-success ${isLoading ? 'is-loading' : ''}`}
    >
      {label}
    </button>
  </div>
);
