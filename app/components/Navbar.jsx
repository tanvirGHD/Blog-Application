import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log("User Info:", user);

  return (
    <nav className="flex justify-between items-center bg-[#258d6e] p-6 sticky">
      <ul className="flex gap-4">
        <li>
          <Link href="/" className="text-lg text-white">
            Home
          </Link>
        </li>
        
        {/* Show Profile link only if the user is logged in */}
          <li>
            <Link href="/profile" className="text-lg text-white">
              Profile
            </Link>
          </li>
      </ul>

      <div>
        {user ? (
          <Link
            href="/api/auth/logout"
            className="bg-red-500 text-white px-4 py-3 rounded-md text-sm hover:bg-red-600 transition duration-300"
          >
            Logout
          </Link>
        ) : (
          <Link
            href="/api/auth/login"
            className="bg-[#067531] text-white px-4 py-2 rounded-md text-sm hover:bg-[#067531] transition duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
