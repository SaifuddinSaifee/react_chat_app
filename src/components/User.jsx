import React from "react";
import tempimage from "../images/avatar.png";

const User = ({ user, selectUser }) => {
    return (
        <div className="user_wrapper" onClick={()=> selectUser(user)}>

            {/* User Data */}
            <div className="user_info">
                <div className="user_detail">
                    <img
                        className="dpImg"
                        src={user.avatar || tempimage}
                        alt="Avatar"
                    />
                    <h4>{user.name}</h4>
                </div>

                {/* Status pin */}
                <div
                    className={`user_status ${
                        user.isOnline ? "online" : "offine"
                    }`}
                ></div>
            </div>
        </div>
    );
};

export default User;
