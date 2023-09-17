export default function EditPost() {
	return (
			<div className={'row'}>
				<div className="mb-3">
					<input type="text" className="form-control" name='postTitle' id="postTitle"
						   placeholder="Title" />
				</div>
				<div className="mb-3">
					<input type="text" className="form-control" name='postSlug' id="postSlug"
						   placeholder="Slug" />
				</div>
				<div className="mb-3">
					<textarea className="form-control" name='postContent' id="postContent" rows="10"></textarea>
				</div>
				
				<div className={'col-3 mb-3'}>
				
				</div>
				<div className={'col-3 mb-3'}>
				
				</div>
				<div className={'col-3 mb-3'}>
				
				</div>
			</div>
	)
}