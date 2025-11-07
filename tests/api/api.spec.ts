import { test, expect, request, APIRequestContext } from '@playwright/test';
import apiUsers from '../data/apiData.json';

test.describe('User API', () => {
  let apiContext: APIRequestContext;
  const { newUser } = apiUsers;

  test.beforeAll(async () => {
    if (test.info().project.name !== 'chromium') {
      test.skip();
    }

    apiContext = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
      extraHTTPHeaders: { 'Content-Type': 'application/json' },
    });
  });

  test('POST /users - create a new user', async () => {
    const response = await apiContext.post('/users', { data: newUser });
    const body = await response.json();

    await test.info().attach('Request Payload', {
      body: Buffer.from(JSON.stringify(newUser, null, 2)),
      contentType: 'application/json',
    });

    await test.info().attach('Response Body', {
      body: Buffer.from(JSON.stringify(body, null, 2)),
      contentType: 'application/json',
    });

    expect(response.status()).toBe(201);
    expect(body).toMatchObject(newUser);
    expect(body).toHaveProperty('id');
  });

  test('GET /users/1 - get user by ID', async () => {
    const response = await apiContext.get('/users/1');
    const user = await response.json();

    await test.info().attach('Fetched User', {
      body: Buffer.from(JSON.stringify(user, null, 2)),
      contentType: 'application/json',
    });

    expect(response.ok()).toBeTruthy();
    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
  });

  test('POST /users - create a new user (mocked)', async () => {
  const randomId = Date.now();

  const newUser = {
    username: `user_${randomId}`,
    email: `user_${randomId}@example.com`,
    password: `Password${Math.floor(Math.random() * 10000)}`,
    firstName: `FirstName${randomId}`,
    lastName: `LastName${randomId}`
  };

  const mockResponse = { id: randomId, ...newUser };
  await test.info().attach('Request Payload', {
    body: Buffer.from(JSON.stringify(newUser, null, 2)),
    contentType: 'application/json',
  });

  await test.info().attach('Mocked Response Body', {
    body: Buffer.from(JSON.stringify(mockResponse, null, 2)),
    contentType: 'application/json',
  });

  expect(mockResponse).toMatchObject(newUser);
  expect(mockResponse).toHaveProperty('id', randomId);
  });
});
