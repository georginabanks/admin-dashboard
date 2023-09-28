import axios from "axios";
import { useState } from "react";

export default function Upload() {
	
	const [image, setImage] = useState({});
	const [success, setSuccess] = useState("");
	
	const handleSubmit = ( event ) => {
		event.preventDefault();
		axios.post("/api/images", image, { headers: { "Content-Type": "multipart/form-data" }})
				.then(res => {
					console.log(res);
					if (res.data.imageId !== undefined) {
						setSuccess("Successfully uploaded!")
					} else {
						setSuccess("Upload failed")
					}
				})
	}
	
	return (
			<div>
				<form onSubmit={handleSubmit} encType={"multipart/form-data"}>
					<input type="file" name="image" onChange={ e => setImage({ image: e.target.files[0] }) }/>
					<button type="submit">Upload</button>
				</form>
				
				<p>{success}</p>
			</div>
	)
}