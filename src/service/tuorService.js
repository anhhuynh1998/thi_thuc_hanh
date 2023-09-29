import axios from "axios";
class TuorService {
    static getTourAlls() {
        return axios.get('https://6512388bb8c6ce52b39568ba.mockapi.io/tour')
    }
    static getTourById(tourId) {
        return axios.get(`https://6512388bb8c6ce52b39568ba.mockapi.io/tour/${tourId}`)
    }
    static createTour(data){
        return axios.post('https://6512388bb8c6ce52b39568ba.mockapi.io/tour',data)
    }
    static updateTourById(tourId,data){
        return axios.put(`https://6512388bb8c6ce52b39568ba.mockapi.io/tour/${tourId}`,data)
    }
    static deleteTourById(tourId){
        return axios.delete(`https://6512388bb8c6ce52b39568ba.mockapi.io/tour/${tourId}`)
    }
}
export default TuorService