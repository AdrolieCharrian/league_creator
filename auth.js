import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"

const credentialsConfig = CredentialsProvider({
    name:"Credentials",
    credentials: {
        username: {
            label: "User Name"
        },
        password: {
            label: "Password",
            type: "password"
        }
    },
    // TO SIGN IN WITH CREDENTIALS EXISTING IN DATABASE
    async authorize(credentials) {
        if(credentials.username === "ac" && credentials.password === "123")
            return {
                name: "Adrolie"
        };
        else return null;
    }
})

const authConfig = {
    providers: [google, credentialsConfig]
};

export const {handlers, auth, signIn, signOut} = NextAuth(authConfig)