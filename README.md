# Blogpress API
A API to interact with blogpress application avaible in https://github.com/antoniobsi21/blogpress

## Requirements
Use the existing `.env` file and set the following fields:

    HOST=localhost
    PORT=3000 # The port that the application will run

    # DATABASE
    DATABASEUSER=<databaseuser>
    DATABASEPASSWORD=<databasepassword>

    # JWT Secret
    SECRET=<puthereagoodsecret> # Secret that will be used with JWT Tokens

Then install the required modules:

    npm install

and you should be ready to go.

# Blogpress Rest API
This API is used to manage the blogpress application.
## Get auth token

This endpoint returns a token if exist a valid user on the database.

### Request
`POST /auth/token`

### Parameters
* None

### Body
#### Example:

    {
        "email": "string',
        "password": string
    }

### Responses
#### Status
* **200** - Ok!
* **400** - Invalid email/password
* **404** - There's no such email on the database

#### Content
Each client on the list contain the following fields:

Field |   Type  | Description
------|---------|------------
token | string  | The provided user token

#### Example
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbnRvbmlvc2ZqMjFAZ21haWwuY29tIiwiaWF0IjoxNjIxNDk0MjQ4LCJleHAiOjE2MjE2NjcwNDh9.b8Inq-SUoB_xpk8_nmxdBiBsJSyL8S_9-xhoPc7U1H0"
    }

# Users

Users resource. All requests to this endpoint shall have the following headers:

### Headers
    Authorization: 'Bearer <authtoken>'

## Get all
This endpoint return a list of users in the database.

### Request
`GET /users`

### Responses

#### Status
* **200** - Ok!
* **401** - Authorization necessary or token invalid.

#### Content
Each user on the list contain the following fields:

Field    |   Type  | Description
---------|---------|------------
id       | integer | User id
email    | string  | User email
password | integer | User encrypted password
createdAt| Date    | Datetime when the user was created
updatedAt| Date    | Datetime when the user was updated last time

#### Example
    [
        {
            "id": 5,
            "email": "admin@admin.com",
            "password": "$2a$10$oWRrx0cP0a8wlnpsw1Nn.upV0vHA4njSy4PSjQz61dWPI47FRvOE.",
            "createdAt": "2021-05-20T22:44:15.000Z",
            "updatedAt": "2021-05-20T22:44:38.000Z"
        },
        {
            "id": 6,
            "email": "admin2@admin.com",
            "password": "$2a$10$oWRrx0cP0a8wlnpsw1Nn.upV0vHA4njSy4PSjQz61dWPI47FRvOE.",
            "createdAt": "2021-05-20T22:44:15.000Z",
            "updatedAt": "2021-05-20T22:44:38.000Z"
        }
    ]

## Get specific user
This endpoint return a specific user in the database.
### Request
`GET /users/:id`

### Parameters
* id - User id. Integer

### Responses
#### Status
* **200** - Ok!
* **400** - Invalid id
* **401** - Authorization necessary or token invalid.
* **404** - There's no such user with provided id

#### Content

Field    |   Type  | Description
---------|---------|------------
id       | integer | User id
email    | string  | User email
password | integer | User encrypted password
createdAt| Date    | Datetime when the user was created
updatedAt| Date    | Datetime when the user was updated last time

#### Example
    
    {
        "id": 5,
        "email": "admin@admin.com",
        "password": "$2a$10$oWRrx0cP0a8wlnpsw1Nn.upV0vHA4njSy4PSjQz61dWPI47FRvOE.",
        "createdAt": "2021-05-20T22:44:15.000Z",
        "updatedAt": "2021-05-20T22:44:38.000Z"
    }

## Create user
This endpoint insert a user in the database and return it if it was inserted successfully.
### Request
`POST /users`

### Body
Example:

    {
        "email": "admin@admin.com",
        "password": "nodejs"
    }

### Responses
#### Status
* **201** - Created!
* **400** - Invalid email or password
* **401** - Authorization necessary or token invalid.
* **404** - There's no such user with provided id
* **409** - It already exists a user with provided email
* **500** - Server side error when creating the user even though it was valid.

#### Content
It can either return the inserted user or a error message.

Field    |   Type  | Description
---------|---------|------------
id       | integer | User id
email    | string  | User email
password | integer | User encrypted password
createdAt| Date    | Datetime when the user was created
updatedAt| Date    | Datetime when the user was updated last time
#### Example
    
    {
        "id": 5,
        "email": "admin@admin.com",
        "password": "$2a$10$oWRrx0cP0a8wlnpsw1Nn.upV0vHA4njSy4PSjQz61dWPI47FRvOE.",
        "createdAt": "2021-05-20T22:44:15.000Z",
        "updatedAt": "2021-05-20T22:44:38.000Z"
    }    

Field  | Type   | Description
-------|--------|------------
error  | string | Error message

#### Example

    {
        "error": "Email already exist"
    }

## Patch user
This endpoint update a user with provided attributes

### Request
`PATCH /users/:id`

### Parameters
* id - User's id

### Body
Example:

    {
        "email": "admin@admin.com",
        "password": "nodejs"
    }
##### You can ignore one field but not both

<br/>

### Responses
#### Status
* **200** - Updated!
* **400** - Invalid id or missing attributes
* **401** - Authorization necessary or token invalid.
* **404** - There's no such user with provided id
* **409** - It already exists a user with provided email

#### Content
It can either return the inserted user or a erro.

Field    |   Type  | Description
---------|---------|------------
id       | integer | User id
email    | string  | User email
password | integer | User encrypted password
createdAt| Date    | Datetime when the user was created
updatedAt| Date    | Datetime when the user was updated last time
#### Example
    
    {
        "id": 5,
        "email": "admin@admin.com",
        "password": "$2a$10$oWRrx0cP0a8wlnpsw1Nn.upV0vHA4njSy4PSjQz61dWPI47FRvOE.",
        "createdAt": "2021-05-20T22:44:15.000Z",
        "updatedAt": "2021-05-20T22:44:38.000Z"
    }    

Field  | Type   | Description
-------|--------|------------
error  | string | Error message

#### Example

    {
        "error": "Email already exist"
    }