'use client';

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = async (event) => {
    console.log(event)
    let val = event?.target?.value ?? event
    setSearchText(val)
    if(val.length > 0){
      const res = await fetch(`/api/search/${val}`, {
        method: 'GET',
      })
      const data = await res.json();
      setPosts(data)
    } else {
      fetchPosts()
    }
  }

  const fetchPosts = async () => {
    const res = await fetch('/api/prompt')
    const data = await res.json();
    setPosts(data)
  }
  useEffect(() => {
    fetchPosts();

  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type="text" placeholder='Search...' 
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer' />
      </form>

      <PromptCardList 
      data={posts}
      handleTagClick={handleSearchChange}
      />
    </section>
  )
}

export default Feed