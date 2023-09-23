import PostsTable from "../outletComponents/PostsTable";
import {useEffect, useState} from "react";
import { getPages } from "../../api";
import OutletHeader from "../outletComponents/OutletHeader.jsx";

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
				<OutletHeader newLink={'/pages/new'} newText={'New Page'} />
				
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