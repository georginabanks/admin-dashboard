export default function DashboardHeader({ cookies }) {
	
	let greeting = cookies.username;
	if ( cookies.name !== null ) { greeting = cookies.name }
	
	return (
			<div className={'outlet-header'}>
				Hello, { greeting }!
			</div>
	)
}