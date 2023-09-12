"use client";

import { Companion, Message } from "@prisma/client";
import ChatMessage, { ChatMessageProps } from "./chat-message";
import { useState, useEffect, useRef, ElementRef } from "react";

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  companion: Companion;
}

export const ChatMessages = ({
  messages,
  isLoading,
  companion,
}: ChatMessagesProps) => {
  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );
  const scrollRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        src={companion.src}
        role="system"
        content={`Hello, I am ${companion.name}, ${companion.description}`}
        isLoading={fakeLoading}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          src={companion.src}
          content={message.content}
          role={message.role}
        />
      ))}
      {isLoading && <ChatMessage src={companion.src} role="system" isLoading />}
      <div ref={scrollRef} />
    </div>
  );
};
