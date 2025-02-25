"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import { ICategory } from "@/interface/category.inteface";

export default function Home() {
   const [theater, setTheaterList] = useState<ICategory[]>([]);
   useEffect(() => {
      const fetchData = async () => {
         try {
            const { data: response } = await axios.get("http://localhost:5000/Category");
            console.log(response);
            setTheaterList(response);
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
               <p className="font-semibold text-2xl">Danh sách thể loại phim</p>
               <table className="border-collapse table-aut">
                  <thead>
                     <tr>
                        <th className="border p-4">STT</th>
                        <th className="border p-4">CODE</th>
                        <th className="border p-4">Tên</th>
                        <th className="border p-4"></th>
                     </tr>
                  </thead>
                  <tbody>
                     {theater.map((ele, index) => {
                        return (
                           <tr key={index}>
                              {" "}
                              <td className="border p-8" align="center">
                                 <h2>{index + 1}</h2>
                              </td>
                              <td className="border p-8" align="center">
                                 <h2>{ele.categoryCode}</h2>
                              </td>
                              <td className="border p-8" align="center">
                                 <h2>{ele.categoryName}</h2>
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
