import {DateString} from "./Datetime";
import {DeleteData} from "./PostData.jsx";
import {useState} from "react";

function Row({ post, select, setSelect, pageName, counter, setCounter }) {
	
	const [buttons, setButtons] = useState({ deleteButton: 'Delete' });
	
	let url;
	let dataSuccess;
	if (post.postId !== 'undefined') {
		url = 'posts/' + post.postId ;
		dataSuccess = 'postId';
	} else if (post.pageId !== 'undefined') {
		url = 'pages/' + post.pageId;
		dataSuccess = 'pageId';
	}
	
	const changeSelect = ( event ) => {
		let data = [...select];
		const index = data.indexOf(String(post.postId || post.pageId));
		
		if (index > -1) {
			data.splice(index, 1);
		} else {
			data = [...data, event.target.value]
		}
		
		setSelect(data);
	}
	
	const deleteRow = async ( event ) => {
		await DeleteData(event, setButtons, buttons, url, dataSuccess)
		setCounter( counter + 1 );
	}
	
	return (
			<tr>
				<td>
					<div className="form-check" onChange={changeSelect}>
						<input className="form-check-input" type="checkbox" value={ post.pageId || post.postId }
							   id={ post.pageId || post.postId } />
					</div>
				</td>
				
				<td>{ post.title }</td>
				<td>{ post.username }</td>
				<td>{ post.status }</td>
				<td>{ DateString(post.datePublished) }</td>
				
				<td>
					<a href={`/${url}/edit`}>Edit</a>
					&ensp;
					<a className={'ul-link'} onClick={ deleteRow }>Delete</a>
				</td>
			</tr>
	)
}

export default function PostsTable({ posts, title, select, setSelect, counter, setCounter }) {
	return (
			<div>
				<table className={'table table-hover'}>
					<thead>
						<tr>
							<th scope={'col'}></th>
							<th scope={'col'}>{title} Title</th>
							<th scope={'col'}>Author</th>
							<th scope={'col'}>Status</th>
							<th scope={'col'}>Date Published</th>
							<th scope={'col'}></th>
						</tr>
					</thead>
					
					<tbody>
						{ posts.map( p => {
							return <Row post={p} key={ p.pageId || p.postId } select={select} setSelect={setSelect}
										counter={ counter } setCounter={ setCounter } />
						}) }
					</tbody>
				</table>
			</div>
	)
}