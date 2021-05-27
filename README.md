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
It can either return the updated user or a error.

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

# Categories

Categories resource. All requests to this resource shall have the following headers:

### Headers
    Authorization: 'Bearer <authtoken>'

## Get all
This endpoint return a list of categories in the database.

### Request
`GET /categories`

### Responses

#### Status
* **200** - Ok!
* **401** - Authorization necessary or token invalid.

#### Content
Each category on the list contain the following fields:

Field    |   Type  | Description
---------|---------|------------
id       | integer | Category id
title    | string  | Category title
slug     | integer | Category slug
createdAt| Date    | Datetime when the category was created
updatedAt| Date    | Datetime when the category was updated last time

#### Example
    [
        {
        "id": 1,
        "title": "Programação",
        "slug": "Programacao",
        "createdAt": "2021-05-20T22:45:08.000Z",
        "updatedAt": "2021-05-20T22:45:08.000Z"
        },
        {
        "id": 2,
        "title": "JavaScript",
        "slug": "JavaScript",
        "createdAt": "2021-05-26T17:43:16.000Z",
        "updatedAt": "2021-05-26T17:53:32.000Z"
        }
    ]

## Get specific category
This endpoint return a specific category in the database.
### Request
`GET /categories/:id`

### Parameters
* id - Category id. Integer

### Responses
#### Status
* **200** - Ok!
* **400** - Invalid id
* **401** - Authorization necessary or token invalid.
* **404** - There's no such category with provided id

#### Content

Field    |   Type  | Description
---------|---------|------------
id       | integer | Category id
title    | string  | Category title
slug     | integer | Category slug
createdAt| Date    | Datetime when the category was created
updatedAt| Date    | Datetime when the category was updated last time

#### Example
    
    {
        "id": 2,
        "title": "JavaScript",
        "slug": "JavaScript",
        "createdAt": "2021-05-26T17:43:16.000Z",
        "updatedAt": "2021-05-26T17:53:32.000Z"
    }

## Create category
This endpoint insert a category in the database and return it if it was inserted successfully.
### Request
`POST /categories`

### Body
Example:

    {
        "title": "JavaScript"
    }

### Responses
#### Status
* **201** - Created!
* **400** - Invalid title
* **401** - Authorization necessary or token invalid.
* **409** - It already exists a category with similar title (slug)
* **500** - Server side error when creating the user even though it was valid.

#### Content
It can either return the inserted category or a error message.

Field    |   Type  | Description
---------|---------|------------
id       | integer | User id
email    | string  | User email
password | integer | User encrypted password
createdAt| Date    | Datetime when the user was created
updatedAt| Date    | Datetime when the user was updated last time
#### Example
    
    {
        "id": 2,
        "title": "JavaScript",
        "slug": "JavaScript",
        "createdAt": "2021-05-26T17:43:16.000Z",
        "updatedAt": "2021-05-26T17:53:32.000Z"
    }   

Field  | Type   | Description
-------|--------|------------
error  | string | Error message

#### Example

    {
        "error": "Title invalid"
    }

## Patch category
This endpoint update a category with provided attributes

### Request
`PATCH /categories/:id`

### Parameters
* id - User's id

### Body
Example:

    {
        "title": "JavaScript"
    }

### Responses
#### Status
* **200** - Updated!
* **400** - Invalid id or title
* **401** - Authorization necessary or token invalid.
* **404** - There's no such user with provided id
* **409** - It already exists a category with similar title (slug).

#### Content
It can either return the updated category or a error message.

Field    |   Type  | Description
---------|---------|------------
id       | integer | User id
email    | string  | User email
password | integer | User encrypted password
createdAt| Date    | Datetime when the user was created
updatedAt| Date    | Datetime when the user was updated last time
#### Example
    
    {
        "id": 2,
        "title": "JavaScript",
        "slug": "JavaScript",
        "createdAt": "2021-05-26T17:43:16.000Z",
        "updatedAt": "2021-05-26T17:53:32.000Z"
    }   

Field  | Type   | Description
-------|--------|------------
error  | string | Error message

#### Example

    {
        "error": "Title invalid"
    }

# Articles

Articles resource. All requests to this resource shall have the following headers:

### Headers
    Authorization: 'Bearer <authtoken>'

## Get all
This endpoint return a list of articles in the database.

### Request
`GET /articles`

### Responses

#### Status
* **200** - Ok!
* **401** - Authorization necessary or token invalid.

#### Content
Each article on the list contain the following fields:

