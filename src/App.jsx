import React, { useState, useEffect } from 'react';
import './App.css';
import { Assistant } from './assistants/Googleai';
import AI from './assets/ai-brain.png';
import Chat from './components/Chat/Chat';
import Controls from './components/Controls/Controls';
import Loader from './components/Loader/Loader';

const App = () => {
  const [message, setMessage] = useState([]);
  const [assistant] = useState(new Assistant()); // Create Assistant once, not on every render
  const [isLoading, setIsLoading] = useState(false);

  function updateLastMessageContent(content) {
    setMessage((prevMessages) => prevMessages.map((message, index) => index === prevMessages.length-1 ? { ...message, content: `${message.content}${content}` } : message))
  }

  // Add message to state
  function addMessage(newMessage) {
    setMessage((prevMessages) => [...prevMessages, newMessage]);
  }

  // Send message and handle response
  async function handleContentSend(content) {
    addMessage({ content, role: 'user' }); // Add user message first
    setIsLoading(true);
    try {
      const result = await assistant.chatStream(content);
      
      let isFirstChunk = false

      for await (const chunk of result) {
        if (!isFirstChunk) {
          isFirstChunk = true
          addMessage({ content:"", role: "assistant"  })
          setIsLoading(false)
        }
        updateLastMessageContent(chunk)
      }
    } catch (error) {
      addMessage({
        content: "Sorry, I couldn't process the request. Please try again!",
        role: 'system',
      });
      setIsLoading(false);
    }
  }

  // Clear chat history
  function handleClearHistory() {
    setMessage([]); // Clears the entire message history
  }

  return (
    <div className="App">
      {isLoading && <Loader />}
      <header className="Header">
        <img src={AI} alt="AI logo" className="Logo" />
        <h2 className="Title">Chatbot</h2>
      </header>
      <div className="ChatContainer">
        <Chat message={message} />
      </div>
      <Controls isDisabled={isLoading} onSend={handleContentSend} onClear={handleClearHistory} />
    </div>
  );
};

export default App;
