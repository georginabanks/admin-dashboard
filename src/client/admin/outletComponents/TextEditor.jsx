import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function TextEditor({ value, setValue }) {
    return (
            <div className={'text-editor'}>
                <ReactQuill theme="snow" value={value} onChange={setValue} />
            </div>
    )
}