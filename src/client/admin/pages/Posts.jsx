import PostsTable from "../outletComponents/PostsTable";
import { getPosts } from "../../api";
import { useState, useEffect } from "react";

export default function Posts() {
	
	const [posts, setPosts] = useState([]);
	const [counter, setCounter] = useState(0);
	const [select, setSelect] = useState([]);
	
	useEffect(() => {
		setPosts(getPosts);
	}, [ counter ]);
	
	return (
			<div>
				<PostsTable posts={ posts } title={ 'Post' } select={select} setSelect={setSelect} />
			</div>
	)
}