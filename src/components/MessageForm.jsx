import React from "react";
import Attachment from "./Attachment";

const MessageForm = ({ handleSubmit, text, setText, setImg }) => {
	return (
		<form className="message_form" onSubmit={handleSubmit}>
			<label style={{ cursor: "pointer" }} htmlFor="img">
				<Attachment />
			</label>
			<input
				type="file"
				id="img"
				accept="image/*"
				style={{ display: "none" }}
                onChange={(e) => setImg(e.target.files[0])}
			/>

			<div className="message_box">
				<input
					type="text"
					name=""
					id=""
					placeholder="Enter message"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
			</div>
			<div className="send_btn">
				<button className="btn">Send</button>
			</div>
		</form>
	);
};

export default MessageForm;
