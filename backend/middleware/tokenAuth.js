const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const tokenAuth = async (req, res, next) => {
  //first of all we have this next argument which allows us to go to the next middleware
  //such as the router.get()   router.post()   router.patch()
  const {authorization} = req.headers;

  if (!authorization) {
    return res.status(401).json({error: "Authorization Token Required"});
  }
  //from our Network Headers, there will be a section called as authoriztion which
  //will only appear when u make an authorized request.
  // inside the authorization
  //log(authorization)  we will see "Bearer gesgvdbr2g24bfseze.5ges4zf5f4351ce35.fzes53se4cf3z5es4fz5s"
  //in this we need that signature field only. So we have to seperate it from the "Bearer"

  const token = authorization.split(" ")[1];
  try {
    const {_id} = jwt.verify(token, process.env.SECRET); // THIS WILL RETURN THE PAYLOAD WE GIVE IN userController.js jwt.sign({})
    //now we need to attach the data which we will get by send the _id to find that data in db
    req.user = await User.findOne({_id}).select("_id");
    //after that we are selecting only the _id value(like {_id:1}) and we will be attaching to the req.user
    //by doing this we can access req.user from any other middleware
    next();
    //Now go to postman and send get request to localhost:5000/api/todolist
    //it wont work as we should provide authorization token to proceed to next middleware
    //first make the login post request and get the token from response
    //and copy the token and go to get request and select authorization and select "Bearer"
    //Now paste the token and send get request....now u have to get the data from db
  } catch (error) {
    console.log(error);
    res.status(401).json({error: "Request is not Authorized"});
  }
};

module.exports = tokenAuth;
