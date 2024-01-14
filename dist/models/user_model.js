"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
// src/models/user_model.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const DATA_FILE_PATH = path_1.default.resolve(__dirname, 'user_data.json');
class UserModel {
    users = [];
    constructor() {
        // Load data from the file, if it exists
        try {
            const data = fs_1.default.readFileSync(DATA_FILE_PATH, 'utf8');
            this.users = JSON.parse(data);
        }
        catch (error) {
            // If the file doesn't exist or has invalid JSON, ignore and start with an empty array
        }
    }
    saveDataToFile() {
        fs_1.default.writeFileSync(DATA_FILE_PATH, JSON.stringify(this.users, null, 2), 'utf8');
    }
    get_all_users() {
        return this.users;
    }
    get_user_by_id(userId) {
        return this.users.find(user => user.id === userId);
    }
    create_user(username, age, hobbies) {
        const new_user = {
            id: (0, uuid_1.v4)(),
            username,
            age,
            hobbies,
        };
        this.users.push(new_user);
        this.saveDataToFile(); // Save data to the file after creating a new user
        return new_user;
    }
    update_user(userId, username, age, hobbies) {
        const user_index = this.users.findIndex(user => user.id === userId);
        if (user_index !== -1) {
            this.users[user_index] = {
                id: userId,
                username,
                age,
                hobbies,
            };
            this.saveDataToFile(); // Save data to the file after updating a user
            return this.users[user_index];
        }
        return undefined;
    }
    delete_user(userId) {
        const initial_length = this.users.length;
        this.users = this.users.filter(user => user.id !== userId);
        if (this.users.length !== initial_length) {
            this.saveDataToFile(); // Save data to the file after deleting a user
            return true;
        }
        return false;
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=user_model.js.map