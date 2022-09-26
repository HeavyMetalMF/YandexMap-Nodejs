import Mark from "./models/Mark.js";
import User from "./models/User.js";

class MarkController {
    async getAll (req, res) {
        try {
            const {userId} = req.query;
            const user = await User.findById(userId);
            const marks = await Mark.find().where('_id').in(user.marks)
            return res.json(marks);
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    async updateMark (req, res) {
        try {
            const mark = req.body;
            if (!mark._id){
                return res.status(400).json({message: 'Can`t find id'});
            }
            const updatedMarkOriginal = await Mark.findByIdAndUpdate(mark._id, mark, {new: true});
            return res.json(updatedMarkOriginal);
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    async deleteMark (req, res) {
        try {
            const {_id, userId} = req.query;
            if (!_id){
                res.status(400).json({message: 'Can`t find id'});
            }
            const markOriginal = await Mark.findByIdAndDelete(_id);
            const mark = await User.updateMany(
                {_id: userId},
                { $pull: {marks : _id} })
            res.json(markOriginal);
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    async createMark (req, res) {
        try {
            const {name, latitude, longitude, userId} = req.body;
            const mark = await Mark.create({name, latitude, longitude});
            const markId = mark._id.toHexString()
            const userMark = await User.findByIdAndUpdate(
                userId,
                { $push: { marks: markId } },
                { new: true, useFindAndModify: false }
            )
            res.json(mark);
        } catch (e) {
            res.status(500).json(e)
        }
    }

}

export default new MarkController();