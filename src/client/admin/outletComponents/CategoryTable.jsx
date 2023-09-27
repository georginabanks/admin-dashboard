import {useState} from "react";
import {DeleteData} from "../functions/PostData.jsx";

export default function CategoryTable({ categories, counter, setCounter }) {
	return (
			<table className={'table'}>
				<thead>
					<tr>
						<th scope={'col'}>Category</th>
						<th scope={'col'}>No. of Posts</th>
						<th scope={'col'}></th>
					</tr>
				</thead>
				<tbody>
				{ categories.map( c => {
					
					const [buttons, setButtons] = useState({ deleteButton: 'Delete' });
					
					const deleteRow = async ( event ) => {
						await DeleteData(event, setButtons, buttons,
								'posts/categories/' + c.postCategoryId, 'postCategoryId')
						setCounter( counter + 1 );
					}
					
					return (
							<tr key={ categories.indexOf(c) }>
								<td>{ c.postCategory }</td>
								<td>{ c.count }</td>
								<td><a className={'ul-link'} onClick={ deleteRow }>Delete</a></td>
							</tr>
					)
				})}
				</tbody>
			</table>
	)
}