
---

### 3️⃣ `README.md` for **Twig Version**

```markdown
# TicketApp — Twig Version

This is the **Twig (PHP)** implementation of the Multi-Framework Ticket Web App.

---
## The single root README linking to each implementation.
| Framework | Directory | Setup & Usage |
|-----------|-----------|---------------|
| **Twig (PHP)** | [`twig-ticket-app/`](twig-ticket-app) | `php -S localhost:8000 -t public` |
-----
| **React + TypeScript** | [`react-ticket-app/`](react-ticket-app) | `npm install && npm run dev` |
| **Vue 3 + TypeScript** | [`vue-ticket-app/`](vue-ticket-app) | `npm install && npm run dev` |
| **Twig (PHP)** | [`twig-ticket-app/`](twig-ticket-app) | `php -S localhost:8000 -t public` |


## Tech Stack

- PHP 8+
- Twig templating engine
- Tailwind CSS
- localStorage / PHP session for authentication

## Folder Structure
public/         # CSS/JS assets
templates/
  layout.twig
  header.twig
  footer.twig
  pages/        # home.twig, login.twig, signup.twig, dashboard.twig, tickets.twig
src/  

## Usage

Open http://localhost:8000

Signup/Login using localStorage or PHP session

Navigate to Dashboard and Ticket Management

Logout clears session and redirects to Login

## Features

Landing Page with Hero section, wavy SVG, decorative circles, CTA buttons

Authentication: Login/Signup with inline validation and toast messages

Dashboard: Displays ticket statistics

Ticket Management: Full CRUD with validation and feedback

Responsive design and accessibility compliance

## Setup

```bash
# Clone the repository
git clone <repo-url> twig-ticket-app
cd twig-ticket-app

# Ensure PHP is installed
php -v

# Serve locally using PHP built-in server
php -S localhost:8000 -t public
