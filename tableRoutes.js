import express from 'express';
import { getTables, updateTableStatus, seedTables } from '../controller/tableController.js';

const router = express.Router();

router.get('/', getTables);          // GET /api/v1/tables
router.patch('/:id', updateTableStatus); // PATCH /api/v1/tables/:id
router.post('/seed', seedTables);    // POST /api/v1/tables/seed

export default router;