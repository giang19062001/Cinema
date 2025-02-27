"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { IMovie } from "@/interface/movie.interface";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function Home() {
   const [movieList, setMovieList] = useState<IMovie[]>([]);
   useEffect(() => {
      const fetchData = async () => {
         try {
            const { data: response } = await axios.get("http://localhost:5000/Movie");
            console.log(response);
            setMovieList(response);
         } catch (error: unknown) {
            console.error(error);
         }
      };

      fetchData();
   }, []);
   return (
      <Sidebar>
         <div className="grid grid-rows-[20px_1fr_20px] p-10 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2">
               <p className="font-semibold text-2xl">Danh sách phim</p>
               <table className="border-collapse table-aut">
                  <thead>
                     <tr>
                        <th className="border p-4">Ảnh chi tiết</th>
                        <th className="border p-4">Ảnh nền</th>
                        <th className="border p-4">Tiêu đề</th>
                        <th className="border p-4">Mô tả</th>
                        <th className="border p-4"></th>
                     </tr>
                  </thead>
                  <tbody>
                     {movieList.map((ele, index) => {
                        return (
                           <tr key={index}>
                              <td className="border p-8">
                                 <Image src={ele.movieImage} alt="" width={150} height={150} />
                              </td>
                              <td className="border p-8">
                                 <Image src={ele.movieThumbnail} alt="" width={150} height={150} />
                              </td>
                              <td className="border p-8">
                                 <h2>{ele.movieName}</h2>
                              </td>

                              <td className="border p-8 w-5/12">
                                 <p>{ele.movieDescription}</p>
                              </td>
                              <td className="border p-8">
                                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </main>
         </div>
      </Sidebar>
   );
}
