const app = require('express')
const router = app.Router();
const employeeController = require('../Controllers/employeeController')

router.post('/create-table', employeeController.createTable)
router.get('/getAll', employeeController.getEmployee)
router.post('/create', employeeController.addEmployee)
router.post('/getEmployee', employeeController.getSpecificEmployee)
router.post('/updateEmployee', employeeController.updateEmployee)
router.post('/deleteEmployee', employeeController.deleteEmployee)

module.exports = router