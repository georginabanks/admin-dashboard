import PostsTable from "../outletComponents/PostsTable";
import {useEffect, useState} from "react";
import { getPages } from "../../api.jsx";
import OutletHeader from "../outletComponents/OutletHeader.jsx";

export default function Pages() {
	
	const [pages, setPages] = useState([]);
	const [counter, setCounter] = useState(0);
	const [select, setSelect] = useState([]);
	const [limit, setLimit] = useState(10);
	const [query, setQuery] = useState('');
	
	useEffect(() => {
		getPages(limit, query).then( res => setPages(res) );
	}, [ counter, query ]);
	
	return (
			<div>
				<OutletHeader newLink={'/pages/new'} newText={'New Page'} query={ query } setQuery={ setQuery } />
				
				{ pages.length > 0 && <PostsTable posts={ pages } title={'Page'} select={ select } setSelect={ setSelect }
									   counter={ counter } setCounter={ setCounter } limit={ limit } setLimit={ setLimit } /> }
				
				{ pages.length >= 10 && <a onClick={ () => {
						setLimit( limit + 10 );
						setCounter( counter + 1 );
					}} className={'see-more-button'}><p>See more</p></a> }
				
				{ pages.length === 0 && <p>There are no pages yet.</p>}
			</div>
	)
}