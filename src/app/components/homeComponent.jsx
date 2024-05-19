"use client"
import "./home.css"
import React, { useRef, useEffect } from "react";
import { Merienda } from "next/font/google";

const merienda = Merienda({ subsets: ["latin"] });

const HomeComponent = (props) => {
    const left = useRef(null);
    const h1Ref = useRef(null);

    useEffect(() => {
    const handleOnMove = (e) => {
        const leftWidth = (e.clientX / window.innerWidth) * 100;
        left.current.style.width = `${leftWidth}%`;
        const h1Left = leftWidth > 50 ? `${leftWidth}%` : '50%';
        h1Ref.current.style.left = h1Left;
    };

    window.addEventListener("mousemove", handleOnMove);
    window.addEventListener("touchmove", handleOnMove);

    // Cleanup event listeners on unmount
    return () => {
        window.removeEventListener("mousemove", handleOnMove);
        window.removeEventListener("touchmove", handleOnMove);
        };
    }, []);


    return(
        <div className="w-full">
            {/* LEFT SIDE */}
            <div ref={left}
                className="bg-sidebar-dark2 text-white h-screen w-full absolute leading-none side z-10">
                <nav className="bg-transparent w-5/6 text-xl flex items-center justify-between">
                    <ul className="flex">
                        <li className="mr-6">
                            <a href="#">HOME</a>
                        </li>
                        <li className="mr-6">
                            <a href="#">About</a>
                        </li>
                    </ul>
                    <div className="flex gap-2">
                        {props.session ? <img className="h-8 w-8 rounded-full" /> :
                        <button className="">
                            <a className="text-gray-400" href="">LogIn</a>
                        </button>}
                    </div>
                </nav>
                <h1 ref={h1Ref} className="title">
                Ultimate League & Team{" "}
                    <span className={`${merienda.className} text-sidebar-light2`}>Manager</span>
                </h1>
            </div>
            {/* RIGHT SIDE */}
            <div id="right-side" className="bg-sidebar-light h-screen w-screen absolute leading-none side">
                <nav className="bg-transparent w-5/6 text-xl flex items-center justify-between">
                    <ul class="flex">
                        <li class="mr-6">
                            <a href="#">HOME</a>
                        </li>
                        <li class="mr-6">
                            <a href="#">About</a>
                        </li>
                    </ul>
                    <div className="flex gap-2">
                        {props.session ? <img className="h-8 w-8 rounded-full" /> :
                        <button className="">
                            <a className="" href="">LogIn</a>
                        </button>}
                    </div>
                </nav>
                <h1 className="title">
                Ultimate League & Team{" "}
                    <span className={`${merienda.className} text-sidebar-dark`}>Creator</span>
                </h1>
            </div>
        </div>
    )
}

export default HomeComponent