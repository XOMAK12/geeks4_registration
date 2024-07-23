import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import classes from "./FormPage.module.css";

const FormPage = () => {
    const Schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(Schema)
    })

    const onSubmit = (data) => {
        const { confirmPassword, ...formData } = data;
        console.log(formData);
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <h1>Register with</h1>
                <div className={classes.form_container}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p>Name</p>
                        <input {...register('name')} placeholder={'Your full name'}/>
                        {errors.name && <p className={classes.error}>{errors.name.message}</p>}

                        <p>Email</p>
                        <input {...register('email')} placeholder={'Your email address'}/>
                        {errors.email && <p className={classes.error}>{errors.email.message}</p>}

                        <p>Password</p>
                        <input type="password" {...register('password')} placeholder={'Your password'}/>
                        {errors.password && <p className={classes.error}>{errors.password.message}</p>}

                        <p>Re-enter password</p>
                        <input type="password" {...register('confirmPassword')} placeholder={'Your password'}/>
                        {errors.confirmPassword && <p className={classes.error}>{errors.confirmPassword.message}</p>}

                        <button type="submit">CONTINUE</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormPage;