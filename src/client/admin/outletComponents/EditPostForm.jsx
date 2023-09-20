import EditHeader from "./EditHeader.jsx";
import { HandleChange } from "./PostData.jsx";
import TextEditor from "./TextEditor.jsx";

export default function EditPostForm({ post, setPost, deletePost, saveDraft, publishPost, buttons, showDelete, backUrl,
										 quill, setQuill }) {
	
	// Handle Change
	
	const handleChange = ( event ) => {
		HandleChange( event, post, setPost )
	}
	
	return (
			<div>
				<EditHeader backUrl={ backUrl } deletePost={ deletePost } saveDraft={ saveDraft } publishPost={ publishPost }
							buttons={ buttons } showDelete={ showDelete } />
				
				<div className={'row'}>
					<div className={'col-md-9'}>
						<div className="mb-3">
							<input type="text" className="form-control form-control-lg" name='title' id="title"
								   placeholder="Title" value={ post.title || '' } onChange={ handleChange } />
						</div>
						<div className="mb-3">
							<input type="text" className="form-control" name='slug' id="slug"
								   placeholder="Slug" value={ post.slug || ''} onChange={ handleChange } />
						</div>
						<TextEditor value={ quill } setValue={ setQuill } />
					</div>
					
					{/*<div className={'col-md-1'}><div className="vr"></div></div>*/}
					
					<div className={'col-md-3'}>
						Featured Image
						
						Category
					</div>
				</div>
			</div>
	)
}