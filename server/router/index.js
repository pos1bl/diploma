import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../controllers/user-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';
import specMiddleware from '../middlewares/specialist-middleware.js';
import { requireRole } from '../middlewares/role-middleware.js';
import giftController from '../controllers/gift-controller.js';
import specialistController from '../controllers/specialist-controller.js';
import adminController from '../controllers/admin-controller.js';
import upload from '../middlewares/upload.js';
import paymentController from '../controllers/payment-controller.js';

const router = new Router();

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/send_resume',
  [
    body('formResponse.fullName').notEmpty().withMessage('Ім\'я обов\'язкове'),
    body('formResponse.phone').notEmpty().withMessage('Телефон обов\'язковий'),
    body('formResponse.email').isEmail().withMessage('Некоректний email'),
    body('formResponse.experienceYears').isInt({ min: 0, max: 99 }).withMessage('Досвід має бути числом від 0 до 99'),
    body('formResponse.education').notEmpty().withMessage('Освіта обов\'язкова'),
    body('formResponse.about').notEmpty().withMessage('Поле "Про себе" обов\'язкове'),
    body('formResponse.availability').notEmpty().withMessage('Графік роботи обов\'язковий'),
    body('formResponse.profileLink').isURL().withMessage('Некоректне посилання на профіль'),
    body('formResponse.motivation').notEmpty().withMessage('Мотивація обов\'язкова'),
  ],
  userController.sendResume
);
router.post('/resend_activation', userController.resendActivation);
router.post('/create_session', authMiddleware, userController.createSession);
router.post('/change_name', authMiddleware, userController.changeName)
router.post('/change_email', authMiddleware, userController.changeEmail)
router.post('/change_password', authMiddleware, body('newPass').isLength({ min: 3, max: 32 }), userController.changePassword);
router.post('/send_victim_request', authMiddleware, upload.single('file'), userController.sendVictimRequest);
router.post('/cancel/:id', authMiddleware, userController.cancel);
router.post('/move/:id', authMiddleware, userController.move);
router.post('/form', userController.getSuitableSpecialists);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/user/sessions', authMiddleware, userController.getSessions);
router.get('/user/victim-request', authMiddleware, userController.getVictimRequest);
router.get('/user/sessions/:id', authMiddleware, userController.getSession);
router.get('/specialists', userController.getSpecialists);
router.get('/specialists/:id', userController.getSpecialistInfo);

router.post('/change_status/:id', authMiddleware, specMiddleware, specialistController.changeStatus);
router.post('/add_diplom', authMiddleware, specMiddleware, upload.single('image'), specialistController.addDiplom);
router.post('/add_course', authMiddleware, specMiddleware, upload.single('image'), specialistController.addCourse);
router.post('/add_unavailability', authMiddleware, specMiddleware, specialistController.addUnavailability);
router.post('/change_bio', authMiddleware, specMiddleware, specialistController.changeBio);
router.post('/change_notes/:id', authMiddleware, specMiddleware, specialistController.changeNotes);
router.post('/change_multiselect', authMiddleware, specMiddleware, specialistController.changeMultiselect);
router.post('/change_schedule', authMiddleware, specMiddleware, specialistController.changeSchedule);
router.get('/specialist/sessions/:id', authMiddleware, specMiddleware, specialistController.getSession);
router.get('/specialist/sessions', authMiddleware, specMiddleware, specialistController.getSessions);
router.get('/clients', authMiddleware, specMiddleware, specialistController.getClients);
router.get('/clients/names', authMiddleware, specMiddleware, specialistController.getClientNames);
router.get('/clients/:id', authMiddleware, specMiddleware, specialistController.getUserInfo);
router.get('/education', authMiddleware, specMiddleware, specialistController.getEducation);
router.get('/specialist', authMiddleware, specMiddleware, specialistController.getSpecialistByOwn);
router.get('/unavailabilities', authMiddleware, specMiddleware, specialistController.getUnavailabilities);

router.post('/add_specialist', authMiddleware, requireRole('admin'), upload.single('avatar'), adminController.addSpecialist);
router.post('/verify_victim', authMiddleware, requireRole('admin'), adminController.verifyVictim);

router.post('/create_payment_link/:type', authMiddleware, paymentController.createPaymentLink);
router.post('/user/refund/:id', authMiddleware, paymentController.refund);
router.post('/specialist/refund/:id', authMiddleware, specMiddleware, paymentController.refundBySpecialist);

router.get('/gift', giftController.fetchGift);

export default router;
