import React, { useEffect, useMemo, useRef } from 'react';
import './Chat.css';
import Markdown from "react-markdown"

const Welcome_message_group = [
    {
        role: "assistant",
        content: "Hello! How can I assist you right now?",
    }
];

const Chat = ({ message }) => {
    const messageEndRef = useRef(null);
    
    // Group messages by user role
    const messageGroups = useMemo(() => message.reduce((groups, msg) => {
        if (msg.role === 'user') groups.push([]); // Start new group for user messages
        groups[groups.length - 1].push(msg); // Add the message to the last group
        return groups;
    }, []), [message]);

    useEffect(() => {
        // Scroll to the bottom of the chat when the message changes
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <div className='chat'>
            {/* Welcome message group first */}
            {[Welcome_message_group, ...messageGroups].map((messages, groupIndex) => (
                <div className='group' key={groupIndex}>
                    {/* Iterate over the messages in each group */}
                    {messages.map(({ role, content }, messageIndex) => (
                        <div className='message' key={messageIndex} data-role={role}>
                            <Markdown>{content}</Markdown>
                        </div>
                    ))}
                </div>
            ))}
            {/* Scroll ref to keep the view scrolled to the latest message */}
            <div ref={messageEndRef} />
        </div>
    );
}

export default Chat;
