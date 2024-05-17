// "use server";
// import prisma from "@/app/lib/prisma";
// import jwt from "jsonwebtoken";

// export const getLeaguesFromUser = async (userInfo) => {
//   const { emailuser } = userInfo;

//   const leagues = await prisma.leagues.findUnique({
//     where: {
//       email:emailuser
//     },
//   });

//   return leagues;
// };
