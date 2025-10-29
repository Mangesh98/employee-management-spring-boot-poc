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
}

