import React, { useState, useEffect } from "react";
import image from "../images/avatar.png";
import UploadDp from "../components/UploadDp";

const Profile = () => {
    const [Image, setImage] = useState("");
    console.log(Image);

    return (
        <div className="profile_container">
            <div className="img_container">
                <img src={image} alt="Avatar" />
                <div className="overlay">
                    <div>
                        <label htmlFor="photo">
                            <UploadDp />
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            id="photo"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                </div>
            </div>

            <div className="text_container">
                <h3>User Name</h3>
                <p>user email</p>
                <hr />
                <small>Joined on: </small>
            </div>
        </div>
    );
};

export default Profile;
