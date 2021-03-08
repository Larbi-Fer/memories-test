import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use(req => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

const P = '/posts'
const U = '/user'

export const fethPosts = () => API.get(P)
export const createPost = newPost => API.post(P, newPost)
export const updatePost = (id, updatedPost) => API.patch(`${P}/${id}`, updatedPost)
export const deletePost = id => API.delete(`${P}/${id}`)
export const likePost = id => API.patch(`${P}/${id}/likePost`)

export const signIn = formData => API.post(U + '/signin', formData)
export const signUp = formData => API.post(U + '/signup', formData)