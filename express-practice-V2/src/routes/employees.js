const express = require('express');
const router = express.Router();

const { employeeControllers } = require('../controllers');

router.get('/', employeeControllers.getAllEmployees);
router.get('/:id', employeeControllers.getEmployeeById);
router.post('/', employeeControllers.createNewEmployee);
router.patch('/:id', employeeControllers.editEmployeeById);
router.patch('/', employeeControllers.editEmployeeByGroupId);
router.delete('/:id', employeeControllers.deleteEmployeeById);
router.delete('/', employeeControllers.deleteEmployeeByGroupId);

module.exports = router;
