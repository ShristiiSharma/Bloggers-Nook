const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/" , async (req,res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err) {
        res.status(500).json(err)
    }
});

//UPDATE POST
module.exports = router
router.put("/:id" , async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){

            try{
               const updatedPost = await Post.findByIdAndUpdate(
               req.params.id,
               {
                  $set:req.body,
               }, 
               { new:true }
            );
            res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err)
            }       
        } else{
            res.status(401).json("You can update only your post!");
        }    
    } catch (err) {
        res.status(500).json(err);
    }
    
});

//DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.username === req.body.username) {
            try {
                await Post.deleteOne({ _id: req.params.id }); // Correct deletion method
                return res.status(200).json({ message: "Post has been deleted successfully" });
            } catch (err) {
                console.error("Delete Error:", err);
                return res.status(500).json({ message: "Error deleting post", error: err });
            }
        } else {
            return res.status(401).json({ message: "You can delete only your post!" });
        }
    } catch (err) {
        console.error("Internal Server Error:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
});

module.exports = router;

//GET POST
router.get("/:id" , async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err)
    }   
});

//GET ALL POSTS
router.get("/" , async(req,res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
       let posts;
       if(username) {
          posts = await Post.find({username});
       }else if (catName) {
          posts = await Post.find({
            categories:{
              $in: [catName],
            },
           });
       } else {
         posts = await Post.find();
       }
       res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err)
    }   
});