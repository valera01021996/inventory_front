import axios, { type CreateAxiosDefaults } from 'axios'

export const API_BASE_URL: string = import.meta.env.VITE_BASE_URL

export const defaultOptions = () => {
    const token = localStorage.getItem('access')

    const config: CreateAxiosDefaults = {
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }

    return config
}

const generate_api = () => axios.create(defaultOptions())

export let instance = generate_api()

export const regenerate_api = () => {
    instance = generate_api()
}

instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
)
