"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

const UpdatePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:9000/api/data/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const existingData = response.data;
        setUpdatedTitle(existingData.title);
        setUpdatedContent(existingData.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const updatedData = { title: updatedTitle, content: updatedContent };
      await axios.put(`http://localhost:9000/api/data/${id}`, updatedData, {
        headers: {
          Authorization: token,
        },
      });
      router.push("/data");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Update Data</h1>
      <p>Updating data with ID: {id}</p>
      <input
        type="text"
        placeholder="Updated Title"
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="Updated Content"
        value={updatedContent}
        onChange={(e) => setUpdatedContent(e.target.value)}
        className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
      />
      <button
        onClick={handleUpdate}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Update Data
      </button>
    </div>
  );
};

export default UpdatePage;
