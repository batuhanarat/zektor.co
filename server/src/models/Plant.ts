import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const PlantSchema = new Schema({
    plantId:  {type: ObjectId},
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: String },
    order: {type: Number},
    images: [{ type: ObjectId, ref: 'ImageData' }]
});


const PlantModel = mongoose.model("Plant", PlantSchema);

export default PlantModel;
