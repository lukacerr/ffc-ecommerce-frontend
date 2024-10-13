export enum Validation {
  NONE,
  NUMBER,
  CUIT,
}

const FormValidation = (typo: Validation) =>
  ({
    [Validation.NONE]: () => true,
    [Validation.NUMBER]: (value: unknown) => /^[0-9]*\.?[0-9]*$/.test(`${value}`),
    [Validation.CUIT]: (value: unknown) => /^(20|23|24|27|30|33|34)\d{8}\d{1}$/.test(`${value}`),
  }[typo]);

export default FormValidation;
