import instance from "~/interceptors/axios";

const login = async (email, password) => {
    try {
        const response = await instance.post("/auth/login", {
            email, password
        })
        localStorage.setItem("user", JSON.stringify(response.data))
        return response
    } catch (error) {
        console.log(error)
    }
}

const AuthServices = {
    login
}

export default AuthServices