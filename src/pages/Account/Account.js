import styles from "./Account.module.scss"
import classNames from "classnames/bind";

import {useState} from "react";

import {FaFacebook, FaGoogle} from "react-icons/fa";
import Login from "~/pages/Account/Login";

const cx = classNames.bind(styles);

function Account() {
    const [active, setActive] = useState(false)
    return (
        <div className={cx("accountBody")}>
            <div className={cx("container", {
                "rightPanelActive": active
            })}>
                <div className={cx("formContainer", "signUpContainer")}>
                    <form action="#">
                        <h1>Create Account</h1>
                        <div className={cx("socialContainer")}>
                            <a href="#" className={cx("fbIcons")}><FaFacebook/></a>
                            <a href="#" className={cx("ggIcons")}><FaGoogle/></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Username"/>
                        <input type="password" placeholder="Password"/>
                        <input type="password" placeholder="Confirm Password"/>
                        <button className={cx("hover")}>Sign Up</button>
                    </form>
                </div>
                <div className={cx("formContainer", "signInContainer")}>
                    <Login/>
                </div>
                <div className={cx("overlayContainer")}>
                    <div className={cx("overlay")}>
                        <div className={cx("overlayPanel", "overlayLeft")}>
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button onClick={() => {
                                setActive(false)
                            }
                            } className={cx("ghost", "hover")}>Sign In
                            </button>
                        </div>
                        <div className={cx("overlayPanel", "overlayRight")}>
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button onClick={() => {
                                setActive(true)
                            }
                            } className={cx("ghost", "hover")}>Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account