# Customization Guide

This document explains how to customize various aspects of your portfolio via your Supabase database.

## 🎨 Customizing the Theme Color

You can dynamically change the primary accent color of your portfolio without touching the code. 
1. Open your Supabase Dashboard and navigate to the **Table Editor**.
2. Open the `website_config` table.
3. Look for the row where `config_key` is `accentColor` (if it doesn't exist, insert a new row).
4. Set the `config_value` to one of the supported Tailwind color strings: `"blue"`, `"indigo"`, `"purple"`, `"green"`, `"red"`, `"orange"`, `"pink"`, `"cyan"`, or `"teal"`.
5. Refresh your website, and the new color will automatically apply to buttons, links, and highlights!

---

## 🔗 Configuring Social Media Links

The social media links shown on the Landing Page, Contact Page, and Footer are fully dynamic and managed via Supabase.

1. Open your Supabase Dashboard and go to the **Table Editor**.
2. Open the `contact_info` table.
3. Find the row containing your contact information and edit the `social_links` column (which is a JSONB field).
4. Provide a JSON array containing objects for each platform.

**Example JSON format:**
```json
[
  {
    "name": "GitHub",
    "href": "https://github.com/yourusername",
    "icon": "Github",
    "color": "hover:text-gray-900 dark:hover:text-white"
  },
  {
    "name": "LinkedIn",
    "href": "https://linkedin.com/in/yourusername",
    "icon": "Linkedin",
    "color": "hover:text-blue-600 dark:hover:text-blue-400"
  },
  {
    "name": "Email",
    "href": "mailto:your.email@example.com",
    "icon": "Mail",
    "color": "hover:text-red-500"
  }
]
```
**Supported Icons:** `Github`, `Linkedin`, `Twitter`, `Instagram`, `Facebook`, `Youtube`, `Twitch`, `Dribbble`, `Mail` (These map directly to Lucide React icons).