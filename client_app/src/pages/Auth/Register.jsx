import React from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'sonner'

const schema = yup
    .object({
        username: yup.string().trim().required('requis'),
        email: yup.string().trim().required('requis').email('Email non valide'),
        password: yup.string().trim().required('requis')
            .min(4,'minimum 4 caracteres'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password')], 'mot de passe différent'),
    })
    .required()

export default function Register() {

    const navigate=useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const mutation = useMutation({
        mutationFn: (data) => {
            return axios.post(`${import.meta.env.VITE_API_URL}/register`, data)
        },
        onSuccess: () => {
            navigate('/login')
        },
        onError: () => {
            toast.error("Email déjà utilisé")
        }
    })
    const onSubmit = (data) => {
        mutation.mutate(data)
    }

    return (
        <main className="container">
            <section className="row d-flex justify-content-center align-items-center vh-100">
                <div className="col-lg-5 shadow rounded p-5">
                    <h3 className="text-center">S'inscrire à HIGH TECH SCHOOL</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <input type="text" {...register('username')}
                                   className="form-control" placeholder='Username...'/>
                            <span className="text-danger">{errors.username?.message}</span>
                        </div>
                        <div className="mb-3">
                            <input type="text" {...register('email')}
                                   className="form-control" placeholder='Email...'/>
                            <span className="text-danger">{errors.email?.message}</span>
                        </div>
                        <div className="mb-3">
                            <input type="password" {...register('password')}
                                   className="form-control" placeholder='mot de passe...'/>
                            <span className="text-danger">{errors.password?.message}</span>
                        </div>
                        <div className="mb-3">
                            <input type="password" {...register('confirmPassword')}
                                   className="form-control"
                                   placeholder='confirmation mot de passe...'/>
                            <span className="text-danger">{errors.confirmPassword?.message}</span>
                        </div>
                        <p className="text-center my-3">
                            Déja un compte?
                            <Link to='/login'>Se connecter</Link>
                        </p>
                        <button type='submit' className='btn btn-dark w-100'>
                            {mutation.isPending ? 'Enregistrement...' : "S'inscrire"}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    )
}