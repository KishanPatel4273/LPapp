# **Users** 
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

# **Stores**
**GET api/stores** 
- returns list of stores  

**GET api/stores/{id}** 
- returns store with given id

**POST api/stores**
- given a list of stores will add them
- format [{...},...]
- example POST [{
                  "store_type":"SPIRIT",  
                  "store_number":61089,  
                  "address":"1030 South White Rd.",  
                  "city": "San Jose",  
                  "state": "CA",  
                  "zip": "95127",  
                  "year": 2024
              }]

<!-- **PUT api/stores/{id}**
- in the body proved new store

**DELETE api/stores/{id}**
- will delete store with given id -->