## Simple Prompts to Ask an AI to Build This Project

You can copy‑paste these directly into an AI.  
Use them one by one, or mix them as you like.

---

### Prompt 1 – Full project in one go

“Build me a small React + TypeScript web app with Vite and Tailwind CSS.  
The app is called **‘What She Really Means’**.  
It should let me either **speak** or **type** what she said, then show a **funny hidden meaning** in a playful, kind way (never mean or offensive).  
Use a clean, modern, colorful design with a soft gradient background and big friendly buttons.  
Also add a history list of past translations.  
Use only Tailwind CSS and lucide‑react for icons.  
Explain briefly what files you created and how to run the app.”

---

### Prompt 2 – Focus on core idea + UI

“Create a React + TypeScript single‑page app called **‘What She Really Means’**.  
The user can enter a sentence like something a girlfriend or wife might say, and the app returns a short, funny explanation of what she ‘really’ means.  
Focus on a beautiful, fun UI with Tailwind CSS: a big title, a short subtitle, a large main button, and a text box.  
You can fake the AI part at first with simple hard‑coded rules for common phrases.  
Show me the main components and how they fit together.”

---

### Prompt 3 – Add speech‑to‑text and text‑to‑speech

“Extend this app so it supports **voice input** and **voice output** in the browser.  
Use the browser Speech Recognition API so I can press a mic button, speak a sentence, and then stop recording.  
Use the browser Speech Synthesis API so the app can read the funny interpretation out loud.  
Add clear Play / Pause controls for the voice, and show friendly error messages if the browser doesn’t support these features.”

---

### Prompt 4 – Swap fake rules for real AI

“Replace the hard‑coded joke rules in this app with a real AI call.  
Use a simple text or chat completion API (for example, OpenAI‑style or Hugging Face router) and send a short system prompt like:  
‘You are a humorous but kind assistant who explains the hidden meaning behind what women say. Be playful and light, never mean, and keep answers under 100 words.’  
Then send the user’s sentence and get back the interpretation.  
Keep the existing UI and behavior the same, just change how the interpretation is generated.”

---

### Prompt 5 – Make it classroom‑friendly

“Take this ‘What She Really Means’ app and make it a good **teaching example**.  
Clean up the code, add clear comments, and organize components well.  
Use simple TypeScript types, and keep the file structure easy for beginners to follow.  
At the end, write a short explanation for students: what they learn about React, Tailwind, browser APIs, and calling an AI API.”
