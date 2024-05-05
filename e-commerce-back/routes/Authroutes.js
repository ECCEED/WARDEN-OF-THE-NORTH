const router = require('express').Router()
const { register, login,email_verify,forgotpassword,resetpassword} = require("../controllers/authcontrollers");
const { getUser,updateUser } = require("../controllers/profileData");
const {getAdmins,getUsers}=require("../controllers/getallusers");
const {addAgents,AdminLogin,deleteAdmin,deleteUser,FetchAdmin}=require("../controllers/admincontroller");


router.post("/register", register);
router.post("/login", login);
router.get("/profile/:id", getUser); 
router.put("/Updateprofile/:id", updateUser); 
router.patch("/email_verify/:token", email_verify);
router.post("/Forgotpassword",forgotpassword);
router.patch("/Resetyoupassword/:id",resetpassword);
router.get("/team",getAdmins);
router.get("/contacts",getUsers);
router.post("/form",addAgents);
router.post("/login-admin",AdminLogin);
router.delete("/team/:id",deleteAdmin);
router.delete("/contacts/:id",deleteUser);
router.get("/dashboard/:id",FetchAdmin);

// router.get("/profile",getCurrentUser);

module.exports = router;