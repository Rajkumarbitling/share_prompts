import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt) return new Response("Prompt not Found!", {status: 404});
        
        return new Response(JSON.stringify(prompt), {status: 201})
    } catch (error) {
        return new Response("Failed to fetch prompt", {status: 500})
    }
}

// PATCH (update)

export const PATCH = async (req, { params }) => {
    const {prompt, tag} = await req.json();
    try {
        await connectToDB();
        let existingPrompt = await Prompt.findById(params.id).populate('creator');
        if(!existingPrompt) return new Response("Prompt not Found!", {status: 404});

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        console.log(existingPrompt)
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status: 201});
        
    } catch (error) {
        return new Response("Failed to update prompt", {status: 500})
    }
}

// DELETE (delete)

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id)

        return new Response("Prompt deleted successfully!", {status: 201});
    } catch (error) {
        return new Response("Failed to delete prompt", {status: 500});
    }
}