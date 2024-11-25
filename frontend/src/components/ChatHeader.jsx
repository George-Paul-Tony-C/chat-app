// src/components/ChatHeader.jsx
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300 bg-base-100 shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
              <span
                className={`absolute bottom-0 right-0 size-2 rounded-full ${
                  onlineUsers.includes(selectedUser._id) ? "bg-green-500 animate-pulse" : "bg-red-500"
                }`}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button for mobile */}
        <button
          onClick={() => setSelectedUser(null)}
          className="text-base-content/60 hover:text-primary transition-colors duration-300 md:hidden"
          aria-label="Close chat"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
