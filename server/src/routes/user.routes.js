import { Router } from "express";
import { changeCurrentPassword, deleteUser, getCurrentUser, getUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar,getCookie } from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.middleware.js"
import { contactRateLimiter, verifyAdmin, verifyJwt } from "../middleware/auth.middleware.js";
import { sendContactEmail } from "../controllers/contactController.js";
const router = Router()


router.route('/')
    .get((req, res) => {
        res.json("Hello from server")
    })


router.route('/get-current-user')
    .get(verifyJwt, getCurrentUser)

router.route('/userid/:id')
    .get(getUser)

/*router.route('/register')
    .post(
        upload.single("avatar"),
        registerUser
    )
*/
router.route('/register').post(
    (req, res, next) => {
      upload.single("avatar")(req, res, (error) => {
        if (error) {
          console.error('Error uploading file:', error);
          return res.status(500).json({ message: 'Error uploading file' });
        }
        next();
      });
    },
    registerUser
  );
  
router.route('/login')
    .post(loginUser)

// secured routes
router.route('/logout')
    .post(verifyJwt, logoutUser)

router.route('/get-cookie')
.get(verifyJwt,getCookie)
router.route('/refresh-token')
    .post(refreshAccessToken)

//contactus
router.route('/contact').post(verifyJwt, contactRateLimiter, sendContactEmail);
//Account Update Routes

//change current password
router.route('/change-password')
    .patch(verifyJwt, changeCurrentPassword)

//change fullName or email route
router.route('/change-account-details')
    .patch(verifyJwt, updateAccountDetails)

//change avatar
router.route('/change-avatar')
    .patch(
        verifyJwt,
        upload.single("avatar"),
        updateUserAvatar
    )
router.route('/account/delete')
.delete(
    verifyJwt,
    //verifyAdmin,
    deleteUser
)


export default router