import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@utils/database";
import User from "@models/user";

const generateValidUsername = (name) => {
    // Replace spaces and ensure username is alphanumeric
    let baseUsername = name.replace(/\s+/g, "").toLowerCase();

    // Ensure the username is between 8-20 characters
    if (baseUsername.length < 8) {
        baseUsername = baseUsername.padEnd(8, "0"); // Pad with 0s if too short
    } else if (baseUsername.length > 20) {
        baseUsername = baseUsername.substring(0, 20); // Truncate if too long
    }

    // Return the generated base username
    return baseUsername;
};

const Handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    callbacks: {
        async signIn({ profile }) {
            try {
                await connectToDB(); // Ensure MongoDB connection is established

                // Check if user already exists
                const userExist = await User.findOne({
                    email: profile.email
                });

                // If user does not exist, create one
                if (!userExist) {
                    let generatedUsername = generateValidUsername(profile.name);

                    // Check if the generated username already exists
                    let usernameExists = await User.findOne({
                        username: generatedUsername
                    });

                    // If the username exists, append a random number to make it unique
                    while (usernameExists) {
                        const randomSuffix = Math.floor(Math.random() * 10000); // Generate random number
                        generatedUsername = `${generatedUsername.substring(0, 16)}${randomSuffix}`; // Adjust length and append random number

                        usernameExists = await User.findOne({
                            username: generatedUsername
                        });
                    }

                    // Create the new user with a unique, valid username
                    await User.create({
                        email: profile.email,
                        username: generatedUsername, // Set the unique, valid username
                        image: profile.picture // Assuming 'picture' is correct
                    });
                }

                return true; // Return true for successful sign in
            } catch (error) {
                console.error("Sign in callback error:", error);
                return false; // Return false for unsuccessful sign in
            }
        }
    }
});

export { Handler as GET, Handler as POST };
