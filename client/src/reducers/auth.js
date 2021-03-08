import { AUTH, LOGOUT } from '../constants/actionTypes'

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data }))
            console.log(action.data);
            return { ...state, authData: action?.date };
        case LOGOUT:
            localStorage.clear()
            return { ... state, authData: null };

        default:
            return state
    }
}

export default authReducer