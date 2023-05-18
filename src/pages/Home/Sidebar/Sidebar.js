import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import {
  FaTrello,
  FaPlus,
  FaHeart,
  FaImage,
  FaUserFriends,
  FaRegSun,
  FaAngleDown,
} from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import styles from "./Sidebar.module.scss";
import { Link } from "react-router-dom";
import {getAllWorkspacesByUserId } from "~/services/workspaces.sevices";

const cx = classNames.bind(styles);

function Sidebar(props) {
  const [isRotated, setIsRotated] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const [rotate, setRotate] = useState(0);
  const [activeId, setActiveId] = useState("s1");
  const [activeWp, setActiveWp] = useState("");
  const [workspaces, setWorkspaces] = useState();

  const collapse = [
    { name: "Bảng", icon: FaTrello },
    { name: "Điểm nổi bật", icon: FaHeart },
    { name: "Hình", icon: FaImage },
    { name: "Thành viên", icon: FaUserFriends },
    { name: "Cài đặt", icon: FaRegSun },
  ];
  const handleAngle = (id) => {
    if (isActive === id) {
      setIsRotated(!isRotated);
    } else {
      setIsRotated(false);
      setIsActive(id);
      setIsRotated(true);
    }
  };
  const handleActive = (id) => {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  };
  const handleActiveWp = (id) => {
    if (activeId === id) {
      setActiveWp(null);
    } else {
      setActiveWp(id);
    }
  };
  useEffect(() => {
    setRotate(isActive === null ? 0 : isRotated ? 180 : 0);
  }, [isActive, isRotated]);
  useEffect(() => {
    const us = JSON.parse(localStorage.getItem("user"));
    if(us === undefined || us === null) return;
    getAllWorkspacesByUserId(us.id).then((res) => 
    setWorkspaces(res.data));
  }, []);
  
  return (
    <div className={cx("wrapper")}>
      <div className={cx("sidebar")}>
        <div className={cx("sidebar-top")}>
          <ul>
            <li
              className={cx("act", { active: activeId === "s1" })}
              onClick={() => handleActive("s1")}
            >
              <span>
                <FaTrello />
              </span>
              <p>Bảng</p>
            </li>
            <li
              className={cx("act", { active: activeId === "s2" })}
              onClick={() => handleActive("s2")}
            >
              <span>
                <FaTrello />
              </span>
              <p>Mẫu</p>
            </li>
            <li
              className={cx("act", { active: activeId === "s3" })}
              onClick={() => handleActive("s3")}
            >
              <span>
                <AiOutlineHome />
              </span>
              <p>Trang chủ</p>
            </li>
          </ul>
        </div>
        <div className={cx("sidebar-bottom")}>
          <div className={cx("sidebar-bottom-title")}>
            <p>Các không gian làm việc</p>
            <Link to="/create-workspace">
              <span>
                <FaPlus className={cx("icon-plus")} />
</span>
            </Link>
          </div>
          <div className={cx("sidebar-bottom-content")}>
            <ul>
              {workspaces?.map((item, ind) => {
                
                return (
                  <div key={item.id}>
                    <li
                      key={ind}
                      className="d-flex justify-content-between align-items-center"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#w${item.id}`}
                      role="button"
                      aria-expanded="false"
                      aria-controls={`w${item.id}`}
                      onClick={() => {
                        handleAngle(item.id);
                      }}
                    >
                      <div className="d-flex justify-content-start align-items-center">
                        <span className={cx("workspaces-icon")}>
                          {item.icon}
                        </span>
                        <p className="mb-0">{item.name}</p>
                      </div>

                      <span
                        style={{
                          transform: `rotate(${
                            isActive === item.id && isRotated ? rotate : 0
                          }deg)`,
                        }}
                      >
                        <FaAngleDown />
                      </span>
                    </li>

                    <div
                      className={cx(
                        "collapse multi-collapse mb-3 collapse-content"
                      )}
                      id={`w${item.id}`}
                    >
                      <ul className="mt-3">
                        {collapse.map((coll, index) => {
                          return coll.name !== "Thành viên" ? (
                            <li
                              key={index}
                              className={cx("sidebar-item", {
                                active: activeWp === `w${item.id}${index}`,
                              })}
                              onClick={() =>
                                handleActiveWp(`w${item.id}${index}`)
                              }
                            >
                              <span className={cx("collapse-content-icon")}>
                                {React.createElement(coll.icon)}
                              </span>

                              <p>{coll.name}</p>
                            </li>
                          ) : (
                            <li
                              key={index}
                              className={cx("sidebar-item-false", {
                                active: activeWp === `w${item.id}${index}`,
                              })}
                              onClick={() =>
                                handleActiveWp(`w${item.id}${index}`)
                              }
>
                              <div className="d-flex justify-content-start align-items-center">
                                <span className={cx("icon-false")}>
                                  {React.createElement(coll.icon)}
                                </span>
                                <p className={cx("content-false")}>
                                  {coll.name}
                                </p>
                              </div>
                              <Link to="/work-board">
                                <span>
                                  <FaPlus className={cx("icon-plus-false")} />
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
