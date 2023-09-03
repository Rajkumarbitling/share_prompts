'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get('id')
    const { data: session } = useSession()
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    let id = userId || session?.user.id

    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {
      const hasConfirmed = confirm("Are you sure want to delete prompt?")

      if(hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: 'DELETE'
          })
          const filteredPosts = posts.filter(p => p._id !== post._id)
          setPosts(filteredPosts);

        } catch (error) {
          console.log(error)
        }
      }
    }

    useEffect(() => {
      
      const fetchUser = async () => {
          const res = await fetch(`/api/users/${id}`)
          const data = await res.json();
          setUser(data)
      }
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${id}/posts`)
            const data = await res.json();
            setPosts(data)
        }
        if(userId) fetchUser();
        if(id) fetchPosts();
        console.log(user)
    }, [id]);
    console.log(user)
    
  return (
    <Profile 
        name={posts?.[0]?.creator?._id !== session?.user.id ? (user?.[0]?.username ?? "My") : "My"}
        desc="Welcome to your personalised profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile