import EditPostForm from "../../outletComponents/EditPostForm.jsx";
import {useEffect, useState} from "react";
import PostData, {DeleteData} from "../../outletComponents/PostData.jsx";
import {Navigate, useParams} from "react-router-dom";
import {getPostById} from "../../../api.jsx";

export default function EditPost({ showDelete }) {
	
	const [post, setPost] = useState({ postId: 0 });
	const [counter, setCounter] = useState(0);
	const [quill, setQuill] = useState(post.content);
	const [buttons, setButtons] = useState({
		deleteButton: 'Delete',
		saveButton: 'Save Draft',
		publishButton: 'Publish'
	});
	
	const { postId } = useParams();
	if (postId !== undefined) {
		useEffect(() => {
			getPostById(postId).then( res => setPost(res) );
		}, [ counter ])
	}
	
	
	// Post Data
	
	const deletePost = async (event) => {
		await DeleteData(event, setButtons, buttons, '/posts/' + post.postId, 'postId');
	}
	
	const saveDraft = async ( event ) => {
		await PostData(event, setButtons, buttons, 'saveButton', 'Save Draft',
				'Saving...', 'Post Saved', 'posts/' + post.postId,
				{ ...post, content: quill, StatusStatusId: 1 }, 'postId', setPost
		);
	}
	
	const publishPost = async ( event ) => {
		await PostData( event, setButtons, buttons, 'publishButton', 'Publish',
				'Publishing...', 'Published', 'posts/' + post.postId,
				{ ...post, content: quill, StatusStatusId: 2, datePublished: new Date() }, 'postId', setPost
		);
	}
	
	return <EditPostForm post={ post } setPost={ setPost } deletePost={ deletePost } saveDraft={ saveDraft }
						 publishPost={ publishPost } buttons={ buttons } showDelete={ showDelete } backUrl={'/posts'}
						 quill={ quill } setQuill={ setQuill } counter={ counter } setCounter={ setCounter } />
}