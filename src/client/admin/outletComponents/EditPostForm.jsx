import EditHeader from "./EditHeader.jsx";
import {axiosConfig, HandleChange} from "../functions/PostData.jsx";
import TextEditor from "./TextEditor.jsx";
import {useEffect, useState} from "react";
import {getPostCategories} from "../api.jsx";
import axios from "axios";
import SelectImage from "./SelectImage.jsx";

function Schedule({ post, handleChange }) {
	return (
			<div>
				<h5 style={{ paddingTop: '0.5rem' }}>Schedule</h5>
				
				<div className={'input-group'}>
					<input type="text" className="form-control" id="date" name={'date'}
						   placeholder="dd" onChange={ handleChange } value={ post.date || '' } />
					<input type="text" className="form-control" id="month" name={'month'}
						   placeholder="mm" onChange={ handleChange } value={ post.month || '' } />
					<input type="text" className="form-control" id="year" name={'year'}
						   placeholder="yyyy" onChange={ handleChange } value={ post.year || '' } />
				</div>
			</div>
	)
}

function FeaturedImage({ post, setFeaturedImage }) {
	return (
			<div>
				<h5>Featured Image</h5>
				
				<div className="card">
					<div className="card-body text-center">
						{ post.filename !== null && post.featuredImage !== undefined && <div>
							<img src={ '/uploads/' + post.filename } className="card-img-top" alt={ post.alt } />
							<hr />
						</div> }
						
						<a data-bs-toggle="modal" data-bs-target="#featuredImage">
							<i className="fa-solid fa-upload"></i> &emsp; Select Image
						</a>
					</div>
				</div>
				
				<SelectImage setFeaturedImage={ setFeaturedImage } modalTitle={'Featured Image'} />
			</div>
	)
}

function EditPostCategory({ handleChange, cat, addCategory, setNewCat }) {
	return (
			<div>
				<h5>Post Category</h5>
				
				<div className={'mb-3'}>
					<select className="form-select" aria-label="select post category" name={'postCategory'}
							onChange={handleChange}>
						<option defaultValue={null}>Select Category</option>
						{cat.length > 0 && cat.map( c => {
							return <option value={c.postCategory} key={ cat.indexOf(c) }>
								{c.postCategory}
							</option>
						})}
					</select>
				</div>
				
				<form className="input-group mb-3" onSubmit={ addCategory }>
					<input type="text" className="form-control add-category" id="addCategory"
						   placeholder="Add Category"
						   onChange={ e => setNewCat(e.target.value) } />
					<button type={"submit"} className={'btn category-btn'}>+</button>
				</form>
			</div>
	)
}

export default function EditPostForm({ post, setPost, deletePost, saveDraft, publishPost, buttons, showDelete, backUrl,
										 quill, setQuill }) {
	
	// Featured Image
	
	const setFeaturedImage = ( selected, setSelected ) => {
		setPost({ ...post, ...selected, featuredImage: selected.imageId })
		setSelected({});
	}
	
	// Post Categories
	
	const [cat, setCat] = useState([]);
	const [newCat, setNewCat] = useState('');
	const [catCount, setCatCount] = useState(0);
	
	useEffect(() => {
		getPostCategories().then( res => setCat( res) );
	}, [ catCount ])
	
	const addCategory = async ( event ) => {
		event.preventDefault();
		await axios.post('/api/posts/categories', { postCategory: newCat },
				axiosConfig);
		setCatCount(catCount + 1);
		setNewCat('');
	}
	
	
	// Handle Change
	
	const handleChange = ( event ) => {
		HandleChange( event, { ...post, postCategory: newCat }, setPost )
	}
	
	
	return (
			<div>
				<EditHeader backUrl={ backUrl } deletePost={ deletePost } saveDraft={ saveDraft } publishPost={ publishPost }
							buttons={ buttons } showDelete={ showDelete } />
				
				<div className={'row'}>
					<div className={'col-md-9'}>
						<div className="mb-3">
							<input type="text" className="form-control form-control-lg" name='title' id="title"
								   placeholder="Title" value={ post.title || '' } onChange={ handleChange } />
						</div>
						<div className="mb-3">
							<input type="text" className="form-control" name='slug' id="slug"
								   placeholder="Slug" value={ post.slug || '' } onChange={ handleChange } />
						</div>
						<TextEditor value={ quill } setValue={ setQuill } />
					</div>
					
					<div className={'col-md-3 edit-sidebar'}>
						<Schedule post={ post } handleChange={ handleChange } />
						
						<FeaturedImage post={ post } setFeaturedImage={ setFeaturedImage } />
						
						{ post.postId !== undefined && <EditPostCategory handleChange={ handleChange } cat={ cat }
																		 addCategory={ addCategory } setNewCat={ setNewCat } /> }
					</div>
				</div>
			</div>
	)
}