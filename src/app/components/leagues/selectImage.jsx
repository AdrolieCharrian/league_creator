"use client"
import { CldImage } from "next-cloudinary";
import React from "react";

const SelectImage = ({ image, onclick }) => {
    return (
        <div onClick={() => onclick(image)} className="rounded-md bg-black bg-opacity-40
        p-3 hover:bg-gray-500 hover:cursor-pointer">
            <CldImage
                className=""
                width="175"
                height="175"
                crop="fill"
                src={image}
                alt="league img"
            />
        </div>

    )
}

export default SelectImage