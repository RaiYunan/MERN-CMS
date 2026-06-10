import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import NewPost from "./pages/NewPost";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import BlogDetail from "./pages/BlogDetail";
import { Toaster } from "react-hot-toast";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
      <Toaster position="top-right" />
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Navbar />
          <main className="max-w-4xl mx-auto p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/posts/new" element={<NewPost />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/posts/:id" element={<BlogDetail />} />
              <Route path="/posts/:id/edit" element={<EditPost/>}/>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;