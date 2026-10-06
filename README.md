# Almira T. Vergel de Dios — Portfolio (plain HTML/CSS/JS)

No build step, no dependencies.

## Run locally
Open the folder in VS Code, install the "Live Server" extension, right-click `index.html` → Open with Live Server.
(Opening index.html directly also works, but the PDF preview is more reliable on a server.)

## Deploy to Vercel
1. Upload this folder to a GitHub repo (or use `vercel` CLI from this folder).
2. In Vercel: Add New → Project → import the repo. Framework Preset: **Other**. Leave build command and output directory empty.
3. Deploy. Every push redeploys.

## What to replace
- Photo: replace `assets/profile.jpg` (keep the same name).
- Resume: replace `resume.pdf` (keep the same name).
- Text content: edit `index.html`.
- Contact info: edit the Contact section in `index.html` and `TO_EMAIL` in `script.js`.
- Colors: CSS variables at the top of `styles.css`.

## Make the contact form send email
1. Go to https://web3forms.com, enter your email, and copy the Access Key they send you.
2. Open `script.js` and replace `PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE` with that key.
3. Redeploy. Messages now arrive in your inbox with no mail app needed.
