import * as api from '../api'

// Action Creator
export const getPosts = async dispatch => {
    try {
        const { data } = await api.fethPosts()
            // const action = { type: 'FETCH_ALL', payload = [] }
            // return action
        dispatch({ type: 'FETCH_ALL', payload: data })
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = post => async dispatch => {
    try {
        const { data } = await api.createPost(post)
        dispatch({ type: 'CREATE', payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async dispatch => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type: 'UPDATE', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}