import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa6'
import useBlog from '../../hooks/useBlog'
import { FaEdit } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

const BlogContents = () => {
    const [userData, setUserData] = useState('')
    useEffect(()=>{
        fetch('http://localhost:3000/getUser', {
            method:"GET"
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log("getUSERDATA", data,userData)
            setUserData(data.data)
        })
    },[])
    //get blogs
    const [blog, refetch] = useBlog()
    const [blogCategory, setBlogCategory] = useState('')

    ///post like 

    const [like, setLike] = useState([])
    useEffect(()=>{
        fetch('http://localhost:3000/like')
        .then(res => res.json())
        .then(data => {
        console.log(data)
        setLike(data)
    })
    },[])
    console.log("LIKED BLOG",like)

    const handleAddLike = (like,item) =>{
        console.log("LIKED BLOG",like)
        console.log("USERDATA", userData)
        console.log("USERDAT EMAIL", like?.email)
        console.log("ITEM" , item)
        if(userData && like?.email){
           
            const cartItem = {like:like, item:item}
            console.log(cartItem)
            fetch('http://localhost:3000/like',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartItem)
                
            })
            .then(res=>res.json())
            .then((data)=> {
                console.log(data)
            })
       } else{
            
       }  
    }
  return (
    <div>
        <div className='flex justify-around mt-4'>
            <button>Мэдээ мэдэээлэл</button>
            <button>Үр үрсэлгээ</button>
            <button>Зөвлөгөө</button>
            <button>Тусламж</button>
            <button>Зар мэдээ</button>
        </div>
        <div className='grid grid-cols-4 grid-rows-2'>
        {
            blog.map((item,i)=> (
                <div key={i}>
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img src={item.image} alt="Shoes" className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <div className='flex justify-around w-full'>
                                <h2 className="card-title">{item.name}</h2>
                                <h2>Category : {item.category}</h2>
                            </div>
                            
                            <div className='flex w-full'>
                                <p className='text-left'>Description: {item.description}</p>
                            </div>
                            
                            <div className='w-full flex justify-between items-center bg-gray-100'>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: {item.price}</p>
                            </div>
                            <div className="w-full card-actions flex justify-between">
                            <button className="btn btn-primary" onClick={() => handleAddLike(item)}>Like</button>
                            <Link to={`/blog/${item._id}`} className='btn btn-primary'>Дэлгэрэнгүй</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))
           }
        </div>
    </div>
  )
}

export default BlogContents