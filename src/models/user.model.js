import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
  {
    username: {
      type: string,
      require: true,
      unique: true,
      lowercase: true,
      trime: true,
      index: true,
    },
    email: {
      type: string,
      require: true,
      unique: true,
      lowercase: true,
      trime: true,
    },
    fullname: {
      type: string,
      require: true,
      trime: true,
      index: true,
    },
    avatar: {
      type: string,
      require: true,
    },
    coverImage: {
      type: string,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: string,
      require: [true, "Password is required"],
    },
    refreshToken: {
      type: string,
    },
  },
  { timestamps: true }
);

// 1st step - define pre (this is prevent to change all feild when user change other feild . )

userSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10)
  next()
})

//  step 2 compare of hased and user input password 

userSchema.methods.isPasswordCorrect= async function(password){
  return await bcrypt.compare(password,this.password)
}

//  creating method for refreshToken and Access token

userSchema.methods.generateAccessToken = function(){
  jwt.sign(
    // payload
    {
      _id:this._id,
      email:this.email,
      username:this.username,
      fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    

  )
}
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}


export const User =mongoose.model("User",userSchema)