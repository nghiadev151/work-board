import {FaFacebook, FaGoogle} from "react-icons/fa";
import styles from "~/pages/Account/Account.module.scss"
import classNames from "classnames/bind";
import {useState} from "react";

import {useNavigate} from "react-router-dom";

import AuthServices from "~/services/authServices";
import {toast} from "react-toastify";

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const handleUsername = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async () => {
        try {
            await AuthServices.login(email, password)
            navigate("/")
        } catch (error) {
            toast.warning('Đăng nhập thất bại! Vui lòng thử lại', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            console.log(error)
            setPassword("")
        }
    }

    return (
        <form action="#">
            <h1>Sign in</h1>
            <div className={cx("socialContainer")}>
                <a href="#" className={cx("fbIcons")}><FaFacebook/></a>
                <a href="#" className={cx("ggIcons")}><FaGoogle/></a>
            </div>
            <span>or use your account</span>
            <input value={email} onChange={handleUsername} autoFocus={true} type="text" placeholder="Email"/>
            <input value={password} onChange={handlePassword} type="password" placeholder="Password"/>
            <a href="#" className={cx("hoverTextRed")}>Forgot your password?</a>
            <button onClick={handleSubmit} type={"button"} className={cx("hover")}>Sign In</button>
        </form>
    )
}

export default Login