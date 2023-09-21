import EditHeader from "./EditHeader.jsx";
import {axiosConfig, HandleChange} from "./PostData.jsx";
import TextEditor from "./TextEditor.jsx";
import {useEffect, useState} from "react";
import {getPostCategories} from "../../api.jsx";
import axios from "axios";

export default function EditPostForm({ post, setPost, deletePost, saveDraft, publishPost, buttons, showDelete, backUrl,
										 quill, setQuill }) {
	
	// Post Categories
	
	const [cat, setCat] = useState([]);
	const [newCat, setNewCat] = useState('');
	const [catCount, setCatCount] = useState(0);
	
	useEffect(() => {
		getPostCategories().then( res => setCat( res) );
	}, [ catCount ])
	
	const addCategory = async ( event ) => {
		event.preventDefault();
		await axios.post('/api/admin/posts/categories', { postCategory: newCat },
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
								   placeholder="Slug" value={ post.slug || ''} onChange={ handleChange } />
						</div>
						<TextEditor value={ quill } setValue={ setQuill } />
					</div>
					
					<div className={'col-md-3'}>
						Featured Image
						
						{ post.postId !== undefined && <div className="card">
							<div className="card-body">
								<h5 className="card-title">Post Category</h5>
								
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
						</div> }
					</div>
				</div>
			</div>
	)
}