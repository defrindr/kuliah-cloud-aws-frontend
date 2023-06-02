"use client";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  // const data = await getProjects();
  // This function can be named anything
  async function getProjects() {
    const res = await axios.get(
      `http://praktikum-env.eba-at852wsr.ap-southeast-1.elasticbeanstalk.com:5000/`
    );
    if (res.status >= 200 && res.status < 300) {
      setData(() => res.data.data);
    }
    return [];
  }

  useEffect(() => {
    getProjects();
  }, []);

  // This function can be named anything
  const deleteData = async (id) => {
    await axios.delete(
      `http://praktikum-env.eba-at852wsr.ap-southeast-1.elasticbeanstalk.com:5000/` +
        id
    );

    await getProjects();
  };

  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Aplikasi Note
        </p>
      </div>
      <div className="mb-32 grid text-center lg:mb-0">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/create"
          shallow={true}
        >
          Tambah Catatan
        </Link>
        <table className="table-fixed border-collapse border border-slate-500 mt-16  w-full">
          <thead className="bg-grey text-white">
            <tr>
              <td className="border border-slate-600 w-1/2 px-4 py-2">
                Tanggal
              </td>
              <td className="border border-slate-600 w-1/2 px-4 py-2">
                Catatan
              </td>
              <td className="border border-slate-600 w-1/2 px-4 py-2">Aksi</td>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td className="border border-slate-700 w-1/2 px-4 py-2">
                    {item.createdAt}
                  </td>
                  <td className="border border-slate-700 w-1/2 px-4 py-2">
                    {item.content}
                  </td>
                  <td className="border border-slate-700 w-1/2 px-4 py-2">
                    <Link
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                      href={"/update/" + item.id}
                      shallow={true}
                    >
                      Ubah
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        deleteData(item.id);
                      }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="border border-slate-700 w-1/2 px-4 py-2"
                >
                  Data Kosong
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
