import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {Container, Draggable} from "react-smooth-dnd";
import {Button, Col, Container as Wrapper, Row} from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {useParams} from "react-router-dom";


import styles from './WorkBoard.module.scss'
import Card from "~/pages/WorkBoard/Card";
import Column from "~/pages/WorkBoard/Column";
import {applyDrag, generateItems} from "~/untils/DragDrop";
import {AiOutlinePlus} from 'react-icons/ai'
import {RiDeleteBack2Fill} from 'react-icons/ri'
import {createColumn, getAllMemberWorkspace, getWorkspaceById, moveCardToColumn} from "~/services/workspaces.sevices";

const cx = classNames.bind(styles);

function WorkBoard(props) {
    let {id} = useParams();
    const [isOpen, setIsOpen] = useState(false)
    const [columns, setColumns] = useState([])
    const [columnTitle, setColumnTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [newColumnId, setNewColumnId] = useState(null)
    const [currentColumnId, setCurrentColumnId] = useState(null)
    const [card, setCard] = useState(null)
    const handleChangeOpen = () => {
        setIsOpen(true)
    }
    const handleChangeColumnTitle = (e) => {
        setColumnTitle(e.target.value)
    }

    useEffect(() => {
        setIsLoading(false)

        async function fetchData() {
            const response = await getWorkspaceById(id);
            const data = response?.data;
            setColumns(data.columns)
        }

        fetchData();
    }, [isLoading]);

    const handleAddColumns = async () => {
        const body = {
            workspaceId: id,
            columnName: columnTitle
        }
        const response = await createColumn(body)
        if (response.status === 200) {
            setIsLoading(true)
            setIsOpen(false)
        } else {
            setIsLoading(false)
        }
    }

    function getCardPayload(columnId, index) {
        const column = columns.find(column => column.id === columnId);
        const card = column.cards[index];
        return {
            cardId: card.id,
            columnId: columnId,
            cardIndex: index,
        };
    }

    function onColumnDrop(dropResult) {
        const newColumns = applyDrag([...columns], dropResult);
        setColumns(newColumns);
    }


    const onCardDrop = async (columnId, dropResult) => {
        // console.log("card", card.cardId)
        // console.log("newColumnId", newColumnId)
        if (card !== null) {
            const response = await moveCardToColumn(card.cardId, newColumnId)
            if (response.status === 200) {
                setIsLoading(true)
                setIsOpen(false)
                setCard(null)
                setNewColumnId(null)
            } else {
                setIsLoading(false)
            }

        }

    }


    return (

        <div className={cx('wrapper')}>
            <div className="card-scene">
                <Container
                    orientation="horizontal"
                    onDrop={onColumnDrop}
                    dragHandleSelector=".column-drag-handle"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'cards-drop-preview'
                    }}
                >
                    {columns?.map((column, index) => (
                        <Draggable key={index}>
                            <Column setNewColumnId={setNewColumnId}
                                    setCurrentColumnId={setCurrentColumnId}
                                    setIsLoading={setIsLoading}
                                    setCard={setCard}
                                    workspaceId={id}
                                    data={column}
                                    onCardDrop={onCardDrop}
                                    getCardPayload={getCardPayload}/>
                        </Draggable>
                    ))}
                    {
                        !isOpen && (
                            <div onClick={handleChangeOpen} className={cx('create-column')}>
                                <AiOutlinePlus/>
                                <span>Thêm cột</span>
                            </div>
                        )
                    }
                    {
                        isOpen && (
                            <div className={cx('add-column')}>
                                <div className={cx('input')}>
                                    <Form.Control
                                        value={columnTitle}
                                        onChange={handleChangeColumnTitle}
                                        size='lg'
                                        className={cx('input-add')}
                                        placeholder="Nhập tiêu đề"
                                    />
                                </div>
                                <div className={cx('function')}>
                                    <Button onClick={() => handleAddColumns()} size="lg" variant="primary">Thêm</Button>
                                    <RiDeleteBack2Fill onClick={() => setIsOpen(false)} className={cx('icon-remove')}/>
                                </div>
                            </div>
                        )
                    }
                </Container>
            </div>
        </div>
    );
}

export default WorkBoard;