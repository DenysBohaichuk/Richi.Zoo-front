import * as yup from 'yup';
import { createFormValidation, createValidatedField } from './formValidation';

export const checkoutSchema = yup.object({
    firstNameValue: yup.string().required('Ім\'я є обов\'язковим полем'),
    lastNameValue: yup.string().required('Прізвище є обов\'язковим полем'),
    phoneValue: yup.string()
        .required('Телефон є обов\'язковим полем')
        .matches(/^[0-9]{10,14}$/, 'Неправильний формат телефону'),
    emailValue: yup.string().email('Невірний формат електронної пошти').nullable(),
});

export function useCheckoutValidation() {
    const { handleSubmit, errors } = createFormValidation(checkoutSchema);

    const { value: firstNameValue, errorMessage: firstNameError } = createValidatedField('firstNameValue', checkoutSchema.fields.firstNameValue);
    const { value: lastNameValue, errorMessage: lastNameError } = createValidatedField('lastNameValue', checkoutSchema.fields.lastNameValue);
    const { value: phoneValue, errorMessage: phoneError } = createValidatedField('phoneValue', checkoutSchema.fields.phoneValue);
    const { value: emailValue, errorMessage: emailError } = createValidatedField('emailValue', checkoutSchema.fields.emailValue);

    return {
        firstNameValue,
        firstNameError,
        lastNameValue,
        lastNameError,
        phoneValue,
        phoneError,
        emailValue,
        emailError,
        handleSubmit,
        errors,
    };
}
