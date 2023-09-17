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
				
				<div className='row'>
					<div className={'col-4 mb-3'}>
					
					</div>
					<div className={'col-4 mb-3'}>
					
					</div>
					<div className={'col-4 mb-3'}>
					
					</div>
				</div>
			</div>
	)
}