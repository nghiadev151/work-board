import React,{useState} from 'react';
import classNames from "classnames/bind";
import styles from "./Content.module.scss";
const cx = classNames.bind(styles);
function Content(props) {
    const [showBoardContent, setShowBoardContent] = useState(false);
    const [showViewContent, setShowViewContent] = useState(false);
    const [showMemberContent, setShowMemberContent] = useState(false);
    const [showSettingContent, setShowSettingContent] = useState(false);
    const [showUpgradeContent, setShowUpgradeContent] = useState(false);

    return (
        <div>
            <div >
                <h3>Bảng đã xem</h3>
                <ul>
                    <li>Board 1</li>
                    <li>Board 2</li>
                    <li>Board 3</li>
                </ul>
            </div>
            <div>
                <h3>CÁC KHÔNG GIAN LÀM VIỆC CỦA BẠN</h3>
                <div className="workspace-sections" style={{ display: 'flex', gap: '16px' }}>
                    <h4>Tên không gian</h4>
                <div>
                    <button onClick={() => setShowBoardContent(!showBoardContent)}>Bảng</button>
                    {showBoardContent &&
                        <div>
                            <ul>
                                <li>Board 1</li>
                                <li>Board 2</li>
                                <li>Board 3</li>
                            </ul>
                        </div>
                    }
                </div>
                <div>
                    <button onClick={() => setShowViewContent(!showViewContent)}>Dạng xem</button>
                    {showViewContent &&
                        <div>
                            <ul>
                                <li>Dạng xem 1</li>
                                <li>Dạng xem 2</li>
                                <li>Dạng xem 3</li>
                            </ul>
                        </div>
                    }
                </div>
                <div>
                    <button onClick={() => setShowMemberContent(!showMemberContent)}>Thành viên</button>
                    {showMemberContent &&
                        <div>
                            <p>Danh sách các thành viên:</p>
                            <ul>
                                <li>Thành viên 1</li>
                                <li>Thành viên 2</li>
                                <li>Thành viên 3</li>
                            </ul>
                        </div>
                    }
                </div>
                <div>
                    <button onClick={() => setShowSettingContent(!showSettingContent)}>Cài đặt</button>
                    {showSettingContent &&
                        <div>
                            <ul>
                                <li>Cập nhập</li>
                                <li>Sửa</li>
                            </ul>
                        </div>
                    }
                </div>
                <div>
                    <button onClick={() => setShowUpgradeContent(!showUpgradeContent)}>Nâng cấp</button>
                    {showUpgradeContent &&
                        <div>
                            <ul>
                                <li>Thẻ Basic</li>
                                <li>Thẻ Premium</li>
                                <li>Thẻ Enterprise</li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
            </div></div>

    );
}


export default Content;