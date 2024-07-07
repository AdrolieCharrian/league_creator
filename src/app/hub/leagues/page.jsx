"use client";
import { useEffect, useState } from "react";
import LeagueCard from "@/app/components/LeagueCard";
import {
  identifyUser,
  getLeaguesFromUser,
  deleteLeague,
  saveImageLeague,
  getDefaultImages,
} from "../actions";
import { CldImage } from "next-cloudinary";
import { CldUploadButton } from "next-cloudinary";
import { MdDriveFolderUpload } from "react-icons/md";
import SelectImage from "@/app/components/leagues/selectImage";

const Leagues = () => {
  const [leagues, setLeagues] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLeague, setNewLeague] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [imageId, setImageId] = useState("");
  const [openDefaultImage, setOpenDefaultImage] = useState(false);
  const [defaultImages, setDefaultImages] = useState("");

  const getDefault = async () => {
    const defaultImg = await getDefaultImages();
    setDefaultImages(defaultImg);
  };

  const getLeagues = async () => {
    const leaguesData = await getLeaguesFromUser();
    setLeagues(leaguesData);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDefaultImages = () => {
    setOpenDefaultImage(true);
  };

  const closeDefaultImages = () => {
    setOpenDefaultImage(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLeague({ ...newLeague, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await identifyUser(newLeague);
      await getLeagues();
      closeModal();
      setNewLeague({ name: "", description: "", image: "" });
    } catch (error) {
      console.error("Error creating league:", error);
    }
  };

  const handleDelete = async (id_league) => {
    try {
      await deleteLeague(id_league);
      await getLeagues();
    } catch (error) {
      console.error("Error deleting league:", error);
    }
  };

  const handleUploadSuccess = (result) => {
    const imgId = result.info.public_id;
    setImageId(imgId);
    setNewLeague((prevLeague) => ({ ...prevLeague, image: imgId }));
  };

  const handleImageClick = (imageId) => {
    setImageId(imageId);
    setNewLeague({ ...newLeague, image: imageId })
    closeDefaultImages();
  };

  useEffect(() => {
    getLeagues();
    getDefault();
  }, []);


  return (
    <div className="h-100 w-100 flex flex-col">
      <div className="mb-3">
        <button
          type="button"
          className="bg-sidebar-light dark:bg-sidebar-dark hover:bg-sidebar-light2 dark:hover:bg-sidebar-dark2 text-white font-bold py-2 px-4 rounded"
          onClick={openModal}
        >
          Create League
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {leagues.map((league, index) => (
          <LeagueCard key={index} league={league} onDelete={handleDelete} />
        ))}
      </div>
      {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black bg-opacity-50"
        >
          {openDefaultImage && (
            <div className="z-50 w-full h-full absolute bg-black bg-opacity-50 flex justify-center items-center">
              <div className="relative w-2/3 h-3/4  bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex justify-between items-center p-4 border-b border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Select An Image
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={closeDefaultImages}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                      />
                    </svg>
                  </button>
                </div>
                <div className="w-full h-4/5">
                  <div className="p-3 h-full overflow-y-scroll flex justify-center gap-4 flex-wrap">
                    {defaultImages.map((image, index) => (
                      <SelectImage key={index} onclick={handleImageClick} image={image} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Create New League
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      League Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={newLeague.name}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter league name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      value={newLeague.description}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter description"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-10">
                    {imageId && (
                      <CldImage
                        className="rounded"
                        width="125"
                        height="125"
                        crop="fill"
                        src={imageId}
                        alt="Description of my image"
                      />
                    )}
                    <div
                      className={`${imageId ? "flex-col" : "gap-5"
                        } flex justify-end items-end`}
                    >
                      <div
                        className="flex items-center justify-center max-h-10 
                      border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 p-5 dark:bg-gray-600 
                      dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mt-3 gap-1"
                      >
                        <MdDriveFolderUpload
                          style={{ width: "25px", height: "25px" }}
                        />
                        <CldUploadButton
                          onSuccess={handleUploadSuccess}
                          uploadPreset="adrolie"
                        />
                      </div>
                      <div
                        className="flex items-center justify-center max-h-10 
                      border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 p-5 dark:bg-gray-600 
                      dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mt-3 gap-1"
                      >
                        <MdDriveFolderUpload
                          style={{ width: "25px", height: "25px" }}
                        />
                        <button type="button" onClick={openDefaultImages}>
                          Default
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-sidebar-light hover:bg-sidebar-light2 dark:hover:bg-sidebar-dark2 dark:bg-sidebar-dark focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Create League
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full mt-2 text-gray-700 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 border border-gray-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leagues;
