"use client"
import React, {useState} from "react"
import { createNewTeam } from "@/app/hub/actions";

const ModalCreateTeam = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return(
        <div>
            <div className="mb-3">
            <button
            className="bg-sidebar-light hover:bg-sidebar-light2 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsModalOpen(true)}>
                Create Team
            </button>
        </div>
        {isModalOpen && <div
            id="authentication-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        >
            <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Create New League
                </h3>
                <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setIsModalOpen(false)}
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
                <form className="space-y-4" action={createNewTeam}>
                    <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Team Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter description"
                        required
                    />
                    </div>
                    <button
                    type="submit"
                    className="w-full text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                    Create Team
                    </button>
                    <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full mt-2 text-gray-700 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 border border-gray-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                    Cancel
                    </button>
                </form>
                </div>
            </div>
            </div>
        </div>}
        </div>
    )
}

export default ModalCreateTeam