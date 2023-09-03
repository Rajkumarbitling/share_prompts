import { connectToDB } from "@utils/database"
import User from "@models/user";
import { ObjectId } from "mongodb";

export const GET = async (req, { params }) => {
    try {
        await connectToDB()

        const user = await User.find({ _id: new ObjectId(params.id) });

        return new Response(JSON.stringify(user), {status: 201})
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch user", {status: 500})
    }
}