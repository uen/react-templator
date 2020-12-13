import { IFormSchema } from 'react-templator';

export const FORM_SCHEMA: IFormSchema = [
  {
    type: 'section',
    label: 'Your details',
    children: [
      {
        type: 'text-input',
        name: 'first_name',
        label: 'First name',

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
      }
    ]
  },

  {
    type: 'section',
    label: 'Your dog',
    children: [
      {
        type: 'text-input',
        name: 'dog-name',
        label: 'Dog Name',
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
    name: 'submit',
    label: 'Submit'
  }
];
