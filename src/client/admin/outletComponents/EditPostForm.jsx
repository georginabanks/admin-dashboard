import EditHeader from "./EditHeader.jsx";
import { HandleChange } from "./PostData.jsx";
import TextEditor from "./TextEditor.jsx";

export default function EditPostForm({ post, setPost, deletePost, saveDraft, publishPost, buttons, showDelete, backUrl }) {
	
	// Handle Change
	
	const handleChange = ( event ) => {
		HandleChange( event, post, setPost )
	}
	
	return (
			<div>
				<EditHeader backUrl={ backUrl } deletePost={ deletePost } saveDraft={ saveDraft } publishPost={ publishPost }
							buttons={ buttons } showDelete={ showDelete } />
				
				<div className="mb-3">
					<input type="text" className="form-control form-control-lg" name='title' id="title"
						   placeholder="Title" value={ post.title || '' } onChange={ handleChange } />
				</div>
				<div className="mb-3">
					<input type="text" className="form-control" name='slug' id="slug"
						   placeholder="Slug" value={ post.slug || ''} onChange={ handleChange } />
				</div>
				<TextEditor value={ post.content || '' } handleChange={ handleChange } />
			</div>
	)
}