const initialState = {
    user : {
        name: "Giovanni",
        password: "12345"
    },

    isAuth: false
}

export default function loginReducer(state = initialState, action) {

    switch (action.type) {
        case "login":
            return {
                ...state,
                isAuth: true
            }
            case "logout":
                return {
                    ...state,
                    isAuth: false
                }   
            
    
        default: return state
    }
}

function login() {
    return { type: "login" }
}

function logout() {
    return { type: "logout" }
}


export {login, logout}