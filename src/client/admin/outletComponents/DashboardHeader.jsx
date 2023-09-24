export default function DashboardHeader({ cookies }) {
	console.log(cookies)
	let greeting = cookies.username;
	if ( cookies.name !== null ) { greeting = cookies.name }
	
	return (
			<div className={'outlet-header'}>
				<div className={'row'}>
					<div className={'greeting'}>
						<div className={'row'}>
							<div className={'col-3'}>
								<div className={'square'}>
									<img src={ cookies.filename !== null ? '/uploads/' + cookies.filename : '/uploads/default.jpeg' }
										 alt={ cookies.alt } className={'round-image'} />
								</div>
							</div>
							
							<div className={'col-auto'}>
								<h6 className={'greeting-text'}>Hello, { greeting }!</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
	)
}