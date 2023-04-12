import { Router } from "express";
const router = Router();

import * as controller from '../controller/controller.js'

/** Questions Routes API*/
// router.get('/questions', controller.getQuestions)
// router.post('/questions', controller.insertQuestions)

router.route('/questions')
        .get(controller.getQuestions)     /** get request */
        .post(controller.insertQuestions)    /** post req */
        .delete(controller.dropQuestions)   /** delete req */

router.route('/result')
        .get(controller.getREsult)
        .post(controller.storeResult)
        .delete(controller.dropQuestions)

export default router;