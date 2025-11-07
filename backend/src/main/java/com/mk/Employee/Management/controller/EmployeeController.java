package com.mk.Employee.Management.controller;

import com.mk.Employee.Management.model.Employee;
import com.mk.Employee.Management.repository.EmployeeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;
    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

   @PostMapping
    public ResponseEntity<Employee> save(@RequestBody Employee employee) {
        Employee newEmployee = employeeRepository.save(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(newEmployee);
   }
   @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(employees);
   }

   @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id).orElse(null);
        return ResponseEntity.status(HttpStatus.OK).body(employee);
   }

   @GetMapping("/search")
    public ResponseEntity<List<Employee>> getEmployeesByName(@RequestParam String name) {
        List<Employee> employees=employeeRepository.findByOrganizationIgnoreCase(name);

        if(employees.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(employees);
   }

   @PutMapping("/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        // Validate request body
        if (employeeDetails == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Employee details cannot be null");
        }

        // Validate required fields
        if (employeeDetails.getName() == null || employeeDetails.getName().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Employee name is required");
        }
        if (employeeDetails.getEmail() == null || employeeDetails.getEmail().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Employee email is required");
        }

        // Find existing employee
        Employee existingEmployee = employeeRepository.findById(id).orElse(null);
        
        if (existingEmployee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Employee not found with id: " + id);
        }

        // Update employee fields
        existingEmployee.setName(employeeDetails.getName().trim());
        existingEmployee.setEmail(employeeDetails.getEmail().trim());
        existingEmployee.setOrganization(employeeDetails.getOrganization() != null 
                ? employeeDetails.getOrganization().trim() : null);
        existingEmployee.setLocation(employeeDetails.getLocation() != null 
                ? employeeDetails.getLocation().trim() : null);
        existingEmployee.setSalary(employeeDetails.getSalary());

        try {
            Employee updatedEmployee = employeeRepository.save(existingEmployee);
            return ResponseEntity.status(HttpStatus.OK).body(updatedEmployee);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating employee: " + e.getMessage());
        }
   }
}

