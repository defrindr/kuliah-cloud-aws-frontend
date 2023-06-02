"use client"; // This is a client component 👈🏽

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Create({ params }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const id = params.id;

  useEffect(() => {
    getProjects();
  }, []);
  // This function can be named anything
  async function getProjects() {
    const res = await axios.get(
      `http://praktikum-env.eba-at852wsr.ap-southeast-1.elasticbeanstalk.com:5000/` +
        id
    );

    if (res.status >= 200 && res.status < 300) {
      setContent(() => res.data.data.content);
    }
  }

  const submitEvent = async () => {
    const res = await axios.put(
      `http://praktikum-env.eba-at852wsr.ap-southeast-1.elasticbeanstalk.com:5000/` +
        id,
      {
        content,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status >= 200 && res.status < 300) {
      router.push("/");
      return;
    }
    setError(() => "Terjadi kesalahan saat mengirim data");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Ubah Catatan</h1>
      {error != "" && <p className="bg-red m-3 p-2">{error}</p>}
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Konten
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="content"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="content"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => submitEvent()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Kirim
          </button>
        </div>
      </form>
    </main>
  );
}
