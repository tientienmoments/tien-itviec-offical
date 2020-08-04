import React, { useEffect, useState } from 'react'

import { useHistory, useLocation } from "react-router-dom";
import {Form, Row, Col, Button} from 'react-bootstrap'





function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const QUERYSTR_PREFIX = "q";
const apiAddress = process.env.REACT_APP_BACKEND_SERVER_URL

export default function Jobs() {
    let [originalJobs, setOriginalJobs] = useState([]);

    let query = useQuery();
    let [keyword, setKeyword] = useState(query.get(QUERYSTR_PREFIX));
     let [jobList, setJobList] = useState([])
    let history = useHistory()
    


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

    const handleSearch = (e) => {
        let filteredJobs = originalJobs;

        if (e) {
            e.preventDefault();
            history.push(`/jobs/?${QUERYSTR_PREFIX}=${encodeURIComponent(keyword)}`);
        }
        if (keyword) {
            filteredJobs = originalJobs.filter(job =>
                job.title.toLowerCase().includes(keyword.toLowerCase())
            );
        }
        setJobList(filteredJobs);
    };

    useEffect(() => {
        handleSearch();
    }, [originalJobs]);


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
                <Form onSubmit={handleSearch} >
                    <Form.Group as={Row}>
                        <Form.Label htmlFor="search" column sm={2}>
                            {" "}
                            {" "}
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control
                                id="search"
                                type="text"
                                // value={searchTerm}
                                // onChange={handleChange}
                                placeholder="Keyword skill(Java,IOS...),Job Title..."
                                onChange={(e) => setKeyword(e.target.value)}
                            ></Form.Control>
                        </Col>
                        <Button variant="outline-danger" style={{ fontWeight: "bold" }} type="submit">Submit</Button>
                    </Form.Group>
                </Form>
            </div>

            <div>
                <h1>hehe</h1>
                {jobList.map((job) => {
                    return <h3 onClick={() => getDetail(job.id)}>{job.title}</h3>
                })}
            </div>

        </div>
    )
}
