# Setup Guide: Authentication with Google, Facebook & Email

## ✅ Implementation Complete!

All the code for authentication has been implemented. Now you need to configure Supabase and the OAuth providers.

---

## 📋 Step 1: Create Supabase Project

1. **Go to Supabase Dashboard:**
   - URL: https://app.supabase.com/

2. **Create a New Project:**
   - Click "New Project"
   - Organization: Select or create one
   - Name: `weekly-allowance-tracker`
   - Database Password: Generate a strong password (save it!)
   - Region: Choose closest to you (e.g., `us-west-1`)
   - Click "Create new project"
   - Wait ~2 minutes for provisioning

3. **Get your credentials:**
   - Go to: Project Settings → API
   - Copy:
     - **Project URL** (e.g., `https://abcdefgh.supabase.co`)
     - **anon public key** (long string starting with `eyJ...`)

---

## 📋 Step 2: Configure Environment Variables

1. **Create `.env.local` file in project root:**

```bash
cp .env.local.example .env.local
```

2. **Edit `.env.local` with your Supabase credentials:**

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_APP_URL=http://localhost:5173
```

3. **Add to `.gitignore` (already done):**

```
.env.local
```

---

## 📋 Step 3: Run Database Migration

1. **Go to Supabase Dashboard:**
   - Your project → SQL Editor

2. **Create a new query:**
   - Click "New query"

3. **Copy and paste the entire content of `supabase-migration.sql`**

4. **Run the migration:**
   - Click "Run" (or Ctrl/Cmd + Enter)
   - You should see: "Success. No rows returned"

5. **Verify tables created:**
   - Go to: Table Editor
   - You should see: `profiles`, `situations`, `cycles`, `entries`

---

## 📋 Step 4: Configure Google OAuth

### 4.1 Google Cloud Console Setup

1. **Go to Google Cloud Console:**
   - URL: https://console.cloud.google.com/

2. **Create a project (or use existing):**
   - Click project dropdown → "New Project"
   - Name: `Weekly Allowance Tracker`
   - Click "Create"

3. **Enable Google+ API:**
   - Menu → "APIs & Services" → "Library"
   - Search: "Google+ API"
   - Click "Enable"

4. **Configure OAuth Consent Screen:**
   - Menu → "APIs & Services" → "OAuth consent screen"
   - User Type: **External**
   - Click "Create"
   - Fill in:
     - App name: `Weekly Allowance Tracker`
     - User support email: your email
     - Developer contact: your email
   - Click "Save and Continue"
   - Scopes: Keep defaults
   - Click "Save and Continue"
   - Test users: Add your email
   - Click "Save and Continue"

5. **Create OAuth Client ID:**
   - Menu → "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS" → "OAuth client ID"
   - Application type: **Web application**
   - Name: `Supabase Auth`
   - **Authorized JavaScript origins:**
     ```
     http://localhost:5173
     https://weekly-allowance-tracker.vercel.app
     ```
   - **Authorized redirect URIs:** (REPLACE `YOUR-PROJECT-REF`)
     ```
     https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback
     http://localhost:54321/auth/v1/callback
     ```
   - Click "Create"

6. **Copy credentials:**
   - **Client ID**: `123456789-abcd.apps.googleusercontent.com`
   - **Client Secret**: `GOCSPX-abcdefghijk`

### 4.2 Configure in Supabase

1. **Go to Supabase Dashboard:**
   - Your project → Authentication → Providers

2. **Find Google provider:**
   - Scroll to "Google"
   - Toggle: **Enabled**

3. **Paste credentials:**
   - Client ID: Paste from Google Console
   - Client Secret: Paste from Google Console
   - Click "Save"

---

## 📋 Step 5: Configure Facebook OAuth

### 5.1 Meta for Developers Setup

1. **Go to Meta for Developers:**
   - URL: https://developers.facebook.com/

2. **Create an App:**
   - Click "My Apps" → "Create App"
   - Use case: **Authenticate and request data from users**
   - Click "Next"
   - App type: **Consumer**
   - Click "Next"
   - App name: `Weekly Allowance Tracker`
   - App contact email: your email
   - Click "Create App"
   - Complete security check

3. **Add Facebook Login:**
   - Dashboard → "Add Product"
   - Find "Facebook Login" → Click "Set Up"
   - Platform: **Web**
   - Site URL: `http://localhost:5173`
   - Click "Save" → "Continue"

4. **Configure Facebook Login Settings:**
   - Left menu → "Facebook Login" → "Settings"
   - **Valid OAuth Redirect URIs:** (REPLACE `YOUR-PROJECT-REF`)
     ```
     https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback
     http://localhost:54321/auth/v1/callback
     ```
   - Click "Save Changes"

