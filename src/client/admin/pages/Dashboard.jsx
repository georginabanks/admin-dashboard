import DashboardHeader from "../outletComponents/DashboardHeader.jsx";
import {useEffect, useState} from "react";
import {getRecents} from "../../api.jsx";

function RecentCard({ cardTitle, recents, seeAllLink }) {
 return (
		 <div className={'recent-card'}>
			 <div className="card">
				 <div className="card-body">
					 <div className={'row justify-content-between'}>
						 <div className={'col-auto'}>
							 <h5 className="card-title">{ cardTitle }</h5>
						 </div>
						 <div className={'col-auto'}>
							 <a href={ seeAllLink} className={'card-title'}>See All</a>
						 </div>
					 </div>
					 <hr />
					
					 { recents.map( r => {
						 return (
								 <div key={ r.pageId || r.postId || r.testimonialId } className={'recent-box'}>
									 <a href={ r.slug }>{ r.title || r.testimonialAuthor }</a>
								 </div>
						 )
					 }) }
				 </div>
			 </div>
		 </div>
 )
}

export default function Dashboard() {
	
	const [recents, setRecents] = useState({});
	
	useEffect(() => {
		getRecents().then( res => setRecents(res) );
	}, []);
	
	if ( recents.posts !== undefined || recents.pages !== undefined || recents.testimonials !== undefined) {
		return (
				<div>
					<DashboardHeader/>
					
					<div className={'row'}>
						{recents.posts.length > 0 && <div className={'col-md-4'}>
							<RecentCard cardTitle={'Recent Posts'} recents={recents.posts}/>
						</div>}
						
						{recents.pages.length > 0 && <div className={'col-md-4'}>
							<RecentCard cardTitle={'Recent Pages'} recents={recents.pages}/>
						</div>}
						
						{recents.testimonials.length > 0 && <div className={'col-md-4'}>
							<RecentCard cardTitle={'Recent Testimonials'} recents={recents.testimonials}/>
						</div>}
					</div>
				</div>
		)
	}
}