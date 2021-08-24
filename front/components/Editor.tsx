import React from "react";
const ClassicEditor = require('ckeditor5-classic-plus');
const { CKEditor } = require('@ckeditor/ckeditor5-react');

import { Input } from '@material-ui/core';

const Editor = (props: any) => {
    return (
        <div style={{ textAlign: 'center', minHeight: '500px' }}>
            <h2>Posting</h2>
            <Input name="title" onChange={props.onChangeTitle} defaultValue={props.title ? props.title : "title"} required></Input>
            <CKEditor
                editor={ClassicEditor}
                data={props.content ? props.content : "<p>Hello from CKEditor 5!</p>"}
                onChange={(event:any, editor: any) => {
                    const data = editor.getData();
                    props.setContent(data);
                }}
                style={{ minHeight: '500px' }}
            />
            {/* <div dangerouslySetInnerHTML={{__html: data}} /> */}
        </div>
    );
};

export default Editor;