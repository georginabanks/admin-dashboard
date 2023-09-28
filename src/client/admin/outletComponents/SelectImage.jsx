import {useEffect, useState} from "react";
import {getImages} from "../api.jsx";

function Grid({ images, selected, setSelected }) {
	return (
			<div className={'row gy-3 image-grid'} key={'imageGrid'}>
				{ images.map( img => {
					if ( img.imageId === selected.imageId ) {
						return (
								<div className={'col-md-3'} key={img.imageId}>
									<div className={'thumbnail-image'}>
										<img src={'/uploads/' + img.filename} alt={img.alt} />
										<div className={'selected-overlay'}>
											<i className="fa-solid fa-square-check fa-xl"></i>
										</div>
									</div>
								</div>
						)
					} else {
						return (
								<div className={'col-md-3'} key={img.imageId}>
									<div className={'thumbnail-image'}>
										<img src={'/uploads/' + img.filename} alt={img.alt} />
										<div className={'select-overlay'} onClick={() => setSelected(img)}>
											<i className="fa-regular fa-square-check fa-xl"></i>
										</div>
									</div>
								</div>
						)
					}
				})}
			</div>
	)
}

export default function SelectImage({ setFeaturedImage, modalTitle }) {
	
	const [images, setImages] = useState([]);
	const [selected, setSelected] = useState({});
	
	useEffect(() => {
		getImages().then( res => setImages(res) );
	}, []);
	
	return (
			<div className="modal" tabIndex="-1" id={'featuredImage'}>
				<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">{ modalTitle }</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal"
									aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<Grid selected={ selected } setSelected={ setSelected } images={ images } />
						</div>
						<div className="modal-footer">
							<button type="button" className="btn save-button" data-bs-dismiss="modal">Close</button>
							<button type="button" className="btn publish-button" data-bs-dismiss="modal"
									onClick={ () => setFeaturedImage( selected, setSelected ) }>
								Select
							</button>
						</div>
					</div>
				</div>
			</div>
	)
}