import {FaFacebook, FaGoogle} from "react-icons/fa";
import styles from "~/pages/Account/Account.module.scss"
import classNames from "classnames/bind";
import {useState} from "react";

import {useNavigate} from "react-router-dom";

import AuthServices from "~/services/authServices";

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
            const response = await AuthServices.login(email, password)
            navigate("/")
        } catch (error) {
            console.log(error)
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
            <input value={email} onChange={handleUsername} autoFocus={true} type="text" placeholder="Username"/>
            <input value={password} onChange={handlePassword} type="password" placeholder="Password"/>
            <a href="#" className={cx("hoverTextRed")}>Forgot your password?</a>
            <button onClick={handleSubmit} type={"button"} className={cx("hover")}>Sign In</button>
        </form>
    )
}

export default Login