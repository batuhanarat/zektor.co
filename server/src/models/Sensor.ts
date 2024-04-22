import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const SensorSchema = new Schema({
    temperature: { type: Number },
    humidity: { type: Number },
    lightIntensity: { type: Number },
    co2Level:{ type: Number },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },}
);

const SensorModel =  mongoose.model(
    "Sensor", SensorSchema
);

export default SensorModel;
