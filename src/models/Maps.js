import {Mongoose,model,Schema} from 'mongoose';

//ICA dates
const IcaSchema = new Schema({
    carbon_monoxide:{type:Number,required:false},
    nitrogen_dioxide:{type:Number,required:false},
    ozone:{type:Number,required:false},
    hidrogen_sulfide:{type:Number,required:false},
    sulfur_dioxide:{type:Number,required:false},
    pm_25:{type:Number,required:false},
    pm_10:{type:Number,required:false}
});

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
    ica_dates: IcaSchema,
    geometry: GeoSchema
},{
    versionKey: false,
    timestamps: true
});
export default model('Maps',mapSchema);