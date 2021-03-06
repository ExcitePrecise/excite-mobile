import useAxios from "../utils/axios/init";
import { rememberToken } from "../utils/axios/token";

// .........................
// Api
const authLogin = async(email,password)=>{
    try {
        const response = await useAxios.post('/auth/mobile',{email,password});
        const {token,profile} = response.data;
        if(token){
            return {token,profile}
        }else{
            return null
        }
    } catch (error) {
        return null
    }
 
}

const authSignUp = async (data)=>{
    try {
        const response = await useAxios.post('/auth/mobile/merchant-ref-agent',{...data});
        // console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
    // try {
    //     const response = await useAxios.post('/auth/sign-up',{...data});
    //     // console.log(response.data)
    //     return response.data
    // } catch (error) {
    //     console.log(error)
    //     return null
    // }
}

const getProfileInfo=async (token)=>{
    try {
        const response = await useAxios.get('/app/profile/get/profile/email',{headers:{
            authorization:`Bearer ${token}`
        }});
        // console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}
// ........................


export {authLogin,authSignUp,getProfileInfo}