# Tailwind CSS Setup

Tailwind CSS is used to design the frontend UI.

If the UI appears plain or unstyled, Tailwind is not configured properly.

---

## Install Tailwind

Inside the frontend folder run:

```bash
npm install -D tailwindcss postcss autoprefixer
```

Initialize Tailwind.

```bash
npx tailwindcss init -p
```

---

## Configure Tailwind

Open:

`tailwind.config.js`

Add this configuration:

```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]
```

---

## Add Tailwind Directives

Open:

`src/index.css`

Add:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Restart the Server

```bash
npm run dev
```

Now Tailwind styles should load correctly.
