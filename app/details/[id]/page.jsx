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
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!post) {
    return <div className="p-4 text-center">Post not found</div>;
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700">{post.body}</p>
      <button
        onClick={() => router.back()}
        className="mt-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Go Back
      </button>
    </main>
  );
}
