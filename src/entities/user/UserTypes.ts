export interface FormValuesUi {
    name: string;
    surName: string;
    password: string;
    fullName: string;
    email: string;
    birthDate: string | null | Date;
    telephone: string;
    employment: string;
    userAgreement: boolean;
}

export const employmentOptions = [
    { value: 'worker', label: 'Рабочий' },
    { value: 'engineer', label: 'Инженер' },
    { value: 'admin', label: 'Администратор' },
];