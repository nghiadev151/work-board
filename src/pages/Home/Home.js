import React from 'react';
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

function Home(props) {
    return (
        <div className={cx('wrapper')}>
            <h3>Home page</h3>
        </div>
    );
}

export default Home;