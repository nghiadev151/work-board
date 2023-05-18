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
    localStorage.removeItem("user");
    localStorage.clear();
    window.location.replace("/account");
};

const AuthServices = {
    login,
    logout,
};

export default AuthServices;
