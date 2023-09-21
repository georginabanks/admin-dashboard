import EditHeader from "../../outletComponents/EditHeader.jsx";
import PostData, {DeleteData} from "../../outletComponents/PostData.jsx";

export default function EditImage() {
	
	// Post Data
	
	const deletePost = async (event) => {
		await DeleteData(event, setButtons, buttons, '/pages/' + page.pageId, 'pageId');
	}
	
	const saveDraft = async ( event ) => {
		await PostData(event, setButtons, buttons, 'saveButton', 'Save Draft',
				'Saving...', 'Page Saved', 'pages/' + page.pageId,
				{ ...page, content: quill, StatusStatusId: 1 }, 'pageId', setPage
		);
	}
	
	const publishPost = async ( event ) => {
		await PostData( event, setButtons, buttons, 'publishButton', 'Publish',
				'Publishing...', 'Published', 'pages/' + page.pageId,
				{ ...page, content: quill, StatusStatusId: 2, datePublished: new Date() }, 'pageId', setPage
		);
	}
	
	return (
			<div>
				<EditHeader />
			</div>
	)
}