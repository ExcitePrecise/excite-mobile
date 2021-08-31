import useAxios from "../utils/axios/init";
import jwtDecode from "jwt-decode";

const InitialzePayment= async (code,tokenize)=>{
  console.log(code)
    try {
        const response = await useAxios.get(`/paystack/generate-payment?item=${code}`, {
            headers: {
              authorization: `Bearer ${tokenize}`,
            },
            
          },)
        const token = response.data;
        const decodedToken = jwtDecode(token)
        return {decodedToken,token:token}
    } catch (error) {
        console.log(error,'cannot generate payment')
     return null   
    }
  }

  export default InitialzePayment