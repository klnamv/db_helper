import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import OpenAI from "openai";
import DatabaseSchema from './DatabaseSchema';

const api_key = process.env.REACT_APP_OPENAI;
const openai = new OpenAI({apiKey: api_key, dangerouslyAllowBrowser: true});

const modelId: string = "gpt-3.5-turbo";  // Defining modelId outside the component

const Chat: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [outputGpt, setOutputGpt] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  }

  const handleSubmitGpt = async (): Promise<void> => {
    if (!process.env.REACT_APP_OPENAI) {
      console.error("OpenAI API key is not set in environment variables");
    } else {
      console.log("Using OpenAI API key from environment variables");
      console.log("API Key:", process.env.REACT_APP_OPENAI);
    }

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: input }],
        model: modelId,
      });
      const content = completion.choices[0].message.content;
      console.log(content);
      if (content !== null) {
        setOutputGpt(content);
      }
    } catch (error) {
      console.error("Error fetching from OpenAI:", error);
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmitGpt();
    }
  };

  return (
    <div className='main-page'>
      <header>ChatDB</header>
      <div>
            <h1>Notion Database Schema Viewer</h1>
            <DatabaseSchema />
      </div>
      <div className='gpt-container'>
        <div className='container'>
          <h2>GPT 3.5 Turbo</h2>
          <div className="markdown-content">
            {outputGpt}
          </div>
        </div>
      </div>
      <div>
        <div className='message-chat-gpt'>
          <input type='text' value={input} onChange={handleInputChange} onKeyDown={handleKeyPress} placeholder='Message ChatGPT...' />
          <button onClick={handleSubmitGpt} className='send'>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Chat;
