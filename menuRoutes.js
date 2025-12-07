// File: routes/menuRoutes.js

import express from 'express';
import { getMenuItems } from '../controller/menuController.js'; 

console.log('--- ROUTE FILE LOADED SUCCESSFULLY ---'); // Log 1

const router = express.Router();

// Middleware to log the request BEFORE hitting the controller
router.use((req, res, next) => {
    console.log('--- ROUTE HIT: /api/v1/menu was accessed ---'); // Log 2
    next();
});

router.route('/').get(getMenuItems);

export default router;