import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        let searchText = params.searchText;
        let search = new RegExp(searchText, "i");
        let find = {}
        if(searchText !== undefined || searchText !== "" ){
            // console.log(search)
            find = {
                $or: [
                    {'creator[0].username': search},
                    {tag: search},
                    {prompt: search},
                ]
            }
        }
        
        const aggregate = await Prompt.aggregate([
            {
              $lookup: {
                from: "users",
                localField: "creator",
                foreignField: "_id",
                as: "creator",
              },
            },
            {
              $limit: 10
            },
            {
                $match: {...find}
            }
          ])

        // const prompts = await Prompt.find(find).populate('creator');

        let filtered = aggregate.map(item => {
                item.creator = item.creator[0]
                return item
            })
        return new Response(JSON.stringify(filtered), {status: 201})
    } catch (error) {
        console.log(error)
        return new Response("Failed to search", {status: 500})
    }
}