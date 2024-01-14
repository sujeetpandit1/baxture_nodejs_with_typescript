import express from 'express';
import * as user_controller from '../controllers/user_controller';

const router = express.Router();

router.post('/users', user_controller.create_user);
router.get('/users', user_controller.get_all_users);
router.get('/users/:userId', user_controller.get_user_by_id);
router.put('/users/:userId', user_controller.update_user);
router.delete('/users/:userId', user_controller.delete_user);

export default router;
