# EmailJS Setup Guide

Follow these steps to enable the contact form functionality:

## 1. Create EmailJS Account
1. Go to https://www.emailjs.com
2. Sign up for a free account (200 emails/month)

## 2. Add Email Service
1. Go to **Email Services** in your dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. **Copy the Service ID** (e.g., `service_abc123`)

## 3. Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. **Select "Contact Us"** from the template options
4. Replace the template content with the beautiful template below

### Template Settings:
- **Template Name**: Portfolio Contact Form
- **Subject**: 🌟 New Portfolio Message from {{from_name}}

### Template Content (HTML):
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Portfolio Message</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
    <table role="presentation" style="background-color: #f8fafc;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 32px 32px 0 32px;">
                            <div style="text-align: center; margin-bottom: 24px;">
                                <div style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 12px; border-radius: 50%; margin-bottom: 16px;">
                                    <div style="width: 32px; height: 32px; background-color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px;">✉️</div>
                                </div>
                                <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #1a202c;">New Portfolio Message</h1>
                                <p style="margin: 8px 0 0 0; color: #718096; font-size: 16px;">You have received a new message through your portfolio website</p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 0 32px;">
                            <!-- User Info Card -->
                            <div style="background-color: #f7fafc; border-radius: 8px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #667eea;">
                                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                                    <div style="background-color: #667eea; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; margin-right: 12px; font-size: 16px;">
                                        {{from_name}}
                                    </div>
                                    <div>
                                        <div style="font-weight: 600; font-size: 16px; color: #1a202c; margin: 0;">{{from_name}}</div>
                                        <div style="color: #718096; font-size: 14px; margin: 0;">{{from_email}}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Message -->
                            <div style="margin-bottom: 32px;">
                                <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #1a202c;">Message:</h3>
                                <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
                                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #2d3748; white-space: pre-wrap;">{{message}}</p>
                                </div>
                            </div>
                            
                            <!-- Call to Action -->
                            <div style="text-align: center; margin-bottom: 24px;">
                                <a href="mailto:{{from_email}}?subject=Re: Portfolio Inquiry" 
                                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px;">
                                    Reply Directly
                                </a>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 0 32px 32px 32px;">
                            <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                                <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                                    Sent via {{from_website}} portfolio contact form
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
```

5. **Copy the Template ID** (e.g., `template_xyz789`)

## 4. Get Public Key
1. Go to **Account** → **General**
2. **Copy your Public Key** (e.g., `user_DEF456ghi`)

## 5. Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file with your values:
   ```
   REACT_APP_EMAILJS_SERVICE_ID=service_abc123
   REACT_APP_EMAILJS_TEMPLATE_ID=template_xyz789  
   REACT_APP_EMAILJS_PUBLIC_KEY=user_DEF456ghi
   ```

## 6. Restart Development Server
```bash
npm start
```

## 7. Production Deployment (CI/CD)

For production deployment via GitLab CI/CD, you need to add the EmailJS configuration as CI/CD variables instead of using a `.env` file:

### Add CI/CD Variables in GitLab:
1. Go to your GitLab project
2. Navigate to **Settings** → **CI/CD** → **Variables**
3. Add these variables:

| Variable Name | Value | Protected | Masked |
|---------------|--------|-----------|---------|
| `REACT_APP_EMAILJS_SERVICE_ID` | `service_abc123` | ✅ | ✅ |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | `template_xyz789` | ✅ | ✅ |
| `REACT_APP_EMAILJS_PUBLIC_KEY` | `user_DEF456ghi` | ✅ | ❌ |

### Important Notes:
- ✅ **Mark as Protected**: Only available on protected branches (main/master)
- ✅ **Mark Service ID and Template ID as Masked**: Hides values in job logs
- ❌ **Don't mask Public Key**: EmailJS public keys contain characters that break masking
- 🔒 **Keep .env in .gitignore**: Never commit secrets to repository

### How it works:
- During build, GitLab CI automatically injects these variables as environment variables
- React bundles them into the production build at build-time
- The contact form will work automatically in production without additional configuration

### Environment Variable Priority:
1. **Local Development**: Uses `.env` file (for testing)
2. **CI/CD Pipeline**: Uses GitLab CI/CD variables (for production)
3. **System Environment**: Falls back to system environment variables

## Features Included:
- ✅ Automatic email sending
- ✅ Form validation  
- ✅ Loading states
- ✅ Success/error feedback
- ✅ Form reset after success
- ✅ Dark mode support
- ✅ Mobile responsive

## Template Variables Used:
- `{{from_name}}` - User's name from form
- `{{from_email}}` - User's email from form  
- `{{message}}` - User's message from form
- `{{from_website}}` - Your website domain

## Troubleshooting:
- Emails not sending? Check browser console for errors
- Wrong template? Verify template variables match exactly
- Rate limited? EmailJS free tier: 200 emails/month
- Still issues? Check EmailJS dashboard logs