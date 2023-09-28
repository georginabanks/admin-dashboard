import PostsTable from "../outletComponents/PostsTable";
import {getPostCategories, getPosts} from "../api.jsx";
import { useState, useEffect } from "react";
import OutletHeader from "../outletComponents/OutletHeader.jsx";
import CategoryTable from "../outletComponents/CategoryTable.jsx";
import {useLocation} from "react-router-dom";

export default function Posts() {
	
	const location = useLocation();
	
	const [posts, setPosts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [counter, setCounter] = useState(0);
	const [select, setSelect] = useState([]);
	const [limit, setLimit] = useState(10);
	const [query, setQuery] = useState(location.state || '');
	
	useEffect(() => {
		getPosts(limit, query).then( res => setPosts(res) );
		getPostCategories().then( res => setCategories(res) );
		window.history.replaceState({}, document.title)
	}, [ counter, query ]);
	
	return (
			<div>
				<OutletHeader newLink={'/posts/new'} newText={'New Post'} query={ query } setQuery={ setQuery } />
				
				{ posts.length > 0
						&& <PostsTable posts={ posts } title={'Post'} select={ select } setSelect={ setSelect }
									   counter={ counter } setCounter={ setCounter } limit={ limit } setLimit={ setLimit }/> }
				
				{ posts.length >= 10 && <a onClick={ () => {
						setLimit( limit + 10 );
						setCounter( counter + 1 );
					}} className={'see-more-button'}><p>See more</p></a> }
				
				{ posts.length === 0 && <p>There are no posts yet.</p> }
				
				<h4>Post Categories</h4>
				
				{ categories.length > 0 && <CategoryTable categories={categories} counter={counter} setCounter={setCounter}/> }
				{ categories.length === 0 && <p>There are no categories yet.</p> }
			</div>
	)
}