import React from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";

const Navbar = () => {
    const handleSignout = async () => {
        try {
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                isOnline: false,
            });
            await signOut(auth);
            // navigate("/login");

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <nav>
            <h3>
                <Link to="/">Messenger</Link>
            </h3>
            <div>
                {auth.currentUser ? (
                    <>
                        <Link to="/profile">profile</Link>
                        <button className="btn">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/register">Register</Link>
                        <Link to="/Login">Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
