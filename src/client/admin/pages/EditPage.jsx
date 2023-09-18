import PostData, {DeleteData} from "../outletComponents/PostData.jsx";
import {useEffect, useState} from "react";
import EditPostForm from "../outletComponents/EditPostForm.jsx";
import {useParams} from "react-router-dom";
import {getPostById} from "../../api.jsx";

export default function EditPage({ showDelete }) {
	
	const [page, setPage] = useState({ pageId: 0 });
	const [buttons, setButtons] = useState({
		deleteButton: 'Delete',
		saveButton: 'Save Draft',
		publishButton: 'Publish'
	});
	
	const { pageId } = useParams();
	if (pageId !== undefined) {
		useEffect(() => {
			getPostById(pageId).then( res => setPage(res) );
		}, [])
	}
	
	
	// Post Data
	
	const deletePost = async (event) => {
		await DeleteData(event, setButtons, buttons, '/pages/' + page.pageId, 'pageId');
	}
	
	const saveDraft = async ( event ) => {
		await PostData(event, setButtons, buttons, 'saveButton', 'Save Draft',
				'Saving...', 'Page Saved', 'pages/' + page.pageId,
				{ ...page, StatusStatusId: 1 }, 'pageId', setPage
		);
	}
	
	const publishPost = async ( event ) => {
		await PostData( event, setButtons, buttons, 'publishButton', 'Publish',
				'Publishing...', 'Published', 'pages/' + page.pageId,
				{ ...page, StatusStatusId: 2 }, 'pageId', setPage
		);
	}
	
	return <EditPostForm post={ page } setPost={ setPage } deletePost={ deletePost } saveDraft={ saveDraft }
						 publishPost={ publishPost } buttons={ buttons } showDelete={ showDelete } backUrl={'/pages'} />
}