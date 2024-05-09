import express from 'express'

const router = express.Router()

import { getAllMessages, storeMessage } from '../controllers/ChatController.js'
import { login, register } from '../controllers/AuthController.js'

router.get('/', getAllMessages)
router.post('/login', login)
router.post('/register', register)
router.post('/send-message', storeMessage)
// router.get('/student/:id', showStudentById)
// router.put('/student/:id', updateStudent)
// router.post('/student', createStudent)
// router.post('/login', authenticate)
// router.delete('/student/:id', deleteStudent)
// router.post('/schedule', createSchedule)
// router.get('/schedule', getSchedule)
// router.post('/attendance', insertAttendance)
// router.post('/attendance/time-in', timeIn)
// router.put('/attendance/time-out/:id', timeOut)
// router.get('/attendance/:id', showAttendanceById)
// router.delete('/attendance/:id', deleteAttendance)
// router.get('/attendance', showAllAttendace)
// router.get('/attendance/today/:id', showAttendanceToday)

export default router