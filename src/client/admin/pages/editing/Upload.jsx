import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

export default function Upload() {
	
	const [image, setImage] = useState();
	const [success, setSuccess] = useState("");
	const navigate = useNavigate()
	
	const handleSubmit = async ( event ) => {
		event.preventDefault();
		await axios.post("/api/admin/images", image, { headers: { "Content-Type": "multipart/form-data" }})
				.then(res => {
					console.log(res);
					if (res.data.imageId !== undefined) {
						setSuccess("Successfully uploaded!")
						setTimeout(() => navigate('/images'), 1000)
					} else {
						setSuccess("Upload failed")
						setTimeout(() => setSuccess(''), 3000)
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