const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const controller = require('../controllers/auth.controller');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Muitas tentativas de login. Tente novamente mais tarde.' },
});

router.post('/registrar', controller.registrar);
router.post('/login', loginLimiter, controller.login);

module.exports = router;