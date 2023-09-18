import PostsTable from "../outletComponents/PostsTable";
import { getPosts } from "../../api";
import { useState, useEffect } from "react";
import OutletHeader from "../outletComponents/OutletHeader.jsx";

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
				<OutletHeader newLink={'/posts/new'} newText={'New Post'} />
				
				{ posts.length > 0
						&& <PostsTable posts={ posts } title={'Post'} select={ select } setSelect={ setSelect }
									   counter={ counter } setCounter={ setCounter } limit={ limit } setLimit={ setLimit }/> }
				
				{ posts.length === 0 && <p>There are no posts yet.</p> }
			</div>
	)
}