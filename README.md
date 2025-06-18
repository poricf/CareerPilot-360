# CareerPilot 360 🚀

A comprehensive career development platform that helps users explore career paths, take courses, and get personalized career guidance through AI-powered analysis.

## 🌟 Features

- **User Authentication**: Secure login and registration system
- **Career Exploration**: Browse and discover various career paths with detailed information
- **Course Management**: Access to educational courses with different difficulty levels
- **AI-Powered Analysis**: Deep assessment and career recommendations
- **Personalized Dashboard**: Track your progress and career goals
- **Modern UI/UX**: Beautiful, responsive interface built with Next.js and Tailwind CSS
## 📸 Screenshots

### 🏠 Landing Page  
![Landing Page](screenshots/landingpage.png)

---

### 🧾 Form Pages  
Tell us about yourself first:

- ![Form Step 1](screenshots/form.png)  
- ![Form Step 2](screenshots/form1.png)  
- ![Form Step 3](screenshots/form2.png)

---

### 📊 Career Dashboard  
![Career Dashboard](screenshots/dashboard.png)

---

### 🛤️ Career Path Details  
![Career Path Details](screenshots/path-detail.png)

---

### 🎯 Career Milestones  
![Career Milestones](screenshots/milestone.png)

---

### 🔮 Career Outlook  
![Career Outlook](screenshots/outlook.png)

---

### 👤 Profile Page  
![Profile Page](screenshots/profile.png)

## 🏗️ Architecturegi

This project consists of three main components:

- **Frontend**: Next.js 14 application with TypeScript and Tailwind CSS
- **Backend**: Node.js/Express API with TypeScript and Prisma ORM
- **ML Service**: Python Flask service for AI-powered analysis

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **pnpm**
- **Python** (v3.8 or higher)
- **PostgreSQL** database
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "CareerPilot 360"
```

### 2. Environment Setup

Create `.env` files in the backend and frontend directories:

#### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/careerpilot"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3001
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_ML_SERVICE_URL=http://localhost:5000
```

#### ML Service (.env)
```env
PORT=5000
FLASK_ENV=development
```

### 3. Database Setup

1. **Install PostgreSQL** and create a database named `careerpilot`
2. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Generate Prisma client**:
   ```bash
   npm run prisma:generate
   ```

5. **Run database migrations**:
   ```bash
   npm run prisma:migrate
   ```

### 4. Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend will start on `http://localhost:3001`

### 5. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

### 6. ML Service Setup

```bash
cd ml-service
pip install -r requirements.txt
python app.py
```

The ML service will start on `http://localhost:5000`

## 📁 Project Structure

```
CareerPilot 360/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── lib/           # Database and utilities
│   │   └── index.ts       # Main server file
│   ├── prisma/            # Database schema and migrations
│   └── package.json
├── frontend/               # Next.js application
│   ├── app/               # App router pages
│   ├── components/        # Reusable UI components
│   ├── lib/              # Utilities and configurations
│   ├── styles/           # Global styles
│   └── package.json
├── ml-service/            # Python Flask service
│   ├── app.py            # Main Flask application
│   ├── requirements.txt  # Python dependencies
│   └── Dockerfile        # Docker configuration
└── README.md
```

## 🔧 Available Scripts

### Backend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
```

### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main models:

- **User**: Authentication and user profile data
- **Course**: Educational courses with metadata
- **Career**: Career paths with requirements and salary information

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course
- `GET /api/courses/:id` - Get specific course

### Careers
- `GET /api/careers` - Get all careers
- `POST /api/careers` - Create new career
- `GET /api/careers/:id` - Get specific career

### Analysis
- `POST /api/analysis/deep-assessment` - AI-powered career analysis

## 🎨 Frontend Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes
- **Interactive Components**: Modern UI with smooth animations
- **Form Validation**: Client-side validation with Zod
- **State Management**: React hooks for state management

## 🤖 ML Service Features

- **Health Check**: Service status monitoring
- **Career Analysis**: AI-powered career recommendations
- **Scalable Architecture**: Ready for Docker deployment

## 🐳 Docker Deployment

The ML service includes a Dockerfile for containerized deployment:

```bash
cd ml-service
docker build -t careerpilot-ml .
docker run -p 5000:5000 careerpilot-ml
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for password security
- **CORS Configuration**: Cross-origin resource sharing setup
- **Environment Variables**: Secure configuration management

## 🧪 Testing

To run tests (when implemented):

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check your DATABASE_URL in the .env file
   - Verify database credentials

2. **Port Already in Use**
   - Change the PORT in your .env file
   - Kill processes using the default ports

3. **Prisma Migration Issues**
   - Reset the database: `npx prisma migrate reset`
   - Regenerate client: `npx prisma generate`

4. **Frontend Build Errors**
   - Clear Next.js cache: `rm -rf .next`
   - Reinstall dependencies: `npm install`

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information
4. Or contact me on Telegram: [@fahmi_dinsefa](https://t.me/fahmi_dinsefa)

## 🎯 Roadmap

- [ ] Advanced AI career recommendations
- [ ] Course progress tracking
- [ ] Social features and networking
- [ ] Mobile app development
- [ ] Integration with job boards
- [ ] Advanced analytics dashboard

---

**CareerPilot 360** - Empowering your career journey with AI-driven insights and personalized learning paths. 🚀 