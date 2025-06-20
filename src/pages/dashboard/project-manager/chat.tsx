
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MoreVertical, Trash2, Copy, RefreshCw, Search, ArrowLeft, Circle } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/project-manager/layout';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: Date;
  isRead: boolean;
}

export interface ChatContact {
  id: string;
  name: string;
  email: string;
  image: string;
  role: 'ai-engineer' | 'project-owner';
  status: 'online' | 'offline' | 'away';
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  messages: Message[];
}

const ChatPage = () => {
  const [contacts] = useState<ChatContact[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      image: '/images/sarah.jpg',
      role: 'ai-engineer',
      status: 'online',
      lastMessage: 'I\'ve completed the machine learning model training. The accuracy is at 94%.',
      lastMessageTime: new Date(Date.now() - 300000),
      unreadCount: 2,
      messages: [
        {
          id: '1',
          text: 'Hi! I wanted to update you on the ML project progress.',
          sender: 'contact',
          timestamp: new Date(Date.now() - 600000),
          isRead: true
        },
        {
          id: '2',
          text: 'Great! How\'s the model performing?',
          sender: 'user',
          timestamp: new Date(Date.now() - 500000),
          isRead: true
        },
        {
          id: '3',
          text: 'I\'ve completed the machine learning model training. The accuracy is at 94%.',
          sender: 'contact',
          timestamp: new Date(Date.now() - 300000),
          isRead: false
        }
      ]
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      email: 'marcus.j@example.com',
      image: '',
      role: 'ai-engineer',
      status: 'away',
      lastMessage: 'I\'ll review the code changes tomorrow morning.',
      lastMessageTime: new Date(Date.now() - 3600000),
      unreadCount: 0,
      messages: [
        {
          id: '1',
          text: 'Can you review the latest API changes?',
          sender: 'user',
          timestamp: new Date(Date.now() - 7200000),
          isRead: true
        },
        {
          id: '2',
          text: 'I\'ll review the code changes tomorrow morning.',
          sender: 'contact',
          timestamp: new Date(Date.now() - 3600000),
          isRead: true
        }
      ]
    },
    {
      id: '3',
      name: 'Alex Rodriguez',
      email: 'alex.r@company.com',
      image: '',
      role: 'project-owner',
      status: 'online',
      lastMessage: 'When can we expect the final deliverables?',
      lastMessageTime: new Date(Date.now() - 1800000),
      unreadCount: 1,
      messages: [
        {
          id: '1',
          text: 'How is the project timeline looking?',
          sender: 'contact',
          timestamp: new Date(Date.now() - 3600000),
          isRead: true
        },
        {
          id: '2',
          text: 'We\'re on track to deliver by the end of next week.',
          sender: 'user',
          timestamp: new Date(Date.now() - 2400000),
          isRead: true
        },
        {
          id: '3',
          text: 'When can we expect the final deliverables?',
          sender: 'contact',
          timestamp: new Date(Date.now() - 1800000),
          isRead: false
        }
      ]
    },
    {
      id: '4',
      name: 'Emily Watson',
      email: 'emily.w@company.com',
      image: '',
      role: 'project-owner',
      status: 'offline',
      lastMessage: 'Thanks for the update. Looks good!',
      lastMessageTime: new Date(Date.now() - 86400000),
      unreadCount: 0,
      messages: [
        {
          id: '1',
          text: 'Here\'s the weekly progress report.',
          sender: 'user',
          timestamp: new Date(Date.now() - 90000000),
          isRead: true
        },
        {
          id: '2',
          text: 'Thanks for the update. Looks good!',
          sender: 'contact',
          timestamp: new Date(Date.now() - 86400000),
          isRead: true
        }
      ]
    }
  ]);

  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  useEffect(() => {
    if (selectedContact) {
      setCurrentMessages(selectedContact.messages);
    }
  }, [selectedContact]);

  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedContact) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
      isRead: true
    };

    setCurrentMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate response
    setTimeout(() => {
      const responses = [
        "Got it! I'll work on that right away.",
        "Thanks for the update. I'll keep you posted on the progress.",
        "That sounds good. Let me review and get back to you.",
        "I understand. I'll make those changes and update you soon.",
        "Perfect! I'll implement that and test it thoroughly.",
        "Thanks for clarifying. I'll proceed with the implementation."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'contact',
        timestamp: new Date(),
        isRead: true
      };

      setCurrentMessages(prev => [...prev, responseMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowMenu(null);
  };

  const deleteMessage = (messageId: string) => {
    setCurrentMessages(prev => prev.filter(msg => msg.id !== messageId));
    setShowMenu(null);
  };

  const clearChat = () => {
    if (selectedContact) {
      setCurrentMessages([]);
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return timestamp.toLocaleDateString([], { weekday: 'short' });
    } else {
      return timestamp.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getRoleColor = (role: string) => {
    return role === 'ai-engineer' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  const selectContact = (contact: ChatContact) => {
    setSelectedContact(contact);
    // Mark messages as read
    const updatedMessages = contact.messages.map(msg => ({ ...msg, isRead: true }));
    setCurrentMessages(updatedMessages);
  };

  return (
    <DashboardLayout>
      {/* Main container with fixed height */}
       <div className="w-full bg-gradient-to-br from-indigo-50 to-white flex flex-col h-[80vh]">
      <div className="w-full flex flex-1 min-h-0">

        {/* Contacts Sidebar - Modern Design */}
        <div className={`${selectedContact ? 'hidden lg:block' : 'block'} w-full lg:w-1/3 xl:w-1/4 flex flex-col min-h-0 bg-white shadow-lg rounded-r-2xl rounded-l-2xl mr-2`}>
          <div className="p-4 flex-shrink-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-tr-2xl rounded-tl-2xl">
            <h1 className="text-2xl font-bold mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-200 w-5 h-5" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm text-white placeholder-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>
          
          {/* Scrollable contacts area - No separator lines */}
          <div className="flex-1 min-h-0 overflow-y-auto p-3">
            {filteredContacts.map(contact => (
              <div
                key={contact.id}
                onClick={() => selectContact(contact)}
                className={`p-4 mb-2 rounded-2xl hover:bg-indigo-50 transition-all duration-300 cursor-pointer ${
                  selectedContact?.id === contact.id 
                    ? 'bg-gradient-to-r from-indigo-50 to-blue-50 shadow-lg border border-indigo-100' 
                    : 'bg-white shadow-sm'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    {contact.image ? (
                      <img
                        src={contact.image}
                        alt={contact.name}
                        className="w-12 h-12 object-cover rounded-full border-2 border-white shadow"
                      />
                    ) : (
                      <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center shadow">
                        <span className="text-sm font-medium text-indigo-700">
                          {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(contact.status)}`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-gray-900 truncate">{contact.name}</h3>
                      {contact.lastMessageTime && (
                        <span className="text-xs text-gray-500">{formatTime(contact.lastMessageTime)}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(contact.role)}`}>
                        {contact.role === 'ai-engineer' ? 'AI Engineer' : 'Project Owner'}
                      </span>
                      {contact.unreadCount > 0 && (
                        <span className="bg-indigo-500 text-white text-xs rounded-full px-2 py-1 min-w-5 text-center">
                          {contact.unreadCount}
                        </span>
                      )}
                    </div>
                    
                    {contact.lastMessage && (
                      <p className="text-sm text-gray-600 truncate mt-1">{contact.lastMessage}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area - Modern Design */}
        <div className={`${selectedContact ? 'block' : 'hidden lg:block'} flex-1 flex flex-col min-h-0 bg-white rounded-l-2xl rounded-r-2xl shadow-lg`}>
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 flex items-center justify-between flex-shrink-0 rounded-tl-2xl rounded-tr-2xl">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="lg:hidden text-indigo-100 hover:text-white"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  
                  <div className="relative">
                    {selectedContact.image ? (
                      <img
                        src={selectedContact.image}
                        alt={selectedContact.name}
                        className="w-12 h-12 object-cover rounded-full border-2 border-indigo-300 shadow"
                      />
                    ) : (
                      <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center shadow">
                        <span className="text-sm font-medium text-indigo-700">
                          {selectedContact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(selectedContact.status)}`}></div>
                  </div>
                  
                  <div>
                    <h2 className="font-medium text-white text-lg">{selectedContact.name}</h2>
                    <p className="text-sm text-indigo-200 capitalize">{selectedContact.status}</p>
                  </div>
                </div>
                
                <button 
                  onClick={clearChat}
                  className="text-indigo-100 hover:text-white"
                  title="Clear Chat"
                >
                  <RefreshCw className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Messages Area */}
              <div className="flex-1 min-h-0 overflow-y-auto p-4 bg-gradient-to-b from-white to-indigo-50">
                <div className="space-y-4">
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md xl:max-w-lg ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        {/* Avatar */}
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow ${
                          message.sender === 'user' 
                            ? 'bg-indigo-500 text-white' 
                            : 'bg-white text-indigo-600 border border-indigo-200'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="w-5 h-5" />
                          ) : selectedContact.role === 'ai-engineer' ? (
                            <Bot className="w-5 h-5" />
                          ) : (
                            <User className="w-5 h-5" />
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div className="relative group">
                          <div className={`px-4 py-3 rounded-2xl shadow ${
                            message.sender === 'user'
                              ? 'bg-indigo-500 text-white rounded-br-none'
                              : 'bg-white text-gray-800 border border-indigo-100 rounded-bl-none'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                          </div>
                          
                          {/* Message Menu */}
                          <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="relative">
                              <button
                                onClick={() => setShowMenu(showMenu === message.id ? null : message.id)}
                                className={`p-1 rounded-full ${
                                  message.sender === 'user' 
                                    ? 'bg-indigo-600 text-white' 
                                    : 'bg-white text-gray-500 shadow'
                                }`}
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                              
                              {showMenu === message.id && (
                                <div className="absolute right-0 mt-1 bg-white border rounded-xl shadow-lg z-10 min-w-32 overflow-hidden">
                                  <button
                                    onClick={() => copyMessage(message.text)}
                                    className="flex items-center px-3 py-2 text-sm hover:bg-indigo-50 w-full text-left transition-colors"
                                  >
                                    <Copy className="w-4 h-4 mr-2 text-indigo-600" />
                                    <span className="text-gray-700">Copy</span>
                                  </button>
                                  <button
                                    onClick={() => deleteMessage(message.id)}
                                    className="flex items-center px-3 py-2 text-sm hover:bg-red-50 w-full text-left transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2 text-red-600" />
                                    <span className="text-red-600">Delete</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Timestamp */}
                          <div className={`text-xs mt-1 ${
                            message.sender === 'user' 
                              ? 'text-right text-indigo-600' 
                              : 'text-left text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2 max-w-xs lg:max-w-md xl:max-w-lg">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white text-indigo-600 border border-indigo-200 flex items-center justify-center shadow">
                          {selectedContact.role === 'ai-engineer' ? (
                            <Bot className="w-5 h-5" />
                          ) : (
                            <User className="w-5 h-5" />
                          )}
                        </div>
                        <div className="bg-white px-4 py-3 rounded-2xl border border-indigo-100 shadow rounded-bl-none">
                          <div className="flex space-x-1">
                            <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce"></div>
                            <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="bg-white border-t border-indigo-100 p-4 flex-shrink-0">
                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`Message ${selectedContact.name}...`}
                      className="w-full px-4 py-3 border border-indigo-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                      rows={1}
                      style={{ 
                        minHeight: '50px',
                        maxHeight: '150px',
                        overflow: 'auto'
                      }}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = Math.min(target.scrollHeight, 150) + 'px';
                      }}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-3 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg transition-all"
                    style={{ minHeight: '50px' }}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-1">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-white to-indigo-50">
              <div className="text-center p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-indigo-100 max-w-md">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow">
                  <Bot className="w-10 h-10 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Select a conversation</h3>
                <p className="text-gray-600 mb-6">Choose a contact from the sidebar to start messaging</p>
                <div className="bg-indigo-50 rounded-xl p-4 text-left">
                  <p className="text-sm text-gray-700 mb-2 font-medium">Try these contacts:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Sarah Chen - AI Engineer</li>
                    <li>• Marcus Johnson - AI Engineer</li>
                    <li>• Alex Rodriguez - Project Owner</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default ChatPage;