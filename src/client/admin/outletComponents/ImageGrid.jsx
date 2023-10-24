import {DeleteData} from "../functions/PostData.jsx";
import {useState} from "react";

export default function ImageGrid({ images, counter, setCounter }) {
	return (
			<div className={'row gy-3 image-grid'}>
				{ images.map( img => {
					
					const [buttons, setButtons] = useState({ deleteButton: 'Delete' });
					
					const deleteImg = async ( event ) => {
						await DeleteData(event, setButtons, buttons, 'images/' + img.imageId,
								'imageId')
						setCounter( counter + 1 );
					}
					
					return (
							<div className={'col-6 col-md-3 col-xl-2'} key={ img.imageId }>
								<div className={'thumbnail-image'}>
									<img src={ '/uploads/' + img.filename } alt={ img.alt } />
									<div className={'overlay'}>
										<a href={`/admin/images/${img.imageId}/edit`}>
											<i className="fa-solid fa-pencil"></i>
										</a>
										<a onClick={ deleteImg } >
											<i className="fa-solid fa-trash"></i>
										</a>
									</div>
								</div>
							</div>
					)
				}) }
			</div>
	)
}