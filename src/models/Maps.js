import {Mongoose,model,Schema} from 'mongoose';

//geolocation Schema
const GeoSchema = new Schema({
    type:{
        type: String,
        default:"Point"
    },
    coordinates:{
        type: [Number],
        index:"2dsphere"
    }
});

//Maps Schema
const mapSchema = new Schema({
    type:{
        type: String,
        default: "Feature"
    },
    name:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    recomendation:{
        type: String,
        required: true
    },
    geometry: GeoSchema
},{
    versionKey: false,
    timestamps: true
});
export default model('Maps',mapSchema);