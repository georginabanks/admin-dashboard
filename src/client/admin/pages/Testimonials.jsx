import { useEffect, useState } from "react";
import { getTestimonials } from "../../api";
import OutletHeader from "../outletComponents/OutletHeader.jsx";
import {DeleteData} from "../outletComponents/PostData.jsx";

function Row({ testimonial, select, setSelect, counter, setCounter }) {
	
	const [buttons, setButtons] = useState({ deleteButton: 'Delete' })
	
	// const changeSelect = (event) => {
	// 	let data = [...select];
	// 	const index = data.indexOf(String(testimonial.testimonialId));
	//
	// 	if (index > -1) {
	// 		data.splice(index, 1);
	// 	} else {
	// 		data = [...data, event.target.value]
	// 	}
	//
	// 	setSelect(data);
	// }
	
	const deleteRow = async ( event ) => {
		await DeleteData(event, setButtons, buttons, '/testimonials/' + testimonial.testimonialId,
				'testimonialId')
		setCounter( counter + 1 );
	}
	
	let comments = testimonial.testimonialContent;
	if (testimonial.testimonialContent.length > 150) { comments.slice(150) }
	
	return (
			<tr>
				{/*<td>*/}
				{/*	<div className="form-check" onChange={changeSelect}>*/}
				{/*		<input className="form-check-input" type="checkbox" value={testimonial.id} id={testimonial.id} />*/}
				{/*	</div>*/}
				{/*</td>*/}
				
				<td>{ testimonial.testimonialAuthor }</td>
				<td>{ comments + "..." }</td>
				<td>{ testimonial.pageTitle }</td>
				
				<td>
					<a href={`/testimonials/${ testimonial.testimonialId }/edit`}>Edit</a>
					&ensp;
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
	
	useEffect(() => {
		getTestimonials(limit).then( res => setTestimonials(res) );
	}, [ counter ])
	
	return (
			<div>
				<OutletHeader newLink={'/testimonials/new'} newText={'New Testimonial'} />
				
				{ testimonials.length > 0 && <table className={'table table-hover'}>
					<thead>
					<tr>
						{/*<th scope={'col'}></th>*/}
						<th scope={'col'}>Testimonial Author</th>
						<th scope={'col'}>Excerpt</th>
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
				
				{ testimonials.length === 0 && <p>There are no testimonials yet.</p> }
			</div>
	)
}