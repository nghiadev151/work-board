import {FaFacebook, FaGoogle} from "react-icons/fa";
import styles from "~/pages/Account/Account.module.scss"
import classNames from "classnames/bind";
import {useState} from "react";
import {toast} from "react-toastify";
import AuthServices from "~/services/authServices";

const cx = classNames.bind(styles);

function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleConfirm = (e) => {
        setConfirm(e.target.value)
    }

    const handleRegister = async () => {
        if (email === "" || password === "") {
            toast.warning('Vui lòng nhập dữ liệu', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            return
        }
        if (password !== confirm) {
            toast.warning('Xác nhận mật khẩu không đúng', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            setPassword("")
            setConfirm("")
            return
        }
        try {
            await AuthServices.register(email, password)
            toast.success('Đăng ký thành công', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            setEmail("")
            setPassword("")
            setConfirm("")
        } catch (error) {
            toast.warning('Đăng ký thất bại', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            console.log(error)
        }
    }

    return (
        <form action="#">
            <h1>Create Account</h1>
            <div className={cx("socialContainer")}>
                <a href="#" className={cx("fbIcons")}><FaFacebook/></a>
                <a href="#" className={cx("ggIcons")}><FaGoogle/></a>
            </div>
            <span>or use your email for registration</span>
            <input onChange={handleEmail} value={email} type="email" placeholder="Username"/>
            <input onChange={handlePassword} value={password} type="password" placeholder="Password"/>
            <input onChange={handleConfirm} value={confirm} type="password" placeholder="Confirm Password"/>
            <button type={"button"} onClick={handleRegister} className={cx("hover")}>Sign Up</button>
        </form>
    )
}

export default Register