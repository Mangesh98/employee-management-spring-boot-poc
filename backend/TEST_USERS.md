# Test Users Setup

## Option 1: SQL Script (For PostgreSQL/MySQL)

Add these users to your database:

```sql
-- Password: 'password' (BCrypt encoded)
INSERT INTO users (username, password, role, enabled)
VALUES ('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_ADMIN', true);

INSERT INTO users (username, password, role, enabled)
VALUES ('user', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_USER', true);

-- Password: 'test123' (BCrypt encoded)
INSERT INTO users (username, password, role, enabled)
VALUES ('testuser', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6', 'ROLE_USER', true);
```

## Option 2: Quick Test Users

| Username | Password | Role       |
| -------- | -------- | ---------- |
| admin    | password | ROLE_ADMIN |
| user     | password | ROLE_USER  |
| testuser | test123  | ROLE_USER  |

## Option 3: Java Code to Generate BCrypt Hash

If you need to generate a BCrypt hash for a different password:

```java
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "yourPassword";
        String encodedPassword = encoder.encode(rawPassword);
        System.out.println("Encoded password: " + encodedPassword);
    }
}
```

## Verify Your Database

Make sure your database has the `users` table with these columns:

- `id` (PRIMARY KEY, AUTO_INCREMENT)
- `username` (VARCHAR)
- `password` (VARCHAR - should be at least 60 chars for BCrypt)
- `role` (VARCHAR)
- `enabled` (BOOLEAN)

## Login Credentials for Testing

After inserting the test users, you can login with:

**Admin User:**

- Username: `admin`
- Password: `password`

**Regular User:**

- Username: `user`
- Password: `password`

**Test User:**

- Username: `testuser`
- Password: `test123`

All these users can access the `/employees/**` endpoints since they have either ROLE_USER or ROLE_ADMIN.
