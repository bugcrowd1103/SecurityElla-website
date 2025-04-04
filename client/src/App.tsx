import { Route, Switch } from "wouter";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/home";
import Services from "./pages/services";
import Courses from "./pages/courses";
import About from "./pages/about";
import Login from "./pages/login";
import NotFound from "./pages/not-found";
import Blog from "./pages/blog";
import BlogPost from "./pages/blog-post";
import Contact from "./pages/contact";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 font-['Inter',sans-serif]">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/courses" component={Courses} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:id" component={BlogPost} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
