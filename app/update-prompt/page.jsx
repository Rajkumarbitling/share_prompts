'use client';
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id")

    const updatePrompt = async (e) => {
        e.preventDefault();
        setsSubmitting(true);

        if(!promptId) return alert('Prompt ID not found')
    
        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify(post)
            })
    
            if(res.ok){
                router.push('/profile')            
            }
        } catch (error) {
            console.log(error)
        } finally {
            setsSubmitting(false);
        }
    }

    useEffect(() => {
        if(promptId) fetchPrompt()
    }, [promptId]);

    const fetchPrompt = async () => {
     try {
        const response = await fetch(`/api/prompt?id=${promptId}`,{
            method: "GET",
        })
        const prompt = await response.json();
        if(!prompt) return new Response("Failed to fetch prompt!", {status: 404});

        setPost(prev => {
            return {...prev, ...prompt[0]}
        })
     } catch (error) {
        return new Response("Failed to fetch Prompt", {status: 500})
     }   
    }

    const [submitting, setsSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });
  return (
    <Form 
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt