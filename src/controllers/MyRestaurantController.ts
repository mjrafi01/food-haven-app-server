import { Request, Response } from "express"
import Restaurant from "../models/restaurant"
import cloudinary from "cloudinary"
import mongoose from "mongoose"

const createMyRestaurant = async (req: Request, res: Response) => {
    try {
      // Check if the user already has a restaurant
      const existingRestaurant = await Restaurant.findOne({ user: req.userId });
      if (existingRestaurant) {
        return res.status(409).json({ message: "User restaurant already exists" });
      }
  
      // Handle file upload
    //   const image = req.file as Express.Multer.File;
    //   if (!image) {
    //     return res.status(400).json({ message: "Image file is required" });
    //   }
    //   const base64Image = Buffer.from(image.buffer).toString("base64");
    //   const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  
    //   // Upload image to Cloudinary
    //   const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  const imageUrl = await uploadImage(req.file as Express.Multer.File)
      // Create new restaurant
      const restaurant = new Restaurant(req.body);
      restaurant.imageUrl = imageUrl
      restaurant.user = new mongoose.Types.ObjectId(req.userId);
      restaurant.lastUpdated = new Date();
      await restaurant.save();
  
      res.status(201).send(restaurant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  



  const updateMyRestaurant = async (req: Request, res: Response) => {
    try {
      const restaurant = await Restaurant.findOne({
        user: req.userId,
      });
  
      if (!restaurant) {
        return res.status(404).json({ message: "restaurant not found" });
      }
  
      restaurant.restaurantName = req.body.restaurantName;
     restaurant.city = req.body.city;
       restaurant.country = req.body.country;
     
       restaurant.deliveryPrice = req.body.deliveryPrice;
     restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
      restaurant.cuisines = req.body.cuisines;
      restaurant.menuItems = req.body.menuItems;
      restaurant.lastUpdated = new Date();
  
      if (req.file) {
        const imageUrl = await uploadImage(req.file as Express.Multer.File);
        restaurant.imageUrl = imageUrl;
      }
  
      await restaurant.save();
      res.status(200).send(restaurant);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  const getMyRestaurant = async (req: Request, res: Response) => {
    try {
      const restaurant = await Restaurant.findOne({ user: req.userId });
      if (!restaurant) {
        return res.status(404).json({ message: "restaurant not found" });
      }
      res.json(restaurant);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Error fetching restaurant" });
    }
  };
  const uploadImage=async(file:Express.Multer.File)=>{
    // Handle file upload
    const image = file
  
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
return uploadResponse.url
  }
  export default {
    createMyRestaurant,updateMyRestaurant,getMyRestaurant
  };