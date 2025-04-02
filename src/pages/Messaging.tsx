
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Search, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { messageService } from '@/services/api';
import { Message, User } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock conversations for demonstration
const mockConversations = [
  {
    id: '1',
    userId: '101',
    name: 'Rajesh Patel',
    userType: 'farmer',
    lastMessage: 'Can we negotiate the price for the wheat?',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    unread: 2,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: '2',
    userId: '102',
    name: 'Anita Desai',
    userType: 'trader',
    lastMessage: 'I'm interested in your organic rice listing',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    unread: 0,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: '3',
    userId: '103',
    name: 'Support Team',
    userType: 'admin',
    lastMessage: 'How can we help you today?',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    unread: 0,
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
  }
];

// Mock messages for a conversation
const mockMessages = [
  {
    id: '1',
    senderId: '101',
    senderName: 'Rajesh Patel',
    receiverId: 'current-user',
    receiverName: 'Current User',
    content: 'Hello, I saw your listing for premium wheat.',
    type: 'chat' as const,
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    id: '2',
    senderId: 'current-user',
    senderName: 'Current User',
    receiverId: '101',
    receiverName: 'Rajesh Patel',
    content: 'Yes, it\'s still available. Are you interested?',
    type: 'chat' as const,
    read: true,
    createdAt: new Date(Date.now() - 23 * 60 * 60 * 1000) // 23 hours ago
  },
  {
    id: '3',
    senderId: '101',
    senderName: 'Rajesh Patel',
    receiverId: 'current-user',
    receiverName: 'Current User',
    content: 'I would like to buy 50 quintals. What\'s your best price?',
    type: 'chat' as const,
    read: true,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
  },
  {
    id: '4',
    senderId: '101',
    senderName: 'Rajesh Patel',
    receiverId: 'current-user',
    receiverName: 'Current User',
    content: 'Can we negotiate the price for the wheat?',
    type: 'chat' as const,
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
  }
];

const Messaging = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  // Load conversation when selected
  useEffect(() => {
    if (selectedConversation) {
      // In a real app, this would fetch messages from an API
      setMessages(mockMessages);
      
      // Mark messages as read
      const updatedConversations = conversations.map(conv => 
        conv.id === selectedConversation ? { ...conv, unread: 0 } : conv
      );
      setConversations(updatedConversations);
    }
  }, [selectedConversation]);
  
  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // In a real app, this would send the message to an API
    const selectedConv = conversations.find(c => c.id === selectedConversation);
    if (!selectedConv) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: user?.id || 'current-user',
      senderName: user?.name || 'Current User',
      receiverId: selectedConv.userId,
      receiverName: selectedConv.name,
      content: newMessage,
      type: 'chat',
      read: false,
      createdAt: new Date()
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    toast({
      title: "Message sent",
      description: "Your message has been delivered."
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-market-900">Messages</h1>
              <p className="text-market-600 mt-2">
                Chat with farmers, traders, and support
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
              {/* Conversations List */}
              <Card className="md:col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle>Conversations</CardTitle>
                  <div className="relative mt-2">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      placeholder="Search conversations..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="h-[500px] overflow-y-auto">
                  {filteredConversations.length > 0 ? (
                    <div className="space-y-2">
                      {filteredConversations.map((conv) => (
                        <div 
                          key={conv.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors flex items-start ${
                            selectedConversation === conv.id 
                              ? 'bg-market-100' 
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => setSelectedConversation(conv.id)}
                        >
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={conv.avatar} alt={conv.name} />
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium truncate">{conv.name}</h4>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {conv.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                          </div>
                          {conv.unread > 0 && (
                            <div className="bg-market-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs ml-2">
                              {conv.unread}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-1">No conversations found</h3>
                      <p className="text-sm text-muted-foreground">
                        {searchTerm 
                          ? `No results for "${searchTerm}"`
                          : "Start a conversation from product listings"
                        }
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Chat Window */}
              <Card className="md:col-span-2">
                {selectedConversation ? (
                  <>
                    <CardHeader className="pb-3 border-b">
                      {(() => {
                        const conv = conversations.find(c => c.id === selectedConversation);
                        return conv ? (
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={conv.avatar} alt={conv.name} />
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{conv.name}</CardTitle>
                              <CardDescription>{conv.userType}</CardDescription>
                            </div>
                          </div>
                        ) : null;
                      })()}
                    </CardHeader>
                    <CardContent className="p-0 flex flex-col h-[500px]">
                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => {
                          const isCurrentUser = message.senderId === (user?.id || 'current-user');
                          
                          return (
                            <div 
                              key={message.id}
                              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                            >
                              <div 
                                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                                  isCurrentUser 
                                    ? 'bg-market-600 text-white' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                <p>{message.content}</p>
                                <p className={`text-xs mt-1 ${isCurrentUser ? 'text-market-100' : 'text-gray-500'}`}>
                                  {message.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Message Input */}
                      <div className="p-4 border-t">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                            className="flex-1"
                          />
                          <Button onClick={handleSendMessage} className="bg-market-600 hover:bg-market-700">
                            <Send size={18} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[536px] text-center p-6">
                    <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No conversation selected</h3>
                    <p className="text-muted-foreground mb-6">
                      Select a conversation to start chatting or negotiate prices with farmers and traders.
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/products')}
                    >
                      Browse Products
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messaging;
