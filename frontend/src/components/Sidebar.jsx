// src/components/Sidebar.jsx
import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, X, Search } from "lucide-react"; // Imported Search icon
import { Transition } from "@headlessui/react";
import Tooltip from "./Tooltip"; // Ensure this path is correct

const Sidebar = ({ isOpen, onClose }) => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Combine search and online filters
  const filteredUsers = users
    .filter((user) =>
      showOnlineOnly ? onlineUsers.includes(user._id) : true
    )
    .filter((user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-1/4 lg:w-1/5 h-auto border-r border-base-300 bg-base-100 shadow-lg transition-all duration-200">
        {/* Header */}
        <div className="border-b border-base-300 w-full p-4 flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            <span className="font-medium hidden lg:block">Contacts</span>
          </div>
        </div>

        {/* Search Bar - Newly Added */}
        <div className="p-4 border-b border-base-300">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2 border border-base-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
              aria-label="Search Contacts"
            />
          </div>
        </div>

        {/* Filter Section for Larger Screens */}
        <div className="hidden lg:flex items-center gap-2 p-4 border-b border-base-300">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm transition-transform duration-300 focus:scale-110"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>

        {/* User List */}
        <div className="overflow-y-auto flex-1 py-3 px-2">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-2 flex items-center gap-3 rounded-md
                hover:bg-base-300 transition-colors duration-300
                ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-primary" : ""}
              `}
              aria-label={`Select ${user.fullName}`}
            >
              <Tooltip content={user.fullName}>
                <div className="relative">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="w-10 h-10 object-cover rounded-full transition-transform transform hover:scale-105"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span
                      className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
                      rounded-full ring-2 ring-base-100"
                      aria-label="Online"
                    />
                  )}
                </div>
              </Tooltip>

              {/* User info - visible on larger screens */}
              <div className="hidden lg:block text-left flex-1">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center text-zinc-500 py-4">No users found</div>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="transform translate-x-full"
        enterTo="transform translate-x-0"
        leave="transition ease-in duration-150"
        leaveFrom="transform translate-x-0"
        leaveTo="transform translate-x-full"
      >
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
            aria-hidden="true"
          ></div>

          {/* Sidebar */}
          <aside className="relative w-3/4 max-w-xs bg-base-100 h-full shadow-lg overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-700 focus:outline-none"
              aria-label="Close Sidebar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="border-b border-base-300 w-full p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                <span className="font-medium">Contacts</span>
              </div>
            </div>

            {/* Filter Section */}
            <div className="border-b border-base-300 p-4">
              <label className="cursor-pointer flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showOnlineOnly}
                  onChange={(e) => setShowOnlineOnly(e.target.checked)}
                  className="checkbox checkbox-sm transition-transform duration-300 focus:scale-110"
                />
                <span className="text-sm">Show online only</span>
              </label>
              <span className="block text-xs text-zinc-500 mt-1">
                ({onlineUsers.length - 1} online)
              </span>
            </div>

            {/* User List */}
            <div className="overflow-y-auto flex-1 py-3 px-2">
              {filteredUsers.map((user) => (
                <button
                  key={user._id}
                  onClick={() => {
                    setSelectedUser(user);
                    onClose(); // Close sidebar after selection
                  }}
                  className={`
                    w-full p-2 flex items-center gap-3 rounded-md
                    hover:bg-base-300 transition-colors duration-300
                    ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-primary" : ""}
                  `}
                  aria-label={`Select ${user.fullName}`}
                >
                  <Tooltip content={user.fullName}>
                    <div className="relative">
                      <img
                        src={user.profilePic || "/avatar.png"}
                        alt={user.fullName}
                        className="w-10 h-10 object-cover rounded-full transition-transform transform hover:scale-105"
                      />
                      {onlineUsers.includes(user._id) && (
                        <span
                          className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
                          rounded-full ring-2 ring-base-100"
                          aria-label="Online"
                        />
                      )}
                    </div>
                  </Tooltip>

                  {/* User info */}
                  <div className="text-left flex-1">
                    <div className="font-medium truncate">{user.fullName}</div>
                    <div className="text-sm text-zinc-400">
                      {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                    </div>
                  </div>
                </button>
              ))}

              {filteredUsers.length === 0 && (
                <div className="text-center text-zinc-500 py-4">No users found</div>
              )}
            </div>
          </aside>
        </div>
      </Transition>
    </>
  );
};

export default Sidebar;
