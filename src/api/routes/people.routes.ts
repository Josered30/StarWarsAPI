import { Router } from 'express';
import { getPerson, listPeople, postPerson } from '../controllers/people.controller';

const router = Router();

/**
 * @openapi
 * /healthcheck:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Returns API operational status
 *     responses:
 *       200:
 *         description: API is  running
 */
router.route('/:id').get(getPerson);

router.route('/').post(postPerson).get(listPeople);

export default router;
