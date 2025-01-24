"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DetailsPage({ params }) {
  const { id } = params; // Dynamic route থেকে ID পাওয়া
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700 font-medium">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-lg font-medium">Post not found</p>
      </div>
    );
  }

  return (
    <main className="flex items-center justify-center mt-24 px-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full border">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <p className="text-gray-700 leading-7">{post.body}</p>
        <button
          onClick={() => router.back()}
          className="mt-6 bg-[#258d6e] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#1f7359] transition duration-300"
        >
          Go Back
        </button>
      </div>
    </main>
  );
}
