import React from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import axios from "axios"
import {Link, useNavigate} from 'react-router-dom'
import {useAuthUser} from "../../../store.jsx";

const schema = yup
    .object({
        email: yup.string().trim().required('requis').email('Email non valide'),
        password: yup.string().trim().required('requis')
            .min(4,'minimum 4 caracteres'),
    })
    .required()

export default function Login() {

    const navigate = useNavigate()
    const loginUser = useAuthUser((state) => state.loginUser)
    const logoutUser = useAuthUser((state) => state.logoutUser)

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
            return axios.post(`${import.meta.env.VITE_API_URL}/login`, data)
        },
        onSuccess: (data) => {
            loginUser(data.data)
            setTimeout(() => {
                logoutUser()
            }, 3600000)
            navigate('/')
        },
        onError: () => {
            toast.error("Idenfiant Incorrect")
        }
    })
    const onSubmit = (data) => {
        mutation.mutate(data)
    }

    return (
        <main className="container">
            <section className="row d-flex justify-content-center align-items-center vh-100">
                <div className="col-lg-4 shadow rounded p-5">
                    <h3 className="text-center">Se connecter à HIGH TECH SCHOOL</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <input {...register('email')} type="text"
                                   className="form-control" placeholder='Email...'/>
                            <span className="text-danger">{errors.email?.message}</span>
                        </div>
                        <div className="mb-3">
                            <input {...register('password')} type="password"
                                   className="form-control" placeholder='mot de passe...'/>
                            <span className="text-danger">{errors.password?.message}</span>
                        </div>
                        <p className="text-center my-3">
                            Pas de Compte?
                            <Link to='/register'>S'inscrire</Link>
                        </p>
                        <button type='submit' className='btn btn-dark w-100'>Se connecter</button>
                    </form>
                </div>
            </section>
        </main>
    )
}
