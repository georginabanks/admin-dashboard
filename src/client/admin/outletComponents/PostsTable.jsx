import {DateString} from "./Datetime";
import {DeleteData} from "./PostData.jsx";
import {useState} from "react";

function Row({ post, counter, setCounter }) {
	
	const [buttons, setButtons] = useState({ deleteButton: 'Delete' });
	
	let url;
	let dataSuccess;
	if (post.postId !== undefined) {
		url = 'posts/' + post.postId ;
		dataSuccess = 'postId';
	} else if (post.pageId !== undefined) {
		url = 'pages/' + post.pageId;
		dataSuccess = 'pageId';
	}
	
	const deleteRow = async ( event ) => {
		await DeleteData(event, setButtons, buttons, url, dataSuccess)
		setCounter( counter + 1 );
	}
	
	return (
			<tr>
				<td>{ post.title }</td>
				<td>{ post.username }</td>
				<td>{ post.statusType }</td>
				<td>{ post.datePublished !== null && DateString(post.datePublished) }</td>
				
				<td>
					<a href={`/${url}/edit`}>Edit</a>
					&emsp; / &emsp;
					<a className={'ul-link'} onClick={ deleteRow }>Delete</a>
				</td>
			</tr>
	)
}

export default function PostsTable({ posts, title, counter, setCounter }) {
	return (
			<div>
				<table className={'table table-hover'}>
					<thead>
						<tr>
							<th scope={'col'}>{title} Title</th>
							<th scope={'col'}>Author</th>
							<th scope={'col'}>Status</th>
							<th scope={'col'}>Date Published</th>
							<th scope={'col'}></th>
						</tr>
					</thead>
					
					<tbody>
						{ posts.map( p => {
							return <Row post={p} key={ p.pageId || p.postId } counter={ counter } setCounter={ setCounter } />
						}) }
					</tbody>
				</table>
			</div>
	)
}