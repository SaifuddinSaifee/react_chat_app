import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../firebase";
import {
	collection,
	query,
	where,
	onSnapshot,
	addDoc,
	Timestamp,
} from "firebase/firestore";
import User from "../components/User";
import MessageForm from "../components/MessageForm";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const Home = () => {
	const [chat, setChat] = useState("");
	const [users, setUsers] = useState([]);
	const [text, setText] = useState("");
	const [img, setImg] = useState("");

	const currUser = auth.currentUser;
	const currUserUid = auth.currentUser.uid;

	useEffect(() => {
		const usersRef = collection(db, "users");

		// query entire users collection except currently logged in user
		const q = query(usersRef, where("uid", "not-in", [currUser.uid]));

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

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Adding the chat messages to the firestore db

		const chatUser = chat;
		const chatUserUid = chat.uid;

		const id =
			currUserUid > chatUserUid
				? `${currUserUid + chatUserUid}`
				: `${chatUserUid + currUserUid}`;

		// store the sent image to the firebase
		let url;
		if (img) {
			const imgRef = ref(
				storage,
				`images/${new Date().getTime()} - ${img.name}`
			);

			const snap = await uploadBytes(imgRef, img);
			const imgurl = await getDownloadURL(
				ref(storage, snap.ref.fullPath)
			);
			url = imgurl;
			console.log("Image sent!");
		}

		await addDoc(collection(db, "messages", id, "chat"), {
			text,
			from: currUserUid,
			to: chatUserUid,
			createdAt: Timestamp.fromDate(new Date()),
			media: url || "",
		});

		setText("");
	};

	// console.log(users);

	return (
		// Chats
		<div className="home_container">
			<div className="users_container">
				{users.map((user) => (
					<User key={user.uid} user={user} selectUser={selectUser} />
				))}
			</div>

			{/* Messages */}
			<div className="messages_container">
				{chat ? (
					<>
						<div className="messages_user">
							{/* if the user is selected */}
							<h3>{chat.name}</h3>
						</div>
						<MessageForm
							handleSubmit={handleSubmit}
							text={text}
							setText={setText}
							setImg={setImg}
						/>
					</>
				) : (
					<h3 className="no_conv">Select a user</h3>
				)}
			</div>
		</div>
	);
};

export default Home;
