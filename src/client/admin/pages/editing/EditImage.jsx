import EditHeader from "../../outletComponents/EditHeader.jsx";
import PostData, {DeleteData, HandleChange} from "../../functions/PostData.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getImageById} from "../../../api.jsx";

export default function EditImage() {
	
	const [image, setImage] = useState({});
	const [buttons, setButtons] = useState({
		deleteButton: 'Delete',
		publishButton: 'Publish'
	});
	
	const { imageId } = useParams();
	useEffect(() => {
		getImageById( imageId ).then( res => setImage( res ) );
	}, []);
	
	
	// Handle Change
	
	const handleChange = ( event ) => {
		HandleChange( event, image, setImage );
	}
	
	
	// Post Data
	
	const deleteImg = async (event) => {
		await DeleteData(event, setButtons, buttons, '/images/' + image.imageId, 'imageId');
	}
	
	const saveImg = async ( event ) => {
		await PostData(event, setButtons, buttons, 'publishButton', 'Save Image',
				'Saving...', 'Image Saved', 'images/' + image.imageId,
				image, 'imageId', setImage
		);
	}
	
	return (
			<div>
				<EditHeader deletePost={ deleteImg } publishPost={ saveImg } backUrl={'/images'}
							buttons={ buttons } showDelete={ true } showSave={ false } />
				
				<div className={'row'}>
					<div className={'col-md-8'}>
						<img src={'/uploads/' + image.filename } alt={ image.alt } />
					</div>
					
					<div className={'col-md-4'}>
						<div className="mb-3">
							<input type="text" className="form-control" id="filename" name={'filename'} placeholder="Filename"
								   value={ image.filename } onChange={ handleChange } />
						</div>
						
						<div className="mb-3">
							<input type="text" className="form-control" id="alt" name={'alt'} placeholder="Alt"
								   value={ image.alt } onChange={ handleChange } />
						</div>
					</div>
				</div>
			</div>
	)
}