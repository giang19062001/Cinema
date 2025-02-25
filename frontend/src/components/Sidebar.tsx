import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";

export const metadata: Metadata = {
   title: "CINEMA",
   description: "CINEMA",
};

export default function Sidebar({ children }: { children: React.ReactNode }) {
   const [asideOpen, setAsideOpen] = useState(true);
   const [profileOpen, setProfileOpen] = useState(false);
   return (
      <main className="min-h-screen w-full bg-[#1D232C]" x-data="layout">
         <header className="flex w-full items-center justify-between border-b-2 border-slate-100 p-2">
            <div className="flex items-center space-x-2 ml-4">
               {/* <button type="button" className="text-3xl " onClick={() => setAsideOpen(!asideOpen)}>
                  <img   src={"/static/images/menu.png"} alt="" className="w-8"/>
               </button> */}
               {/* <img src={"https://static.vecteezy.com/system/resources/previews/005/188/413/non_2x/cinema-logo-template-isolated-on-white-background-vector.jpg"}  className="w-18 h-16"/> */}
               {/* <div className="text-white text-[#72BE43] font-bold text-xl">Logo</div> */}
            </div>

            <div>
               <button type="button" onClick={() => setProfileOpen(!profileOpen)} className="h-9 w-9 overflow-hidden rounded-full">
                  <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="plchldr.co" />
               </button>

               <div className="absolute right-2 mt-1 w-48 divide-y rounded-md border bg-white shadow-md" style={{ display: profileOpen ? "block" : "none" }}>
                  <div className="flex items-center space-x-2 p-2">
                     <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="plchldr.co" className="h-9 w-9 rounded-full" />
                     <div className="font-medium">Admin</div>
                  </div>

                  <div className="flex flex-col space-y-3 p-2 pl-4">
                     <a href="#" className="transition hover:text-black">
                        Cá nhân
                     </a>
                  </div>

                  <div className="p-2 pl-4">
                     <button className="flex items-center space-x-2 transition hover:text-black">
                        {/* <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg> */}
                        <div>Đăng xuất</div>
                     </button>
                  </div>
               </div>
            </div>
         </header>

         <div className="flex">
            <aside className="flex w-72 flex-col space-y-2  bg-[#1D232C] text-white font-semibold p-2" style={{ height: "100vh", display: asideOpen ? "block" : "none", transition: "2s" }}>
               <Link href="/" className="flex items-center space-x-1 rounded-md px-2 py-3  hover:bg-[#72BE43] ">
                  <span className="text-2xl">
                     <i className="bx bx-home"></i>
                  </span>
                  <span>Dashboard</span>
               </Link>

               <Link href="/movie" className="flex items-center space-x-1 rounded-md px-2 py-3  hover:bg-[#72BE43] ">
                  <span className="text-2xl">
                     <i className="bx bx-cart"></i>
                  </span>
                  <span>Danh sách phim</span>
               </Link>

               <Link href="/category" className="flex items-center space-x-1 rounded-md px-2 py-3  hover:bg-[#72BE43] ">
                  <span className="text-2xl">
                     <i className="bx bx-cart"></i>
                  </span>
                  <span>Danh sách thể loại phim</span>
               </Link>
               <Link href="/theater" className="flex items-center space-x-1 rounded-md px-2 py-3  hover:bg-[#72BE43] ">
                  <span className="text-2xl">
                     <i className="bx bx-shopping-bag"></i>
                  </span>
                  <span>Danh sách rạp</span>
               </Link>
               <Link href="/food" className="flex items-center space-x-1 rounded-md px-2 py-3  hover:bg-[#72BE43] ">
                  <span className="text-2xl">
                     <i className="bx bx-heart"></i>
                  </span>
                  <span>Danh sách thực phẩm</span>
               </Link>

               <Link href="#" className="flex items-center space-x-1 rounded-md px-2 py-3  hover:bg-[#72BE43] ">
                  <span className="text-2xl">
                     <i className="bx bx-user"></i>
                  </span>
                  <span>Danh sách đặt vé</span>
               </Link>
            </aside>

            <div className="w-full bg-slate-100  p-8">
               <div className="bg-white rounded-md">{children}</div>
            </div>
         </div>
      </main>
   );
}
