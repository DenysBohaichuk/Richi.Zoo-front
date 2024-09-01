import * as yup from 'yup';
import { useForm, useField } from "vee-validate";

// Загальна функція для створення форми з валідацією
export function createFormValidation(schema) {
    const { handleSubmit, errors } = useForm({
        validationSchema: schema,
    });

    return { handleSubmit, errors };
}

// Функція для створення полів з валідацією
export function createValidatedField(fieldName, schema) {
    const { value, errorMessage } = useField(fieldName, schema);
    return { value, errorMessage };
}
