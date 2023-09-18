export default function EditHeader({ deletePost, saveDraft, publishPost, backUrl, buttons, showDelete }) {
	return (
			<div className={'row justify-content-between'}>
				<div className={'col-auto'}>
					<a href={ backUrl }><i className="fa-solid fa-arrow-left fa-2xl"></i></a>
				</div>
				
				<div className={'col-auto'}>
					<div className={'row edit-buttons'}>
						{ showDelete === true && <div className={'col-auto mb-3'}>
							<button type="submit" className="btn delete-button" onClick={ deletePost }>
								{ buttons.deleteButton }
							</button>
						</div>}
						<div className={'col-auto mb-3'}>
							<button type="submit" className="btn save-button" onClick={ saveDraft }>
								{ buttons.saveButton }
							</button>
						</div>
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