import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import User from "../components/User";
import MessageForm from "../components/MessageForm";
import Message from "../components/Message";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [isTabVisible, setIsTabVisible] = useState(true); // Added state for tab visibility

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    // Set user status to "offline" when the tab is closed
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  
  // Use the Page Visibility API to detect tab changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User changed tabs or minimized the window
        setIsTabVisible(false);
        // Set user status to "offline" in Firebase here
        handleIsOffline();
      } else {
        // User switched back to the tab
        setIsTabVisible(true);
        // Set user status to "online" in Firebase here
        handleIsOnline();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleIsOnline = async () => {
    try {
      await updateDoc(doc(db, "users", user1), {
        isOnline: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleIsOffline = async () => {
    try {
      await updateDoc(doc(db, "users", user1), {
        isOnline: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleBeforeUnload = () => {
    // Set user status to "offline" when the tab is closed
    handleIsOffline();
  };
  

  useEffect(() => {
    const usersRef = collection(db, "users");
    // create query object
    const q = query(usersRef, where("uid", "not-in", [user1]));
    // execute query


    const fetchUsers = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);

      console.log("Fetched users:", users);
    });
    return () => fetchUsers();
  }, []);

  const selectUser = async (user) => {
    setChat(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);

      console.log("Fetched messages:", msgs);
    });

    // get last message b/w logged in user and selected user
    const docSnap = await getDoc(doc(db, "lastMsg", id));

    // if last message exists and message is from selected user
    
    if (docSnap.data() && docSnap.data().from !== user1) {
      
      // update last message doc, set unread to false
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    // recording the last message of the chat

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });

    setText("");
    setImg("");

    console.log("Sent message:", { text, from: user1, to: user2, createdAt: Timestamp.fromDate(new Date()), media: url || "" });
  };
  return (
    <div className="home_container">
      <div className="users_container">
        {users.map((user) => (
          <User
            key={user.uid}
            user={user}
            selectUser={selectUser}
            user1={user1}
            chat={chat}
          />
        ))}
      </div>
      <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user">
              <h3>{chat.name}</h3>
            </div>
            <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
            />
          </>
        ) : (
          <h3 className="no_conv">Select a user to start conversation</h3>
        )}
      </div>
    </div>
  );
};

export default Home;