"use client";
import { useEffect, useState } from "react";
import { getKindeClientSession } from "@kinde-oss/kinde-auth-nextjs/client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { isAuthenticated, getUser } = getKindeClientSession();
        const auth = await isAuthenticated();
        if (!auth) {
          router.push("/api/auth/login");
        } else {
          const userData = await getUser();
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUserData();
  }, [router]);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }

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
