import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {Dropdown, Image} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Tippy from '@tippyjs/react/headless';

import {AiFillEdit, AiOutlineUserAdd} from 'react-icons/ai'


import styles from "./Card.module.scss";
import Form from "react-bootstrap/Form";
import {
    addMemberToCard,
    searchUserByEmail,
    searchUserInWorkSpace,
    updateCardTitle
} from "~/services/workspaces.sevices";
import {toast} from "react-toastify";
import UserItem from "~/pages/WorkBoard/Card/UserItem";
import {Avatar} from "~/assets/avatar";


const cx = classNames.bind(styles);

function Card(props) {
    const {card, loading, columnId, workspaceId} = props
    const [tooltipIndex, setTooltipIndex] = useState(-1);
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false)
    const [newColumnId, SetNewColumnId] = useState(null)
    const [email, setEmail] = useState('')
    const [cardId, setCardId] = useState(null)
    const [users, setUsers] = useState([])
    const [haveData, setHaveData] = useState(false)
    const [name, setName] = useState(card.name || "")
    const [description, setDescription] = useState(card.description || "")

    const handleChangeTitle = (e) => {
        setName(e.target.value)
    }
    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }
    const handleUpdateTitle = async (e) => {
        e.preventDefault();
        if (!name || !description) {
            toast.warning('Tên hoặc mô tả không được để trống!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setOpen(true)
        } else {
            const body = {
                columnId: columnId,
                name: name,
                description: description,
            }
            const response = await updateCardTitle(card.id, body);
            if (response.status === 200) {
                toast.success('Updated Thành công!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                loading(true)
                setOpen(false)
            } else {
                loading(false)
            }


        }


    }

    useEffect(() => {
        let timeout
        const fetchData = async () => {
            timeout = setTimeout(async () => {
                const response = await searchUserInWorkSpace(workspaceId, email)
                if (response?.data)
                    setUsers(response.data)
            }, 300)
        }
        if (email === "") {
            setUsers([])
            return
        }
        fetchData()
    }, [email])

    useEffect(() => {
        if (users !== []) {
            setHaveData(true)
            return
        }
        setHaveData(false)
    }, [users])
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setOpen(false)
    }
    const handleChangeOpen = () => {
        setOpen(true)
        SetNewColumnId(columnId)
    }

    const handleMemberTooltip = (index) => {
        setTooltipIndex(index);
    };
    const handleAddMember = async (email) => {
        const response = await addMemberToCard(card?.id, email).catch((error) => {
            if (error.response.status === 404) {
                toast.warning('Không có thành viên này!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                loading(false)
            }
        })
        if (response.status === 200) {
            toast.success('Thêm thành viên  thành công!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            loading(true)
            setShow(false)
        }


    }

    const renderMemberTooltip = (member) => {
        // setCardId(member.id)
        return (
            <Tooltip id={`tooltip-${member.id}`}>
                <div>{`${member.firstName} ${member.lastName}`}</div>
            </Tooltip>
        );
    };


    return (
        <div className="card" {...card.props}>
            <div className={cx('card-content')}>
                <p>{card.name}</p>
                <Tippy
                    interactive
                    onClickOutside={() => setOpen(false)}
                    placement="bottom-end"
                    visible={open}
                    popperOptions={{
                        strategy: "fixed",
                    }}
                    render={attrs => (
                        <div className={cx('box')} tabIndex="-1" {...attrs}>
                            <div className={cx('function')}>
                                <div className={cx('modal')}>
                                    <div className={cx('modal-left')}>
                                        <div className={cx('description')}>
                                            <div style={{fontWeight: 'bold'}}>Title:{card.description}</div>
                                            <div className={cx('input-title')}>
                                                <input value={name} onChange={handleChangeTitle}
                                                       placeholder={'Tên card'}/>
                                            </div>
                                            <div style={{fontWeight: 'bold'}}>Mô tả:{card.description}</div>
                                            <div className={cx('input')}>
                                                <input value={description} onChange={handleChangeDescription}
                                                       placeholder={'Mô tả'}/>
                                            </div>

                                        </div>
                                        <div className={cx('modal-save')}>
                                            <Button variant="primary" size="lg" onClick={handleUpdateTitle}>
                                                Cập Nhật
                                            </Button>
                                        </div>
                                    </div>
                                    <div className={cx('modal-right')}>
                                        <div className={cx('add-to-card')}>
                                            <span className={cx('add-to-card-title')}>Thêm vào thẻ</span>
                                            <div onClick={handleShow} className={cx('add-user')}>
                                                <AiOutlineUserAdd className={cx('add-user-icon')}/>
                                                <span>Thành viên</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                >
                    <span onClick={handleChangeOpen} className={cx('box-edit')}>
                        <AiFillEdit className={cx('edit')}/>
                    </span>
                </Tippy>
            </div>
            <div className={cx('user')}>
                {card?.cardMembers.map((member, index) => (
                    <OverlayTrigger
                        key={index}
                        overlay={renderMemberTooltip(member)}
                        placement="bottom"
                    >
                        <Image
                            className={cx('avatar')}
                            src={Avatar}
                            roundedCircle
                        />
                    </OverlayTrigger>
                ))}
            </div>
            <Modal size='lg'
                   centered={true}
                   autoFocus={true}
                   show={show}
                   onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className={cx('title')}>Thêm thành viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        size='lg'
                        value={email}
                        onChange={handleChangeEmail}
                        className={cx('input-add')}
                        placeholder="Nhập email user"
                    />
                    {
                        haveData
                        &&
                        <div>
                            {users.map((result, index) => (
                                <UserItem key={index} data={result} handleAddMember={handleAddMember}/>
                            ))}
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                            size='lg'
                            onClick={handleClose}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}

export default Card;