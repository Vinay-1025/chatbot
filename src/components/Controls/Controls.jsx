import React, { useEffect, useRef, useState } from 'react'
import './Controls.css'
import TextareaAutosize from 'react-textarea-autosize'
import { BiSolidSend } from 'react-icons/bi'

const Controls = ({ isDisabled = false, onSend, onClear }) => {
    const textarearef = useRef(null);
    const [content, setContent] = useState("");

    useEffect(() => {
        if (isDisabled) {
            textarearef.current.focus();
        }
    }, [isDisabled]);

    function handleContentChange(event) {
        setContent(event.target.value);
    }

    function handleContentSend() {
        if (content.length > 0) {
            onSend(content);
            setContent("");
        }
    }

    function handleEnterPress(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleContentSend();
        }
    }

    return (
        <div className='controls'>
            <div className='textareacontainer'>
                <TextareaAutosize
                    placeholder='Message AI Chatbot'
                    className='textarea'
                    value={content}
                    onChange={handleContentChange}
                    onKeyDown={handleEnterPress}
                    ref={textarearef}
                    minRows={1}
                    maxRows={4}
                    disabled={isDisabled}
                />
            </div>
            <div className='controls-buttons'>
                <button className='button' onClick={handleContentSend} disabled={isDisabled}>
                    <BiSolidSend className='send-icon' />
                </button>
                <button className='button clear-button' onClick={onClear} disabled={isDisabled}>
                    Clear
                </button>
            </div>
        </div>
    )
}

export default Controls;
