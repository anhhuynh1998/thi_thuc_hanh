import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TuorService from "../../service/tuorService";
import Swal from "sweetalert2";
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"

const EditTour = () => {
    const {tourId} = useParams();
    const [updateTour,setUpdateTuor] = useState({})
    const back = useNavigate();
    useEffect(() =>{
        try {
            async function getTourById(){
                let tuorById = await TuorService.getTourById(tourId);
                setUpdateTuor(tuorById.data)
            }
            getTourById()
        } catch (error) {
            
        }
    },[tourId])

    const editSchema = yup.object({
        name: yup.string()
            .required("Vui Lòng Nhập Tên")
            .min(5, "Tên Phải Từ 5 Kí Tự "),
        // .max(30, "Tên Phải Ít Hơn 30 Kí Tự "),
        price: yup.number()
            .required("Vui Lòng Nhập Giá")
            .positive(),
        description: yup.string()
            .required("Vui Lòng Nhập Mô tả")
            .max(30, "Mô tả Phải hơn 10 ký tự ")
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(editSchema),
        values : updateTour
    });
    console.log(updateTour);
   

    const updateTourById = async (setValue) =>{
        try {
            await TuorService.updateTourById(tourId,setValue)
            setUpdateTuor(setValue)
            Swal.fire({
                position: 'center',
            icon: 'success',
            title: 'Cập Nhật Thành Công !',
            showConfirmButton: false,
            timer: 1500
            })
            back("/")
        
        } catch (error) {
            
        }
    }   
    return(
        <div className="container d-flex justify-content-center">
        <div className="row col-md-4 rounded mt-5" id="formAddStudent">
            <h2 className="text-primary text-center mt-4">Edit Tour</h2>
            <form onSubmit={handleSubmit(updateTourById)}>
                <div className="form-group mb-3 ">
                    <label className="label-form">Name</label>
                    <input type="text" name="" id=""
                        className={`${errors?.name?.message ? 'form-control is-invalid' : 'form-control'}`}
                        {...register('name')}
                    />
                    <span className="invalid-feedback" >{errors?.name?.message}</span>
                </div>
                <div className="form-group mb-3 ">
                    <label className="label-form">Giá</label>
                    <input type="number" name="" id=""
                        className={`${errors?.age?.message ? 'form-control is-invalid' : 'form-control'}`}
                        {...register('price')} />
                    <span className="invalid-feedback">{errors?.price?.message}</span>
                </div>
                <div className="form-group mb-3 ">
                    <label className="label-form">Description</label>
                    <input type="text" name="" id=""
                        className={`${errors?.description?.message ? 'form-control is-invalid' : 'form-control'}`}
                        {...register('description')} />
                    <span className="invalid-feedback">{errors?.description?.message}</span>
                </div>
            
                <div className="d-flex justify-content-center mb-3">
                        <button type="submit" className="btn btn-danger me-3">Update</button>
                        <button type="button" className="btn btn-success"
                            onClick={() => reset()}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default EditTour;