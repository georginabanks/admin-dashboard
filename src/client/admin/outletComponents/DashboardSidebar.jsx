import { companyName } from "../variables.jsx";

function CreateNav({ link, id, icon, name }) {
	return (
			<a href={ '/admin' + link } className={'nav-link'} key={ id }>
				<div className={'row'}>
					<div className={'col-2'}>
						{ icon }
					</div>
					<div className={'col-8'}>
						{ name }
					</div>
				</div>
			</a>
	)
}


// Sidebar Components

function Logo() {
	return (
			<div className={'row logo'}>
				<div className={'col-3 col-md-4'}>
					<div className={'square'}>
						<img src={'/uploads/logo.png'} alt={'logo'} className={'round-image'} />
					</div>
				</div>
				<div className={'col-9 col-md-8'}>
					<h5>{ companyName }</h5>
					Admin Dashboard
				</div>
			</div>
	)
}

function PrimaryNavigation({ cookies }) {
	
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
		},
		{
			id: 5,
			name: 'Testimonials',
			icon: <i className="fa-solid fa-comment-dots"></i>,
			link: '/testimonials'
		},
		{
			id: 6,
			name: 'Users',
			icon: <i className="fa-solid fa-user"></i>,
			link: '/users'
		}
	]
	
	if ( cookies.permission === 'admin' ) {
		return primaryNav.map(n => <CreateNav name={n.name} link={n.link} id={n.id} icon={n.icon} key={n.id}/>)
	} else {
		return primaryNav.slice(0, -1)
				.map( n => <CreateNav name={ n.name } link={ n.link } id={ n.id } icon={ n.icon } key={ n.id } /> )
	}
}

function SecondaryNavigation({ logout }) {
	
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
			icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>
		},
		{
			id: 7,
			name: 'Help',
			icon: <i className="fa-solid fa-circle-question"></i>,
			link: 'mailto:hello@georginabanks.com'
		}
	]
	
	return (
			<div>
				<CreateNav name={ secondaryNav[0].name } link={ secondaryNav[0].link } id={ secondaryNav[0].id }
						   icon={ secondaryNav[0].icon } />
				
				<a onClick={ logout } className={'nav-link'}>
					<div className={'row'} onClick={ logout }>
						<div className={'col-2'}>
							{ secondaryNav[1].icon }
						</div>
						<div className={'col-8'}>
							{ secondaryNav[1].name }
						</div>
					</div>
				</a>
				
				<CreateNav name={ secondaryNav[2].name } link={ secondaryNav[2].link } id={ secondaryNav[2].id }
						   icon={ secondaryNav[2].icon } />
			</div>
	)
}

export default function DashboardSidebar({ logout, cookies }) {
	return (
			<div className={'sidebar d-flex align-items-start flex-column mb-3 nav-menu'}>
				<div className={'mb-lg-auto'}>
					<Logo />
					<PrimaryNavigation cookies={ cookies } />
				</div>
				
				<SecondaryNavigation logout={ logout } />
			</div>
	)
}