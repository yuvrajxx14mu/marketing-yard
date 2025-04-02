
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { messageService } from '@/services/api';
import { Message } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConversationList from '@/components/messaging/ConversationList';
import ChatWindow from '@/components/messaging/ChatWindow';

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
    lastMessage: 'I\'m interested in your organic rice listing',
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
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  
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
  
  const handleSendMessage = (newMessage: string) => {
    if (!selectedConversation) return;
    
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
              <ConversationList
                conversations={conversations}
                selectedConversation={selectedConversation}
                onSelectConversation={setSelectedConversation}
              />
              
              <ChatWindow
                selectedConversation={selectedConversation}
                conversations={conversations}
                messages={messages}
                currentUser={user}
                onSendMessage={handleSendMessage}
              />
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messaging;
