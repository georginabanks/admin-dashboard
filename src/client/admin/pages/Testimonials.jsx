import { useEffect, useState } from "react";
import { getTestimonials } from "../api.jsx";
import OutletHeader from "../outletComponents/OutletHeader.jsx";
import {DeleteData} from "../functions/PostData.jsx";

function Row({ testimonial, counter, setCounter }) {
	
	const [buttons, setButtons] = useState({ deleteButton: 'Delete' })
	
	const deleteRow = async ( event ) => {
		await DeleteData(event, setButtons, buttons, '/testimonials/' + testimonial.testimonialId,
				'testimonialId')
		setCounter( counter + 1 );
	}
	
	let comments = testimonial.testimonialContent;
	if (testimonial.testimonialContent.length > 180) { comments = comments.slice(0, 180) + '...' }
	
	return (
			<tr>
				<td>{ testimonial.testimonialAuthor }</td>
				<td className={'computer'}>{ comments }</td>
				<td>{ testimonial.title }</td>
				
				<td>
					<a href={`/admin/testimonials/${ testimonial.testimonialId }/edit`}>Edit</a>
					&ensp; / &ensp;
					<a className={'ul-link'} onClick={ deleteRow }>Delete</a>
				</td>
			</tr>
	)
}

export default function Testimonials() {
	
	const [testimonials, setTestimonials] = useState([]);
	const [counter, setCounter] = useState(0);
	const [select, setSelect] = useState([]);
	const [limit, setLimit] = useState(10);
	const [query, setQuery] = useState('');
	
	useEffect(() => {
		getTestimonials(limit, query).then( res => setTestimonials(res) );
	}, [ counter ])
	
	return (
			<div>
				<OutletHeader newLink={'/testimonials/new'} newText={'New Testimonial'} query={ query } setQuery={ setQuery } />
				
				{ testimonials.length > 0 && <table className={'table table-hover'}>
					<thead>
					<tr>
						<th scope={'col'}>Testimonial Author</th>
						<th scope={'col'} className={'computer'}>Excerpt</th>
						<th scope={'col'}>Page Assigned</th>
						<th scope={'col'}></th>
					</tr>
					</thead>
					
					<tbody>
					{testimonials.map(t => {
						return <Row testimonial={ t } key={ t.testimonialId } select={ select } setSelect={ setSelect }
									counter={ counter } setCounter={ setCounter } />
					})}
					</tbody>
				</table> }
				
				{ testimonials.length >= 10 && <a onClick={ () => {
						setLimit( limit + 10 );
						setCounter( counter + 1 );
					}} className={'see-more-button'}><p>See more</p></a> }
				
				{ testimonials.length === 0 && <p>There are no testimonials yet.</p> }
			</div>
	)
}