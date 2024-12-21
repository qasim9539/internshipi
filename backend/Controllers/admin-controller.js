const User = require("../Models/User");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        if(!users || users.length === 0) {
            return res.status(404).json({message: "No users found"});
        }
        return res.status(200).json(users)
    } catch (error) {
        console.log(error);
    }
}
 const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, {password: 0}, {});
        res.status(200).json(data);
    } catch (error) {
       next(error)
    }
}


const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({_id: id});
        return res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        console.log(error);
    }
}

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;

        const updatedData = await User.updateOne({_id: id}, { $set: updatedUserData });
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error)
    }
}


module.exports = {getAllUsers, deleteUserById, updateUserById, getUserById};