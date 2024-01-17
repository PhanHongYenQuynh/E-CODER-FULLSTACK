import express from "express";
import asyncHandler from "express-async-handler";
import CourseModel from "../Models/CourseModel.js";
import ChapterModel from "../Models/ChapterModel.js";
import UserModel from "../Models/UserModel.js";
import { admin } from "../Middleware/AuthMiddleware.js";
import { removeDuplicates } from "../utils/index.js";

const courseRouter = express.Router();

// ADMIN GET ALL ORDERS
courseRouter.get(
  "/all/:type",
  asyncHandler(async (req, res) => {
    const course = await CourseModel.find({level: req.params.type}).populate('chapterId');
    res.json(course);
  })
);

courseRouter.get(
  "/list-all",
  asyncHandler(async (req, res) => {
    const users = await CourseModel.find({}).populate('chapterId');
    res.json(users);
  })
);

courseRouter.get(
  "/list-chapter",
  asyncHandler(async (req, res) => {
    const users = await ChapterModel.find({});
    res.json(users);
  })
);

courseRouter.get(
  "/detail/:id",
  asyncHandler(async (req, res) => {
    const course = await CourseModel.findOne({_id: req.params.id}).populate('chapterId');
    res.json(course);
  })
);

courseRouter.get(
  "/chapterall",
  asyncHandler(async (req, res) => {
    const course = await ChapterModel.find({})
    res.json(course);
  })
);

courseRouter.get(
  "/detailchapter/:id",
  asyncHandler(async (req, res) => {
    const checkExitsChapter = await ChapterModel.findOne({_id: req.params.id});
    res.json(checkExitsChapter);
  })
);

courseRouter.get(
  "/search-course/:text",
  asyncHandler(async (req, res) => {
    const course = await CourseModel.find({'name': {'$regex': req.params.text}}).populate('chapterId');
    res.json(course);
  })
);


courseRouter.get(
  "/progress/:email",
  asyncHandler(async (req, res) => {

    const findUser = await UserModel.findOne({email: req.params.email});

    const courseIdArray = await CourseModel.find({
      "listUsers.user": findUser._id
    }).populate('chapterId');

    res.json(courseIdArray);
  })
);

courseRouter.get(
  "/getLeaderBoard",
  asyncHandler(async (req, res) => {
    const courses = await CourseModel.find().populate('chapterId').populate({
      path: "listUsers.user",
      model: "User",
    });

    const userPointsMap = new Map(); // Use a Map for efficient lookups

    courses.forEach((course) => {
      course.listUsers.forEach((userEntry) => {
        const user = userEntry.user;
        const points = course.point || 0;

        if (user?._id && userPointsMap.has(user?._id)) {
          // User already in map, update the points
          userPointsMap.get(user._id).point += points;
        } else {
          // User not in map, add a new entry
          if(user?.id){
            userPointsMap.set(user._id, {
              name: user.name,
              point: points,
              image: user.avatar,
            });
          }
        }
      });
    });

    const sortedListTop = [...userPointsMap.values()].sort((a, b) => b.point - a.point);
    res.json(sortedListTop);
  })
);
courseRouter.get(
  "/getDetailPoint/:email",
  asyncHandler(async (req, res) => {
    const user = await UserModel.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const courses = await CourseModel.find().populate('chapterId').populate({
      path: "listUsers.user",
      model: "User",
    });

    const userPointsMap = new Map(); // Use a Map for efficient lookups

    courses.forEach((course) => {
      course.listUsers.forEach((userEntry) => {
        const user = userEntry.user;
        const points = course.step || 0;

        console.log(course);
        if (user?._id && userPointsMap.has(user?._id)) {
          // User already in map, update the points
          userPointsMap.get(user._id).point += points;
        } else {
          // User not in map, add a new entry
          if(user?.id){
            userPointsMap.set(user._id, {
              name: user.name,
              point: points,
              image: user.avatar,
            });
          }
        }
      });
    });

    const sortedListTop = [...userPointsMap.values()].sort((a, b) => b.point - a.point);
    const userPoint = sortedListTop.find((i)=> i.name === user.name);

    res.json(userPoint ? userPoint.point : 0);
  })
);



courseRouter.get(
  "/getInfoByEmail/:email",
  asyncHandler(async (req, res) => {
    const response  = await UserModel.findOne({ email: req.params.email});
    if(response){
      return res.json(response);
    }
  }))

courseRouter.post(
  "/",
  admin,
  asyncHandler(async (req, res) => {
    const {
      name,
      description,
      time,
      banner,
      price,
      author,
      level,
      tags,
      chapterId,
      point
    } = req.body;

    console.log(chapterId);

    const course = new CourseModel({
      name: name,
      description: description,
      time: time,
      banner: banner,
      price: price,
      level: level,
      tags: tags,
      point: point, 
      chapterId: chapterId,
    });
    const resCourse = await course.save();
    res.status(201).json(resCourse);
  })
);

// Update a course by ID
courseRouter.put(
  "/:id",
  admin,
  asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const {
      name,
      description,
      time,
      banner,
      price,
      author,
      level,
      tags,
      chapterId,
      point,
    } = req.body;

    // Assuming chapterId is a stringified JSON array in the request body

    // Find the existing course by ID
    const existingCourse = await CourseModel.findById(courseId);

    if (!existingCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Update the course fields
    existingCourse.name = name;
    existingCourse.description = description;
    existingCourse.time = time;
    existingCourse.banner = banner;
    existingCourse.price = price;
    existingCourse.level = level;
    existingCourse.tags = tags;
    existingCourse.chapterId = chapterId;
    existingCourse.point = point;

    // Save the updated course
    const updatedCourse = await existingCourse.save();

    res.status(200).json(updatedCourse);
  })
);

