import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import User from "../components/User";

const Home = () => {
    const [chat, setChat] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const usersRef = collection(db, "users");

        // query entire users collection except currently logged in user
        const q = query(
            usersRef,
            where("uid", "not-in", [auth.currentUser.uid])
        );

        const unSub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let users = [];

                querySnapshot.forEach((doc) => {
                    users.push(doc.data());
                });
                setUsers(users);
            });
        });
    }, []);

    const selectUser = (user) => {
        setChat(user);
        // console.log(user);
    };

    // console.log(users);

    return (
        <div className="home_container">
            <div className="users_container">
                {users.map((user) => (
                    <User key={user.uid} user={user} selectUser={selectUser} />
                ))}
            </div>


{/* ________________________________________________________________________________ */}

            <div className="messages_container">
              {chat ? <div className="messages_user">
                  <h3>{chat.name}</h3>
              </div> : <h3 className="no_conv">Select a user</h3>}
              
            </div>
        </div>
    );
};

export default Home;
