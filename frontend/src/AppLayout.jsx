import { Link, Route, Routes, useNavigate } from "react-router-dom";
import About from "./pages/About";
import PostList from "./pages/PostList";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Stats from "./pages/Stats";
import NewPost from "./pages/NewPost";
import NoMatch from "./pages/NoMatch";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import Register from "./pages/Register";

const AppLayout = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/">MERN Blog</Link>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/about">About</Link>
          {user && <Link to="/stats">Stats</Link>}
          {user && <Link to="/newpost">New Post</Link>}
          {user === "admin" && <Link to="/admin">Admin</Link>}
        </div>
        <div className="nav-auth">
          {!user && (
            <Link to="/login" className="btn-nav">
              Login
            </Link>
          )}
          {!user && (
            <Link to="/register" className="btn-nav">
              Register
            </Link>
          )}
          {user && (
            <div className="user-info">
              <span className="username">{user}</span>
              <button onClick={logOut} className="btn-logout">
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stats"
            element={
              <ProtectedRoute user={user}>
                <Stats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/newpost"
            element={
              <ProtectedRoute user={user}>
                <NewPost />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>
    </>
  );
};

export default AppLayout;
