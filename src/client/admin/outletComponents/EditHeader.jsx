export default function EditHeader({ deletePost, saveDraft, publishPost, backUrl, buttons, showDelete, showSave }) {
	return (
			<div className={'row justify-content-between gy-3'}>
				<div className={'col-auto'}>
					<a href={ '/admin' + backUrl }><i className="fa-solid fa-arrow-left fa-2xl"></i></a>
				</div>
				
				<div className={'col-auto'}>
					<div className={'row edit-buttons gy-3'}>
						{ showDelete === true && <div className={'col-auto mb-3'}>
							<button type="submit" className="btn delete-button" onClick={ deletePost }>
								{ buttons.deleteButton }
							</button>
						</div> }
						
						{ showSave !== false && <div className={'col-auto mb-3'}>
							<button type="submit" className="btn save-button" onClick={ saveDraft }>
								{ buttons.saveButton }
							</button>
						</div> }
						<div className={'col-auto mb-3'}>
							<button type="submit" className="btn publish-button" onClick={ publishPost }>
								{ buttons.publishButton }
							</button>
						</div>
					</div>
				</div>
			</div>
	)
}