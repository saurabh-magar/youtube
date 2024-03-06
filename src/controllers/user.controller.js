import {asyncHandler } from "../utils/asyncHandler.js";
import {ApiError, apiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async(req,res) =>{
    const {fullname,email,username,password}=req.body
    console.log("email",email);

    if([fullname,email,username,password].some((field)=>
    field?.trim()==="")
    ){
        throw new apiError(400," All fields are required")
    }

    const existedUser=User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new apiError(409,"User with email or username already existed")
    }
    const avatarlocalpath=req.files?.avatar[0]?.path;
    const coverImagepath=req.files?.coverImage[0]?.path;

    if(!avatarlocalpath){
        throw new apiError(400," avatar file is required")
    }

    const avatar=await uploadOnCloudinary(avatarlocalpath)
    const coverImage=await uploadOnCloudinary(coverImage)

    if(!avatar){
        throw new apiError(400," avatar file is required")
    }

    const user=await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        email,
        password,
        username:username.toLowerCase()
    })

    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new apiError(500,"something went wrong while regestring a user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered successfully")
    )

})

export {
    registerUser,
}