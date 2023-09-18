import EditPostForm from "../outletComponents/EditPostForm.jsx";
import { useState } from "react";
import PostData from "../outletComponents/PostData.jsx";

export default function NewPost() {
	
	const [post, setPost] = useState({ postId: 0 });
	const [buttons, setButtons] = useState({
		saveButton: 'Save Draft',
		publishButton: 'Publish'
	});
	
	
	// Post Data
	
	const saveDraft = async ( event ) => {
		await PostData(event, setButtons, buttons, 'saveButton', 'Save Draft',
				'Saving...', 'Post Saved', 'posts/' + post.postId,
				{ ...post, StatusStatusId: 1 }, 'postId'
		);
	}
	
	const publishPost = async ( event ) => {
		await PostData( event, setButtons, buttons, 'publishButton', 'Publish',
				'Publishing...', 'Published', 'posts/' + post.postId,
				{ ...post, StatusStatusId: 2 }, 'postId'
		);
	}
	
	return <EditPostForm post={ post } setPost={ setPost } saveDraft={ saveDraft } publishPost={ publishPost }
						 buttons={ buttons } showDelete={ false } />
}