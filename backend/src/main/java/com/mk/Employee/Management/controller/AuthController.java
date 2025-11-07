package com.mk.Employee.Management.controller;

import com.mk.Employee.Management.dto.AuthResponse;
import com.mk.Employee.Management.dto.LoginRequest;
import com.mk.Employee.Management.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        // Validate input
        if (loginRequest.getUsername() == null || loginRequest.getUsername().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(AuthResponse.failure("Username is required"));
        }

        if (loginRequest.getPassword() == null || loginRequest.getPassword().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(AuthResponse.failure("Password is required"));
        }

        // Authenticate user
        AuthResponse response = authService.authenticate(
            loginRequest.getUsername().trim(), 
            loginRequest.getPassword()
        );

        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> logout() {
        // With JWT, logout is handled client-side by removing the token
        // Optionally, you can implement token blacklisting here
        return ResponseEntity.ok(
            new AuthResponse(true, "Logout successful", null, null, null)
        );
    }

    @GetMapping("/verify")
    public ResponseEntity<AuthResponse> verifyToken() {
        // If the request reaches here, the token is valid (JWT filter validated it)
        return ResponseEntity.ok(
            new AuthResponse(true, "Token is valid", null, null, null)
        );
    }
}
