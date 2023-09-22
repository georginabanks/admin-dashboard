import OutletHeader from "../outletComponents/OutletHeader.jsx";
import {useEffect, useState} from "react";
import ImageGrid from "../outletComponents/ImageGrid.jsx";
import {getImages} from "../../api.jsx";

export default function Images() {
	
	const [images, setImages] = useState([]);
	const [limit, setLimit] = useState(16);
	const [counter, setCounter] = useState(0);
	
	useEffect(() => {
		getImages( limit ).then( res => setImages(res) );
	}, [ counter ]);
	
	return (
			<div>
				<OutletHeader newLink={'/images/upload'} newText={'Upload Image'} />
				{ images.length > 0 && <ImageGrid images={ images } counter={ counter } setCounter={ setCounter } /> }
			</div>
	)
}