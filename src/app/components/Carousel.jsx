"use client"
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react"
import infoLeague from "../../../public/infoLeague.png"
import leaderboard from "../../../public/leaderboard.png"
import leagues from "../../../public/leagues.png"
import login from "../../../public/login.png"
import matches from "../../../public/matches.png"
import teams from "../../../public/teams.png"
import "./home.css"

const Carousel = () => {
    const [slide, setSlide] = useState(0)
    const slides = [infoLeague, leaderboard, leagues, login, matches, teams]

    const nextSlide = () => {
        if (slide === slides.length - 1) {
            setSlide(0)
        } else {
            setSlide(prev => prev + 1)
        }
    }

    const prevSlide = () => {
        if (slide === 0) {
            setSlide(slides.length - 1)
        } else {
            setSlide(prev => prev - 1)
        }
    }

    return (
        <div className="w-full bg-opacity-15 bg-white">
            <div className={`flex justify-center items-center w-full h-64 md:min-h-96 my-12 md:my-20 sm:my-12 xl:my-36`}>
                <div onClick={prevSlide} className="z-10 rounded-full absolute bg-white w-10 h-10 left-4 flex justify-center items-center hover:cursor-pointer sm:left-20 xl:left-56">
                    <ChevronLeft />
                </div>
                {slides.map((item, idx) => (
                    <Image className={`carousel-item aspect-video h-auto w-4/5 sm:w-4/5 md:w-3/4 xl:w-3/5 xl:h-auto xl:aspect-video ${slide === idx ? "active" : ""}`}
                        sizes="100%"
                        alt="carousel-item" key={idx} src={item.src} height={0} width={0} />
                ))}
                <div onClick={nextSlide} className="rounded-full absolute bg-white w-10 h-10 right-4 flex justify-center items-center hover:cursor-pointer sm:right-20 xl:right-56">
                    <ChevronRight />
                </div>
                <span className="flex absolute bottom-16 sm:bottom-8 md:bottom-2 xl:bottom-14 gap-1">
                    {slides.map((_, idx) => (
                        <button className={slide === idx ? "rounded-full w-2 h-2 bg-white outline-none" : "rounded-full w-2 h-2 bg-gray-500 outline-none"}
                            key={idx} onClick={() => setSlide(idx)}></button>
                    ))}
                </span>
            </div>
        </div>

    )
}

export default Carousel