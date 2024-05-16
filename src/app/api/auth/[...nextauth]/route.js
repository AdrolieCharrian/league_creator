import { handlers } from "auth";
import { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"

export const { GET, POST } = handlers;


// export async function GET(req, res) {
//     console.log(req)
//     return res
// }