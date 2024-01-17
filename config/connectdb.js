import mongoose from 'mongoose';

const connectDB = async (DATABASE_URL) =>{
    try{
        const DB_OPTIONS = {
            dbName: "ExpressAuthJWTAPI"
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS)
        console.log('Connected Successfully to database...')
    }catch(error){
        console.log(error)
    }
}

export default connectDB