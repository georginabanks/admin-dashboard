import axios from "axios";
import { useState } from "react";

export default function Upload() {
	
	const [image, setImage] = useState();
	
	const handleSubmit = ( event ) => {
		event.preventDefault();
		axios.post("/upload", image, { headers: { "Content-Type": "multipart/form-data" }})
				.then(res => console.log(res))
	}
	
	return (
			<form onSubmit={handleSubmit} encType={"multipart/form-data"}>
				<input type="file" name="image" onChange={ e => setImage({ image: e.target.files[0] }) }/>
				<button type="submit">Upload</button>
			</form>
	)
}