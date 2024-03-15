import React, { useEffect, useState } from 'react'
import useBlog from '../hooks/useBlog';



const Stats = ({userData}) => {
  const [menu, setMenu] = useState([]);
const [filteredItems, setFilteredItems] = useState([]);
useEffect(()=>{
    //fetch data
    const fetchData = async()=> {
        try{
            const response = await fetch('http://localhost:3000/menu2');
            const data = await response.json();
            console.log(data)
            setMenu(data)
            setFilteredItems(data)
        }catch(err){
            console.log("Error fetching data", err)
    }
}
//call the function
fetchData()
},[])
  const [menu2, setMenu2] = useState([]);
const [filteredItems2, setFilteredItems2] = useState([]);
  useEffect(()=>{
    //fetch data
    const fetchData = async()=> {
        try{
            const response = await fetch('http://localhost:3000/menu');
            const data = await response.json();
            console.log('field plants', data)
            setMenu2(data)
            setFilteredItems2(data)
        }catch(err){
            console.log("Error fetching data", err)
    }
}
//call the function
fetchData()
},[])

const [getallcarts, setGetallcarts] = useState([]);
useEffect(()=>{
  //fetch data
  const fetchData = async()=> {
      try{
          const response = await fetch('http://localhost:3000/getallcarts');
          const data = await response.json();
          console.log('field plants', data)
          setGetallcarts(data)
      }catch(err){
          console.log("Error fetching data", err)
  }
}
//call the function
fetchData()
},[])

//get BLOG
const [blog, refetch] = useBlog()

  return (
    <div>
        <div className="stats stats-vertical lg:stats-horizontal shadow">
  
            <div className="stat">
              <div className="stat-title">Total Blog</div>
              <div className="stat-value">{blog.length}</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>

            <div className="stat">
              <div className="stat-title">Total All Users Number</div>
              <div className="stat-value">{userData.length}</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>

            <div className="stat">
              <div className="stat-title">Total in Cart Product</div>
              <div className="stat-value">{getallcarts.length}</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>
            
            <div className="stat">
              <div className="stat-title">Total Garden Products</div>
              <div className="stat-value">{menu.length}</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
            <div className="stat">
              <div className="stat-title">Total Field Products</div>
              <div className="stat-value">{menu2.length}</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
            
          </div>
    </div>
  )
}

export default Stats