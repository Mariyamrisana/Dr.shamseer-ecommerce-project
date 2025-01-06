const mongoose = require ('mongoose');

const connectDatabase = async () => {
    try{
        const db=process.env.MONGO_URI;
        console.log('database',db);
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected Successfully');
    }catch (error){
        console.error('MongoDB connection failed:',error.message);
        process.exit(1);
    }
};

module.exports = { connectDatabase };