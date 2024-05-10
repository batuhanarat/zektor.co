import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const SensorSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    temperature: { type: Number },
    humidity: { type: Number },
    lightIntensity: { type: Number, required: false  },
    co2Level:{ type: Number, required: false  },
    date: { type: Date, default: Date.now },
}
);

const SensorModel =  mongoose.model(
    "Sensor", SensorSchema
);

export default SensorModel;
