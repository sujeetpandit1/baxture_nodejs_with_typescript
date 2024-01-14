"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_user = exports.update_user = exports.get_user_by_id = exports.get_all_users = exports.create_user = void 0;
const user_model_1 = require("../models/user_model");
const user_model = new user_model_1.UserModel();
// Middleware for common validation
const validate_user_id = (req, res, next) => {
    const userId = req.params.userId;
    if (!userId || userId.length !== 36) {
        return res.status(400).json({ message: 'Invalid userId' });
    }
    next();
};
const create_user = (req, res) => {
    const { username, age, hobbies } = req.body;
    if (!/^[A-Za-z]{6}$/.test(username)) {
        return res.status(400).json({ message: 'Username must be 6 characters long and contain only alphabets' });
    }
    if (typeof age !== 'number' || age < 0 || !Number.isInteger(age)) {
        return res.status(400).json({ message: 'Age must be a non-negative integer' });
    }
    try {
        const newUser = user_model.create_user(username, age, hobbies || []);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.create_user = create_user;
const get_all_users = (_, res) => {
    try {
        const users = user_model.get_all_users();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.get_all_users = get_all_users;
exports.get_user_by_id = [validate_user_id, (req, res) => {
        const userId = req.params.userId;
        const user = user_model.get_user_by_id(userId);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }];
exports.update_user = [validate_user_id, (req, res) => {
        const userId = req.params.userId;
        const { username, age, hobbies } = req.body;
        if (!/^[A-Za-z]{6}$/.test(username)) {
            return res.status(400).json({ message: 'Username must be 6 characters long and contain only alphabets' });
        }
        if (typeof age !== 'number' || age < 0 || !Number.isInteger(age)) {
            return res.status(400).json({ message: 'Age must be a non-negative integer' });
        }
        try {
            const updated_user = user_model.update_user(userId, username, age, hobbies || []);
            res.status(200).json(updated_user);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }];
exports.delete_user = [validate_user_id, (req, res) => {
        const userId = req.params.userId;
        try {
            const success = user_model.delete_user(userId);
            if (success) {
                res.status(204).send();
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }];
//# sourceMappingURL=user_controller.js.map