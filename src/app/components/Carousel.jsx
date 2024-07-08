"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react"
import Cat1 from "../../../public/Cat1.jpg"
import Cat2 from "../../../public/Cat2.jpg"
import Cat3 from "../../../public/Cat3.jpg"
import "./home.css"

const Carousel = (props) => {
    const [slide, setSlide] = useState(0)
    const slides = [Cat1, Cat2, Cat3]

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
        <div className={`flex justify-center items-center w-full h-64 md:min-h-96 sm:my-12 xl:my-36`}>
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
            <span className="flex absolute bottom-2 xl:bottom-14 gap-1">
                {slides.map((_, idx) => (
                    <button className={slide === idx ? "rounded-full w-2 h-2 bg-white outline-none" : "rounded-full w-2 h-2 bg-gray-500 outline-none"}
                        key={idx} onClick={() => setSlide(idx)}></button>
                ))}
            </span>
        </div>
    )
}

export default Carousel