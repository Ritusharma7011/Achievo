const Category = require("../models/Category"); 

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//create category handler function

exports.createCategory = async(req,res) => {
    try{
        //fetch data
        const {name, description} = req.body;

        //validation
        if(!name || !description){
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }

        //create entry in db
        const categoryDetails = await Category.create({
            name : name,
            description : description
        });
        console.log(categoryDetails);

        //send response
        return res.status(200).json({
            success : true,
            message : "Category created successfully"
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong, Please try again"
        })
    }
}

//getAllCategories handler fucntion
exports.showAllCategories = async(req, res) =>{
    try{
        console.log("Starting");
        //fetch all data from db 
        const allCategories = await Category.find({},{name : true, description : true}).populate("courses").exec();
        console.log(allCategories);
        
        const categoriesWithPublishedCourses = allCategories.filter((category) =>
            category.courses.some((course) => course.status === "Published")
        );

        //return response
        return res.status(200).json({
            success : true,
            message : "All categories returned successfully",
            allCategories
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong, please try again"
        })
    }
}
 

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();

    if (!selectedCategory) {
      console.log("Category not found.");
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // if (selectedCategory.courses.length === 0) {
    //   console.log("No courses found for the selected category.");
    //   return res.status(404).json({
    //     success: false,
    //     message: "No courses found for the selected category.",
    //   });
    // }

    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();
    console.log();

    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate : {
          path: "instructor"
        }
      })
      .exec();
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}