// tests/api/api.spec.ts
import { test, expect, request, APIRequestContext } from '@playwright/test';
import { allure } from 'allure-playwright';
import apiUsers from '../data/apiData.json';

test.describe('User API', () => {
  let apiContext: APIRequestContext;
  const { newUser } = apiUsers;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });
  });

  test('POST /users → create a new user', async () => {
    await test.step('Send POST request to /users', async () => {
      const response = await apiContext.post('/users', {
        data: newUser,
      });

      const body = await response.json();

      allure.attachment('Request Payload', JSON.stringify(newUser, null, 2), 'application/json');
      allure.attachment('Response Body', JSON.stringify(body, null, 2), 'application/json');

      expect(response.status()).toBe(201);
      expect(body).toMatchObject(newUser);
      expect(body).toHaveProperty('id');
    });
  });

  test('GET /users/1 → fetch user by ID', async () => {
    await test.step('Send GET request to /users/1', async () => {
      const response = await apiContext.get('/users/1');
      const user = await response.json();

      allure.attachment('Fetched User', JSON.stringify(user, null, 2), 'application/json');

      expect(response.ok()).toBeTruthy();
      expect(user).toHaveProperty('id', 1);
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
    });
  });
});
