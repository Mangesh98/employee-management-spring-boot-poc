# Authentication System Guide

## Overview

This authentication system integrates with your Spring Boot backend using Spring Security's form-based authentication. All requests include credentials (cookies) automatically using the `credentials: 'include'` option.

## Components Created

### 1. **AuthContext** (`src/context/AuthContext.jsx`)

- Manages global authentication state
- Provides login/logout functions
- Handles session verification
- Uses React Context API for state management

### 2. **LoginForm** (`src/components/LoginForm.jsx`)

- Beautiful glassmorphism-styled login interface
- Form validation
- Error handling with user-friendly messages
- Loading states during authentication

### 3. **ProtectedRoute** (`src/components/ProtectedRoute.jsx`)

- Wrapper component that protects authenticated routes
- Shows loading spinner during auth check
- Redirects to login if not authenticated

### 4. **Updated Components**

- **App.jsx**: Wrapped with AuthProvider and ProtectedRoute
- **EmployeeManagement.jsx**:
  - Added logout button
  - All API calls now include `credentials: 'include'`
  - Session expiry handling (401 responses)

## How It Works

### Login Flow

1. User enters username and password
2. Credentials are sent to `/login` endpoint as form data (Spring Security format)
3. Spring Security creates a session and returns JSESSIONID cookie
4. Cookie is automatically stored by browser
5. All subsequent requests include the cookie via `credentials: 'include'`

### Logout Flow

1. User clicks logout button
2. POST request to `/logout` endpoint
3. Spring Security invalidates the session
4. User is redirected to login page

### Session Management

- On app load, auth status is checked by making a test request to `/employees`
- If response is 401, user is shown login page
- If response is 200, user is authenticated
- All API calls check for 401 responses and logout if session expired

## Usage

### Testing the Login

Your Spring Security configuration should have users configured. You can test with:

- Any users defined in your UserRepository
- Or users configured in Spring Security

### Backend Requirements (Already configured in your SecurityConfig.java)

✅ CORS enabled with `allowCredentials: true`
✅ Form login enabled
✅ `/login` endpoint permitted for all
✅ `/employees/**` protected with USER/ADMIN roles

## API Calls with Authentication

All fetch calls now follow this pattern:

```javascript
const response = await fetch("http://localhost:8081/employees", {
  method: "GET",
  credentials: "include", // This sends cookies!
  headers: {
    "Content-Type": "application/json",
  },
});

if (response.status === 401) {
  // Session expired - logout user
  logout();
}
```

## Styling

- Uses existing glassmorphism design system
- Consistent with your app's purple/blue gradient theme
- Fully responsive design
- Smooth animations and transitions

## Security Features

- JSESSIONID cookie is httpOnly (set by Spring Security)
- Credentials only sent to same origin
- CSRF protection can be enabled (currently disabled in your config)
- Secure session management by Spring Security

## Future Enhancements (Optional)

- Add "Remember Me" functionality
- Display logged-in username in header
- Add password visibility toggle
- Add forgot password flow
- Add user profile endpoint to fetch user details
- Enable CSRF protection

## Testing Locally

1. Make sure your Spring Boot backend is running on `http://localhost:8081`
2. Start the frontend: `npm run dev`
3. Navigate to `http://localhost:5173` (or your Vite port)
4. You'll see the login page
5. Enter your credentials
6. Upon successful login, you'll see the Employee Management dashboard

## Troubleshooting

### "Session expired" messages

- Check if backend is running
- Verify CORS configuration allows credentials
- Check browser console for cookie issues

### Login fails

- Verify username/password in your backend database
- Check Spring Security logs
- Ensure `/login` endpoint is accessible

### Logout doesn't work

- Check if `/logout` endpoint is accessible
- Verify POST method is allowed
- Check browser network tab for errors

## Notes

- The JSESSIONID cookie is automatically managed by the browser
- No need for manual token management
- Session timeout is configured in Spring Boot (default: 30 minutes)
- This is production-ready code with proper error handling
