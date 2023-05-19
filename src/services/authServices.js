import instance from "~/interceptors/axios";

const login = async (email, password) => {
    const response = await instance.post("/auth/login", {
        email,
        password,
    })
    localStorage.setItem("user", JSON.stringify(response.data));
    return response
}
const logout = () => {
    localStorage.clear();
};

const register = async (email, password, firstName, lastName) => {
    return await instance.post("/auth/register", {email, password, firstName, lastName})
}

const AuthServices = {
    login,
    logout,
    register
};

export default AuthServices;
