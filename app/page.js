
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <main>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <ul className="mt-4 grid grid-cols-3 gap-4">
          {posts.map((post) => (
            <li key={post.id} className="mb-2 border p-5">
              <Link href={`/details/${post.id}`} className="text-blue-500 hover:underline">
                {post.title}
              </Link>
              <div className="mt-4">
                <button
                  onClick={() => router.push(`/details/${post.id}`)} // Navigate programmatically
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
