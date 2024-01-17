import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
    {
    //   name: { type: String, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String
    },
    time:{
        type: String,
    },
    banner:{
        type: String
    },
    price:{
        type: String
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    point:{
      type: Number
    },
    step:{
      type: Number
    },
    listUsers: [studentSchema],
    level:{type: String},
    tags: {type: String},
    chapterId:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Chapter",
    }]
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
