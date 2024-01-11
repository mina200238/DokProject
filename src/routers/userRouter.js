const { Router } = require('express');
const userController = require('../controllers/userController');
const userDogController = require('../controllers/userDogController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

const router = Router();

router.get('/userInfo/:_id', userController.getUserInfo);
router.get(
  '/myInfo',
  jwtMiddleware.authenticateToken,
  userController.getMyInfo,
);

router.get('userInfo/:userId', userController.getUserInfo);

router.get(
  '/myDog',
  jwtMiddleware.authenticateToken,
  userDogController.getMyDog,
);

router.post('/signUp', userController.signUp);
router.post('/signIn', userController.signIn);
router.post('/signOut', userController.signOut);

router.patch(
  '/myInfo',
  jwtMiddleware.authenticateToken,
  userController.editUserInfo,
);

router.delete(
  '/myInfo',
  jwtMiddleware.authenticateToken,
  userController.deleteUser,
);
// router.get(
//   '/myInfo/matchings',
//   jwtMiddleware.authenticateToken,
//   userController.getMyMatchings,
// );

router.post(
  '/myDog',
  jwtMiddleware.authenticateToken,
  userDogController.createUserDog,
);

module.exports = router;
