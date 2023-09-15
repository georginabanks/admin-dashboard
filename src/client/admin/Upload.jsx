export default function Upload() {
	return (
			<form action="/upload" method="POST" encType={"multipart/form-data"}>
				<input type="file" name="image"/>
				<button type="submit">Upload</button>
			</form>
	)
}