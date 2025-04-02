
import { User, Message } from '@/types';

interface MessageDisplayProps {
  messages: Message[];
  currentUser: User | null;
}

const MessageDisplay = ({ messages, currentUser }: MessageDisplayProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const isCurrentUser = message.senderId === (currentUser?.id || 'current-user');
        
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
  );
};

export default MessageDisplay;
