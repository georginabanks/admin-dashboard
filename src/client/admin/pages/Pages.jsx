import PostsTable from "../outletComponents/PostsTable";
import {useEffect, useState} from "react";
import { getPages } from "../../api";

export default function Pages() {
	
	const [pages, setPages] = useState([]);
	const [counter, setCounter] = useState(0);
	
	useEffect(() => {
		setPages(getPages);
	}, [ counter ]);
	
	return (
			<div>
				<PostsTable posts={ pages } title={ 'Page' } />
			</div>
	)
}