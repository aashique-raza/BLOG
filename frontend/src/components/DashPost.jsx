
import { useSelector } from 'react-redux';
import React,{useState,useEffect} from 'react'
import { Table } from 'flowbite-react';
import {Link} from 'react-router-dom'

function DashPost() {
    const [error,setError]=useState(null)
    const[loading,setLoading]=useState(false)
    const { UserData } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    // console.log(userPosts);
    useEffect(() => {
      const fetchPosts = async () => {
        setLoading(true)
        setError(null)
        try {
          const res = await fetch(`/api/post/getposts?userId=${UserData._id}`);
          const data = await res.json();
          if(data.success===false){
            setLoading(false)
            return setError(data.msg)
          }

          if (data.posts.length < 9) {
            setShowMore(false);
          }
            setUserPosts(data.posts);
            setLoading(false)
          
        } catch (error) {
            setError('something went wrong')
          console.log(error.message);
        }
      };
      if (UserData.isAdmin) {
        fetchPosts();
      }
    }, [UserData._id]);


    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            setLoading(true)
          const res = await fetch(
            `/api/post/getposts?userId=${UserData._id}&startIndex=${startIndex}`
          );
          const data = await res.json();
          if (data.success===false) {
            setLoading(false)
           return setError(data.mdg)
            
          }
          setLoading(false)
          setUserPosts((prev) => [...prev, ...data.posts]);
            if (data.posts.length < 9) {
              setShowMore(false);
            }
        } catch (error) {
            setLoading(false)
            setError('something went wrong')
          console.log(error.message);
        }
      };



  return (

    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
  {loading ? (
    <h2 className='text-center text-red-400 font-mono uppercase'>loading...</h2>
  ) : (
    UserData.isAdmin && userPosts.length > 0 ? (
      <>
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Date updated</Table.HeadCell>
            <Table.HeadCell>Post image</Table.HeadCell>
            <Table.HeadCell>Post title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          {userPosts.map((post) => (
            <Table.Body className='divide-y' key={post._id}>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className='w-20 h-10 object-cover bg-gray-500'
                    />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    className='font-medium text-gray-900 dark:text-white'
                    to={`/post/${post.slug}`}
                  >
                    {post.title}
                  </Link>
                </Table.Cell>
                <Table.Cell>{post.category}</Table.Cell>
                <Table.Cell>
                  <span className='font-medium text-red-500 hover:underline cursor-pointer'>
                    Delete
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    className='text-teal-500 hover:underline'
                    to={`/update-post/${post._id}`}
                  >
                    <span>Edit</span>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
      </>
    ) : (
      <p>You have no posts yet!</p>
    )
  )}
</div>

);
  
  
}

export default DashPost