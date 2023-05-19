import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {Container, Draggable} from "react-smooth-dnd";
import Form from "react-bootstrap/Form";
import {Button, DropdownButton} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";

import styles from "./Column.module.scss";
import Card from "~/pages/WorkBoard/Card";
import {RiDeleteBack2Fill} from "react-icons/ri";
import {AiOutlinePlus} from "react-icons/ai";
import {createCard, deleteColumById} from "~/services/workspaces.sevices";
import {saveTitleAfterEdit, selectAllInlineTest} from "~/untils/ContentEditable";
import {toast} from "react-toastify";
import config from "~/config";

const cx = classNames.bind(styles);

function Column(props) {
    const {data, getCardPayload, onCardDrop, setNewColumnId, setCard, setIsLoading} = props
    const [isOpen, setIsOpen] = useState(false)
    const [cardTitle, setCardTitle] = useState('')
    const [error, setError] = useState('')
    const [columnTitle, setColumnTitle] = useState('')
    useEffect(() => {
        setColumnTitle(data.name)
    }, [data.name])
    const handleColumnTitleChange = (e) => {
        setColumnTitle(e.target.value)
    }
    const handleChangeCardTitle = (e) => {
        setCardTitle(e.target.value)
    }
    const handleChangeOpen = () => {
        setIsOpen(true)
    }
    // Update column
    const handleColumTitleBlur = () => {
        if (columnTitle !== data.name) {
            const newColumn = {
                ...data,
                title: columnTitle
            }
            //Call api updateColumn

        }

    }
    useEffect(() => {
        if (cardTitle.length > 0) {
            setError('')
        }

    }, [cardTitle])

    const handleCreateCard = async () => {
        if (!cardTitle) {
            setError("card title không được để trống !!")
            return;
        }

        const body = {
            columnId: data.id,
            name: cardTitle
        }
        const response = await createCard(body)
        if (response.status === 200) {
            setIsLoading(true)
            setIsOpen(false)
            setCardTitle('')
        } else {
            setIsLoading(false)
        }


    }
    const handleDeleteColumn = async () => {
        console.log(data.id)
        const response = await deleteColumById(data.id)
        console.log(response)
        if (response.status === 200) {
            toast.success('Xóa cột thành công!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setIsLoading(true)

        }

    }

    return (
        <div className={cx('column')}>
            <header className='column-drag-handle'>
                <div className={cx('header')}>
                    <div className="column-title">
                        {/*{data.title}*/}
                        <Form.Control
                            className={cx('editable')}
                            size={"lg"}
                            value={columnTitle}
                            onChange={handleColumnTitleChange}
                            onClick={selectAllInlineTest}
                            onBlur={handleColumTitleBlur}
                            onKeyDown={saveTitleAfterEdit}
                            onMouseDown={event => event.preventDefault()}
                            type='text'
                            placeholder="Enter your title"
                            spellCheck={false}
                        />
                    </div>
                    <DropdownButton
                        align="end"
                        id="dropdown-menu-align-end"
                        title="">
                        <DropdownItem onClick={handleDeleteColumn}>Xóa cột</DropdownItem>
                        <DropdownItem>Sửa title column</DropdownItem>
                    </DropdownButton>
                </div>
            </header>
            <Container
                {...data.props}
                groupName="col"
                onDragStart={e => setCard(e.payload, e)}
                onDragEnd={e => setCard(e.payload)}
                onDrop={e => onCardDrop(data.id, e)}
                getChildPayload={index => getCardPayload(data.id, index)}
                dragClass="card-ghost"
                dropClass="card-ghost-drop"
                onDragEnter={() => {
                    setNewColumnId(data.id)
                }}
                onDragLeave={() => {
                    console.log("drag leave:", data.id);
                }}
                onDropReady={p => console.log('Drop ready: ', p)}


                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'drop-preview'
                }}
                dropPlaceholderAnimationDuration={200}
            >
                {data.cards?.map((card, index) => (
                    <Draggable key={index}>
                        <Card loading={setIsLoading} card={card} columnId={data?.id}/>
                    </Draggable>
                ))}
                {
                    !isOpen && (
                        <div onClick={handleChangeOpen} className={cx('create-card')}>
                            <AiOutlinePlus/>
                            <span>Thêm card</span>
                        </div>
                    )
                }
                {
                    isOpen && (
                        <div className={cx('add-card')}>
                            <div className={cx('input')}>
                                <Form.Control
                                    size='lg'
                                    value={cardTitle}
                                    onChange={handleChangeCardTitle}
                                    className={cx('input-add')}
                                    placeholder="Nhập tiêu đề"
                                />
                                <Form.Text className={cx('error')}>
                                    {error}
                                </Form.Text>
                            </div>
                            <div className={cx('function')}>
                                <Button onClick={() => handleCreateCard()} size="lg" variant="primary">Thêm</Button>
                                <RiDeleteBack2Fill onClick={() => setIsOpen(false)}
                                                   className={cx('icon-remove')}/>
                            </div>
                        </div>
                    )
                }
            </Container>
        </div>
    );
}

export default Column;