---
# README.md

# Mini AI Studio

A modern, accessible web app that simulates an AI-powered studio for creative image generation, featuring file upload, prompt and style selection, history, and live UI preview.
---

## Features

- **Image Upload & Preview:** Upload PNG/JPG up to 10MB, with client-side downscaling for oversized images.
- **Prompt & Style Input:** Input creative prompts and pick from multiple style options (e.g., Editorial, Streetwear, Vintage).
- **Live Summary:** See a real-time preview of your uploaded image, selected style, and prompt.
- **AI Generation Simulation:** Trigger a mock "Generate" process, with simulated processing time, error state (20% fail and retries with exponential backoff), abort, and UX feedback.
- **History:** Last 5 generations are saved in localStorage; click to restore any as a new preview.
- **Accessible Layout:** All controls are keyboard accessible with visible focus indicators, aria support, and robust error boundaries.
- **Responsive Sidebar:** Modern sidebar layout for navigation/history.
- **Toast Feedback:** Visual success/error notifications for user actions.
- **Performance:** Optimized, client-side downscaling, and memoized UI components.

---

## Tech Stack

- [Next.js](https://nextjs.org/) (TypeScript, strict mode)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/) (E2E testing)
- ESLint + Prettier

---

## Getting Started

```bash
git clone https://github.com/hashim-baig/medolia-coding-assignment.git
cd medolia-coding-assignment
npm install
```

**Run Development Server**

```bash
npm run dev
```

Open `http://localhost:3000`.

**Production Build**

```bash
npm run build
npm start
```

---

## Testing

- **Unit Tests**

```bash
npm test
```

- **E2E (Cypress)**

```bash
npm run e2e
```

---

## 📂 Project Structure

```
components/
  Upload.tsx
  PromptInput.tsx
  StyleSelector.tsx
  Preview.tsx
  Spinner.tsx
  ErrorBoundary.tsx
  GenerateButton.tsx
  History.tsx
lib/
  api.ts        // Mock AI API
  image.ts      // Downscale helper
  storage.ts    // History/localStorage helpers
pages/
  index.tsx     // App entry
public/
  ...           // Static assets, icons
```

---

## Notable Commits

- **Upload with preview**: [b17452d](https://github.com/hashim-baig/medolia-coding-assignment/commit/b17452d526413c899d84c8121b434751ab02cc1c)
- **Prompt/Style UI**: [4f4d055](https://github.com/hashim-baig/medolia-coding-assignment/commit/4f4d05549993d659cb9559821598eb894334bfb2)
- **Live Summary**: [54e47de](https://github.com/hashim-baig/medolia-coding-assignment/commit/54e47de888ac11db2cd44234ba851782500d8134)
- **Spinner/ErrorBoundary**: [b8b8bd3](https://github.com/hashim-baig/medolia-coding-assignment/commit/b8b8bd34aed3200ac8672a1ebd6ef13de2f1e409)
- **Generation Logic**: [4a7e404](https://github.com/hashim-baig/medolia-coding-assignment/commit/4a7e404e2e91663d952cbedaa2e8a149a3a491e7)
- **History feature**: [37ad284](https://github.com/hashim-baig/medolia-coding-assignment/commit/37ad28468fa0a9b24c6d695e46a36f207ff763b4)
- **Sidebar/Layout improvements**: [ee04a7f](https://github.com/hashim-baig/medolia-coding-assignment/commit/ee04a7fcc9838d3d020e0538c3ed8fb48c4c36ca)
- **Toaster feedback**: [e5267ed](https://github.com/hashim-baig/medolia-coding-assignment/commit/e5267ed87b3444f9ecb3801163d0d542f34f4273)

---

## Credits

Developer: [@hashim-baig](https://github.com/hashim-baig)

---
