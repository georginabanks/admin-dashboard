import PostsTable from "../outletComponents/PostsTable";
import { getPosts } from "../../api";
import { useState, useEffect } from "react";

export default function Posts() {
	
	const [posts, setPosts] = useState([]);
	const [counter, setCounter] = useState(0);
	const [select, setSelect] = useState([]);
	const [limit, setLimit] = useState(10);
	
	useEffect(() => {
		getPosts(limit).then( res => setPosts(res) );
	}, [ counter ]);
	
	return (
			<div>
				{ posts.length > 0
						&& <PostsTable posts={posts} title={'Post'} select={select} setSelect={setSelect}/> }
				
				{ posts.length === 0 && <p>There are no posts yet.</p> }
			</div>
	)
}