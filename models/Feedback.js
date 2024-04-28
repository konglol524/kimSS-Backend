const mongoose = require("mongoose");
const Promotion = require("./Promotion");

const FeedbackSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        default: "",
        required: true,
    },
    username: {
        type: String,
        default: "",
        required: true,
    },
    promotion: {
        type: mongoose.Schema.ObjectId,
        ref: "Promotion",
        default: "",
        required: true,
      },
    comment: {
        type: String,
        maxlength: 1000 
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
});

FeedbackSchema.pre('deleteMany', async function (next){
    try {
        console.log("YOOOO2");
        const filter = this.getFilter();
        console.log(filter);
        const doc = await this.model.find(filter); // Execute the query to get the document
        if (doc) {
            console.log('Document being deleted:', doc);
            // Now you can perform any operations you need with the document
        }

        for (const document of doc) {
             const promo = await Promotion.findById(document.promotion);
             promo.ratingCount = promo.ratingCount - 1;
             console.log(promo.ratingCount);
            promo.ratingSum = promo.ratingSum - parseInt(document.rating);
            await Promotion.findByIdAndUpdate(promo.id, promo, {
            new: true,
            runValidators: true
            });
        }
        
        next();
    } catch (error) {
        console.log(error.stack);
        next(error);
    }
});


FeedbackSchema.pre('deleteOne', async function (next){
    try {
        console.log("YOOOO3");
        const filter = this.getFilter();
        console.log(filter);
        const doc = await this.model.findOne(filter); // Execute the query to get the document
        if (doc) {
            console.log('Document being deleted:', doc);
            // Now you can perform any operations you need with the document
        }
             const promo = await Promotion.findById(doc.promotion);
             promo.ratingCount = promo.ratingCount - 1;
             console.log(promo.ratingCount);
            promo.ratingSum = promo.ratingSum - parseInt(doc.rating);
            await Promotion.findByIdAndUpdate(promo.id, promo, {
            new: true,
            runValidators: true
            });

        
        next();
    } catch (error) {
        console.log(error.stack);
        next(error);
    }
});


module.exports = mongoose.model("Feedback", FeedbackSchema);
