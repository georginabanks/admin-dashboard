import PostData, {DeleteData} from "../outletComponents/PostData.jsx";
import {Navigate} from "react-router-dom";
import {useState} from "react";

export default function NewPage() {
	
	const [page, setPage] = useState({});
	const [buttons, setButtons] = useState({
		deleteButton: 'Delete Post',
		saveButton: 'Save Draft',
		publishButton: 'Publish'
	});
	
	
	// Post Data
	
	const deletePost = async ( event ) => {
		await DeleteData(
				event, setButtons, deleteButton, 'Deleting...',
				'Post Deleted', 'pages/' + post.postId
		);
		
		return <Navigate to={'/posts'} replace={ true } />
	}
	
	const saveDraft = async ( event ) => {
		await PostData(event, setSaveButton, saveButton, 'Saving...', 'Saved',
				'posts/' + post.postId, { ...post, StatusStatusId: 1 }
		);
	}
	
	const publishPost = async ( event ) => {
		await PostData( event, setPublishButton, publishButton, 'Publishing...',
				'Published', 'posts/' + post.postId, { ...post, StatusStatusId: 2 }
		);
	}
}