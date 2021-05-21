# Blogpress API
A API to interact with blogpress application avaible in https://github.com/antoniobsi21/blogpress

## Requirements
User the existing `.env` file and set the following fields:

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