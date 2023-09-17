import Help from "./Help";
import Logout from "./Logout";

function CreateNav(props) {
	return (
			<a href={ props.link } className={'nav-link'} key={ props.id }>
				<div className={'row'}>
					<div className={'col-2'}>
						{ props.icon }
					</div>
					<div className={'col-6'}>
						{ props.name }
					</div>
				</div>
			</a>
	)
}


// Sidebar Components

function Logo() {
	return (
			<div className={'row logo'}>
				<div className={'col-3'}>
					<img src={'./public/uploads/spacey_logo.png'} alt={'logo'} />
				</div>
				<div className={'col-9'}>
					<h5>Company Name</h5>
					Admin Dashboard
				</div>
			</div>
	)
}

function PrimaryNavigation() {
	
	const primaryNav = [
		{
			id: 1,
			name: 'Dashboard',
			icon: <i className="fa-solid fa-house"></i>,
			link: '/'
		},
		{
			id: 2,
			name: 'Pages',
			icon: <i className="fa-solid fa-folder-open"></i>,
			link: '/pages'
		},
		{
			id: 3,
			name: 'Posts',
			icon: <i className="fa-solid fa-file-lines"></i>,
			link: '/posts'
		},
		{
			id: 4,
			name: 'Images',
			icon: <i className="fa-solid fa-camera"></i>,
			link: '/images'
		}
	]
	
	return primaryNav.map(CreateNav)
}

function SecondaryNavigation() {
	
	const secondaryNav = [
		{
			id: 5,
			name: 'Settings',
			icon: <i className="fa-solid fa-gear"></i>,
			link: '/settings'
		},
		{
			id: 6,
			name: 'Logout',
			icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
			link: <Logout />
		},
		{
			id: 7,
			name: 'Help',
			icon: <i className="fa-solid fa-circle-question"></i>,
			link: <Help />
		}
	]
	
	return secondaryNav.map(CreateNav)
}

export default function DashboardSidebar() {
	return (
			<div className={'sidebar d-flex align-items-start flex-column mb-3 nav-menu'}>
				<div className={'mb-lg-auto'}>
					<Logo />
					<PrimaryNavigation />
				</div>
				
				<SecondaryNavigation />
			</div>
	)
}