import mongoose from "mongoose";

const chapterSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    markDown: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],
    content: [
      {
        heading:{
          type: String
        },
        description: {
          type: String,
        },
        output: {
          type: String,
        },
        point:{
          type: Number
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chapter = mongoose.model("Chapter", chapterSchema);

export default Chapter;
