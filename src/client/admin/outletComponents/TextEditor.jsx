import ReactQuill from "react-quill";

export default function TextEditor({ value, handleChange }) {
	return (
			<div>
				<ReactQuill theme="snow" value={value} onChange={handleChange} />;
			</div>
	)
}