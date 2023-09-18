import EditHeader from "./EditHeader.jsx";
import { HandleChange } from "./PostData.jsx";

export default function EditPostForm({ post, setPost, deletePost, saveDraft, publishPost, buttons, showDelete }) {
	
	// Handle Change
	
	const handleChange = ( event ) => {
		HandleChange( event, post, setPost )
	}
	
	return (
			<div>
				<EditHeader backUrl={'/posts'} deletePost={ deletePost } saveDraft={ saveDraft } publishPost={ publishPost }
							buttons={ buttons } showDelete={ showDelete } />
				
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