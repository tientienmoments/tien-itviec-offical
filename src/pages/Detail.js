import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Badge,} from "react-bootstrap";



const apiAddress= process.env.REACT_APP_BACKEND_SERVER_URL

export default function Detail ({jobtitle, props}) {
    console.log("what is props",props)
    let {id}= useParams()
    let [job,setJob]= useState(null)

    
    let getDetailData = async () => {
        let url =`${apiAddress}/jobs/${id}`
        let response = await fetch (url)
        let result = await response.json()
        console.log("result",result)
        setJob(result)
    }
    
    useEffect (()=> {
            
        getDetailData()

    }, [])
 

    if ( job== null) {
        return<div>loading</div>
    }

    return (
        <div>
            <h1>Detail 
                <h3>{job.title}</h3>
                <p>{job.salary}</p>
                <p>{job.description}</p>
                <div>
                {job.tags.map((tag) => (
                  <Badge variant="secondary">
                    {tag}
                  </Badge>
                ))}
                </div>
                
                
            </h1>
        </div>
    )
}
