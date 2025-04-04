import express from 'express';

import {addReceipe, receipeList, giveVote, totalVotesList, deleteAParty } from "../controllers/partiesController.js";
import { loginByAdmin, registerUser } from '../controllers/userController.js';

const router = express.Router();



router.post('/addreceipe', addReceipe);
router.get('/receipelist', receipeList);
router.delete('/delete-party/:id', deleteAParty);

router.post('/register-user', registerUser);
router.post('/give-vote', giveVote);
router.get('/total-votes', totalVotesList);

router.post('/login-admin', loginByAdmin);

//admin 
// router.put('/receipe/:id', updateReceipe);
// router.delete('/receipe/:id', deleteReceipe);
// router.get('/receipe/:id', showaReceipe);

export default router;