5. **Get App Credentials:**
   - Left menu → "Settings" → "Basic"
   - Copy:
     - **App ID**: `1234567890123456`
     - **App Secret**: Click "Show" → `abc123def456`

6. **Make App Public:**
   - Top of page: Toggle from "Development" to "Live"
   - You'll need to add:
     - Privacy Policy URL (can use a generator)
     - Category (select appropriate)
   - Click "Switch Mode"

### 5.2 Configure in Supabase

1. **Go to Supabase Dashboard:**
   - Your project → Authentication → Providers

2. **Find Facebook provider:**
   - Scroll to "Facebook"
   - Toggle: **Enabled**

3. **Paste credentials:**
   - Facebook client ID: Paste App ID from Meta
   - Facebook secret: Paste App Secret from Meta
   - Click "Save"

---

## 📋 Step 6: Configure Email Authentication

**Already enabled by default in Supabase!** ✅

Optional configuration:

1. **Email Templates:**
   - Authentication → Email Templates
   - Customize confirmation, magic link, password reset emails

2. **Email Settings:**
   - Can configure custom SMTP (optional)
   - Default uses Supabase's built-in email service

---

## 📋 Step 7: Update Vercel Environment Variables

For production deployment:

1. **Go to Vercel Dashboard:**
   - Your project → Settings → Environment Variables

2. **Add the following:**
   ```
   VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_APP_URL=https://weekly-allowance-tracker.vercel.app
   ```

3. **Redeploy:**
   - Deployments → Latest → "Redeploy"

---

## 🧪 Step 8: Test Authentication

### Local Testing

1. **Start dev server:**
```bash
npm run dev
```

2. **Test Email/Password:**
   - Go to: http://localhost:5173/login
   - Click "Sign up"
   - Enter email and password
   - Check email for confirmation link
   - Click link → should redirect to app

3. **Test Google Login:**
   - Click "Continue with Google"
   - Select Google account
   - Allow permissions
   - Should redirect to app

4. **Test Facebook Login:**
   - Click "Continue with Facebook"
   - Log in to Facebook
   - Allow permissions
   - Should redirect to app

### Production Testing

1. **Update Google OAuth:**
   - Add production URL to Authorized JavaScript origins
   - Add production redirect URI

2. **Update Facebook OAuth:**
   - Add production redirect URI

3. **Test on Vercel:**
   - Go to your deployed URL
   - Test all auth methods

---

## 🔧 Troubleshooting

### Google Login Issues

**Error: "redirect_uri_mismatch"**
- Check that redirect URI in Google Console exactly matches Supabase callback URL
- Format: `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`

**Error: "Access denied"**
- Make sure you're added as a test user in OAuth Consent Screen

### Facebook Login Issues

**Error: "App Not Set Up"**
- Make sure Facebook Login is added as a product
- Check Valid OAuth Redirect URIs are configured

**Error: "App not public"**
- Switch from Development to Live mode in App settings
- Add required privacy policy and category

### Email Issues

**Email not received**
- Check spam folder
- In Supabase: Authentication → Logs to see delivery status
- For development: Authentication → URL Configuration → Disable email confirmation (not recommended for production)

---

## 📖 Usage

### For Users

1. **Sign Up:**
   - Visit `/login`
   - Choose method: Google, Facebook, or Email
   - Complete authentication
   - Redirected to setup page (first time)

2. **Sign In:**
   - Visit `/login`
   - Choose same method used for signup
   - Redirected to dashboard

3. **Sign Out:**
   - Go to Settings page
   - Click "Sign Out"

### For Developers

**Check if user is authenticated:**
```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;
  
  return <div>Welcome {user.email}</div>;
}
```

**Protected routes:**
```tsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <DashboardPage />
  </ProtectedRoute>
} />
```

---

## 🎉 You're Done!

The authentication system is now fully configured with:
- ✅ Email/Password authentication
- ✅ Google OAuth
- ✅ Facebook OAuth
- ✅ Protected routes
- ✅ Automatic session management
- ✅ Sign out functionality

All user data is now isolated and secure with Row Level Security (RLS)!

---

## 📚 Next Steps

1. **Optional: Add more providers:**
   - GitHub OAuth
   - Apple Sign In
   - Magic Link (passwordless email)

2. **Optional: Customize email templates:**
   - Supabase Dashboard → Authentication → Email Templates

3. **Optional: Enable 2FA:**
   - Supabase Dashboard → Authentication → Settings → Enable MFA

4. **Optional: Add password reset:**
   - Already supported! Just needs UI on login page

---

## 🆘 Need Help?

- **Supabase Docs:** https://supabase.com/docs/guides/auth
- **Google OAuth Docs:** https://developers.google.com/identity/protocols/oauth2
- **Facebook Login Docs:** https://developers.facebook.com/docs/facebook-login

Good luck! 🚀
