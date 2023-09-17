import PostsTable from "../outletComponents/PostsTable";
import {useEffect, useState} from "react";
import { getPages } from "../../api";

export default function Pages() {
	
	const [pages, setPages] = useState([]);
	const [counter, setCounter] = useState(0);
	const [select, setSelect] = useState([]);
	const [limit, setLimit] = useState(10);
	
	useEffect(() => {
		getPages(limit).then( res => setPages(res) );
	}, [ counter ]);
	
	return (
			<div>
				{ pages.length > 0
						&& <PostsTable posts={pages} title={'Page'} select={select} setSelect={setSelect}/> }
				
				{ pages.length === 0 && <p>There are no pages yet.</p>}
			</div>
	)
}