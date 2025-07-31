import { test, expect, request, APIRequestContext } from '@playwright/test';
import { allure } from 'allure-playwright';

test.describe('User API', () => {
  let apiContext: APIRequestContext;

  const newUser = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    phone: '1-800-123-4567',
    website: 'johndoe.com'
  };

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

      // Вложения в Allure
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
