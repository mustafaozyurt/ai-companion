import { ChatHeader } from "@/components/chat-header";

import { Companion, Message } from "@prisma/client";

interface ChatClientProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const ChatClient = ({ companion }: ChatClientProps) => {
  return (
    <div className="max-w-4xl w-full">
      <ChatHeader companion={companion} />
    </div>
  );
};

export default ChatClient;
