import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import styles from "./CreateWorkspace.module.scss";
import {createWorkspace} from "~/services/workspaces.sevices";
import config from "~/config";

const cx = classNames.bind(styles);

function CreateWorkspace(props) {
    const navigate = useNavigate();
    const [workspaceName, setWorkspaceName] = useState('')
    const [description, setDescription] = useState('')
    const [errorWorkspaceName, setErrorWorkspaceName] = useState('')
    const [errorDescription, setErrorDescription] = useState('')
    const handleChangeWorkspaceName = (e) => {
        setWorkspaceName(e.target.value)
    }
    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }
    useEffect(() => {
        if (workspaceName.length > 0) {
            setErrorWorkspaceName("")
        }
    }, [workspaceName])
    useEffect(() => {
        if (description.length > 0) {
            setErrorDescription("")
        }
    }, [description])


    const handleCreateWorkspace = async () => {
        if (!workspaceName) {
            setErrorWorkspaceName("WorkspaceName Không được để trống !!!")
            return;
        }
        if (!description) {
            setErrorDescription("Mô tả Không được để trống !!!")
            return;
        }
        const user = JSON.parse(localStorage.getItem("user"))
        const body = {
            userId: user.id,
            name: workspaceName,
            type: "Control",
            description: description,
            members: []
        }
        const response = await createWorkspace(body)
        if (response.status === 200) {
            toast.success('Tạo workspace thành công!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            navigate(config.routes.home)
        }

    }
    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col md="auto" xs={12} lg={6}>
                        <Form>
                            <Form.Label className={cx('header')}>Let's build a Workspace</Form.Label>
                            <Col lg={10}>
                                <p className={cx('title')}>Boost your productivity by making it easier for everyone to
                                    access boards in one location.</p>
                            </Col>
                            <Col lg={10} className={cx('item')}>
                                <Form.Group className="mb-3" controlId="nameWorkspace">
                                    <Form.Label className={cx('label')}>Workspace Name</Form.Label>
                                    <Form.Control className={cx('input')}
                                                  placeholder="Taco's Co"
                                                  value={workspaceName}
                                                  onChange={handleChangeWorkspaceName}
                                                  spellCheck={false}
                                                  size={"lg"} rows={3}/>
                                    <Form.Text className={cx('error')} muted>
                                        {errorWorkspaceName}
                                    </Form.Text>
                                </Form.Group>
                            </Col>

                            <Col lg={10} className={cx('item')}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label className={cx('label')}>Workspace description</Form.Label>
                                    <Form.Control style={{height: "200px"}}
                                                  className={cx('input')}
                                                  value={description}
                                                  onChange={handleChangeDescription}
                                                  as="textarea"
                                                  rows={3}/>
                                    <Form.Text className={cx('error')} muted>
                                        {errorDescription}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col lg={10}>
                                <div className="d-grid gap-2">
                                    <Button className={cx('btn-continue')}
                                            variant="primary"
                                            onClick={handleCreateWorkspace}
                                            size="lg">
                                        Continue
                                    </Button>

                                </div>
                            </Col>
                        </Form>

                    </Col>
                    <Col className="d-flex align-items-center justify-content-center"
                         style={{backgroundImage: 'url("https://a.trellocdn.com/prgb/assets/df0d81969c6394b61c0d.svg")'}}
                         md="auto" lg={6}>
                        <div className={'image'}>
                            <img className={cx('image')}
                                 src="https://a.trellocdn.com/prgb/assets/d1f066971350650d3346.svg" alt="image"/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CreateWorkspace;