import React, { ReactElement } from 'react';
import { ILayoutProps } from 'react-templator';

export const Section = ({ label, children }: ILayoutProps): ReactElement => (
  <div
    style={{
      marginBottom: 30
    }}
  >
    <h1 className='subtitle has-text-centered'>{label}</h1>
    <div>{children}</div>
  </div>
);
