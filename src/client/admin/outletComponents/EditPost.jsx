export default function EditPost() {
	return (
			<div>
				<div className="mb-3">
					<input type="text" className="form-control form-control-lg" name='postTitle' id="postTitle"
						   placeholder="Title" />
				</div>
				<div className="mb-3">
					<input type="text" className="form-control" name='postSlug' id="postSlug"
						   placeholder="Slug" />
				</div>
				<div className="mb-3">
					<textarea className="form-control" name='postContent' id="postContent" rows="18"></textarea>
				</div>
				
				<div className={'row justify-content-center'}>
					<div className={'col-auto mb-3'}>
						<button type="button" className="btn delete-button">Delete Post</button>
					</div>
					<div className={'col-auto mb-3'}>
						<button type="button" className="btn save-button">Save Draft</button>
					</div>
					<div className={'col-auto mb-3'}>
						<button type="button" className="btn publish-button">Publish</button>
					</div>
				</div>
			</div>
	)
}