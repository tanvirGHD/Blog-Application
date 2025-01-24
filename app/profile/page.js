import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

export default async function ProfilePage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6">
      {user ? (
        <div className="bg-white shadow-md rounded-md p-6 w-96 text-center">
          <img
            src={user.picture}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">
            {user.given_name} {user.family_name}
          </h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      ) : (
        <p className="text-red-500 text-lg">User not logged in</p>
      )}
    </div>
  );
}
