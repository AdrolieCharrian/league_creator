import React from "react"
import Link from "next/link"
import Carousel from "../components/Carousel";
import DarkButton from "../components/DarkButton";
import "../components/home.css";
import "../globals.css"

const About = () => {
    return (
        <div className="w-100 h-100 flex flex-col">
            <nav className="bg-sidebar-light2 dark:bg-sidebar-dark2 dark:text-white w-full h-full text-xl p-6 flex items-center justify-between sm:text-3xl ">
                <ul className="flex justify-center items-center">
                    <li className="">
                        <Link href="/">HOME</Link>
                    </li>
                </ul>
                <div className="flex gap-4">
                    <DarkButton />
                    <button className="">
                        <Link className="" href="/login">
                            LogIn / SignIn
                        </Link>
                    </button>
                </div>
            </nav>
            <div className="w-100 h-100 bg-sidebar-light dark:bg-sidebar-dark">
                <div className="relative flex items-center justify-center">
                    <Carousel />
                </div>
                <div className="w-100 h-100 p-4 sm:p-8 sm:pt-6 xl:p-16 xl:pt-8">
                    <div className="text-white mb-8 xl:mb-16">
                        <p className="text-xl mb-2 md:text-4xl text-center">
                            Welcome to League Manager!
                        </p>
                        <p className="text-sm md:text-xl text-center">We created for you a new tool to create and manage leagues and teams.
                            Designed to work with any sports, esports or games of your liking.</p>
                    </div>
                    <div className="text-white mb-3 xl:mb-8">
                        <p className="mb-1 md:text-xl">Step 1</p>
                        <p className="text-xs md:text-base">Create your account and fill in your info, or log in with your google account.
                            You can change your info in your profile.
                        </p>
                    </div>
                    <div className="text-white mb-3 xl:mb-8">
                        <p className="mb-1 md:text-xl">Step 2</p>
                        <p className="text-xs md:text-base">Start by creating a new league to compete with friends or the people that wish to participate in,
                            you will be in charge of administrating that league.
                        </p>
                    </div>
                    <div className="text-white mb-3 xl:mb-8">
                        <p className="mb-1 md:text-xl">Step 3</p>
                        <p className="text-xs md:text-base">Go to the league settings tab and invite any player with an account that wants to participate in the league.
                        </p>
                    </div>
                    <div className="text-white mb-3 xl:mb-8">
                        <p className="mb-1 md:text-xl">Step 4</p>
                        <p className="text-xs md:text-base">From this point, any player can go ahead and create teams that will take part in the league, but ultimately,
                            only the league admin can manage the assignment of players to a team.
                        </p>
                    </div>
                    <div className="text-white mb-3 xl:mb-8">
                        <p className="mb-1 md:text-xl">Step 5</p>
                        <p className="text-xs md:text-base">You can now start arranging the categories and sports which every team will be competing in.
                            You will be able to add different sports and games from the league settings tab.
                        </p>
                    </div>
                    <div className="text-white mb-3">
                        <p className="mb-1 md:text-xl">Last Step</p>
                        <p className="text-xs md:text-base">After everything is ready to go, all you have to do is generate all the games that will
                            take place in the "matches" tab. Whenever the winner is decided you just have to select which team won and the
                            leaderboard will update itself.
                        </p>
                    </div>
                </div>
            </div>
            <footer className="bg-sidebar-light2 dark:bg-sidebar-dark2 dark:text-white w-full h-full text-xl p-6 flex items-center justify-center sm:text-3xl">
                Have Fun!
            </footer>
        </div>
    )
}

export default About