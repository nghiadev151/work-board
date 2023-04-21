import React from 'react';
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

function Sidebar(props) {
    return (
        <div className={cx('wrapper')}>
            <h3>Sidebar</h3>
        </div>
    );
}

export default Sidebar;