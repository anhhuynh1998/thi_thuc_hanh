import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import TuorService from "../../service/tuorService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const registerSchema = yup.object({
    name: yup.string()
        .required("nhập  họ và tên vào bạn ơi!!"),
    price: yup.mixed()
        .required()
        .test("valid-mark", "Invalid Mark", (value) => {
            if (value === undefined || value === null) return false;
            const parsedValue = parseFloat(value);
            return !isNaN(parsedValue) && /^\d+(\.\d{1})?$/.test(value);
        })
   
})

const CreateTourForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(registerSchema)
    })
    const handleSubmitForm = async (data) => {
        const response = await TuorService.createTour(data)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thêm Mới Thành Công !',
            showConfirmButton: false,
            timer: 1500
        })
        navigate("/");
        console.log(response.data);
    }
    return (
        <div className="container d-flex justify-content-center">
            <div className="row col-md-6 rounded">
                <h3 className="fw-boder text-center mt-5">Register Tour Form</h3>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <div className="form-group mb-3">
                        <label className="lable-form">Name</label>
                        <input type="text" className="form-control" {...register("name")} />
                        <span className="text-danger">{errors?.name?.message}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label className="lable-form">Giá</label>
                        <input type="number" className="form-control" {...register("price")} />
                        <span className="text-danger">{errors?.price?.message}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label className="lable-form">Description</label>
                        <input type="text" className="form-control" {...register("description")} />
                    </div>
                    <div className="form-group mb-3">
                        <button type="submit" className="btn btn-sm btn-success me-3">Create</button>
                        <button type="button" className="btn btn-sm btn-dark"
                            onClick={() => reset()}
                        >Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CreateTourForm;