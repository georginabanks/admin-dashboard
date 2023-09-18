import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getPostById} from "../../api.jsx";
import EditPostForm from "../outletComponents/EditPostForm.jsx";

export default function EditPost() {
	
	const [post, setPost] = useState({});
	const { postId } = useParams();
	
	useEffect(() => {
		getPostById( postId ).then( res => setPost(res) );
	}, []);
	
	return <EditPostForm post={ post } setPost={ setPost } />
}