import React from "react";

const users = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/75.jpg",
];

export default function AvatarGroup() {
  return (
    <div className="flex items-center">
      {users.map((user, index) => (
        <img
          key={index}
          src={user}
          alt="user"
          className={`
            w-12 h-12
            rounded-full
            object-cover
            border-[3px] border-white
            ${index !== 0 ? "-ml-4" : ""}
          `}
        />
      ))}
    </div>
  );
}