import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

const Navbar = () => {
  const {user} = useContext(AuthContext)
  console.log(user);

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
                    <div className="nav_elements">
                        <Link to="/profile">{user.email}</Link>
                        <button className="btn" onClick={handleSignout}>Logout</button>
                    </div>
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
