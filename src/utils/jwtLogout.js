import jwt_decode from "jwt-decode";

const jwtLogout = () => {
    const token = JSON.parse(localStorage.getItem('haat-user'))?.token
    if (token) {
        const { exp } = jwt_decode(token)
        const expirationTime = (exp * 1000) - 60000
        if (Date.now() >= expirationTime) {
            localStorage.removeItem('haat-user')
        }
    }
}

export default jwtLogout;