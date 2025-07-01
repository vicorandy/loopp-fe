import React, { useState } from 'react';
import { ArrowLeft, Archive, Trash2, Camera, Paperclip, Send, Calendar, MapPin, Users, CheckCircle, HelpCircle, MessageCircle, ChevronRight } from 'lucide-react';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

interface Message {
  id: string;
  type: 'sent' | 'received' | 'project-request';
  content: string;
  timestamp: string;
  sender?: {
    name: string;
    avatar: string;
  };
}

interface Contact {
  name: string;
  location: string;
  memberSince: string;
  avatar: string;
}

const MessagingInterface: React.FC = () => {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      type: 'project-request',
      content: `Hi Wells Collins,

I'd love your help designing a logo for a tech startup. The brand is aiming for a clean, minimal aesthetic—something that feels modern but approachable.

The timeline is tight, as we'd need the final files in two weeks. Let me know if you'd like more details on the company's vision or audience.

Would you be up for this?`,
      timestamp: '',
    },
    {
      id: '2',
      type: 'received',
      content: `Thanks for reaching out!
I'm honored that you like my work.

I am wrapping up a couple big projects this month and next, and I am accepting work starting in early August. If your timeline allows, I'd love to collaborate with you to design an elegant and thoughtful logo for your tech startup.

Let's jump on a quick call to talk a little more about your vision for the brand and the scope of work.
I'm traveling this week and out of the office, but I can talk next week when I'm back at my desk.
If you're available, we can jump on a quick video chat within this thread.
I'm wide next week (Monday July 7) and Wednesday (July 9) between 9am - 5pm MT.

Feel free to schedule a video call for us by using the "Schedule a Meeting" button in the top right-hand column of this page.

Looking forward to chatting with you.
Thanks,
Wells`,
      timestamp: '1:10 PM',
      sender: {
        name: 'Wells Collins',
        avatar: '/api/placeholder/40/40'
      }
    }
  ]);

  const [messageInput, setMessageInput] = useState('');

  const contact: Contact = {
    name: 'Wells Collins',
    location: 'Denver, CO',
    memberSince: '2011',
    avatar: '/api/placeholder/60/60'
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle sending message
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto px-3 lg:px-10 xl:px-33 h-[100vh]">
             <Navbar />
            <div className="h-[90vh] mt-20 overflow-y-auto bg-gray-50 flex">
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                    <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to inbox
                    </button>
                    </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3">
                    <img 
                        src={'/avatar.webp'} 
                        alt={contact.name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <h1 className="text-2xl font-bold text-gray-900">{contact.name}</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <Archive className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                    </button>
                    </div>
                </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    {messages.map((message) => (
                    <div key={message.id} className="space-y-4">
                        {message.type === 'project-request' && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center space-x-2 mb-4">
                            <MessageCircle className="w-5 h-5 text-blue-600" />
                            <span className="font-semibold text-gray-900">Project Request</span>
                            <HelpCircle className="w-4 h-4 text-gray-400" />
                            </div>
                            <div className="prose prose-sm max-w-none">
                            {message.content.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="text-gray-700 mb-3 last:mb-0">{paragraph}</p>
                            ))}
                            </div>
                        </div>
                        )}
                        
                        {message.type === 'received' && (
                        <div className="flex space-x-3">
                            <img 
                            src={message.sender?.avatar} 
                            alt={message.sender?.name}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                            <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-2xl">
                                <div className="prose prose-sm max-w-none">
                                {message.content.split('\n').map((line, index) => (
                                    <p key={index} className="text-gray-800 mb-2 last:mb-0">{line}</p>
                                ))}
                                </div>
                            </div>
                            {message.timestamp && (
                                <p className="text-xs text-gray-500 mt-1 ml-4">{message.timestamp}</p>
                            )}
                            </div>
                        </div>
                        )}
                    </div>
                    ))}
                </div>
                </div>

                {/* Message Input */}
                <div className="bg-white border-t border-gray-200 px-6 py-4">
                <div className="flex items-end space-x-3">
                    <button className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                    <Camera className="w-5 h-5" />
                    </button>
                    <button className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                    <Paperclip className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                    <textarea
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Write your message..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={1}
                    />
                    </div>
                    <button 
                    onClick={handleSendMessage}
                    className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
                    disabled={!messageInput.trim()}
                    >
                    <Send className="w-5 h-5" />
                    </button>
                </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                {/* Contact Info */}
                <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                    <img 
                    src={'/avatar.webp'} 
                    alt={contact.name}
                    className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                    <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 space-x-3">
                        <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{contact.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>Member since {contact.memberSince}</span>
                        </div>
                    </div>
                    </div>
                </div>
                
                <button className="w-full flex items-center justify-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    <Calendar className="w-4 h-4" />
                    <span>Schedule a Meeting</span>
                </button>
                </div>

                {/* Dribbble Promises */}
                <div className="p-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Dribbble promises peace of mind.</h4>
                <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Secure payments and fraud protection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Job done or your money back</span>
                    </div>
                    <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Full copyright ownership</span>
                    </div>
                </div>
                </div>

                {/* Help Links */}
                <div className="p-6 space-y-3">
                <button className="w-full flex items-center justify-between text-left text-gray-700 hover:text-gray-900 transition-colors">
                    <span className="font-medium">Visit Help Center</span>
                    <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between text-left text-gray-700 hover:text-gray-900 transition-colors">
                    <span className="font-medium">Contact Support</span>
                    <ChevronRight className="w-4 h-4" />
                </button>
                </div>
            </div>
            </div>
            <Footer />
    </div>
  );
};

export default MessagingInterface;