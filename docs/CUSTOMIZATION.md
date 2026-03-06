# Customization Guide

This document explains how to customize various aspects of your portfolio via your Supabase database. Because the entire portfolio is content-driven, almost everything you see on the website can be modified directly within the Supabase Dashboard without touching the codebase.

---

## 🎨 Customizing the Theme Color

You can dynamically change the primary accent color of your portfolio.
1. Open your Supabase Dashboard and navigate to the **Table Editor**.
2. Open the `website_config` table.
3. Look for the row where `config_key` is `accentColor` (if it doesn't exist, insert a new row).
4. Set the `config_value` to one of the supported Tailwind color strings: `"blue"`, `"indigo"`, `"purple"`, `"green"`, `"red"`, `"orange"`, `"pink"`, `"cyan"`, or `"teal"`.
5. Refresh your website, and the new color will automatically apply to buttons, links, and highlights!

---

## 🧑 Personal Information

The `personal_info` table holds the core information displayed on the Landing Page and throughout the site.
- **name**: Your full name.
- **title_short**: A brief title (e.g., "Software Engineer").
- **title_long**: A longer title or subtitle.
- **tagline**: A short catchphrase used in the footer.
- **about**: A detailed bio shown on the Landing Page.
- **image**: URL to your profile picture (can be a Supabase Storage URL or external link).
- **email** & **location**: Your primary contact details.

---

## 🔗 Configuring Social Media Links

The social media links shown on the Landing Page, Contact Page, and Footer are fully dynamic.

1. Open the `contact_info` table in the Supabase Table Editor.
2. Find the row containing your contact information and edit the `social_links` column (which is a JSONB field).
3. Provide a JSON array containing objects for each platform.

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

---

## 💼 Projects

The `projects` table allows you to manage your portfolio showcase.
- **title** & **description**: Core details of the project.
- **url**, **demo_url**, **repository_url**: Links related to the project.
- **image**, **image_banner**: URLs for project thumbnails and banner images.
- **status**: Can be one of `completed`, `in-progress`, `planned`, or `blocked`.
- **technologies** & **features**: Arrays of strings (e.g., `["React", "TypeScript"]`) to highlight what you used.
- **sort_order**: An integer to control the order in which projects appear.

---

## 🛠 Skills

Add and manage your skills in the `skills` table.
- **title**: Name of the skill (e.g., "Frontend Development").
- **description**: A brief explanation of your proficiency.
- **icon**: The name of a Lucide React icon (e.g., "Code", "Server", "Database").
- **sort_order**: Controls display order.

---

## 🎓 Experience, Education & Certifications

These three tables (`experiences`, `educations`, `certifications`) follow a similar structure to build your resume section.
- They include fields for titles, institutions/companies, dates, and descriptions.
- Use the `sort_order` field to ensure they are displayed chronologically (or in any order you prefer).

---

## 🖼 Gallery

The gallery section is managed via two tables: `gallery_categories` and `gallery_images`.
1. First, create categories in `gallery_categories` (e.g., "Photography", "Web Design").
2. Then, add images to `gallery_images`, linking them to the category via the `category_id`.
3. Provide URLs for `image_path` and `thumbnail_path`. You can upload these images to the `portfolio-images` Supabase Storage bucket.

---

## ⚙️ Website Configuration (Advanced)

The `website_config` table stores JSON configurations for various parts of the website, such as page titles, footer links, and legal documents.

Key configurations you might want to modify:
- **`websiteTitle`** & **`websiteIcon`**: Global site metadata.
- **`pageContent`**: JSON defining titles and descriptions for specific sections (e.g., the Projects header text).
- **`footerContent`** & **`quickLinks`**: Manages the structure and links shown in the footer.
- **`privacyPolicyContent`**, **`termsOfServiceContent`**, **`imprintContent`**: JSON structures defining your legal pages.

*Note: When editing JSON fields in Supabase, ensure the syntax is valid to prevent the website from failing to render these sections.*
