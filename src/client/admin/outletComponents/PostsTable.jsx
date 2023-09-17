import {DateString} from "./Datetime";
import {useState} from "react";

function Row({ post, select, setSelect }) {
	
	const changeSelect = (event) => {
		let data = [...select];
		const index = data.indexOf(String(post.id));
		
		if (index > -1) {
			data.splice(index, 1);
		} else {
			data = [...data, event.target.value]
		}
		
		setSelect(data);
	}
	
	return (
			<tr>
				<td>
					<div className="form-check" onChange={changeSelect}>
						<input className="form-check-input" type="checkbox" value={post.id} id={post.id} />
					</div>
				</td>
				
				<td>{ post.pageTitle || post.postTitle }</td>
				<td>{ post.username }</td>
				<td>{ post.status }</td>
				<td>{ DateString(post.datePublished) }</td>
			</tr>
	)
}

export default function PostsTable({ posts, title, select, setSelect }) {
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
						</tr>
					</thead>
					
					<tbody>
						{ posts.map( p => {
							return <Row post={p} key={ p.id } select={select} setSelect={setSelect} />
						}) }
					</tbody>
				</table>
			</div>
	)
}