import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css'; // Move your CSS into Chatbot.css

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hello! I'm your hospital information assistant. I can help you with:  
🏥 Hospital details and specialties  
👨‍⚕️ Doctor information and expertise  
📞 Contact numbers and receptionist details  
⭐ Reviews and ratings  
💊 Treatment information  
Ask me anything about hospitals and healthcare!`,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef(null);

  const GEMINI_API_KEY = 'AIzaSyDk_r9Y8cnt7uyt6VlK8Y6rGyfcwWwav9I';

  const sendMessage = async () => {
    const message = inputValue.trim();
    if (!message) return;

    addMessage(message, 'user');
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      const botText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (botText) {
        addMessage(botText, 'bot');
      } else {
        addMessage('⚠️ Sorry, no response. Please try again.', 'bot');
      }
    } catch (err) {
      addMessage('❌ Error: ' + err.message, 'bot');
    } finally {
      setLoading(false);
    }
  };

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🏥 Know About Your Hospitals and Treatments and Reviews</h1>
        <p>Ask me about hospitals, doctors, treatments, and reviews</p>
      </div>

      <div className="example-queries">
        <h3>💡 Example Questions:</h3>
        <p>
          • "Tell me about Apollo Hospital and their cardiology department"
          <br />
          • "What are the best hospitals for orthopedic treatment?"
          <br />
          • "Give me details about Dr. Smith at City Hospital"
          <br />
          • "What are the reviews for Max Healthcare?"
        </p>
      </div>

      <div className="chat-container" ref={chatContainerRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            <div className="message-content">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className={`loading ${loading ? 'active' : ''}`}>
        <span className="loading-dots">Thinking</span>
      </div>

      <div className="input-container">
        <div className="input-group">
          <input
            type="text"
            placeholder="Ask about hospitals, doctors, or treatments..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <button onClick={sendMessage} disabled={loading}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
