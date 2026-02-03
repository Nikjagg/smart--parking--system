import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your Parking Assistant. How can I help you?", sender: "bot" }
  ]);
  
  const chatEndRef = useRef(null);

  // Auto scroll to bottom when new message arrives
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    // --- BACKEND LOGIC START ---
    // Abhi ke liye hum timeout use kar rahe hain, 
    // baad mein aap yahan fetch('your-api-url') use kar sakte hain.
    setTimeout(() => {
      let botReply = getStaticReply(currentInput);
      setMessages(prev => [...prev, { text: botReply, sender: "bot" }]);
      setIsTyping(false);
    }, 1000);
    // --- BACKEND LOGIC END ---
  };

  // Expanded Static Replies (Will be replaced by Backend API later)
  const getStaticReply = (query) => {
    const q = query.toLowerCase();
    if (q.includes("hi") || q.includes("hello")) return "Hello! Welcome to Smart Parking support.";
    if (q.includes("slot") || q.includes("available")) return "You can check live availability on the 'Slots' page. Green means empty!";
    if (q.includes("price") || q.includes("charge") || q.includes("cost")) return "Our standard rate is ₹100 per hour for cars.";
    if (q.includes("cancel")) return "Go to Profile > Booking Details. You will see a 'Cancel' button next to active bookings.";
    if (q.includes("edit") || q.includes("profile")) return "Click on 'Edit Profile' in your dashboard to update your name, email, or address.";
    if (q.includes("receipt") || q.includes("invoice")) return "You can download your PDF receipt from the 'Download Receipt' tab in your profile.";
    if (q.includes("admin")) return "Admin access is restricted. Please contact support if you are a manager.";
    return "I'm sorry, I didn't quite get that. You can ask about slots, pricing, cancellations, or profile edits!";
  };

  return (
    <div style={s.container}>
      {isOpen && (
        <div style={s.window}>
          <div style={s.header}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <div style={s.onlineDot}></div>
              <span>Parking Bot</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={s.close}>×</button>
          </div>

          <div style={s.msgArea}>
            {messages.map((m, i) => (
              <div key={i} style={m.sender === "bot" ? s.botMsg : s.userMsg}>
                {m.text}
              </div>
            ))}
            {isTyping && <div style={s.typing}>Bot is typing...</div>}
            <div ref={chatEndRef} />
          </div>

          <div style={s.inputArea}>
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && handleSend()} 
              style={s.input} 
              placeholder="Ask me anything..." 
            />
            <button onClick={handleSend} style={s.send}>➤</button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} style={s.fab}>
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
};

const s = {
  container: { position: 'fixed', bottom: '25px', right: '25px', zIndex: 1000, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  fab: { width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#0f172a', color: 'white', border: 'none', cursor: 'pointer', fontSize: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', transition: 'transform 0.2s ease' },
  window: { width: '320px', height: '450px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', marginBottom: '15px', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  header: { padding: '15px 20px', backgroundColor: '#0f172a', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '600' },
  onlineDot: { width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%' },
  close: { background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '22px', opacity: '0.8' },
  msgArea: { flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#f8fafc' },
  botMsg: { alignSelf: 'flex-start', backgroundColor: '#ffffff', color: '#1e293b', padding: '10px 14px', borderRadius: '15px 15px 15px 0px', fontSize: '14px', maxWidth: '85%', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' },
  userMsg: { alignSelf: 'flex-end', backgroundColor: '#38bdf8', color: 'white', padding: '10px 14px', borderRadius: '15px 15px 0px 15px', fontSize: '14px', maxWidth: '85%', boxShadow: '0 2px 8px rgba(56, 189, 248, 0.3)' },
  typing: { fontSize: '12px', color: '#64748b', fontStyle: 'italic', marginLeft: '5px' },
  inputArea: { display: 'flex', padding: '12px 15px', borderTop: '1px solid #f1f5f9', backgroundColor: 'white', alignItems: 'center' },
  input: { flex: 1, border: 'none', outline: 'none', padding: '8px', fontSize: '14px', color: '#1e293b' },
  send: { background: 'none', border: 'none', cursor: 'pointer', color: '#0f172a', fontSize: '22px', paddingLeft: '10px' }
};

export default Chatbot;