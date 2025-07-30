import * as Yup from 'yup';
export const validationSchema = Yup.object({
    name: Yup.string()
        .required('Имя обязательно')
        .max(64, 'Максимальная длина — 64 символа'),
    surName: Yup.string()
        .required('Фамилия обязательна')
        .max(64, 'Максимальная длина — 64 символа'),
    password: Yup.string()
        .required('Пароль обязателен'),
    fullName: Yup.string()
        .required('Полное имя обязательно')
        .max(130, 'Максимальная длина — 130 символов'),
    email: Yup.string()
        .email('Некорректный email')
        .required('Email обязателен'),
    birthDate: Yup.date()
        .nullable()
        .typeError('Некорректная дата'),
    telephone: Yup.string()
        .matches(
            /^\+7\d{10}$/,
            'Телефон должен быть в формате +79991231231'
        )
        .nullable(),
    employment: Yup.string()
        .oneOf(['worker', 'engineer', 'admin'], 'Некорректная должность')
        .nullable(),
    userAgreement: Yup.boolean()
        .oneOf([true], 'Вы должны принять пользовательское соглашение'),
});