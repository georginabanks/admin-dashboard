import DashboardHeader from "../outletComponents/DashboardHeader.jsx";
import {useEffect, useState} from "react";
import {getAnalytics, getRecents} from "../../api.jsx";
import {LineGraph} from "../functions/Graphs.jsx";

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
						 
						 let url;
						 if ( r.pageId !== undefined ) { url = 'pages'}
						 else if ( r.postId !== undefined ) { url = 'posts' }
						 else if ( r.testimonialId !== undefined ) { url = 'testimonials' }
						 
						 return (
								 <div key={ r.pageId || r.postId || r.testimonialId } className={'recent-box'}>
									 <div className={'row'}>
										 { r.featuredImage !== null && <div className={'col-3'}>
											 <div className={'square'}>
											 <img src={'/uploads/' + r.filename} alt={r.alt} className={'round-image'} />
											 </div>
										 </div>}
										 <div className={'col-auto'}>
											 <a href={ `/${url}/${r.pageId || r.postId || r.testimonialId}/edit` }>
												 { r.title || r.testimonialAuthor }
											 </a>
										 </div>
									 </div>
								 </div>
						 )
					 }) }
				 </div>
			 </div>
		 </div>
 )
}

export default function Dashboard({ cookies }) {
	
	const [recents, setRecents] = useState({});
	const [analytics, setAnalytics] = useState({});
	
	useEffect(() => {
		getRecents().then( res => setRecents(res) );
		getAnalytics().then( res => console.log(res) );
	}, []);
	
	const data = {
        labels: ['Red', 'Orange', 'Blue'],
        datasets: [
            {
              label: 'Popularity of colours',
              data: [55, 23, 96],
              backgroundColor: [
                'rgba(255, 255, 255, 0.6)',
                'rgba(255, 255, 255, 0.6)',
                'rgba(255, 255, 255, 0.6)'
              ],
              borderWidth: 1,
            }
        ]
}
	
	if ( recents.posts !== undefined || recents.pages !== undefined || recents.testimonials !== undefined) {
		return (
				<div>
					<DashboardHeader cookies={ cookies } />
					
					<div className={'row'}>
						{recents.posts.length > 0 && <div className={'col-md-4'}>
							<RecentCard cardTitle={'Recent Posts'} recents={recents.posts} seeAllLink={'posts'}/>
						</div>}
						
						{recents.pages.length > 0 && <div className={'col-md-4'}>
							<RecentCard cardTitle={'Recent Pages'} recents={recents.pages} seeAllLink={'pages'}/>
						</div>}
						
						{recents.testimonials.length > 0 && <div className={'col-md-4'}>
							<RecentCard cardTitle={'Recent Testimonials'} recents={recents.testimonials} seeAllLink={'testimonials'}/>
						</div>}
						
						<div className={'analytic-line-graph'}>
							<LineGraph chartData={ data } plugins={{}} />
						</div>
					</div>
				</div>
		)
	}
}