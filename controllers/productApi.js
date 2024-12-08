const User = require('../models/User');


const productLike = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const isLiked = user.wishList.includes(id);

    const option = isLiked ? "$pull" : "$addToSet";

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { [option]: { wishList: id } }, 
      { new: true }
    );
    res.status(201).json({ msg: "Entry updated successfully", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong", error });
  }
}

module.exports = {productLike}