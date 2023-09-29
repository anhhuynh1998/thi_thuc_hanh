import React, { useEffect, useState } from "react";
import TuorService from "../../service/tuorService";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Swal from "sweetalert2";

const TourList = () => {
    

    const [tuorList, setTuorList] = useState([]);
    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            setLoading(true);
        async function getTourList() {
            let response = await TuorService.getTourAlls()

            setTuorList(response.data);
            setLoading(false)
            console.log(response);
        }
        getTourList();

            
        } catch (error) {
            
        }
     
    }, [])

    const deleteTourById = async(tourId) =>{
        try {
            await TuorService.deleteTourById(tourId)
            Swal.fire({
                position: 'center',
            icon: 'success',
            title: 'xóa Thành Công !',
            showConfirmButton: false,
            timer: 1500
            })
            setTuorList((tuorList) =>tuorList.filter((tuorList)=> tuorList.id !== tourId))
        } catch (error) {
            
        }
    }

    return (

        <div className="container">
            <section>
                <div className="d-flex align-items-center">
                    <h3 className="text-warning me-3">Tour List</h3>
                    <button className="btn btn-sm btn-outline-success">
                        <Link to={`/tour/create`}>
                        <i className="fa fa-plus me-2" />
                        Add Tour
                        </Link>
                    </button>
                </div>
                <p className="fst-italic">Deserunt ut pariatur tempor aute incididunt Lorem esse. </p>
            </section>
            <section className="mt-2">
                {
                    loading ? <Spinner /> : (
                        <div>
                            <table className="table table-striped table-hover">
                                <thead className="table-warning">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Giá</th>
                                        <th>Actionts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tuorList?.length && tuorList?.map((tour) => (
                                            <tr>
                                                <td>{tour.id}</td>
                                                <td>{tour.name}</td>
                                                <td>{tour.price}</td>
                                                <td>
                                                    <Link to={`/tour/detail/${tour.id}`}>Detail</Link>
                                                </td>
                                                <td>
                                                    <Link to={`/tour/edit/${tour.id}`}>
                                                    <i role="buton" className="fa fa-edit me-3 btn btn-outline-success" />
                                                    </Link>
                                                </td>
                                                <td>
                                                <i role="button" className="fa fa-trash me-1 btn btn-outline-danger"
                                                onClick={() => deleteTourById(tour.id)} />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                }
            </section>
        </div>
    )
}

export default TourList;