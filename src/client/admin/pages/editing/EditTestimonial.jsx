import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getPages, getTestimonialById} from "../../api.jsx";
import PostData, {DeleteData, HandleChange} from "../../functions/PostData.jsx";
import EditHeader from "../../outletComponents/EditHeader.jsx";

export default function EditTestimonial() {
	
	const [testimonial, setTestimonial] = useState({ testimonialId: 0 });
	const navigate = useNavigate();
	const [buttons, setButtons] = useState({
		deleteButton: 'Delete',
		saveButton: 'Save Draft',
		publishButton: 'Publish'
	});
	const [pages, setPages] = useState([]);
	
	useEffect(() => {
		getPages().then( res => setPages(res) );
	}, []);
	
	const { testimonialId } = useParams();
	let showDelete = false;
	if (testimonialId !== undefined) {
		useEffect(() => {
			getTestimonialById(testimonialId).then( res => setTestimonial(res) );
		}, []);
		showDelete = true;
	}
	
	
	// Handle Change
	
	const handleChange = ( event ) => {
		HandleChange( event, testimonial, setTestimonial )
	}
	
	
	// Post Data
	
	const deletePost = async (event) => {
		await DeleteData(event, setButtons, buttons, '/testimonials/' + testimonial.testimonialId,
				'testimonialId');
		navigate('/testimonials')
	}
	
	const saveDraft = async ( event ) => {
		await PostData(event, setButtons, buttons, 'saveButton', 'Save Draft',
				'Saving...', 'Saved', 'testimonials/' + testimonial.testimonialId,
				{ ...testimonial, StatusStatusId: 1 }, 'testimonialId', setTestimonial
		);
	}
	
	const publishPost = async ( event ) => {
		await PostData( event, setButtons, buttons, 'publishButton', 'Publish',
				'Publishing...', 'Published', 'testimonials/' + testimonial.testimonialId,
				{ ...testimonial, StatusStatusId: 2 }, 'testimonialId', setTestimonial
		);
	}
	
	return (
			<div>
				<EditHeader backUrl={ '/testimonials' } deletePost={ deletePost } saveDraft={ saveDraft }
							publishPost={ publishPost } buttons={ buttons } showDelete={ showDelete } />
				
				<div className="mb-3">
					<textarea className="form-control" name='testimonialContent' id="testimonialContent" rows="10"
							  value={ testimonial.testimonialContent || '' } onChange={ handleChange }></textarea>
				</div>
				<div className="mb-3">
					<input type="text" className="form-control" name='testimonialAuthor' id="testimonialAuthor"
						   placeholder="Author" value={ testimonial.testimonialAuthor || '' } onChange={ handleChange } />
				</div>
				<div className="mb-3">
					<input type="text" className="form-control" name='testimonialBio' id="testimonialBio"
						   placeholder="Bio" value={ testimonial.testimonialBio || ''} onChange={ handleChange } />
				</div>
				
				<select className="form-select" aria-label="Select page" name={'PagePageId'} onChange={ handleChange }>
					<option>Assign to page</option>
					{ pages.map( page => {
						return <option value={page.pageId} key={page.pageId}>{page.title}</option>
					})}
				</select>
			</div>
	)
}