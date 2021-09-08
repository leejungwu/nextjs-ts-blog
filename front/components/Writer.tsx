import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Input } from '@material-ui/core';

const Writer = (props: any) => {
    return (
        <div style={{ textAlign: 'center', minHeight: '500px', backgroundColor: 'white' }}>
            <h2>Posting</h2>
            <Input name="title" onChange={props.onChangeTitle} defaultValue={props.title ? props.title : "title"} required></Input>
            <Editor
                // css Wrapper class name
                wrapperClassName="demo-wrapper"
                // css editor class name
                editorClassName="demo-editor"
                editorState={props.content}
                // language 설정
                localization={{
                    locale: "ko",
                }}
                // 에디터 상단에 표시될 toolbar 설정
                toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    code: { inDropdown: true },
                }}
                // 에디터 값이 변경될 때 호출될 함수 정의
                onEditorStateChange={props.handleEditorStateChange}
                editorStyle={{ border: "1px solid", minHeight: '500px'}}
                handlePastedText={() => false}
                stripPastedStyles={true}
            />
            {/* <div dangerouslySetInnerHTML={{__html: data}} /> */}
        </div>
    );
};

export default Writer;