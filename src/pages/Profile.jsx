import React, { useState, useEffect } from "react";
import image from "../images/avatar.png";
import UploadDp from "../components/UploadDp";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [Image, setImage] = useState("");
    const [user, setUser] = useState();
    const navigate = useNavigate();

    console.log(Image);

    useEffect(() => {
        // Update user's image in the profile picture
        getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
            if (docSnap.exists) {
                setUser(docSnap.data());
            }
        });

        // uploading the image to firebase storage
        if (Image) {
            const uploadImage = async () => {
                const imageRef = ref(
                    storage,
                    `avatar/${new Date().getTime()} - ${Image.name}`
                );

                try {
                    const snap = await uploadBytes(imageRef, Image);
                    const url = await getDownloadURL(
                        ref(storage, snap.ref.fullPath)
                    );

                    console.log(snap.ref.fullPath);
                    console.log(url);

                    await updateDoc(doc(db, "users", auth.currentUser.uid), {
                        avatar: url,
                        avatarPath: snap.ref.fullPath,
                    });
                    console.log("Avatar set in Firestore");
                    setImage("");
                    navigate("/profile")

                } catch (err) {
                    console.log(err);
                }
            };

            uploadImage();
        }
    }, [Image]);

    return user ?(
        <div className="profile_container">
            <div className="img_container">
                <img src={user.avatar || image} alt="Avatar" />
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
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <hr />
                <small>Joined on: <em>{user.createdAt.toDate().toDateString()}</em></small>
            </div>
        </div>
    ) : null;
};

export default Profile;
