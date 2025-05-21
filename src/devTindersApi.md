express.Router

POST - signup
POST - login    - authRouter
POST - logout

GET - profile/view
PATCH - profile/edit   - profileRouter
PATCH -/profile/password


POST -   /request/send/interested/:userId
         /request/send/ignore/:userId
     
                                                  - connectionRequestRouter
POST      /request/review/accepted/:requestId
POST      /request/review/rejected/:requestId


GET - /connections          - UserRouter
GET - /request/received
GET - /feed