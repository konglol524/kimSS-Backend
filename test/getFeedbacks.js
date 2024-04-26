const Feedback = require("../models/Feedback");
const Promotion = require("../models/Promotion");

const getFeedbacks = async(req, res, next) => {
    try {
        const promo = await Promotion.findById(req.params.id);
        if(!promo){
            return res.status(400).json({success: false, message: "Can't find promo"})
        }
        const feedbacks = await Feedback.find({ promotion: req.params.id});
        res.status(200).json({success:true, data:feedbacks});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: "can not get feedbacks"});
    }
}


module.exports = getFeedbacks;