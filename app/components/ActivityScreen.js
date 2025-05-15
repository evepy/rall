import React, { useState } from 'react';
import { Button, Icon } from 'neobrutalism';
import './ActivityScreen.css';

// Dummy message list
const initialMessages = [
  { id: 1, text: 'Share your experience, ignite the spark of knowledge.\nYour guide is a beacon on their learning path.\nInspire the future, leave an indelible mark.', time: '12:04 PM', fromUser: false },
  { id: 2, text: 'Share your experience, ignite the spark of knowledge.\nYour guide is a beacon on their learning path.\nInspire the future, leave an indelible mark.', time: '12:04 PM', fromUser: true },
  // ... more messages
];

const ActivityScreen = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), text: input, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), fromUser: true };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
  };

  return (
    <div className="activity-container">
      <header className="activity-header">
        <Button variant="ghost" size="sm" className="back-button">
          <Icon name="arrow-left" />
        </Button>
        <div className="header-avatar">
          <img src="/images/apprentice1.png" alt="Avatar" className="avatar" />
          <div className="header-info">
            <p>@UserK_651651</p>
            <p className="subtext">-An User</p>
          </div>
        </div>
        <img src="/logo.png" width={38} height={40} alt="Rall Logo" />
      </header>

      <div className="messages-list">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-row ${msg.fromUser ? 'from-user' : 'from-peer'}`}>
            <div className="message-bubble">
              <p className="message-text">{msg.text}</p>
              <span className="message-time">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="input-row">
        <Button variant="ghost" size="sm" className="send-button" onClick={handleSend} style={{backgroundColor: '#3FFF7F'}}>
          <Icon name="check" />
        </Button>
        <input
          type="text"
          className="message-input"
          placeholder="Write a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="disclaimer-box">
        This chat will be deleted within 7 days after meeting and confirmation of both.
      </div>
    </div>
  );
};

export default ActivityScreen; 