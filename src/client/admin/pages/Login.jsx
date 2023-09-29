import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {HandleChange} from "../functions/PostData.jsx";
import axios from "axios";

export default function Login({ handleLogin }) {
	
	const navigate = useNavigate();
	const {state} = useLocation();
	
	
	// State
	
	const [user, setUser] = useState({});
	const [buttonText, setButtonText] = useState("Login");
	
	const handleChange = ( event ) => {
		HandleChange( event, user, setUser )
	}
	
	
	// Handle Submit
	const handleSubmit = async (event) => {
		event.preventDefault();
		setButtonText("Waiting...");
		
		const data = await axios.post("/api/users/login", user, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}});
		
		if (data.data === true) {
			setButtonText("Logging in...");
			handleLogin(user.username);

			const redir = state?.path === "/login" ? "/admin/" : state?.path;
			navigate(redir || "/admin/")
		} else {
			setTimeout(() => setButtonText("Login"), 2000);
			setButtonText("Invalid Details");
		}
	}
	
	
	// Login Form
	
	return (
			<div className='login-page admin'>
				<div className="card" id="login-card">
					<div className="card-header">
						<h3 className="card-title text-center">Login</h3>
					</div>
					
					<form onSubmit={ handleSubmit } className={'login-form'}>
						<div className="card-body">
							<div className="mb-3">
								<label htmlFor="username" className="form-label">Username:</label>
								<input type="text" className="form-control" id="username" name={'username'}
									   placeholder="username" onChange={ handleChange }/>
							</div>
							
							<div className="mb-3">
								<label htmlFor="password" className="form-label">Password:</label>
								<input type="password" className="form-control" id="password" name={'password'}
									   placeholder="password" onChange={ handleChange } />
							</div>
						</div>
						
						<div className="text-center card-footer">
							<button type="submit" onSubmit={handleSubmit} className="btn publish-button">
								{buttonText}
							</button>
						</div>
					</form>
				</div>
				
				<div className={"fixed-bottom"}>
					<div className={'footer'}>
						Copyright © Georgina Banks {new Date().getFullYear()}
					</div>
				</div>
			</div>
	)
};