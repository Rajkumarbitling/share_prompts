'use client';
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession()

    const createPrompt = async (e) => {
        e.preventDefault();
        setsSubmitting(true);
    
        try {
            const res = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                   prompt: post.prompt,
                   userId: session?.user.id,
                   tag: post.tag, 
                })
            })
    
            if(res.ok){
                router.push('/')            
            }
        } catch (error) {
            console.log(error)
        } finally {
            setsSubmitting(false);
        }
    }
    const [submitting, setsSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });
  return (
    <Form 
    type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt