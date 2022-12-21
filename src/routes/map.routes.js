import {Router} from 'express';
import Maps from '../models/Maps.js'
import MapsController from '../controllers/MapController.js';

const router = Router();

//Get all data
router.get('/marker/list',MapsController.getAllMarkers);

//Get by ID
router.get('/marker/:id',MapsController.getById);

//New marker 
router.post('/marker/register',MapsController.newMarker);

//Delete marker
router.delete('/marker/delete/:id',MapsController.deleteByID);

//Update marker
router.put('/marker/update/:id',MapsController.updateMarker);

export default router;