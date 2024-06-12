"use client"
import React from "react";
import { CldImage } from 'next-cloudinary';
import { CldUploadButton } from 'next-cloudinary';
import { saveImage } from "@/app/hub/profile/actions";
import { MdDriveFolderUpload } from "react-icons/md";

const ImageForm = ({ image }) => {

    return (
        <div className="flex flex-col items-center dark:text-white">
            <CldImage
                className="rounded-full"
                width="125"
                height="125"
                crop="fill"
                src={image ? image : "tf46yhpxmqf7ewxhvfmu"}
                alt="Description of my image"
            />
            <div className="float-end flex items-center justify-center max-h-10 
            border border-black dark:border-white rounded p-4 mt-3 gap-1">
                <MdDriveFolderUpload style={{ width: "25px", height: "25px" }} />
                <CldUploadButton onSuccess={(result) => {
                    const handleSaveImage = async () => {
                        const imgId = result.info.public_id;
                        await saveImage(imgId);
                    }
                    handleSaveImage();
                }} uploadPreset="adrolie" />
            </div>
        </div>
    )
}

export default ImageForm