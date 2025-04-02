
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Search } from 'lucide-react';

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

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: string | null;
  onSelectConversation: (id: string) => void;
}

const ConversationList = ({
  conversations,
  selectedConversation,
  onSelectConversation,
}: ConversationListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
                onClick={() => onSelectConversation(conv.id)}
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
  );
};

export default ConversationList;
