# Assignment
Develope a simple application in NodeJS which provide services to send individual/group messages and manage the data as per below scenarios:

#### Scenarios
* It should support role based user authentication and authorization mechanism.
* It should support at least two type of role <b>Admin</b> and <b>Basic</b>.
* Only authenticated user can execute the api methods.
* Only Admin can create/update/delete user.
* Only Admin can view the list of all users and their details.
* Basic user can view his details only.
* Any authenticated user can create/update/delete Group.
* Any authenticated user can search member in the group and also add member in the group.
* Any authenticated user can send message to individual user or in group.
* Any authenticated user can like the message or reply the message.

You have to also automate the complete unit testing process using any unit test framework of your choice.<br/><br/>
You can use any database of your choice to complete this assignment.


## Learnig steps


### Code setup from github

* Setup MYSQL Database at your local machine if not setup already.
* Open MYSQL shell or command prompt and run the scripts mentioned in <b>mySqlScripts.sql</b> file under project folder.
* Clone the project from github
* Set your MySql connection settings into config.js file under config folder
* Run npm install command on your terminal to install the required packages.
* Run npm start command on your terminal to start the application. You will see the screen as below:

![image](https://user-images.githubusercontent.com/84455469/127320266-4d31ea2a-db11-414b-a3b1-a58050ae9b41.png)

* Open postman and execute APIs with payload mentioned as below. 
* To execute the test cases defined in test.js file under test folder of the project, you have to open another terminal while keep running the first terminal.
* On the new terminal run the commad "mocha". It will run all the test cases and you can see the results on the same terminal. You will see the screen as below:

![image](https://user-images.githubusercontent.com/84455469/127320378-981bb489-0fdf-49de-9996-975f45a52aaf.png)

### Required packages and commands to install
> npm install express --save-dev

> npm install mysql --save-dev

> npm install nodemon --save-dev

> npm install body-parser --save-dev

> npm install bcryptjs

> npm install jsonwebtoken

> npm install --save-dev chai

> npm install --save-dev chai-http 

> npm install -g mocha --save-dev

> npm install --save-dev supertest

> npm install --save-dev should

### Sample Request and Response
#### A. SignIn API to get Access token
##### 1. POST: http://localhost:5000/api/auth/signIn
This is the SIGNIN API and will be accessed by any user to get Access token!
###### Payload: Invalid UserName in payload
```json
{
    "UserName": "test",
    "Password": "test"
}
```

###### Authentication Header:
```json
Not Required
```

###### Response:
```json
{
    "error": true,
    "accessToken": null,
    "message": "User not found!"
}
```

###### OR
###### Payload: Invalid Password in payload
```json
{
    "UserName": "user",
    "Password": "xxxxx"
}
```

###### Authentication Header:
```json
Not Required
```

###### Response:
```json
{
    "error": true,
    "accessToken": null,
    "message": "Invalid password!"
}
```

###### OR
###### Payload: Valid UserName and Password in payload with User Role
```json
{
    "UserName": "user",
    "Password": "user"
}
```

###### Authentication Header:
```json
Not Required
```

###### Response:
```json
{
    "id": 2,
    "userName": "user",
    "email": "user@abc.com",
    "roleId": 2,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4",
    "message": "User signed in successfully!",
    "error": false
}
```

###### OR
###### Payload: Valid UserName and Password in payload with Admin Role
```json
{
    "UserName": "admin",
    "Password": "admin"
}
```

###### Authentication Header:
```json
Not Required
```

###### Response:
```json
{
    "id": 1,
    "userName": "admin",
    "email": "admin@abc.com",
    "roleId": 1,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q",
    "message": "User signed in successfully!",
    "error": false
}
```

#### B. Authentication & Authorization APIs
##### 1. GET: http://localhost:5000/api/auth/default
This is the DEFAULT API and will be accessed by any user. Authentication/Authorization or Access token is not required to access this api!
###### Payload:
```json
Not Required
```

###### Authentication Header:
```json
Not Required
```

###### Response:
```json
{
    "error": false,
    "message": "Default page! It is accessible by all users."
}
```

##### 2. GET: http://localhost:5000/api/auth/user
This is the USER DASHBOARD API and will be accessed by only authenticated user. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
Not Required
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
Not Required
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": false,
    "message": "User Dashboard page! It is accessible by all authenticated users."
}
```

##### 3. GET: http://localhost:5000/api/auth/admin
This is the ADMIN DASHBOARD API and will be accessed by only authenticated user having Admin role. Authentication/Authorization and Access token are required to access this api!
###### Payload: With User Access token in request header
```json
Not Required
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": true,
    "message": "You are not having admin priviledge to perform this action!"
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
Not Required
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "Admin Dashboard page! It is accessible only by authenticated users who has Admin role."
}
```

#### C. User APIs
##### 1. POST: http://localhost:5000/api/user
This is the CREATE USER API and will be accessed by only authenticated user having Admin role. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
{
    "UserName": "test",
    "Password": "test",
    "FirstName": "test",
    "LastName": "test",
    "Email": "test@abc.com"
}
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
{
    "UserName": "test",
    "Password": "test",
    "FirstName": "test",
    "LastName": "test",
    "Email": "test@abc.com"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": true,
    "message": "You are not having admin priviledge to perform this action!"
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
{
    "UserName": "test",
    "Password": "test",
    "FirstName": "test",
    "LastName": "test",
    "Email": "test@abc.com"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "Record created successfully!",
    "data": 44
}
```

