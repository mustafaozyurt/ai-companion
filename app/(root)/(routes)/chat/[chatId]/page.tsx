import { redirect } from "next/navigation";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import ChatClient from "./components/client";

interface ChatProps {
  params: {
    chatId: string;
  };
}

const Chat = async ({ params }: ChatProps) => {
  console.log(params.chatId);

  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companion) {
    return redirect("/");
  }

  return (
    <div className="flex items-center justify-center h-full pt-4">
      <ChatClient companion={companion} />
    </div>
  );
};

export default Chat;
