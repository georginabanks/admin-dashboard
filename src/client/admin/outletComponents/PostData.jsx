import axios from "axios";

const config = {
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

async function response(setButtonText, saveButton, savedButton, data ) {
	if (data.data === "success") {
		function timeout() {
			setButtonText(saveButton);
		}
		
		setTimeout(timeout, 1800);
		setButtonText(savedButton);
	} else {
		console.log(data)
		setTimeout(() => setButtonText(saveButton), 3000);
		if (data.data.name === "SequelizeUniqueConstraintError") { setButtonText("Already in database!"); }
		else { setButtonText("ERROR!") }
	}
}


// Post Request

export default async function PostData(
		event, setButtonText, saveButton, savingButton, savedButton, url, content
) {
	event.preventDefault();
	setButtonText(savingButton);
	
	const data = await axios.post("/api/admin/" + url, content, config);
	
	await response(setButtonText, saveButton, savedButton, data)
}


// Delete Request

export async function DeleteData(
		event, setButtonText, deleteButton, deletingButton, deletedButton, url
) {
	event.preventDefault();
	setButtonText(deletingButton);
	
	const data = await axios.delete('/api/admin/' + url, config);
	
	await response(setButtonText, deleteButton, deletedButton, data)
}