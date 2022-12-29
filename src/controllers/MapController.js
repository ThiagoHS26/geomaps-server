import Maps from '../models/Maps';

class MapsController {
    //New marker on map
    static newMarker = async(req,res)=>{
        const data = req.body;
        const newMap = new Maps();
        newMap.name = data.name;
        newMap.state = data.state;
        newMap.geometry = data.geometry;
        try {
            const markerSaved = await newMap.save();
            res.status(200).json({
                feature:markerSaved
            });
        } catch (error) {
            res.status(500).json({
                message: "Something goes wrong creating a marker!"
            });
        }
    }

    //Get all data
    static getAllMarkers = async(req,res)=>{
        try {
            const markers = await Maps.find();
            res.status(200).json({
                features:markers
            });
        } catch (error) {
            res.status(500).json({
                message:"Something goes wrong retrieving markers!"
            });
        }
    }

    //Get by id
    static getById = async(req,res)=>{

        const {id} = req.params;

        try {
            const marker = await Maps.findById(id);
            res.status(200).json({
                feature:marker
            });
        } catch (error) {
            res.status(500).json({
                message:`Error retrieving a marker with id: ${id}`
            });
        }
    }

    //Delete marker
    static deleteByID = async(req,res)=>{
        const {id} = req.params;
        
        try {
            const marker = await Maps.findByIdAndDelete(id);
            res.status(200).json({
                message:`Successful deleting marker with id: ${id}`
            });
        } catch (error) {
            res.status(500).json({
                message: `Error deleting a marker with id: ${id}`
            });
        }
    }
    //Update marker
    static updateMarker = async(req,res)=>{
        const {id} = req.params;
        const data = req.body;
        try {
            const markerUpdated = await Maps.findByIdAndUpdate(id,data);
            res.status(200).json({
                message: "Marker updated successfully!"
            });
        } catch (error) {
            res.status(500).json({
                message: `Error updating a marker with id: ${id}`
            });
        }
    }
}
export default MapsController;