import { Request, Response } from "express";
import User from "../models/user";



const getCurrentUser = async (req:Request, res:Response) => {

try {
    const currentUser = await User.findOne({_id:req.userId})
    if (!currentUser) {
        return res.status(404).json({message: "User not found"})
    }
   res.json(currentUser) 
} catch (error) {
    console.log(error);
    return res.status(500).json({ message: "somthing went wrong"})
}






}







const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).send(existingUser); // Return existing user details if found
    }
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json(newUser.toObject());
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Error creating user" });
  }
};
const updateCurrentUser = async (req:Request, res:Response)=>{
    try {
const {name,addressLine1,country ,city}=req.body
const user =await User.findById(req.userId)
if (!user) {
return res.status(404).json({ message: "user not found" })    
}
user.name=name;
user.addressLine1=addressLine1;
user.city=city;
user.country=country;

await user.save()
res.send(user)
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "Error updating"})
    }
}
export default {
  createCurrentUser,updateCurrentUser,getCurrentUser
};

