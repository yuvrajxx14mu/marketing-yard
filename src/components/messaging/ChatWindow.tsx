
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare } from 'lucide-react';
import { User, Message } from '@/types';
import { useNavigate } from 'react-router-dom';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';

type Conversation = {
  id: string;
  userId: string;
  name: string;
  userType: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  avatar: string;
};

interface ChatWindowProps {
  selectedConversation: string | null;
  conversations: Conversation[];
  messages: Message[];
  currentUser: User | null;
  onSendMessage: (message: string) => void;
}

const ChatWindow = ({
  selectedConversation,
  conversations,
  messages,
  currentUser,
  onSendMessage,
}: ChatWindowProps) => {
  const navigate = useNavigate();
  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <Card className="md:col-span-2">
      {selectedConversation ? (
        <>
          <CardHeader className="pb-3 border-b">
            {selectedConv && (
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={selectedConv.avatar} alt={selectedConv.name} />
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{selectedConv.name}</CardTitle>
                  <CardDescription>{selectedConv.userType}</CardDescription>
                </div>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-[500px]">
            <MessageDisplay messages={messages} currentUser={currentUser} />
            <MessageInput onSendMessage={onSendMessage} />
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
  );
};

export default ChatWindow;
