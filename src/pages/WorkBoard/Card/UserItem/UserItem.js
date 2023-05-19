import Button from "react-bootstrap/Button";
import React from "react";
import classNames from "classnames/bind";

import styles from "~/pages/WorkBoard/Card/UserItem/UserItem.module.scss"
import {Avatar} from "~/assets/avatar";

const cx = classNames.bind(styles);

function UserItem({data, handleAddMember}) {
    return (
        <div>
            <div className={cx('container-item')}>
                <div className={cx('email-item')}>
                    <div className={cx('avatar')}>
                        <img src={Avatar}/>
                    </div>
                    <div className={cx('info')}>
                        <div>{data.firstName} {data.lastName}</div>
                        {data.email}
                    </div>
                </div>
                <div className={cx('add-item')}>
                    <Button onClick={() => {
                        handleAddMember(data.email)
                    }} variant="primary" size="lg">
                        Thêm
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UserItem