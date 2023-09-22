import PostsTable from "../outletComponents/PostsTable";
import {getPostCategories, getPosts} from "../../api";
import { useState, useEffect } from "react";
import OutletHeader from "../outletComponents/OutletHeader.jsx";
import CategoryTable from "../outletComponents/CategoryTable.jsx";

export default function Posts() {
	
	const [posts, setPosts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [counter, setCounter] = useState(0);
	const [select, setSelect] = useState([]);
	const [limit, setLimit] = useState(10);
	
	useEffect(() => {
		getPosts(limit).then( res => setPosts(res) );
		getPostCategories().then( res => setCategories(res) );
	}, [ counter ]);
	
	return (
			<div>
				<OutletHeader newLink={'/posts/new'} newText={'New Post'} />
				
				{ posts.length > 0
						&& <PostsTable posts={ posts } title={'Post'} select={ select } setSelect={ setSelect }
									   counter={ counter } setCounter={ setCounter } limit={ limit } setLimit={ setLimit }/> }
				
				{ posts.length === 0 && <p>There are no posts yet.</p> }
				
				<h4>Post Categories</h4>
				
				{ categories.length > 0 && <CategoryTable categories={categories} counter={counter} setCounter={setCounter}/> }
				{ categories.length === 0 && <p>There are no categories yet.</p> }
			</div>
	)
}