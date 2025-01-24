import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const auth = await isAuthenticated();
    if (!auth) {
      redirect('/api/auth/login');
      return null;
    }

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
          <p className="text-red-500 text-lg">User data not available..</p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <p className="text-red-500">Error loading profile page.</p>
      </div>
    );
  }
}
