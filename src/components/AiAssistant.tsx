import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { useData } from '../context/DataContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm AndyGO's virtual assistant. How can I help you accelerate your project today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { saveAiConversation } = useData();
  const [conversationId] = useState(() => Date.now().toString());

  // Sync messages to admin dashboard
  useEffect(() => {
    if (messages.length > 1) { // Only save if there's interaction beyond the greeting
      saveAiConversation({
        id: conversationId,
        date: new Date().toISOString(),
        messages: messages.map(msg => ({
          ...msg,
          timestamp: msg.timestamp.toISOString()
        }))
      });
    }
  }, [messages, conversationId, saveAiConversation]);

  // 30-second auto-open timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasOpened) {
        setIsOpen(true);
        setHasOpened(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [hasOpened]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getBotResponse = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    // Contact / WhatsApp / Phone
    if (lowerText.match(/number|phone|call|whatsapp|contact|reach/)) {
      return "You can reach us directly on WhatsApp or call us at +254 757700391. You can chat with us here: https://wa.me/254757700391";
    }
    
    // Services / What do you do / Help
    if (lowerText.match(/service|what.*do|help|offer|can.*do|work/)) {
      return "We specialize in Web Applications, Mobile Apps, UI/UX Design, and Custom Software Solutions. Whether you need a stunning website or a complex system, we've got you covered!";
    }

    // Pricing / Cost
    if (lowerText.match(/price|cost|quote|much/)) {
      return "Our pricing is project-dependent as we offer custom solutions tailored to your needs. Please send us your project details for a free quote!";
    }

    // Location
    if (lowerText.match(/location|where.*you|based/)) {
      return "We are based in Kenya but work with clients globally as a remote-first team.";
    }

    // Default
    return "Thanks for reaching out! Our team has received your message and will get back to you shortly. Is there anything else you'd like to know? You can also contact us at +254 757700391.";
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const responseText = getBotResponse(userMsg.text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const renderMessageText = (text: string) => {
    const parts = text.split(/(https?:\/\/[^\s]+)/g);
    return parts.map((part, i) => 
      part.match(/^https?:\/\//) ? 
        <a 
          key={i} 
          href={part} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="underline text-blue-600 dark:text-blue-400 break-all"
        >
          {part}
        </a> : 
        part
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 md:w-96 bg-white dark:bg-charcoal rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-amber flex justify-between items-center text-charcoal">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">AndyGO Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs opacity-75">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-black/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-black/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user'
                        ? 'bg-amber text-charcoal font-medium rounded-tr-none'
                        : 'bg-white dark:bg-white/10 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-white/5'
                    }`}
                  >
                    {renderMessageText(msg.text)}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-charcoal border-t border-gray-100 dark:border-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full pl-4 pr-12 py-3 bg-gray-100 dark:bg-white/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-amber text-charcoal rounded-lg hover:bg-amber-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-amber text-charcoal rounded-full shadow-lg shadow-amber/20 hover:shadow-amber/40 transition-shadow relative group"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute right-0 top-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-charcoal" />
      </motion.button>
    </div>
  );
};

export default AiAssistant;
