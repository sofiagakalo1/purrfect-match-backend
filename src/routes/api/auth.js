const { Router } = require('express');

const ctrl = require('../../controllers/auth');

const {
  authenticate,
  googlePassport,
  validateBody,
  uploadCloud,
} = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = Router();

router.get(
  '/google',
  googlePassport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/google/callback',
  googlePassport.authenticate('google', { session: false }),
  ctrl.googleAuth
);

router.post('/register', validateBody(schemas.registerParams), ctrl.register);

router.post('/login', validateBody(schemas.loginParams), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.post('/refresh', validateBody(schemas.refreshParams), ctrl.refresh);

router.get('/current', authenticate, ctrl.getCurrent);

router.patch(
  '/current',
  authenticate,
  uploadCloud(schemas.avatarConfig),
  validateBody(schemas.updateParams),
  ctrl.updateCurrent
);

router.patch(
  '/current/avatar',
  authenticate,
  uploadCloud(schemas.avatarConfig),
  ctrl.updateAvatar
);

module.exports = router;
