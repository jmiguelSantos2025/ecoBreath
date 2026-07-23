# 🔒 Security Guidelines - ecoBreath Mobile App

## ⚠️ Important Security Information

### 1. **About Firebase API Keys in Mobile Apps**

Unlike backend services, mobile apps (React Native/Expo) **must expose Firebase configuration** including API keys. This is by design and is **NOT a security vulnerability** because:

- ✅ Firebase API keys are **client-side only** - they cannot access/modify your database
- ✅ Database access is controlled by **Firebase Security Rules** (not API keys)
- ✅ Users can still only access their authorized data
- ✅ Malicious users see the same API key that legitimate users see

### 2. **Mobile App Credentials Setup**

#### For Local Development:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Get Firebase Web config from Firebase Console:
   - Go to: **Project Settings > Your apps > Web app**
   - Copy the entire config object
   - Extract each field and add to `.env`:
   ```bash
   REACT_APP_FIREBASE_API_KEY=your_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain_here
   # ... etc
   ```

3. Verify `.gitignore` includes:
   ```
   .env
   .env.local
   .env.*.local
   ```

### 3. **Real Security is in Firebase Rules**

Mobile apps are secure through **Firebase Security Rules**, not hidden API keys.

#### Example Security Rules:
```json
{
  "rules": {
    "usuarios": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid",
        ".validate": "newData.hasChildren(['username', 'email', 'data_criacao'])"
      }
    },
    "HistoricoSensores": {
      ".read": "auth != null",
      ".write": false
    }
  }
}
```

### 4. **What NOT to Do in Mobile Apps**

❌ **DON'T**:
- Store sensitive backend keys in the app
- Store passwords or tokens unencrypted
- Commit real `.env` files to version control
- Trust client-side validation alone
- Store credit card information
- Hardcode API endpoints for sensitive operations

### 5. **What TO DO in Mobile Apps**

✅ **DO**:
- Use `.env.example` with placeholders
- Use Firebase Authentication (not manual tokens)
- Implement proper Firebase Security Rules
- Validate input on both client and server
- Use HTTPS for all API calls
- Store sensitive data in secure storage (AsyncStorage with encryption)
- Keep dependencies updated
- Run `npm audit` regularly

### 6. **Secure Storage for Sensitive Data**

For storing tokens or sensitive info locally:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store securely
await AsyncStorage.setItem('authToken', token);

// Retrieve
const token = await AsyncStorage.getItem('authToken');

// Clear on logout
await AsyncStorage.removeItem('authToken');
```

### 7. **Firebase Authentication**

Always use Firebase Authentication for user verification:

```typescript
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // User is authenticated, use auth token for API calls
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### 8. **API Communication**

When calling backend APIs, always include authentication:

```typescript
const getBackendData = async () => {
  const token = await auth.currentUser?.getIdToken();
  
  const response = await fetch('https://your-api.com/data', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.json();
};
```

### 9. **Dependency Security**

Check for vulnerabilities in dependencies:

```bash
# Audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Check outdated packages
npm outdated

# Update packages
npm update
```

### 10. **Common Security Mistakes to Avoid**

| ❌ WRONG | ✅ RIGHT |
|---------|---------|
| Hardcoding API endpoints | Using environment variables |
| Storing passwords in AsyncStorage | Using Firebase Authentication |
| Trusting user input | Validating on backend too |
| Ignoring HTTPS | Always using HTTPS |
| Committing `.env` files | Using `.env.example` placeholders |
| Using v1 deprecated libraries | Keeping dependencies updated |

### 11. **Monitoring & Logging**

Monitor your Firebase database for suspicious activity:

1. **Firebase Console > Database > Rules tab**
   - Review and test your security rules
   - Use the simulator to test access patterns

2. **Firebase Console > Cloud Logging**
   - Monitor database access logs
   - Set up alerts for unusual activity

3. **App Logging**
   ```typescript
   import { logger } from './utils/logger';
   
   logger.info('User logged in', { uid: user.uid });
   logger.error('Login failed', { error: error.message });
   ```

### 12. **GDPR & Privacy Compliance**

If handling user data:

- ✅ Allow users to download their data
- ✅ Implement data deletion on account removal
- ✅ Be transparent about data collection
- ✅ Get user consent before collecting data
- ✅ Encrypt sensitive personal data

Example account deletion:
```typescript
import { deleteUser } from 'firebase/auth';

const deleteAccount = async () => {
  try {
    await deleteUser(auth.currentUser);
    // Also delete user data from database
    await deleteUserData(auth.currentUser.uid);
  } catch (error) {
    console.error('Deletion failed:', error);
  }
};
```

### 13. **Before Publishing to App Stores**

Checklist before submitting to App Store / Google Play:

- [ ] All `.env` files are in `.gitignore`
- [ ] No hardcoded API keys or secrets
- [ ] Firebase Security Rules are properly configured
- [ ] User authentication is required for sensitive data
- [ ] All user data can be deleted
- [ ] Privacy Policy is in app
- [ ] Terms of Service are in app
- [ ] No debug logs in production build
- [ ] Dependencies are up to date
- [ ] HTTPS is enforced

### 14. **Incident Response**

If you suspect a security breach:

1. **Revoke user sessions**
   ```typescript
   // Force logout all users
   await auth.signOut();
   ```

2. **Review Firebase Activity**
   - Check Cloud Logging for suspicious access
   - Review database changes

3. **Update Security Rules**
   - Implement stricter access controls
   - Test rules before deploying

4. **Notify Users** (if applicable)
   - Be transparent about what happened
   - Provide guidance on password reset

---

## 📚 Additional Resources

- [Firebase Security Best Practices](https://firebase.google.com/docs/database/security)
- [OWASP Mobile Security](https://owasp.org/www-project-mobile-security/)
- [React Native Security](https://reactnative.dev/docs/security)
- [Expo Security](https://docs.expo.dev/guides/security/)

---

**Last Updated**: July 2026  
**Next Review**: October 2026
