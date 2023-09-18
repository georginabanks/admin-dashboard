import EditHeader from "./EditHeader.jsx";
import PostData, {DeleteData, HandleChange} from "./PostData.jsx";
import {useState} from "react";
import {Navigate} from "react-router-dom";

export default function EditPostForm({ post, setPost }) {
	
	const [deleteButton, setDeleteButton] = useState('Delete Post');
	const [saveButton, setSaveButton] = useState('Save Draft');
	const [publishButton, setPublishButton] = useState('Publish');
	
	
	// Handle Change
	
	const handleChange = ( event ) => {
		HandleChange( event, post, setPost )
	}
	
	
	// Post Data
	
	const deletePost = async ( event ) => {
		await DeleteData(
				event, setDeleteButton, deleteButton, 'Deleting...',
				'Post Deleted', 'posts/' + post.postId
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
	
	return (
			<div>
				<EditHeader backUrl={'/posts'} deletePost={ deletePost } deleteButton={ deleteButton} saveDraft={ saveDraft }
							saveButton={ saveButton } publishPost={ publishPost } publishButton={ publishButton } />
				
				<div className="mb-3">
					<input type="text" className="form-control form-control-lg" name='postTitle' id="postTitle"
						   placeholder="Title" value={ post.postTitle || '' } onChange={ handleChange } />
				</div>
				<div className="mb-3">
					<input type="text" className="form-control" name='postSlug' id="postSlug"
						   placeholder="Slug" value={ post.postSlug || ''} onChange={ handleChange } />
				</div>
				<div className="mb-3">
					<textarea className="form-control" name='postContent' id="postContent" rows="18"
							  value={ post.postContent || '' } onChange={ handleChange }></textarea>
				</div>
			</div>
	)
}