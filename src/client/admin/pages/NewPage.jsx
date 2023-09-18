import PostData from "../outletComponents/PostData.jsx";
import {useState} from "react";
import EditPostForm from "../outletComponents/EditPostForm.jsx";

export default function NewPage() {
	
	const [page, setPage] = useState({ pageId: 0 });
	const [buttons, setButtons] = useState({
		saveButton: 'Save Draft',
		publishButton: 'Publish'
	});
	
	
	// Post Data
	
	const saveDraft = async ( event ) => {
		console.log(page)
		await PostData(event, setButtons, buttons, 'saveButton', 'Save Draft',
				'Saving...', 'Page Saved', 'pages/' + page.pageId,
				{ ...page, StatusStatusId: 1 }, 'pageId'
		);
	}
	
	const publishPost = async ( event ) => {
		await PostData( event, setButtons, buttons, 'publishButton', 'Publish',
				'Publishing...', 'Published', 'pages/' + page.pageId,
				{ ...page, StatusStatusId: 2 }, 'pageId'
		);
	}
	
	return <EditPostForm post={ page } setPost={ setPage } saveDraft={ saveDraft } publishPost={ publishPost }
						 buttons={ buttons } showDelete={ false } />
}