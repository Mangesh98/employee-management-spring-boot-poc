package com.mk.Employee.Management.service;

import com.mk.Employee.Management.dto.AuthResponse;
import com.mk.Employee.Management.model.User;
import com.mk.Employee.Management.repository.UserRepository;
import com.mk.Employee.Management.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, 
                      PasswordEncoder passwordEncoder, 
                      JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse authenticate(String username, String password) {
        try {
            // Find user by username
            Optional<User> userOptional = userRepository.findByUsername(username);
            
            if (userOptional.isEmpty()) {
                return AuthResponse.failure("Invalid username or password");
            }

            User user = userOptional.get();

            // Check if user is enabled
            if (!user.isEnabled()) {
                return AuthResponse.failure("Account is disabled");
            }

            // Verify password
            if (!passwordEncoder.matches(password, user.getPassword())) {
                return AuthResponse.failure("Invalid username or password");
            }

            // Generate JWT token
            String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

            // Return success response with token
            return AuthResponse.success(user.getUsername(), user.getRole(), token);

        } catch (Exception e) {
            return AuthResponse.failure("Authentication failed: " + e.getMessage());
        }
    }
}
