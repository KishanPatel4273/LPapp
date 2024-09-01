** USERS **
**GET api/users**
- list all users

**GET api/users/{id}**
- gets users with given id

**POST api/users**
- creates a new user
    - {"firstName": "jon",  
    "lastName": "doe",
    "email": "foo2@gmail.com",  
    "admin": true,  
    "active": true }

**PUT api/users/{id}**
- in the body proved new user
- only admin and active status will get changes as  
  other values are from Microsoft log in

**DELETE api/users/{id}**
- deletes user with given id