##### 2. PUT: http://localhost:5000/api/user/44
This is the UPDATE USER API and will be accessed by only authenticated user. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
{    
    "FirstName": "test12",
    "LastName": "test12",
    "Email": "test12@abc.com"
}
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
{    
    "FirstName": "test12",
    "LastName": "test12",
    "Email": "test12@abc.com"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": false,
    "message": "Record updated successfully!"
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
{    
    "FirstName": "test1234",
    "LastName": "test1234",
    "Email": "test1234@abc.com"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "Record updated successfully!"
}
```

##### 3. DELETE: http://localhost:5000/api/user/44
This is the DELETE USER API and will be accessed by only authenticated user having Admin role. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
Not required.
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
Not required.
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": true,
    "message": "You are not having admin priviledge to perform this action!"
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
Not required.
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "Record deleted successfully!"
}
```

##### 4. GET: http://localhost:5000/api/user/2
This is the GET USER API and will be accessed by only authenticated user. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
Not required.
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User or Admin Access token in request header
```json
Not required.
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": false,
    "data": [
        {
            "Id": 2,
            "UserName": "user",
            "Password": "$2a$08$wRd3TZBfe9KctXm8GVk8JOZ3Rn1XY/.1c42UiFCvO.AtXFGO.nCNS",
            "FirstName": "Test",
            "LastName": "User",
            "Email": "user@abc.com",
            "RoleId": 2,
            "IsActive": 0
        }
    ]
}
```

##### 5. GET: http://localhost:5000/api/user
This is the GET USERS API and will be accessed by only authenticated user having admin role. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
Not required.
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User access token in request header
```json
Not required.
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": true,
    "message": "You are not having admin priviledge to perform this action!"
}
```

###### OR
###### Payload: With Admin access token in request header
```json
Not required.
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "data": [
        {
            "Id": 1,
            "UserName": "admin",
            "Password": "$2a$08$UTr5G3B.3iGfwodXyU2RIeCH69xbHCKBnWOk38V6lHq5dh8Wo83Mm",
            "FirstName": "Test",
            "LastName": "Admin",
            "Email": "admin@abc.com",
            "RoleId": 1,
            "IsActive": 0
        },
        {
            "Id": 2,
            "UserName": "user",
            "Password": "$2a$08$wRd3TZBfe9KctXm8GVk8JOZ3Rn1XY/.1c42UiFCvO.AtXFGO.nCNS",
            "FirstName": "Test",
            "LastName": "User",
            "Email": "user@abc.com",
            "RoleId": 2,
            "IsActive": 0
        }
    ]
}
```

##### 6. PUT: http://localhost:5000/api/user/activateDeactivateUser/2
This is the ACTIVATE/DE-ACTIVATE USER API and will be accessed by only authenticated user having admin role. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
{    
    "IsActive": 1
}
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
{    
    "IsActive": 1
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": true,
    "message": "You are not having admin priviledge to perform this action!"
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
{    
    "IsActive": 1
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "User activated/de-activated successfully!"
}
```

##### 7. PUT: http://localhost:5000/api/user/changeUserPassword/2
This is the CHANGE USER PASSWORD API and will be accessed by only authenticated user. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
{    
    "Password": "test"
}
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User or Admin Access token in request header
```json
{    
    "Password": "test"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": false,
    "message": "Password changed successfully!"
}
```
