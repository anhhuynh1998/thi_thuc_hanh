import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TuorService from "../../service/tuorService";
import Spinner from "../layout/Spinner";

const TourDetail = () => {
    const {tourId} = useParams();
    const [tourDetail,setTourDetail] = useState({});
    const [loading,setLoading] = useState(false);

    useEffect(() =>{
        try {
            setLoading(true)
            async function getTourDetailById(){
                let tourDetailById = await TuorService.getTourById(tourId)
                setTourDetail(tourDetailById.data)
                setLoading(false)
                console.log(tourDetailById);
            }
            getTourDetailById()
        } catch (error) {
            
        }
    },[tourId])

    const {name,price,description } = tourDetail;
    return (
        <div className="container">
            <section>
                <div className="d-flex align-items-center">
                    <h3 className="text-primary me-3">Tour Detail</h3>
                    <Link className="btn btn-sm btn-outline-primary" to={"/tour/list"}>
                        <i className="fa fa-arrow-left me-2" />
                        Back To Tour List
                    </Link>
                </div>
                <p className="fst-italic">Sit sint eiusmod reprehenderit nulla sunt incididunt.</p>
            </section>
            <section>
                {
                    loading ? <Spinner/> : (
                        <div className="card row col-md-5">
                            <div className="card-header">{name}</div>
                            <div className="card-body">
                                <p>Giá: {price}</p>
                                <p>Description: {description}</p>
                            </div>
                        </div>
                    )
                }
            </section>
        </div>
    )
}
export default TourDetail;