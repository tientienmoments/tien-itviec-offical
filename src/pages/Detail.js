import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Badge, Button, Row } from "react-bootstrap";



const apiAddress = process.env.REACT_APP_BACKEND_SERVER_URL

export default function Detail({ jobtitle, props }) {
    console.log("what is props", props)
    let { id } = useParams()
    let [job, setJob] = useState(null)


    let getDetailData = async () => {
        let url = `${apiAddress}/jobs/${id}`
        let response = await fetch(url)
        let result = await response.json()
        console.log("result", result)
        setJob(result)
    }

    useEffect(() => {

        getDetailData()

    }, [])


    if (job == null) {
        return <div>loading</div>
    }

    return (
        <div>
            <div className="container wrapper d-flex justify-content-center">


                <div className="card-w">
                    <div className="card inset">

                        <div className="card__text">
                            <h4>{job.title}</h4>
                            <h5>Salary: {job.salary} $</h5>
                            <h5>Job's Detail:</h5>
                            <p>{job.description}</p>
                            <Row className="apply-style">
                            <h5>
                                {job.tags.map((tag) => (
                                    <Badge variant="secondary" style={{margin:"5px"}}>
                                        {tag}
                                    </Badge>
                                ))}
                            </h5>
                            <Button variant="light" style={{height:"50px", width:"120px"}}>APPLY</Button>
                            </Row>

                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}
