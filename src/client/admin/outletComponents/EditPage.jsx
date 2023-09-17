export default function EditPage() {
	return (
			<div className={'row'}>
				<div className="mb-3">
					<input type="text" className="form-control" name='PageTitle' id="PageTitle"
						   placeholder="Title" />
				</div>
				<div className="mb-3">
					<input type="text" className="form-control" name='PageSlug' id="PageSlug"
						   placeholder="Slug" />
				</div>
				<div className="mb-3">
					<textarea className="form-control" name='PageContent' id="PageContent" rows="10"></textarea>
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