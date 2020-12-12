export const validators = {
  required: (label: string, input: any, _: any) =>
    !input && `${label} must have a value`,
  minLength: (label: string, input: any, length: any) =>
    input &&
    input.length < length &&
    `${label} must be at least ${length} characters`,
  maxLength: (label: string, input: any, length: any) =>
    input &&
    input.length > length &&
    `${label} must not be more than ${length} characters`,
  number: (label: string, input: any, _: any) =>
    isNaN(input) && `${label} must be a number`
};
