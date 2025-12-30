# TODO: Secure Homepage and Fix Navigation Loop

## Steps to Complete
- [ ] Update ProtectedRoute.js to redirect to "/login" instead of "/"
- [ ] In App.js, wrap the Home route with ProtectedRoute (no role required)
- [ ] In Login.js, change the redirect after login to "/" instead of role-based routes
- [ ] Modify Home.js to display different content based on authentication: for authenticated users, show a welcome message and links to /user or /admin based on role

## Followup Steps
- [ ] Test the application to ensure navigation works correctly: unauthenticated users are redirected to login, authenticated users access home and can navigate to their pages
