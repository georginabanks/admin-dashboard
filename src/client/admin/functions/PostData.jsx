import axios from "axios";

export const axiosConfig = {
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}


// Handle Change

export function HandleChange(event, state, setState) {
	const newData = {
		...state,
		[event.target.name]: event.target.value
	};
	
	setState(newData);
}


// Response If/Else

async function response(setButtonText, buttons, buttonType, originalButton, doneButton, data, dataSuccess, setState ) {
	
	if (typeof data.data[dataSuccess] !== 'undefined') {
		function timeout() {
			setButtonText({ ...buttons, [buttonType]: originalButton });
		}
		
		setTimeout(timeout, 1800);
		setButtonText({ ...buttons, [buttonType]: doneButton });
		setState(data.data);
		
		return 'success'
		
	} else {
		console.log(data)
		setTimeout(() => setButtonText({ ...buttons, [buttonType]: originalButton }), 3000);
		if (data.data.name === "SequelizeUniqueConstraintError") { setButtonText("Already in database!"); }
		else { setButtonText({ ...buttons, [buttonType]: 'ERROR' }) }
		
		return 'error'
	}
}


// Post Request

export default async function PostData(
		event, setButtons, buttons, buttonType, originalButton, waitingButton, doneButton, url, content, dataSuccess, setState
) {
	event.preventDefault();
	setButtons({ ...buttons, [buttonType]: waitingButton});
	
	const data = await axios.post("/api/" + url, content, axiosConfig);
	
	return await response(setButtons, buttons, buttonType, originalButton,
			doneButton, data, dataSuccess, setState);
}


// Delete Request

export async function DeleteData( event, setButtons, buttons, url, dataSuccess ) {
	event.preventDefault();
	setButtons({ ...buttons, deleteButton: 'Deleting...'});
	
	const data = await axios.delete('/api/' + url, axiosConfig);
	
	await response(setButtons, buttons, 'deleteButton', 'Delete',
			'Deleted', data, dataSuccess)
}