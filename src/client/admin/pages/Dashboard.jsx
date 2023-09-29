import DashboardHeader from "../outletComponents/DashboardHeader.jsx";
import {useEffect, useState} from "react";
import {getAnalytics, getRecents} from "../api.jsx";
import { LineGraph } from "../functions/Graphs.jsx";

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
					
					 { recents.reverse().map( r => {
						 
						 let url;
						 if ( r.pageId !== undefined ) { url = 'pages'}
						 else if ( r.postId !== undefined ) { url = 'posts' }
						 else if ( r.testimonialId !== undefined ) { url = 'testimonials' }
						 
						 return (
								 <div key={ r.pageId || r.postId || r.testimonialId } className={'recent-box'}>
									 <div className={'row'}>
										 { r.featuredImage !== null && <div className={'col-2'}>
											 <div className={'square'}>
											 <img src={'/uploads/' + r.filename} alt={r.alt} className={'round-image'} />
											 </div>
										 </div>}
										 <div className={'col-10'}>
											 <a href={ `/admin/${url}/${r.pageId || r.postId || r.testimonialId}/edit` }>
												 { r.title.slice(0, 23) + '...' || r.testimonialAuthor }
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

function AnalyticsGraph({ analytics }) {
	return (
			<div className={'analytics-overview'}>
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">Overview</h5>
						<div className={'analytics-line-graph'}>
							<LineGraph chartData={ analytics } plugins={{}} />
						</div>
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
		// getAnalytics().then( res => {
		// 	let views = [];
		//
		// 	res.map(a => {
		// 		views.push(
		// 			{
		// 				id: res.indexOf(a),
		// 				day: a[0],
		// 				views: a[1]
		// 			}
		// 		)
		// 	})
		//
		// 	console.log( views );
		// 	const chartData = {
		// 		labels: views.map((data) => data.day),
		// 		datasets: [
		// 			{
		// 				data: views.map((data) => data.day),
		// 				borderColor: '#624F81',
		// 				borderWidth: 1
		// 			}
		// 		]
		// 	}
		//
		// 	console.log( chartData );
		// 	setAnalytics( chartData );
		// })
	}, []);
	
	
	if ( recents.posts !== undefined || recents.pages !== undefined || recents.testimonials !== undefined) {
		return (
				<div className={'dashboard'}>
					<DashboardHeader cookies={ cookies } />
					
					<div className={'row gy-3'}>
						{ recents.posts.length > 0 && <div className={'col-md-6 col-xl-4'}>
							<RecentCard cardTitle={'Recent Posts'} recents={recents.posts} seeAllLink={'posts'}/>
						</div> }
						
						{ recents.pages.length > 0 && <div className={'col-md-6 col-xl-4'}>
							<RecentCard cardTitle={'Recent Pages'} recents={recents.pages} seeAllLink={'pages'}/>
						</div> }
						
						{ recents.testimonials.length > 0 && <div className={'col-md-6 col-xl-4'}>
							<RecentCard cardTitle={'Recent Testimonials'} recents={recents.testimonials} seeAllLink={'testimonials'}/>
						</div> }
						
						{ analytics.datasets && <div className={'col-12 col-md-6'}>
							<AnalyticsGraph analytics={ analytics } />
						</div> }
					</div>
				</div>
		)
	}
}