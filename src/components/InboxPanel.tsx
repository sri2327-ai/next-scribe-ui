
import React from 'react';
import { Search, Star, StarOff, Inbox, File, Send, Archive, Trash2 } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
  starred: boolean;
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Dr. Sarah Johnson',
    subject: 'Patient Referral - John Doe',
    content: 'I wanted to refer a patient with anxiety disorder who might benefit from your expertise...',
    date: '2025-04-24',
    read: false,
    starred: true
  },
  {
    id: '2',
    sender: 'Admin Staff',
    subject: 'Updated Office Hours',
    content: 'Please note that the office hours will change starting next month...',
    date: '2025-04-23',
    read: true,
    starred: false
  },
  {
    id: '3',
    sender: 'Lab Results',
    subject: 'Test Results Available - Sarah Williams',
    content: 'The test results for patient Sarah Williams are now available for review...',
    date: '2025-04-22',
    read: false,
    starred: false
  }
];

const InboxPanel: React.FC = () => {
  const [messages, setMessages] = React.useState<Message[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = React.useState<Message | null>(null);
  const [activeFolder, setActiveFolder] = React.useState('inbox');

  const toggleStar = (id: string) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, starred: !msg.starred } : msg
    ));
  };

  const markAsRead = (id: string) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
  };

  const selectMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) {
      markAsRead(message.id);
    }
  };

  return (
    <div className="flex h-full bg-white">
      {/* Sidebar */}
      <div className="w-60 border-r flex flex-col">
        <div className="p-3 border-b">
          <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Compose
          </button>
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="p-2">
            <button 
              onClick={() => setActiveFolder('inbox')}
              className={`w-full text-left px-3 py-2 rounded flex items-center ${activeFolder === 'inbox' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <Inbox className="w-4 h-4 mr-2" />
              Inbox
              <span className="ml-auto bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">2</span>
            </button>
            
            <button 
              onClick={() => setActiveFolder('starred')}
              className={`w-full text-left px-3 py-2 rounded flex items-center ${activeFolder === 'starred' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <Star className="w-4 h-4 mr-2" />
              Starred
            </button>
            
            <button 
              onClick={() => setActiveFolder('sent')}
              className={`w-full text-left px-3 py-2 rounded flex items-center ${activeFolder === 'sent' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <Send className="w-4 h-4 mr-2" />
              Sent
            </button>
            
            <button 
              onClick={() => setActiveFolder('drafts')}
              className={`w-full text-left px-3 py-2 rounded flex items-center ${activeFolder === 'drafts' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <File className="w-4 h-4 mr-2" />
              Drafts
            </button>
            
            <button 
              onClick={() => setActiveFolder('archive')}
              className={`w-full text-left px-3 py-2 rounded flex items-center ${activeFolder === 'archive' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </button>
            
            <button 
              onClick={() => setActiveFolder('trash')}
              className={`w-full text-left px-3 py-2 rounded flex items-center ${activeFolder === 'trash' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Trash
            </button>
          </div>
        </div>
      </div>
      
      {/* Message List */}
      <div className="w-80 border-r">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search messages..."
              className="w-full pl-9 pr-3 py-2 border rounded text-sm"
            />
          </div>
        </div>
        
        <div className="overflow-auto h-[calc(100vh-56px)]">
          {messages.map(message => (
            <div 
              key={message.id} 
              onClick={() => selectMessage(message)}
              className={`p-3 border-b cursor-pointer ${message.read ? 'bg-white' : 'bg-blue-50'} ${selectedMessage?.id === message.id ? 'border-l-4 border-l-blue-600' : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`font-medium ${message.read ? '' : 'font-semibold'}`}>{message.sender}</span>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500">{message.date}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(message.id);
                    }}
                    className="ml-2"
                  >
                    {message.starred ? (
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ) : (
                      <StarOff className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div className={`text-sm ${message.read ? '' : 'font-semibold'}`}>{message.subject}</div>
              <div className="text-xs text-gray-500 mt-1 truncate">{message.content}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Message Content */}
      <div className="flex-1 flex flex-col">
        {selectedMessage ? (
          <>
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">{selectedMessage.subject}</h2>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <span className="font-medium">{selectedMessage.sender}</span>
                  <span className="text-gray-500 text-sm ml-2">{selectedMessage.date}</span>
                </div>
                <div>
                  <button 
                    onClick={() => toggleStar(selectedMessage.id)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    {selectedMessage.starred ? (
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ) : (
                      <Star className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 overflow-auto flex-1">
              <p>{selectedMessage.content}</p>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, 
                nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt,
                nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
              </p>
              <p className="mt-4">
                Best regards,<br />
                {selectedMessage.sender}
              </p>
            </div>
            <div className="p-4 border-t">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Reply
              </button>
              <button className="px-4 py-2 border ml-2 rounded hover:bg-gray-100">
                Forward
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Inbox size={48} className="mb-4 text-gray-300" />
            <p className="text-lg">Select a message to view</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxPanel;
