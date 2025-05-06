Role-Based Access Control MERN Project Documentation

 Overview
This project implements Role-Based Access Control (RBAC) in a MERN stack (MongoDB, Express.js, React, and Node.js) application, ensuring secure user authentication and authorization.

 Features
- User Authentication: JWT-based and cookie-based authentication.
- Role-Based Authorization: Admin and user-specific access control.
- CRUD Operations: Create, read, update, and delete blog posts.
- Secure Cookie Management: Proper session handling for authentication.
- Frontend Role-Based Rendering: UI dynamically adjusts based on user roles.

 Installation & Setup

 Prerequisites
- Node.js  install version 22.15.0   installed(`node -v`)
- MongoDB (Local or Atlas)
- Git for version control

-  ### Clone Repository
git clone https://github.com/sonu9716/role-based-assignment-repo.git

cd role-based-assignment-repo

- concurently for running both front end backend with single command install in root folder (role-based-assignment-repo folder)
- npm i -g concurrently

#### Backend Setup
1.	Navigate to the backend folder: cd .\backend\
2.	 Install dependencies:  npm install
3.	 install dotenv package npm i dotenv
4.	 Create a `.env` file in backend root directory with(Api=localhost:3000
JWT_KEY=sdlkjflafjlsadfjlsafjsdlgfdsg
PORT=3000
MONGODB_URI="mongodb://127.0.0.1:27017/Assignment"

)


#### Frontend Setup 
1.	Navigate to the frontend folder: cd /frontend
2.	Install dependencies: npm install


 #### RUN BOTH FRONTEND AND BACKEDND WITH COMMAND 
 navigate to root(role-based-assignment-repo)
 
 npm run dev


#### Architecture Breakdown

#### Backend (Express.js, MongoDB)
- Authentication: Uses JWT tokens & cookies for secure login.(we made a generate token utility function present at utils/generateToken.js)
- Role-Based Authorization: Middleware ensures only authorized users access restricted routes.(created two middleware verifyToken to identify if user is login or not and second one is isAdmin to check if user is Admin or not both function are present in middlewares/authMiddleware.js)
- Database Schema: Users and posts stored in MongoDB with role-based permissions.(created to two models 1 user model contains fields name,email,role and password 
2.post model contain fields title,content,timpestampm and category)
- API Endpoints: RESTful API for CRUD operations on blog posts.(created a blogapi.js contain api end points for register ,login ,getallpost , create,update,delete,fetching role etc)
- Middleware: Handles request validation, authentication, and error management.
Frontend (React, Tailwind CSS)
- State Management: Uses useState and useEffect for dynamic rendering.
- Routing: React Router manages navigation between protected pages.(react-routerdom)
- Conditional Rendering: Components adjust based on user roles (Admin/User).
- API Integration: Fetches blog posts and user details using axios.
-  PAGES
- Homepage: contain Home page ui and option for login /  register  path(localhost:3000/)
- Blogpostpage:contains all created post for user path(localhost:3000/posts/allposts)
- registerForm.jsx: register user path(localhost:3000/register)
- login.jsx: register user path(localhost:3000/login)
- registerForm.jsx: register user path(localhost:3000/register)
- AdminDashboardpage : only available for admin role user implimented by conditonal rendering button component which is implimented at blogpostpage only visible when role is Admin path(implimented through routing /AdminDashboard)
- BlogpostPageEdit: here we edit  particular post by using dynamic routing path (localhost:3000/posts/${postId} )
- cretedBlogpost: to create new blogpost  path(localhost:3000/posts/createpost)


### Backend (Express.js, MongoDB)
- Authentication: Uses JWT tokens & cookies for secure login.
  - Utility function: `utils/generateToken.js` (Generates JWT tokens).
- Role-Based Authorization:
  - Middleware functions:
    - `verifyToken`: Confirms if a user is logged in.
    - `isAdmin`: Ensures admin-only access.
  - Implemented in `middlewares/authMiddleware.js`.
- Database Schema:
  - User model (`models/User.js`): Stores `name`, `email`, `role`, and `password`.
  - Post model (`models/Post.js`): Stores `title`, `content`, `timestamp`, and `category`.
- API Endpoints:
  - CRUD operations on blog posts via `services/blogApi.js`.
  - Endpoints for authentication, role verification, and post management.
- Middleware:
  - Handles request validation, authentication, and error management.

 Frontend (React, Tailwind CSS)
- State Management: Uses `useState` and `useEffect` for dynamic updates.
- Routing: React Router (`react-router-dom`) for navigation.
- Conditional Rendering: UI adapts based on user roles (Admin/User).
- API Integration: Fetches blog posts and user details using `axios`.

## 📌 Key Pages & Routes
| Page | Description | Route |
|------|------------|-------|
| Homepage | Landing page with login/register options. | `http://localhost:3000/` |
| BlogPostsPage | Displays all created posts for users. | `http://localhost:3000/posts/allposts` |
| RegisterForm | User registration page. | `http://localhost:3000/register` |
| Login | User login page. | `http://localhost:3000/login` |
| AdminDashboard | Admin-only dashboard (conditional rendering). | `/adminDashboard` |
| BlogPostEdit | Edit blog post (dynamic routing). | `http://localhost:3000/editpost/:postId` |
| CreateBlogPost | Create a new blog post. | `http://localhost:3000/posts/createpost` |

### Routing in `App.jsx`
 <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/blogpost" element={<BlogPostsPage />} />
        <Route path="/create" element={<CreateBlogPost />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/editpost/:postId" element={<BlogPostEdit />} />




        </Routes>
        <ToastContainer  position="top-right" autoClose={5000}/>
Application Flow
1.	User Signs Up/Login → Sends credentials to backend (localhost:3000/users/usersRoutes/login or /register).
2.	User Interacts with Posts → CRUD operations (localhost:3000/posts/postRoutes).
3.	Backend Validates & Issues JWT → Stores token in cookies/local storage.
4.	Frontend Reads JWT & Role → Adjusts UI based on user role.
o	Password Security: Uses bcrypt for hashing before storing in DB.
5.	Authenticated API Calls → Protected routes require valid tokens.
6.	Role-Based Rendering → Admin sees Admin Dashboard (manage blog posts); Users see general posts.
7.	Logout Functionality → Backend removes cookies, clearing the session and redirecting users.
