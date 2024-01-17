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

router.get(
  '/myDog',
  jwtMiddleware.authenticateToken,
  userDogController.getMyDog,
);

router.post('/signUp', userController.signUp);
router.post('/signIn', userController.signIn);
router.post('/signOut', userController.signOut);

//user개인정보변경 api
router.patch(
  '/myInfo',
  jwtMiddleware.authenticateToken,
  userController.editUserInfo,
);

//user비밀번호 변경 api
router.patch(
  '/myPassword',
  jwtMiddleware.authenticateToken,
  userController.editUserPassword,
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
