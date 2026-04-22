import ChatClient from "@/components/chat/ChatClient";
import { env } from "@/config/env";

const ChatPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  // Initial fetch from the Express server
  // Note: In production, you might want to use an env variable for the API URL
  const response = await fetch(
    `${env.NEXT_PUBLIC_SERVER_HOST_BASE_URL}/chat/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-200 dark:border-red-900/50">
          <h2 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">
            Error Loading Chat
          </h2>
          <p className="text-red-600/80 dark:text-red-400/80">
            Could not fetch chat data from the server.
          </p>
        </div>
      </div>
    );
  }

  const initialChat = await response.json();

  return <ChatClient initialChat={initialChat} />;
};

export default ChatPage;
