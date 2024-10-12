export enum Validation {
  NONE,
  NUMBER,
}

const FormValidation = (typo: Validation) =>
  ({
    [Validation.NONE]: () => true,
    [Validation.NUMBER]: (value: unknown) => /^[0-9]*\.?[0-9]*$/.test(`${value}`),
  }[typo]);

export default FormValidation;
