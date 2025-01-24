"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(18); // Initial visible posts count
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

  const handleShowMore = () => {
    setVisiblePosts((prev) => prev + 18); // Show 18 more posts on click
  };

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <main>
      <div className="p-4">
        <h1 className="text-3xl font-bold text-center text-[#1a8565]">Blog Posts</h1>
        <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.slice(0, visiblePosts).map((post) => (
            <li key={post.id} className="mb-2 border p-5">
              <p className="uppercase">{post.title}</p>
              <div className="mt-4">
                <button
                  onClick={() => router.push(`/details/${post.id}`)} // Navigate programmatically
                  className="bg-[#34b68f] text-white px-3 py-1 rounded hover:bg-[#196951]"
                >
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
        {visiblePosts < posts.length && (
          <div className="mt-4 text-center">
            <button
              onClick={handleShowMore}
              className="bg-[#34b68f] text-white px-5 py-2 rounded hover:bg-[#196951]"
            >
              See More Blogs
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
