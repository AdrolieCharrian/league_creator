'use client'
import Image from "next/image";
import { useState } from "react";

export default function Sidebar({}) {
    const [open, setOpen] = useState(true);
  return (
    <div className={`${open ? 'w-72':'w-20'} duration-300 h-screen bg-sidebar-light relative`}>
      <Image
        src="/controlLight.png"
        width={28}
        height={28}
        className={`absolute cursor-pointer -right-3 top-9 w-6 h-100 bg-white rounded-full border-2 border-sidebar-light ${!open && "rotate-180"}`}
        alt=""
        onClick={()=> setOpen(!open)}
      />
    </div>
  );
}
