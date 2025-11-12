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

const AppLayout = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>
          Home
        </Link>
        <Link to="/posts" style={{ padding: 5 }}>
          Posts
        </Link>
        <Link to="/about" style={{ padding: 5 }}>
          About
        </Link>
        <span> | </span>
        {user && (
          <Link to="/stats" style={{ padding: 5 }}>
            Stats
          </Link>
        )}
        {user && (
          <Link to="/newpost" style={{ padding: 5 }}>
            New Post
          </Link>
        )}
        {!user && (
          <Link to="/login" style={{ padding: 5 }}>
            Login
          </Link>
        )}
        {user === "admin" && (
          <Link to="/admin" style={{ padding: 5 }}>
            Admin
          </Link>
        )}
        {user && (
          <span onClick={logOut} style={{ padding: 5, cursor: "pointer" }}>
            Logout
          </span>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
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
    </>
  );
};

export default AppLayout;