Field      |   Type  | Description
-----------|---------|------------
id         | integer | Article id
title      | string  | Article title
slug       | integer | Article slug
body       | string  | Article body
categoryId | integer | Article category id
createdAt  | Date    | Datetime when the article was created
updatedAt  | Date    | Datetime when the article was updated last time

#### Example
    [
        {
            "id": 1,
            "title": "Article 1",
            "slug": "Article-1",
            "body": "Article 1 content",
            "createdAt": "2021-05-26T21:19:08.000Z",
            "updatedAt": "2021-05-26T21:19:08.000Z",
            "categoryId": 2
        },
        {
            "id": 2,
            "title": "Article 2",
            "slug": "Article-2",
            "body": "Article 2 content",
            "createdAt": "2021-05-26T21:20:52.000Z",
            "updatedAt": "2021-05-26T21:20:52.000Z",
            "categoryId": 2
        }
    ]

## Get specific article
This endpoint return a specific article in the database.
### Request
`GET /articles/:id`

### Parameters
* id - Category id. Integer

### Responses
#### Status
* **200** - Ok!
* **400** - Invalid id
* **401** - Authorization necessary or token invalid.
* **404** - There's no such article with provided id

#### Content

Field      |   Type  | Description
-----------|---------|------------
id         | integer | Article id
title      | string  | Article title
slug       | integer | Article slug
body       | string  | Article body
categoryId | integer | Article category id
createdAt  | Date    | Datetime when the article was created
updatedAt  | Date    | Datetime when the article was updated last time

#### Example
    
    {
        "id": 1,
        "title": "Article 1",
        "slug": "Article-1",
        "body": "Article 1 content",
        "createdAt": "2021-05-26T21:19:08.000Z",
        "updatedAt": "2021-05-26T21:19:08.000Z",
        "categoryId": 2
    }

## Create article
This endpoint inserts a article in the database and return it if it was inserted successfully.
### Request

`POST /articles`

### Body
Field      |   Type  | Description
-----------|---------|------------
title      | string  | Article title
body       | string  | Article body
categoryId | integer | Article category id

Example:

    {
        "title": "What is JavaScript?",
        "body": "JavaScript is the Programming Language for the Web.",
        "categoryId": 2
    }

### Responses
#### Status
* **201** - Created!
* **400** - CategoryId or title invalid
* **401** - Authorization necessary or token invalid.
* **409** - It already exists a article with similar title (slug)
* **500** - Server side error when creating the user even though it was valid.

#### Content
It can either return the inserted category or a error message.

Field      |   Type  | Description
-----------|---------|------------
id         | integer | Article id
title      | string  | Article title
slug       | integer | Article slug
body       | string  | Article body
categoryId | integer | Article category id
createdAt  | Date    | Datetime when the article was created
updatedAt  | Date    | Datetime when the article was updated last time

#### Example
    
    {
        "id": 10,
        "title": "What is JavaScript (2021 edition)?",
        "slug": "What-is-JavaScript-(2021-edition)",
        "body": "JavaScript is the Programming Language for the Web.",
        "categoryId": 2,
        "updatedAt": "2021-05-27T17:41:59.510Z",
        "createdAt": "2021-05-27T17:41:59.510Z"
    }  

Field  | Type   | Description
-------|--------|------------
error  | string | Error message

#### Example

    {
        "error": "Title or categoryId invalid"
    }

## Patch category
This endpoint update a article with provided attributes

### Request
`PATCH /articles/:id`

### Parameters
* id - User's id

### Body
Example:

    {
        "title": "JavaScripto!"
    }

### Responses
#### Status
* **200** - Updated!
* **400** - Invalid id, title or category
* **401** - Authorization necessary or token invalid.
* **404** - There's no such article with provided id
* **409** - It already exists a article with similar title (slug).

#### Content
It can either return the updated article or a error message.

Field      |   Type  | Description
-----------|---------|------------
id         | integer | Article id
title      | string  | Article title
slug       | integer | Article slug
body       | string  | Article body
categoryId | integer | Article category id
createdAt  | Date    | Datetime when the article was created
updatedAt  | Date    | Datetime when the article was updated last time

#### Example
    
    {
        "id": 10,
        "title": "JavaScripto!",
        "slug": "JavaScripto!",
        "body": "JavaScript is the Programming Language for the Web.",
        "createdAt": "2021-05-27T17:41:59.000Z",
        "updatedAt": "2021-05-27T17:44:07.789Z",
        "categoryId": 2
    }

Field  | Type   | Description
-------|--------|------------
error  | string | Error message

#### Example

    {
        "error": "Invalid title"
    }