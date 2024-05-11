import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiErrors.js";
import User from "../models/user.model.js";
import  {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;
  console.log("email", email);

  //The if statement checks if any of the fields extracted from req.body are empty or contain only whitespace characters. It does this using the some() method, which checks if at least one element in the array satisfies the provided condition.

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are reqired");
  }

  // * Check whether Existing user is
  // $or is logical operator perform two or more array  select document that satisfied at least one of that expression

  const existingUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with this email or username aleardy exits");
  }

  
  // * save avtar and thumbnail in local storage

  const avtarLocalPath =req.files?.avtar[0]?.path
  const coverImageLocalPath =req.files?.coverImage[0]?.path

if(!avtarLocalPath){
  throw new ApiError(400 , "avtar file is required")
}

const avatar = await uploadOnCloudinary(avtarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)


if (!avatar) {
  throw new ApiError (400 , "Avtar file is required")
}

// * create new user 

const user = await User.create({
  fullName,
  avtar:avatar.url,
  coverImage:coverImage.url || "",
  email,
  password,
  username:username.toLowerCase()
})
const createdUser =await  awaitUser.findById(user._id).select(
  "-password -refreshToken"
)

if (createdUser){
  throw new ApiError("Something went wrong while creating new user")
}

return
  res.status(201).json(
    new ApiResponse(200, createdUser,"User registerd Sucessfully")
  );
});

export { registerUser };
