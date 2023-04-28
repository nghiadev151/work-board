import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
    Button,
    Dropdown,
    DropdownButton,
    Image,
    Tooltip,
} from "react-bootstrap";
import classNames from "classnames/bind";
import {Link} from "react-router-dom";

import styles from "./Header.module.scss";
import hinh7mau from "~/assets/header/hinh7mau.jpg";
import {VscBell, VscColorMode, VscQuestion} from "react-icons/vsc";
import {IoMdPeople} from "react-icons/io";
import config from "~/config";

import AuthServices from "~/services/authServices";
import {useEffect, useState} from "react";

const cx = classNames.bind(styles);

function NavScrollExample() {
    const [logged, setLogged] = useState(false)
    const [lastName, setLastName] = useState("")

    useEffect(() => {
        if (localStorage.getItem("user") !== null) {
            setLogged(true)
            setLastName(JSON.parse(localStorage.getItem("user")).lastName)
        }
    }, [])
    return (
        <Navbar className={cx("wrapper")} bg="light" expand="lg">
            <Container>
                <Navbar.Brand
                    style={{
                        backgroundColor: "#0079bf",
                        borderRadius: "3px",
                        padding: "4px",
                    }}
                    href="/"
                >
                    <Link to={config.routes.home}>
                        <img
                            src="https://a.trellocdn.com/prgb/assets/d947df93bc055849898e.gif"
                            width="140"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Link>
                </Navbar.Brand>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: "100px"}}
                        navbarScroll
                    >
                        <Button variant="light">
                            <NavDropdown
                                className={cx("nav-item")}
                                title="Các Không gian làm việc"
                                id="navbarScrollingDropdown"
                            >
                                {" "}
                                <NavDropdown.Item>
                  <span
                      style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "#6b778c",
                      }}
                      variant="light"
                  >
                    Các Không gian làm việc của bạn
                  </span>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action3">
                                    <Image
                                        src={hinh7mau}
                                        rounded
                                        height={45}
                                        style={{marginRight: ".3rem"}}
                                    />
                                    <span
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            marginLeft: ".5rem",
                                            fontFamily: "sans-serif",
                                        }}
                                    >
                    Trello không gian làm việc
                  </span>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Button>
                        <Button variant="light">
                            <NavDropdown
                                className={cx("nav-item")}
                                title="Gần đây"
                                id="navbarScrollingDropdown"
                            >
                                {" "}
                                <NavDropdown.Item href="#action3" style={{display: "flex"}}>
                                    <Image
                                        src={hinh7mau}
                                        rounded
                                        height={45}
                                        style={{marginRight: ".3rem"}}
                                    />
                                    <div>
                    <span
                        style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            lineHeight: "0.5",
                            marginLeft: ".5rem",
                            fontFamily: "sans-serif",
                        }}
                    >
                      Untitled Board
                    </span>

                                        <p
                                            style={{
                                                fontSize: "12px",
                                                fontWeight: "bold",
                                                marginLeft: ".5rem",
                                                fontFamily: "sans-serif",
                                            }}
                                        >
                                            Trello không gian làm việc
                                        </p>
                                    </div>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Button>
                        <Button variant="light">
                            <NavDropdown
                                className={cx("nav-item")}
                                title="Đã đánh dấu sao"
                                id="navbarScrollingDropdown"
                            >
                                {" "}
                                <NavDropdown.Item className={cx('space-item')} href="#action3">
                                    <Image
                                        src={hinh7mau}
                                        rounded
                                        height={134}
                                        width={280}
                                        style={{marginRight: ".3rem"}}
                                    />
                                    <p
                                        style={{
                                            fontSize: "14px",
                                            marginLeft: ".5rem",
                                            fontFamily: "sans-serif",
                                            textAlign: "center",
                                        }}
                                    >
                                        Trello không gian làm việc
                                    </p>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Button>
                        <Button variant="light">
                            <NavDropdown
                                className={cx("nav-item")}
                                title="Mẫu"
                                id="navbarScrollingDropdown"
                            >
                                {" "}
                                <NavDropdown.Item>
                  <span
                      style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "#6b778c",
                      }}
                      variant="light"
                  >
                    Các Mẫu hàng đầu
                  </span>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action3">
                                    <Image
                                        src={hinh7mau}
                                        rounded
                                        height={45}
                                        style={{marginRight: ".3rem"}}
                                    />
                                    <span
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            marginLeft: ".5rem",
                                            fontFamily: "sans-serif",
                                        }}
                                    >
                    Trello không gian làm việc
                  </span>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action3">
                                    <Image
                                        src={hinh7mau}
                                        rounded
                                        height={45}
                                        style={{marginRight: ".3rem"}}
                                    />
                                    <span
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            marginLeft: ".5rem",
                                            fontFamily: "sans-serif",
                                        }}
                                    >
                    Trello không gian làm việc
                  </span>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Button>

                        <div className={cx("nav-item")}>
                            <DropdownButton
                                className={cx("nav-item")}
                                align="center"
                                title="Tạo mới"
                                id="dropdown-menu-align-end"
                                size="lg"
                                type="button"
                                variant="primary"
                            >
                                <Dropdown.Item
                                    style={{
                                        maxWidth: "300px !important",
                                    }}
                                    as="div"
                                >
                                    <Link className={cx('create-workspace-link')} to={config.routes.createWorkspace}>

                                        <IoMdPeople/> Tạo Không gian làm việc
                                        <p
                                            style={{
                                                fontSize: "12px",
                                            }}
                                        >
                                            Là tập hợp các bảng và mọi người.
                                        </p>
                                    </Link>
                                </Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </Nav>
                    <Form className="d-flex m-3">
                        <Form.Control
                            size="lg"
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form>
                    <Form className="d-flex m-3">
                        <VscBell size={25}/>
                        <VscQuestion size={25}/>
                        <VscColorMode size={25}/>
                    </Form>
                </Navbar.Collapse>
                {
                    logged
                    && <div>Hello {lastName}</div>
                    || <Link to={config.routes.account} className="m-3">
                        <Button size="lg" type="submit">
                            Đăng Nhập
                        </Button>
                    </Link>
                }
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;
