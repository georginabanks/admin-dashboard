export default function CategoryTable({ categories }) {
	return (
			<table className={'table'}>
				<tbody>
				{ categories.map( c => {
					return (
							<tr key={ categories.indexOf(c) }>
								<td>{ c.postCategory }</td>
							</tr>
					)
				})}
				</tbody>
			</table>
	)
}