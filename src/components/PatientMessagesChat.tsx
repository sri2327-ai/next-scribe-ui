
import React, { useRef, useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "system";
  text: string;
}

interface PatientMessagesChatProps {
  patient: { name: string };
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "user",
    text: "Hi, I need a refill on my anxiety medication please."
  },
  {
    id: 2,
    role: "system",
    text: "Thank you for your message, Kelly. I'll process your request shortly. Is there anything else you need?"
  }
];

const PatientMessagesChat: React.FC<PatientMessagesChatProps> = ({ patient }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages((msgs) => [
        ...msgs,
        { id: msgs.length + 1, role: "user", text: input }
      ]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-[400px] max-h-[60vh] bg-blue-50 rounded-lg border">
      <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs px-4 py-2 rounded-2xl ${
              msg.role === "user"
                ? "bg-blue-600 text-white rounded-br-sm"
                : "bg-white text-gray-800 rounded-bl-sm border"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 flex items-center gap-2 border-t bg-white rounded-b-lg">
        <input
          type="text"
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none"
          placeholder={"Message " + patient.name.split(' ')[0]}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-5 py-2 rounded-full flex items-center disabled:opacity-40"
          disabled={!input.trim()}
        >
          <MessageCircle className="mr-2" size={18} /> Send
        </button>
      </div>
    </div>
  );
};

export default PatientMessagesChat;
