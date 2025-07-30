import {
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormHelperText,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import type {FormikContextType, FieldInputProps} from "formik";
import { useNavigate } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { validationSchema } from "@/pages/user-create/UserCreateValidation.ts";
import {employmentOptions, type FormValuesUi} from "@/entities/user/UserTypes.ts";
import {API_URL} from "@/shared/api.ts";

export const UserCreatePage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-start">
            <div className="flex flex-col justify-items-center w-[600px] bg-1 rounded-tw px-[3rem] pb-[2rem] pt-[1.5rem]" >
                <h2 className="text-2xl font-bold text-center text-[#6471A1] mb-[6px]">
                    Создание пользователя
                </h2>

                <Formik<FormValuesUi>
                    initialValues={{
                        name: '',
                        surName: '',
                        password: '',
                        fullName: '',
                        email: '',
                        birthDate: null,
                        telephone: '',
                        employment: '',
                        userAgreement: false,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, setFieldError }) => {
                        try {
                            const response = await fetch(`${API_URL}/api/v1/users`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    ...values,
                                    birthDate: values.birthDate ? new Date(values.birthDate).toISOString() : null,
                                }),
                                credentials: 'include'
                            });

                            if (response.ok) {
                                navigate('/');
                            } else {
                                const errorData = await response.json().catch(() => ({}));
                                if (errorData?.email) {
                                    setFieldError('email', errorData.email);
                                } else {
                                    alert('Ошибка при создании пользователя');
                                }
                            }
                        } catch (error) {
                            alert('Не удалось подключиться к серверу');
                            console.error(error);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting, values, setFieldValue, errors, touched }) => (
                        <Form>
                            <div className="grid grid-cols-2 gap-4">
                                <Field
                                    as={TextField}
                                    name="name"
                                    label="Имя"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    helperText={<ErrorMessage name="name" />}
                                    error={Boolean(errors.name && touched.name)}
                                />

                                <Field
                                    as={TextField}
                                    name="fullName"
                                    label="Полное имя"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    helperText={<ErrorMessage name="fullName" />}
                                    error={Boolean(errors.fullName && touched.fullName)}
                                />

                                <Field
                                    as={TextField}
                                    name="email"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    helperText={<ErrorMessage name="email" />}
                                    error={Boolean(errors.email && touched.email)}
                                />

                                <Field name="birthDate">
                                    {({ form }: { form: FormikContextType<FormValuesUi> }) => (
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Дата рождения"
                                                value={form.values.birthDate ? dayjs(form.values.birthDate) : null}
                                                onChange={(date) => {
                                                    form.setFieldValue('birthDate', date ? date.toISOString() : null);
                                                }}
                                                format="DD.MM.YYYY"
                                                slotProps={{
                                                    textField: {
                                                        size: 'small',
                                                        fullWidth: true,
                                                        margin: 'normal',
                                                        error: Boolean(form.errors.birthDate && form.touched.birthDate),
                                                        helperText: form.touched.birthDate && form.errors.birthDate,
                                                    },
                                                }}
                                            />
                                        </LocalizationProvider>
                                    )}
                                </Field>

                                <Field
                                    as={TextField}
                                    name="surName"
                                    label="Фамилия"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    helperText={<ErrorMessage name="surName" />}
                                    error={Boolean(errors.surName && touched.surName)}
                                />

                                <Field name="employment">
                                    {() => (
                                        <FormControl fullWidth margin="normal" error={Boolean(errors.employment && touched.employment)}>
                                            <InputLabel size="small">Должность</InputLabel>
                                            <Select
                                                value={values.employment}
                                                onChange={(e) => setFieldValue('employment', e.target.value)}
                                                label="Статус занятости"
                                                size="small"
                                            >
                                                <MenuItem value="">
                                                    <em>Не указано</em>
                                                </MenuItem>
                                                {employmentOptions.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText>
                                                <ErrorMessage name="employment" />
                                            </FormHelperText>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field
                                    as={TextField}
                                    name="password"
                                    type="password"
                                    label="Пароль"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    helperText={<ErrorMessage name="password" />}
                                    error={Boolean(errors.password && touched.password)}
                                />

                                <Field
                                    as={TextField}
                                    name="telephone"
                                    label="Номер телефона"
                                    fullWidth
                                    margin="normal"
                                    placeholder="+79991231231"
                                    size="small"
                                    helperText={<ErrorMessage name="telephone" />}
                                    error={Boolean(errors.telephone && touched.telephone)}
                                />

                                {/* Элементы на всю ширину */}
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <Field name="userAgreement">
                                        {({ field }: { field: FieldInputProps<boolean> }) => (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        {...field}
                                                        checked={field.value}
                                                        color="primary"
                                                    />
                                                }
                                                label="Согласие"
                                            />
                                        )}
                                    </Field>
                                    <FormHelperText error>
                                        <ErrorMessage name="userAgreement" />
                                    </FormHelperText>
                                </div>

                                <div style={{ gridColumn: '1 / -1' }}>
                                    <Button
                                        sx={{backgroundColor: '#6471A1', marginTop: '16px'}}
                                        type="submit"
                                        variant="contained"
                                        size="small"
                                        disabled={isSubmitting}
                                        fullWidth
                                    >
                                        {isSubmitting ? 'Создание...' : 'Создать пользователя'}
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};