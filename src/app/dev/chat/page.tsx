import ChatRoom from "./ChatRoom";

export default function ChatPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Chat
      </h1>

      <ChatRoom />
    </div>
  );
}