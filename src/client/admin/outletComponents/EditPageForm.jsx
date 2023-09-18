import EditHeader from "./EditHeader.jsx";
import PostData, {DeleteData, HandleChange} from "./PostData.jsx";
import {useState} from "react";
import {Navigate} from "react-router-dom";

export default function EditPageForm({ page, setPage }) {
	
	const [deleteButton, setDeleteButton] = useState('Delete Page');
	const [saveButton, setSaveButton] = useState('Save Draft');
	const [publishButton, setPublishButton] = useState('Publish');
	
	
	// Handle Change
	
	const handleChange = ( event ) => {
		HandleChange( event, page, setPage )
	}
	
	
	// Post Data
	
	const deletePage = async ( event ) => {
		await DeleteData(
				event, setDeleteButton, deleteButton, 'Deleting...',
				'Post Deleted', 'posts/' + page.pageId
		);
		
		return <Navigate to={'/posts'} replace={ true } />
	}
	
	const saveDraft = async ( event ) => {
		await PostData(event, setSaveButton, saveButton, 'Saving...', 'Saved',
				'posts/' + page.pageId, { ...page, StatusStatusId: 1 }
		);
	}
	
	const publishPage = async ( event ) => {
		await PostData( event, setPublishButton, publishButton, 'Publishing...',
				'Published', 'posts/' + page.pageId, { ...page, StatusStatusId: 2 }
		);
	}
	
	return (
			<div>
				<EditHeader backUrl={'/posts'} deletePost={ deletePage } deleteButton={ deleteButton } saveDraft={ saveDraft }
							saveButton={ saveButton } publishPost={ publishPage } publishButton={ publishButton } />
				
				<div className="mb-3">
					<input type="text" className="form-control form-control-lg" name='postTitle' id="postTitle"
						   placeholder="Title" value={ page.postTitle || '' } onChange={ handleChange } />
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