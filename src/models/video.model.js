import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
  video: {
    type: string,
    required: true,
  },
  thumbnail: {
    type: string,
    required: true,
  },
  title:{
    type: string,
    required: true,
  },
  description:{
    type: string,
    required: true,
  },
  duration:{
    type:Number,
    required:true,

  },
  view:{
    type:Boolean,
    required:true,

  },
  isPublished:{
    type:Boolean,
    require:true,

  },

});
videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema);
