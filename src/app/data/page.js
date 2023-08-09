"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  addData,
  updateData,
  deleteData,
} from "../store/actions/dataActions";

const PageData = () => {
  const router = useRouter();
  const data = useSelector((state) => state.data.data);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleAddData = () => {
    const newData = { title, content };
    dispatch(addData(newData));
    setTitle("");
    setContent("");
  };

  const handleDeleteData = (dataId) => {
    dispatch(deleteData(dataId));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="container mx-auto py-8 px-5">
      <h1 className="text-2xl font-semibold mb-4">CRUD Data</h1>
      <div className="mb-4">
        <h2 className="text-lg font-medium mb-2">Add Data</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          onClick={handleAddData}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Data
        </button>
      </div>
      <div>
        <h2 className="text-lg font-medium mb-2">Data List</h2>
        <ul>
          {data.map((item) => (
            <li key={item._id} className="mb-2">
              <strong>{item.title}</strong> - {item.content}
              <button
                onClick={() => router.push(`/data/${item._id}`)}
                className="ml-2 px-2 py-1 text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteData(item._id)}
                className="ml-2 px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 "
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 absolute top-6 right-4 lg:right-32"
      >
        Logout
      </button>
    </div>
  );
};

export default PageData;
