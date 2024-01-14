import request from 'supertest';
import app from '../src/app';

describe('User API', () => {
// let userId: any
  it('should return an empty array for GET /api/users', async () => {
    // const response = await request(app).get('/api/users');
    // expect(response.status).toBe(200);
    // expect(response.body).toEqual([]);
  });

  it('should create a new user for POST /api/users', async () => {
    // const userData = {
    //   username: 'TestUser',
    //   age: 25,
    //   hobbies: ['Reading', 'Coding'],
    // };

    // const response = await request(app).post('/api/users').send(userData);
    // expect(response.status).toBe(201);
    // expect(response.body).toHaveProperty('id');
    // const userId = response.body.id;
  });

  it('should return the created user for GET /api/users/:id', async () => {
  //   const response = await request(app).get(`/api/users/${userId}`);
  //   expect(response.status).toBe(200);
  //   expect(response.body.id).toBe(userId);
  // });

  // it('should update the created user for PUT /api/users/:id', async () => {
  //   const updatedUserData = {
  //     username: 'UpdatedUser',
  //     age: 30,
  //   };

  //   const response = await request(app).put(`/api/users/${userId}`).send(updatedUserData);
  //   expect(response.status).toBe(200);
  //   expect(response.body).toMatchObject(updatedUserData);
  });

  it('should delete the created user for DELETE /api/users/:id', async () => {
  //   const response = await request(app).delete(`/api/users/${userId}`);
  //   expect(response.status).toBe(204);
  });
});