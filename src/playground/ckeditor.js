import React, { useState, useEffect } from 'react';
import './style.css';

const Editor = () => {
    // Context
    const [context, setContext] = useState('');

    // Editor
    const [editor, setEditor] = useState(false);

    useEffect(() => {
        if(!editor) {
            const el = document.getElementById('block');
            el.innerHTML = context;
        }
    }, [editor, context])
    const toggleEditor = () => setEditor(!editor);

    // Return
    return(
        <div className='editor'>
            <h1>Editor</h1>
            {/* {editor ? <CKEditor
                config={config}
                editor={ClassicEditor}
                data={context}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setContext(data);
                }}
                />
            : <div id='block' style={{ border: '1px solid black', padding: '10px' }} />
            } */}
   
                <button onClick={toggleEditor}>{ editor ? 'Save' : 'Edit'}</button>
        </div>
    );
};

export default Editor;