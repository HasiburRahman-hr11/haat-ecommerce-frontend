import jwt_decode from "jwt-decode";

const jwtLogout = (token) => {

    if (token) {
        const { exp } = jwt_decode(token);

        const expirationTime = (exp * 1000) - 60000
        if (Date.now() >= expirationTime) {
            localStorage.removeItem('haat-user');
        }
    }
}

export default jwtLogout;