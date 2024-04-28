# Individual-Project

"This is an individual project in Phase 2 at Hacktiv8, completed within a 4-day timeframe."

Hosting URL: https://komikuza-webapp.web.app

# ENDPOINT User

## 1. POST /register

Description: Register a new user.

Request :

- body

```json
{
  "email": "string",
  "password": "string"
}
```

_Reponse(201-Created)_

```json
{
  "newUser": {
    "id": 6,
    "email": "zaza@gmail.com",
    "updatedAt": "2024-03-26T11:34:53.275Z",
    "createdAt": "2024-03-26T11:34:53.275Z",
    "role": "user"
  }
}
```

_Response (400 - Bad Request)_

```js
{
  "message": "email & password is required"
}
```

_Response (500 - Internal Server Error)_

```js
{
  "message": "internal server error"
}
```

## 2. POST /login

Description: This feature is for users and admins to log in.

Request :

- headers:

```json
{
  "Authorization": "Bearer acces_token"
}
```

- body

```json
{
  "email": "string",
  "password": "string"
}
```

_Reponse(200-OK)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzExNDUzMTgyfQ.-gk_2PKHY7TUbAcZavifMv04xILrDJXcUDw4TPL-1II"
}
```

_Response (400 - Bad Request)_

```js
{
  "message": "validation error"
}
```

_Response (401 - Unauthorized)_

```js
{
  "message": "invalid email or password"
}
```

_Response (500 - Internal Server Error)_

```js
{
  "message": "internal server error"
}
```

# ENDPOINT Watchlist

## 1. POST /comic

Description: Create a new cuisine.

Request :

- headers:

```json
{
  "Authorization": "Bearer acces_token"
}
```

- body

```json
{
  "title": "string",
  "cover": "string",
  "url": "string",
  "rating": "integer"
}
```

_Reponse(201-Created)_

```json
{
  "message": "New Watchlist Added",
  "data": {
    "id": 32,
    "title": "test",
    "cover": "test",
    "url": "test",
    "rating": 3,
    "UserId": 3,
    "updatedAt": "2024-04-18T08:38:52.860Z",
    "createdAt": "2024-04-18T08:38:52.860Z"
  }
}
```

_Response (400 - Bad Request)_

```js
{
  "message": "validation error"
}
```

_Response (500 - Internal Server Error)_

```js
{
  "message": "internal server error"
}
```

## 2. GET /comic

Description:

Get all comic by user from database.

Request:

- headers:

```json
{
  "Authorization": "Bearer acces_token"
}
```

_Reponse(200-OK)_

```json
[
   {
  "message": "New Watchlist Added",
  "data": {
    "id": 32,
    "title": "test",
    "cover": "test",
    "url": "test",
    "rating": 3,
    "UserId": 3,
    "updatedAt": "2024-04-18T08:38:52.860Z",
    "createdAt": "2024-04-18T08:38:52.860Z"
  }
},...
]
```

_Response (500 - Internal Server Error)_

```js
{
  "message": "internal server error"
}
```

## 3. GET /comic/:id

Get one comic from database.

Request:

- headers:

```json
{
  "Authorization": "Bearer acces_token"
}
```

- params

```json
{
  "id": "integer"
}
```

_Reponse(200-OK)_

```json
{
  "message": "New Watchlist Added",
  "data": {
    "id": 32,
    "title": "test",
    "cover": "test",
    "url": "test",
    "rating": 3,
    "UserId": 3,
    "updatedAt": "2024-04-18T08:38:52.860Z",
    "createdAt": "2024-04-18T08:38:52.860Z"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

## 4. PUT /comic/:id

Description: Update a comic by ID.

Request :

- headers:

```json
{
  "Authorization": "Bearer acces_token"
}
```

- params

```json
{
  "id": "integer"
}
```

- body

```json
{
  "title": "string",
  "cover": "string",
  "rating": "integer"
}
```

_Reponse(200-OK)_

```json
{
  "message": "New Watchlist Added",
  "data": {
    "id": 32,
    "title": "test",
    "cover": "test",
    "url": "test",
    "rating": 3,
    "UserId": 3,
    "updatedAt": "2024-04-18T08:38:52.860Z",
    "createdAt": "2024-04-18T08:38:52.860Z"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

_Response (500 - Internal Server Error)_

```js
{
  "message": "internal server error"
}
```

_Response (400 - Bad Request)_

```js
{
  "message": "validation error"
}
```

## 5. DELETE /comic/:id

Description: Delete a comic by ID.

Request:

- headers:

```json
{
  "Authorization": "Bearer acces_token"
}
```

- params

```json
{
  "id": "integer"
}
```

_Reponse(200-OK)_

```json
{
  "message": "<title name> success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

_Response (500 - Internal Server Error)_

```js
{
  "message": "internal server error"
}
```
