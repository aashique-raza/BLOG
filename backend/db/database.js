
import mongoose from "mongoose";


const dbConnection=async(url)=>{

    try {
        const result=await mongoose.connect(url)
        // console.log(`db connected sucessfuly ${result.connections[0].host}`)
        if(result.connections[0].host){
            console.log(`db connected sucessfuly ${result.connections[0].host}`)
        }
        
    } catch (error) {
        console.log(`db connection failed ${error}`)
    }
}


export default dbConnection