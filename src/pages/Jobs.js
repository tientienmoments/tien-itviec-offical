import React, { useEffect, useState } from 'react'

import { useHistory, useLocation } from "react-router-dom";
import { Form, Row, Col, Button, Badge } from 'react-bootstrap'

import Moment from 'react-moment'


//muc dich de the hien ra ket quar khi co duong dan truc tiep
//nen su dung usequery

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const QUERYSTR_PREFIX = "q";


const apiAddress = process.env.REACT_APP_BACKEND_SERVER_URL

export default function Jobs() {
    let [originalJobs, setOriginalJobs] = useState([]);

    let query = useQuery();
    let [keyword, setKeyword] = useState(query.get("q"));   //get query value... after the the q= .. muc dich.. thuc hien chuc nang search truc tiep khi co keyword , dong thoi load page
    let [jobList, setJobList] = useState([])
    let history = useHistory()

    useEffect(()=>{
        setKeyword(query.get("q"))
    },[query.get("q")])

    const getData = async () => {
        try {
            let url = `${apiAddress}/jobs`
            let response = await fetch(url)
            let result = await response.json()
            console.log("result", result)
            setOriginalJobs(result);
        } catch (err) {
            console.log("err", err.message)
        }

    }


    const getDetail = (id) => {
        history.push(`/jobs/${id}`)
    }

//tao chuc nang search tu querry

    const handleSearch = (e) => {
        let filteredJobs = originalJobs;

        if (e) {
            e.preventDefault();
            history.push(`/jobs/?q=${keyword}`);
        }
        if (keyword) {    //neu co keyword tu path,, thuc hien chuc nang search... neu khong co key word,, go directly to page
            filteredJobs = originalJobs.filter(job =>
                job.title.toLowerCase().includes(keyword.toLowerCase())
            );
        }
        setJobList(filteredJobs);
    };

    useEffect(() => {                   //thuc hien chuc nang search tren original list
        handleSearch();  
    }, [originalJobs]); 
    
    useEffect(()=>{
        if(!keyword){
            handleSearch()
    };
},[keyword])

    console.log('huhuhuhu', keyword)                //

    useEffect(() => {
        console.log("hehehe")
        getData()
    }, [])



    if (jobList.lenght === 0) {
        return <h1>Loading</h1>     //cliploader here
    }


    return (
        <div>
            <div>
                <Form onSubmit={handleSearch} style={{ margin: "40px" }} >
                    <Form.Group as={Row}>
                        <Form.Label htmlFor="search" column sm={2}>
                            {" "}
                            {" "}
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control
                                id="search"
                                type="text"
                                
                                placeholder="Keyword skill(Java,IOS...),Job Title..."
                                onChange={(e) => setKeyword(e.target.value)}
                            ></Form.Control>
                        </Col>
                        <Button variant="outline-danger" style={{ fontWeight: "bold", height: "40px", width: "90px" }} type="submit">Submit</Button>
                    </Form.Group>
                </Form>
            </div>

            <div className="card-style">

                <div className="multi-cards">

                    {jobList.map((job) => {
                        return <button className="cards-style-detail" onClick={() => getDetail(job.id)}>
                            <Row style={{ width: "790px", height: "290px", marginLeft: "1px" }}>
                                <Col sm={3} className="logo-side">
                                    <img src={job.img} alt="logo" style={{ borderRadius: "50px", marginBottom: "30px", marginTop:"10px" }} />
                                    <Button variant="light" style={{ fontWeight: "bold", height: "40px", width: "130px", }}>{job.city}</Button>
                                    <Button variant="light" style={{ fontWeight: "bold", height: "40px", width: "130px" }}>District: {job.district}</Button>
                                    <p style={{marginBottom:"10px"}}><Moment fromNow>{job.time}</Moment></p>

                                </Col>
                                {/* {job.isHotjob ? (
                                    <div className="hotjob-label">Hot Job</div>
                                ) : (
                                        <div></div>
                                    )} */}

                                <Col style={{ borderLeft: "0.5px solid rgb(209, 209, 209)" }} sm={9}>
                                    <h4>{job.title}<span> {job.isHotjob ? (<Badge pill variant="danger">
                                        Hot
                                    </Badge>):(<div></div>)}</span></h4>

                                    <hr></hr>
                                    <div >
                                        <h4 style={{ textAlign: "right" }}>{job.salary} $</h4>
                                        <h4 style={{ textAlign: "left" }}>Benefits</h4>
                                        <ul style={{ textAlign: "left" }}>{job.benefits.map((benefit) => { return <li>{benefit}</li> })}</ul>
                                        <h5 style={{ textAlign: "left" }}>{job.tags.map((tag) => { return <Badge pill variant="secondary" style={{ margin: "5px" }}>{tag} </Badge> })}</h5>


                                    </div>



                                </Col>
                            </Row>
                        </button>
                    })}


                </div>




            </div>

        </div>
    )
}
