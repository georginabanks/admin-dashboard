import PostsTable from "../outletComponents/PostsTable";
import {useEffect, useState} from "react";
import { getPages } from "../../api";

export default function Pages() {
	
	const [pages, setPages] = useState([]);
	const [counter, setCounter] = useState(0);
	const [select, setSelect] = useState([]);
	
	useEffect(() => {
		setPages(getPages);
	}, [ counter ]);
	
	return (
			<div>
				<PostsTable posts={ pages } title={ 'Page' } select={select} setSelect={setSelect} />
			</div>
	)
}