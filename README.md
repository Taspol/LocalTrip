# WildGuide
by Localtrip

## Plan Safer & Smarter Adventures

WildGuide is the ultimate platform for planning and experiencing hiking adventures across Southeast Asia. Leveraging advanced AI, WildGuide offers a seamless, safety-first approach to trip planning, booking, and real-time adventure support—all in one place.

---

## 🌏 What is WildGuide?
WildGuide is your all-in-one digital companion for wilderness adventures in Thailand and Southeast Asia. Whether you’re a solo explorer or traveling with friends, WildGuide helps you:
- Plan custom hiking trips
- Book guides, transport, and accommodation
- Register your trip for safety
- Track your journey in real time
- Get AI-powered trail advice
- Share your experiences and earn rewards

---

## ⚠️ The Problem We're Solving
- **Scattered Information:** Trail maps and reliable info are hard to find across multiple sources.
- **Complex Booking:** Booking requires juggling multiple platforms and providers.
- **Safety Gaps:** Safety registration is confusing and often skipped by hikers.
- **Communication Breakdown:** Rangers lack real-time updates on hiker locations and status.

---

## 🚀 How It Works
1. **Set Up Your Trip:** Choose trek type, duration, interests, and budget.
2. **AI Trip Planning:** Get AI-powered trail info, transport, and accommodation booking.
3. **Safety Registration:** Share itinerary and contacts with park rangers and authorities.
4. **Pre-Trip Prep:** Access weather forecasts, checklists, safety tips, and equipment rental.
5. **Live Safety Tracking:** Daily check-ins, GPS tracking, and emergency SOS button.
6. **AI Trail Assistant:** Chat with AI for real-time updates and trail advice.
7. **Share Experience:** Leave reviews and share your adventure story.
8. **Earn Rewards:** Gain points for safe adventures and community contributions.

---

## 🌟 Why Choose WildGuide?
- **AI-Powered Planning:** Personalized itineraries based on thousands of trails, weather, and your preferences.
- **All-in-One Booking:** Book guides, transport, accommodation, and equipment in one place.
- **Ranger-Connected Safety:** Real-time location sharing, automated check-ins, and instant emergency response.
- **Rewards & Community:** Earn points, share experiences, and unlock exclusive perks.

---

## 💬 Real Stories from Real Travellers
> “The app makes it simple by showing clear cost splits, so even two people can plan easily without stress.” — Spirare, Taipei, Taiwan

> “The app gave me offline safety info and contact steps, which makes me feel much more secure.” — Julia Lee, Mount Kinabalu, Malaysia

> “Now the app keeps everything clear and up to date, so I don’t waste time refreshing.” — Puttaraksa, Bangkok, Thailand

> “The app makes the whole process smooth and direct, saving me hours of effort.” — Tai Pattarawadee, Thailand

---

## 🏆 Key Features

---

## 📁 Project File Structure

```
Localtrip/
│
├── frontend/         # Next.js web application (UI, pages, components, static assets)
│   ├── src/          # Main source code (app, components, hooks, lib, pages, styles)
│   ├── public/       # Static files (SVGs, images, etc.)
│   ├── .next/        # Next.js build output
│   ├── package.json  # Frontend dependencies and scripts
│   └── ...           # Config and setup files
│
├── backend/          # Node.js/TypeScript backend API
│   ├── src/          # API source code (server, routes, models, config, utils)
│   ├── api/          # API versioning (e.g., v1/health.ts)
│   ├── swagger-docs/ # OpenAPI/Swagger documentation
│   ├── package.json  # Backend dependencies and scripts
│   └── ...           # Config and setup files
│
├── aiService/        # Python-based AI and utility services
│   ├── app.py        # Main entry for AI service
│   ├── data_importer.py # Data import logic
│   ├── interface.py  # API interface for AI service
│   ├── class_mod/    # Custom classes/modules (e.g., Qdrant integration)
│   ├── utils/        # Utility scripts (LLM caller, YouTube extractor)
│   ├── requirements.txt # Python dependencies
│   └── ...           # Config and setup files
│
├── README.md         # Project overview and documentation
└── ...               # Other project-level files
```

### Folder & File Explanations

- **frontend/**: Contains all code for the web user interface, built with Next.js and styled with Tailwind CSS. Includes UI components, pages, hooks, and static assets.
	- `src/`: Main source code for the frontend app.
	- `public/`: Static files served directly.
	- `.next/`: Build output (auto-generated).
	- `package.json`: Frontend dependencies and scripts.

- **backend/**: Node.js/TypeScript backend API. Handles authentication, trip/user management, and database connections.
	- `src/`: Main backend source code (server, routes, models, config, utils).
	- `api/`: API versioning and endpoints.
	- `swagger-docs/`: OpenAPI/Swagger documentation for the API.
	- `package.json`: Backend dependencies and scripts.

- **aiService/**: Python-based AI and utility services for trip planning, data import, and LLM utilities.
	- `app.py`: Main entry point for AI service.
	- `data_importer.py`: Data import logic.
	- `interface.py`: API interface for AI service.
	- `class_mod/`: Custom classes/modules (e.g., Qdrant integration).
	- `utils/`: Utility scripts (LLM caller, YouTube extractor).
	- `requirements.txt`: Python dependencies.

- **README.md**: This file. Project overview and documentation.

---

## 🌄 Ready to plan your next adventure?
Plan smart. Adventure safely. Explore more.

- [Click here to try the Prototype](https://wildguide.vercel.app/navigate)

© 2025 WildGuide. Made for outdoor enthusiasts.
