"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:7002";
const API_URL = "http://localhost:7002";

type Message = {
  _id?: string;
  chatId: string;
  message: string;
  senderId: string | { _id: string };
  createdAt: string;
};

export default function ChatRoom() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [connected, setConnected] = useState(false);
  const [myUserId, setMyUserId] = useState("");
  const [chatId, setChatId] = useState("");
  const [chatIdInput, setChatIdInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Connect socket once on mount
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("No accessToken in localStorage. Please log in first.");
      return;
    }

    const newSocket = io(SOCKET_URL, {
      path: "/socket.io",
      auth: { token: accessToken },
    });

    newSocket.on("connect", () => {
      setConnected(true);
      setSocket(newSocket);
    });

    newSocket.on("connected", (data) => {
      setMyUserId(data.userId);
    });

    newSocket.on("new_message", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    newSocket.on("connect_error", (err) => {
      setError(err.message);
      setConnected(false);
    });

    newSocket.on("disconnect", () => setConnected(false));

    return () => { newSocket.disconnect(); };
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const joinChat = async () => {
    const id = chatIdInput.trim();
    if (!id) return;

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    try {
      // Load existing messages
      const res = await fetch(`${API_URL}/api/messages/v1/chat/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Failed to load messages");
        return;
      }

      setMessages(json.data?.messages ?? json.data ?? []);
      setChatId(id);
      setError("");

      // Join socket room
      socket?.emit("joinChat", id);
    } catch {
      setError("Failed to load messages");
    }
  };

  const sendMessage = async () => {
    if (!text.trim() || !chatId) return;
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    setSending(true);
    try {
      const res = await fetch(`${API_URL}/api/messages/v1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ chatId, message: text.trim(), messageType: "text" }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Failed to send message");
      } else {
        setText("");
        setError("");
        // Optimistically add the message (socket will also broadcast it)
        setMessages((prev) => {
          const sent = json.data;
          const isDuplicate = prev.some((m) => m._id && m._id === sent._id);
          return isDuplicate ? prev : [...prev, sent];
        });
      }
    } catch {
      setError("Network error");
    } finally {
      setSending(false);
    }
  };

  const getSenderId = (msg: Message) =>
    typeof msg.senderId === "object" ? msg.senderId._id : msg.senderId;

  return (
    <div className="mx-auto mt-8 flex h-[600px] max-w-2xl flex-col rounded-xl border bg-white shadow">

      {/* Header */}
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Test Chat</h2>
        <p className="text-sm text-gray-500">
          {connected ? "🟢 Connected" : "🔴 Disconnected"}
        </p>
        {myUserId && <p className="text-xs text-gray-400">User: {myUserId}</p>}
      </div>

      {/* Chat ID input */}
      {!chatId ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6">
          <p className="text-sm text-gray-500">Enter a Chat ID to start</p>
          <div className="flex w-full gap-2">
            <input
              value={chatIdInput}
              onChange={(e) => setChatIdInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && joinChat()}
              placeholder="MongoDB Chat ID..."
              className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none"
            />
            <button
              onClick={joinChat}
              disabled={!connected || !chatIdInput.trim()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              Join
            </button>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      ) : (
        <>
          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 && (
              <p className="text-center text-sm text-gray-400">No messages yet</p>
            )}
            {messages.map((item, index) => {
              const isMine = getSenderId(item) === myUserId;
              return (
                <div key={item._id ?? index} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] rounded-xl px-4 py-2 text-sm ${isMine ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"}`}>
                    {item.message}
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Error */}
          {error && <p className="px-4 text-xs text-red-500">{error}</p>}

          {/* Input */}
          <div className="flex gap-2 border-t p-4">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 rounded-lg border px-4 py-2 text-sm outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={sending || !text.trim()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              {sending ? "..." : "Send"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
