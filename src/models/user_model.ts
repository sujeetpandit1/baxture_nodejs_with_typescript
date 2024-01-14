// src/models/user_model.ts
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const DATA_FILE_PATH = path.resolve(__dirname, 'user_data.json');

export class UserModel {
  private users: User[] = [];

  constructor() {
    // Load data from the file, if it exists
    try {
      const data = fs.readFileSync(DATA_FILE_PATH, 'utf8');
      this.users = JSON.parse(data);
    } catch (error) {
      // If the file doesn't exist or has invalid JSON, ignore and start with an empty array
    }
  }

  private saveDataToFile(): void {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(this.users, null, 2), 'utf8');
  }

  get_all_users(): User[] {
    return this.users;
  }

  get_user_by_id(userId: string): User | undefined {
    return this.users.find(user => user.id === userId);
  }

  create_user(username: string, age: number, hobbies: string[]): User {
    const new_user: User = {
      id: uuidv4(),
      username,
      age,
      hobbies,
    };

    this.users.push(new_user);
    this.saveDataToFile(); // Save data to the file after creating a new user
    
    return new_user;
  }

  update_user(userId: string, username: string, age: number, hobbies: string[]): User | undefined {
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

  delete_user(userId: string): boolean {
    const initial_length = this.users.length;
    this.users = this.users.filter(user => user.id !== userId);

    if (this.users.length !== initial_length) {
      this.saveDataToFile(); // Save data to the file after deleting a user
      return true;
    }

    return false;
  }
}
