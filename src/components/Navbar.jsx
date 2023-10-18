import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

const Navbar = () => {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
    const handleSignout = async () => {
        try {
            await updateDoc(doc(db, "users", user.uid), {
                isOnline: false,
            });
            await signOut(auth);
            navigate("/login");

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
                {user ? (
                    <>
                        <Link to="/profile">profile</Link>
                        <button className="btn" onClick={handleSignout}>Logout</button>
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
