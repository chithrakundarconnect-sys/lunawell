🌸 LunaWell — AI Wellness & Health Tracker

LunaWell is a full-stack wellness tracking web application that helps users monitor daily health habits such as water intake, mood, skincare routine, and personal health journal in a secure multi-user environment.

The application also includes an AI assistant Kiki to guide and motivate users in maintaining healthy habits.

---

🚀 Live Features

- Secure user authentication (Signup / Login)
- Personal dashboard for each user
- Water intake tracker
- Daily skincare routine tracker
- Mood & stress logger
- Personal health journal
- Wellness summary analytics
- AI Chat Assistant (Kiki)
- Avatar selection & upload
- Breast cancer awareness page
- Multi-user data isolation (each user sees only their data)

---

🔐 Security (Important)

- Firebase Authentication used for login security
- Firestore Security Rules implemented
- Each user can read/write only their own data
- Backend verified with multi-account testing
- Console errors removed and stability tested

---

🧠 Tech Stack

Frontend

- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS
- ShadCN UI

Backend / Database

- Firebase Authentication
- Cloud Firestore Database
- Firestore Security Rules

Other Tools

- Git & GitHub
- Vercel (optional deployment)
- Lucide Icons

---

📂 Project Structure

app/                → Pages & routing
components/         → Reusable UI components
lib/                → Firebase configuration
public/             → Images & assets
context/            → Global state management

---

👤 Multi-User System

LunaWell supports multiple users.
Each user gets:

- Separate dashboard
- Separate journal
- Separate water tracking
- Separate mood tracking

Firestore rules prevent users from accessing other users' data.

---

⚙️ Installation (Run Locally)

1. Clone the repository

git clone https://github.com/YOUR_USERNAME/LunaWell.git

2. Install dependencies

npm install

3. Create Firebase project

- Enable Authentication (Email/Password)
- Enable Firestore Database

4. Create ".env.local" file and add:

NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID

5. Run project

npm run dev

Open:

http://localhost:3000

---

🧪 Testing

The application was tested for:

- Multi-user access
- Secure database separation
- Authentication handling
- UI stability
- Console error handling

All tests passed successfully.

---

📌 Final Year Project Objective

To build a secure, user-friendly wellness tracking platform that promotes healthy lifestyle habits while ensuring data privacy using cloud-based backend services.

---

👩‍💻 Developed By

Chithra Kundar
Computer Science Engineering Student
Full-Stack Developer (Next.js + Firebase)

---

📄 License

This project is created for educational and academic purposes.
