export default function EditPage() {
	return (
			<div>
				<div className="mb-3">
					<input type="text" className="form-control form-control-lg" name='PageTitle' id="PageTitle"
						   placeholder="Title" />
				</div>
				<div className="mb-3">
					<input type="text" className="form-control" name='PageSlug' id="PageSlug"
						   placeholder="Slug" />
				</div>
				<div className="mb-3">
					<textarea className="form-control" name='PageContent' id="PageContent" rows="20"></textarea>
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