import EditPostForm from "../outletComponents/EditPostForm.jsx";
import { useState } from "react";

export default function NewPost() {
	const [post, setPost] = useState({ postId: 0 });
	return <EditPostForm post={post} setPost={setPost} />
}