import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {

  const {FullName ,Username ,email , password }= req.body
  console.log('email', email)


  res.status(200).json({
    message: "ok",
    
  });
});

export { registerUser };
