import { useState } from "react"


const useAuth = () => {
    const getUser = JSON.parse(localStorage.getItem('haat-user'))

    const [user, setUser] = useState(getUser || {});

    const handleLogout = () =>{
        localStorage.removeItem('haat-user');
        setUser({})
    }

    return {
        user,
        setUser,
        handleLogout
    }
}

export default useAuth;