courseRouter.post(
  "/chapter",
  admin,
  asyncHandler(async (req, res) => {
    const { title, description, output, markDown, heading, point } = req.body;

    const checkExitsChapter = await ChapterModel.findOne({title});

    if(checkExitsChapter){
      // will be add content
      checkExitsChapter.content = checkExitsChapter.content || []; // Ensure content array exists
      checkExitsChapter.content.push({
        description,
        output,
        markDown,
        heading,
        point,
      });

      const updatedChapter = await checkExitsChapter.save();
      res.status(200).json(updatedChapter);
    }else{
      const course = new ChapterModel({
        title: title,
        markDown,
        content: [
          {
            description,
            output,
            point,
            heading
          }
        ]
      });
      const resCourse = await course.save();
      res.status(201).json(resCourse);
    }
  })
);

// update chapter

courseRouter.put(
  "/chapter/:id",
  admin,
  asyncHandler(async (req, res) => {
    const chapterId = req.params.id;
    const { description, output, markDown, heading, point } = req.body;

    // Find the existing chapter by title
    const existingChapter = await ChapterModel.findOne({ _id: chapterId });

    if (!existingChapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    // Update the chapter fields
    const fixedJsonString = markDown.replace(/'/g, '"');
    const actualArray = JSON.parse(fixedJsonString);

    existingChapter.markDown = actualArray;

    // Find the content entry within the chapter
    const contentToUpdate = existingChapter.content.find(
      (content) => content.heading === heading
    );

    if (!contentToUpdate) {
      // If the content with the specified heading doesn't exist, create a new one
      existingChapter.content.push({
        description,
        output,
        heading,
        point,
      });
    } else {
      // If the content exists, update its fields
      contentToUpdate.description = description;
      contentToUpdate.output = output;
      contentToUpdate.point = point;
    }

    // Save the updated chapter
    const updatedChapter = await existingChapter.save();

    res.status(200).json(updatedChapter);
  })
);


courseRouter.put(
  "/learn-course/:idUser/:idCourse",
  asyncHandler(async (req, res) => {
    try {
      const idUser = req.params.idUser;
      const idCourse = req.params.idCourse;

      // Use findOne instead of find, as we are looking for a single course
      const findCourse = await CourseModel.findOne({ _id: idCourse });

      if (!findCourse) {
        return res.status(200).json({ error: "Course not found" });
      }

      if(findCourse.listUsers.length <=0){
        findCourse.listUsers = [];
      }

      const idU = await UserModel.findOne({email: idUser});

      const check = findCourse.listUsers.filter(i => i.user === idU._id);

      console.log(idU);

      if(check.length > 0){
        return res.status(200).json({ error: "exits" });
      }
    
      // Assuming `listUsers` is an array field in your CourseModel
      findCourse.listUsers.push({
        user: idU._id
      });

      // Use save() with await to ensure the save operation is completed
      await findCourse.save();

      res.status(201).json(findCourse);
    } catch (err) {
      // Handle any errors that may occur during the execution
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  })
);


courseRouter.put(
  "/learn-chapter/:idUser/:idChapter",
  asyncHandler(async (req, res) => {
    try {
      const email = req.params.idUser;
      const idChapter = req.params.idChapter;

      // Use findOne instead of find, as we are looking for a single course
      const findChapter = await ChapterModel.findOne({ _id: idChapter });

      if (!findChapter) {
        return res.status(404).json({ error: "Chapter not found" });
      }

      const courseOfChapter = await CourseModel.findOne({
        chapterId : idChapter
      });

      let lengthCourse = 0;

      lengthCourse = courseOfChapter.chapterId.map((_, index) => (1 / courseOfChapter.chapterId.length) * 100);  

      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const userExit = findChapter.markDown?.filter((item) =>item === user._id);

      if(userExit.length > 0){
        return res.status(404).json({ error: "User had join" });
      }
      findChapter.markDown = [];
      // Assuming `listUsers` is an array field in your CourseModel
      findChapter.markDown.push(user._id);
      // Use save() with await to ensure the save operation is completed
      await findChapter.save();

      courseOfChapter.step = lengthCourse[0];
      await courseOfChapter.save();

      res.status(201).json(findChapter);
    } catch (err) {
      // Handle any errors that may occur during the execution
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  })
);

// delete course
courseRouter.delete(
  "/:id",
  admin,
  asyncHandler(async (req, res) => {
    const courseId = req.params.id;

    // Find the existing course by ID
    const existingCourse = await CourseModel.findById(courseId);

    if (!existingCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Delete the course
    await existingCourse.remove();

    res.status(204).json("delete course success"); // Respond with a 204 No Content status
  })
);


// delete chapter
courseRouter.delete(
  "/chapter/:id",
  admin,
  asyncHandler(async (req, res) => {
    const chapterId = req.params.id;

    // Find the existing course by ID
    const existingChapter = await ChapterModel.findById(chapterId);

    if (!existingChapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    // Delete the Chapter
    await existingChapter.remove();

    res.status(204).json({message:"delete Chapter success"}); // Respond with a 204 No Content status
  })
);


export default courseRouter;
