package com.mk.Employee.Management.dto;

public class AuthResponse {
    private boolean success;
    private String message;
    private String username;
    private String role;
    private String token;

    public AuthResponse() {
    }

    public AuthResponse(boolean success, String message, String username, String role, String token) {
        this.success = success;
        this.message = message;
        this.username = username;
        this.role = role;
        this.token = token;
    }

    // Static factory methods for common responses
    public static AuthResponse success(String username, String role, String token) {
        return new AuthResponse(true, "Login successful", username, role, token);
    }

    public static AuthResponse failure(String message) {
        return new AuthResponse(false, message, null, null, null);
    }

    // Getters and setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
