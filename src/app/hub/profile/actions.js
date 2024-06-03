"use server"
import jwt from "jsonwebtoken";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import {NextResponse} from "next/server";

export const saveProfile = async (formData) => {
    const email = formData.get("email")
    const name = formData.get("name")
    const surname = formData.get("surname")
    const username = formData.get("username")
    const description = formData.get("description")
    const password = formData.get("password")
    const confirm = formData.get("confirm")

    if (password && password == confirm) {
        try {
            //create deafault salt
            const salt = bcrypt.genSaltSync(10);
            //create new hash with the password feom request (pass+salt)
            const hash = bcrypt.hashSync(password, salt);
            //convert to string
            const passwordString = JSON.stringify({hash, salt});

            const updatedUser = await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    username: username,
                    password: passwordString,
                    name: name,
                    surname: surname,
                    description: description
                }
            })
            const token = jwt.sign(
                {
                    id: updatedUser.id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    surname: updatedUser.surname,
                    username: updatedUser.username,
                    image: updatedUser.image,
                    description: updatedUser.description
                },
                "1234"
            );
            console.log(token);
            
            // Set token in cookie
            cookies().set("access-token", token);
            console.log(NextResponse.json({updatedUser}));
            console.log("Updated User");
        } catch(error) {
            console.error(error);
            return NextResponse.error("Error updating user");
        }
        redirect("/hub/profile");
    } else if (!password) {
        try {
            const updatedUser = await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    username: username,
                    name: name,
                    surname: surname,
                    description: description
                }
            })
            const token = jwt.sign(
                {
                    id: updatedUser.id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    surname: updatedUser.surname,
                    username: updatedUser.username,
                    image: updatedUser.image,
                    description: updatedUser.description
                },
                "1234"
            );
            console.log(token);
            
            // Set token in cookie
            cookies().set("access-token", token);
            console.log(NextResponse.json({updatedUser}));
            console.log("Updated User");
        } catch(error) {
            console.error(error);
            return NextResponse.error("Error updating user");
        }
        redirect("/hub/profile");
    } else {
        console.error("passwords don't match");
    }
}

export const saveProfileGoogle = async (formData) => {
    const email = formData.get("email")
    const username = formData.get("username")
    const name = formData.get("name")
    const surname = formData.get("surname")
    const description = formData.get("description")
        try {
            console.log(email)
            const updatedUser = await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    name: name,
                    surname: surname,
                    username: username,
                    description: description
                }
            })
            console.log(NextResponse.json({updatedUser}));
            console.log("Updated User");
        } catch(error) {
            console.error(error);
            return NextResponse.error("Error updating user");
        }
}