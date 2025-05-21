const validateEditProfileData = (req) =>{
 const allowedEditableFIelds = ['firstName' ,"lastName" , "age" , "gender" , "about" ,"skills" ,"profilePic"]
   const isEditAllowed  = Object.keys(req.body).every((field)=> allowedEditableFIelds.includes(field))
   return isEditAllowed
}

module.exports = validateEditProfileData