import React from 'react';
import ReactQuill from 'react-quill';

export default function TextEditor({ value, setValue }) {
    
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image']
        ]
    }
    
    return (
            <div className={'text-editor'} id={'editor'}>
                <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} />
            </div>
    )
}