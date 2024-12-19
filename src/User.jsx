import React, { useState } from 'react';
import './User.css';

import user_icon from '../img/user.png';
import email_icon from '../img/email.png';
import password_icon from '../img/password.jpg';

const LoginSignup = () => {
	const [action, setAction] = useState("Login");
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const API_BASE_URL = "https://localhost:7126/api/users";

	const handleSubmit = async () => {
		try {
			const endpoint = action === "Sign Up" ? "createuser" : "updateuser";
			const payload = {
				userID: 1,
				userName: action === "Sign Up" ? userName : "",
				userPassword: password,
				userEmail: email,
			};

			const response = await fetch(`${API_BASE_URL}/${endpoint}/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			if (response.ok) {
				setMessage(`User ${action === "Sign Up" ? "created" : "updated"} successfully!`);
			} else {
				const errorData = await response.json();
				setMessage(`Error: ${errorData.message || "Failed to process request."}`);
			}
		} catch (error) {
			setMessage(`Error: ${error.message}`);
		}
	};

	return (
		<div className='container'>
			<div className="header">
				<div className="text">{action}</div>
				<div className="underline"></div>
			</div>

			{action === "Sign Up" && (
				<div className="input">
					<img src={user_icon} alt="User Icon" />
					<input
						type="text"
						placeholder="Username"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
				</div>
			)}
			<div className="input">
				<img src={email_icon} alt="Email Icon" />
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="input">
				<img src={password_icon} alt="Password Icon" />
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			{action === "Login" && (
				<div className="forgot-password">
					Forgot your Password? <span>Click Here!</span>
				</div>
			)}

			{action === "Sign Up" && (
				<div className="already-have-user">
					Already created a user? <span>Sign in</span>
				</div>
			)}

			<div className="submit-container">
				<div
					className={action === "Sign Up" ? "submit grey" : "submit"}
					onClick={() => {
						setAction("Login");
						if (action === "Login") handleSubmit();
					}}
				>
					Login
				</div>
				<div
					className={action === "Login" ? "submit grey" : "submit"}
					onClick={() => {
						setAction("Sign Up");
						if (action === "Sign Up") handleSubmit();
					}}
				>
					Sign Up
				</div>
			</div>

			{message && <div className="message">{message}</div>}
		</div>
	);
};

export default LoginSignup;
