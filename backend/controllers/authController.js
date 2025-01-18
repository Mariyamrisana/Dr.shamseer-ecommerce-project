const User = require ('../models/User');
const bcrypt = require ('bcryptjs');
const generateToken = require ('../utils/generateToken');

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

console.log('admin values: ',adminEmail,adminPassword);



//Signup
const signup = async (req,res) => {
    try{
        const {firstName,lastName,phoneNumber,email,password,role} = req.body;
        console.log(req.body);
        

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password,10);
        
        //new user
        const user = new User({
            firstName,
            lastName,
            phoneNumber,
            email,
            password:hashedPassword,
            role:'user'
        });
        await user.save();

        const token = generateToken(user);

        res.status(200).json({message:'User registered successfully',token,user})
    }catch(error){
        res.status(500).json({message:'Error adding user',error})
    }
}


//login
const login = async (req,res) => {
    try{
        console.log('logged in');
        
        // const { email,password } = req.body;

        // const user = await User.findOne({email});
        // if(!user){
        //     if(email === adminEmail && password === adminPassword){
        //         const hashedPassword = await bcrypt.hash(password,10);
        //         user = new User({
        //             name:'Admin',
        //             email:adminEmail,
        //             password:hashedPassword,
        //             role:'admin'
        //         });
        //         await user.save();
        //     }else{
        //         return res.status(400).json({message:'user doenot exist'});
        //     }
        // }

        // const isPasswordValid = await bcrypt.compare(password,user.password);
        // if(!isPasswordValid){
        //     return res.status(401).json({message:'Invalid credentials'});
        // }

        // //token
        // const token = generateToken(user);

        // res.status(200).json({message:'Login successfull',user});
    }catch(error){
        res.status(500).json({message:'Error during login',error})
    }
}

module.exports = {signup,login}