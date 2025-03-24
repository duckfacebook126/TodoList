import axios from "axios";

export const axiosInstance =axios.create(

    {
        baseURL:"http://localhost:5006/api",
        withCredetails:true
    }
);
//will be used to send  some requests to the using zustand which required auth and data sharing