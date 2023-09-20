import React from 'react';
import ReactQuill from 'react-quill';

export default function TextEditor({ value, setValue }) {
    return (
            <div className={'text-editor'} id={'editor'}>
                <ReactQuill theme="snow" value={value} onChange={setValue} />
            </div>
    )
}