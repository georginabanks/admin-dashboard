import PostData, {HandleChange} from "../functions/PostData.jsx";
import {useState} from "react";
import SelectImage from "../outletComponents/SelectImage.jsx";
import {getImageById} from "../../api.jsx";

export default function Settings({ cookies, updateUser }) {
	
	const [user, setUser] = useState(cookies);
	const [password, setPassword] = useState({});
	const [buttons, setButtons] = useState({ saveButton: 'Save' });
	const [errors, setErrors] = useState('');
	
	const handleChange = ( event ) => {
		HandleChange( event, user, setUser);
	}
	
	const setPFP = ( selected, setSelected ) => {
		getImageById( selected.imageId ).then( res => setUser({ ...user, ...res, ImageImageId: res.imageId }))
		setSelected({});
	}
	
	const handleSubmit = async ( event ) => {
		if ( password.newPassword && password.newPassword === password.confirmPassword ) {
			await PostData(event, setButtons, buttons, 'saveButton', 'Save',
					'Saving...', 'Saved!', 'users/' + user.username,
					{ ...user, password: password.newPassword }, 'username', setUser);
			
			updateUser( user.username );
		}
		
		else if ( password.newPassword && password.newPassword !== password.confirmPassword ) {
			setErrors('Passwords do not match')
			await PostData(event, setButtons, buttons, 'saveButton', 'Save',
					'Saving...', 'Saved!', 'users/' + user.username, user,
					'username', setUser);
			
			updateUser( user.username );
		}
		
		else {
			await PostData(event, setButtons, buttons, 'saveButton', 'Save',
					'Saving...', 'Saved!', 'users/' + user.username, user,
					'username', setUser);
			
			updateUser( user.username );
		}
	}
	
	return (
			<div>
				<form onSubmit={ handleSubmit }>
					<div className={'row gy-4'}>
						<div className={'col-12 col-md-2'}>
							<div className={'square'}>
								<img src={ user.filename !== null ? '/uploads/' + user.filename : '/uploads/logo.png' }
									 alt={ user.alt } className={'round-image'} />
								
								<a data-bs-toggle="modal" data-bs-target="#featuredImage"
								   className={'edit-pfp round-image'}>
									<h5>Edit</h5>
								</a>
							</div>
							
							<SelectImage setFeaturedImage={ setPFP } modalTitle={'Profile Picture'} />
						</div>
						
						<div className={'col-10'}>
							<div className="row mb-3">
								<label htmlFor="name" className="col-sm-3 col-form-label">Name / Nickname:</label>
								<div className="col-sm-9">
									<input type="text" className="form-control" id="name" value={ user.name || '' } name={'name'}
										   onChange={ handleChange } />
								</div>
							</div>
							<div className="row mb-3">
								<label htmlFor="username" className="col-sm-3 col-form-label">Username:</label>
								<div className="col-sm-9">
									<input type="text" className="form-control" id="username" value={ user.username || '' }
										   name={'username'} onChange={ handleChange } />
								</div>
							</div>
							<div className="row mb-3">
								<label htmlFor="email" className="col-sm-3 col-form-label">Email:</label>
								<div className="col-sm-9">
									<input type="text" className="form-control" id="email" value={ user.email || '' } name={'email'}
										   onChange={ handleChange } />
								</div>
							</div>
						</div>
					</div>
					
					<h5>Change Password</h5>
					<div className="row mb-3">
						<label htmlFor="name" className="col-sm-2 col-form-label">New Password:</label>
						<div className="col-sm-10">
							<input type="password" className="form-control" id="newPassword" value={ password.newPassword || '' }
								   onChange={ e => setPassword({ ...password, newPassword: e.target.value } ) } />
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="password" className="col-sm-2 col-form-label">Confirm Password:</label>
						<div className="col-sm-10">
							<input type="password" className="form-control" id="confirmPassword" value={ password.confirmPassword || '' }
								   onChange={ e => setPassword({ ...password, confirmPassword: e.target.value }) } />
						</div>
					</div>
					
					<br/>
					<button type="submit" className="btn publish-button">{ buttons.saveButton }</button> { errors }
				</form>
			</div>
	)
}