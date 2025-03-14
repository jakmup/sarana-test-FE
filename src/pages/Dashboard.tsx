import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getArticles, deleteArticle } from "../api/article";
import Table from "../components/Table";
import Button from "../components/Button";

//Import Heroicons
import {
  HomeIcon,
  DocumentTextIcon,
  ArrowRightEndOnRectangleIcon,
  ChartBarIcon,
  CalendarIcon,
  MegaphoneIcon,
  PlusIcon,
  PencilSquareIcon,
  PencilIcon,
  TrashIcon
} from "@heroicons/react/24/solid";

const Dashboard = () => {
  const { token } = useAuth();
  const [articles, setArticles] = useState<any[]>([]);
  const [events] = useState(["Meeting at 3 PM", "New article published"]);
  const [activity] = useState(["User logged in", "Article updated"]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      if (!token) return;
      try {
        const articlesData = await getArticles(token);
        console.log("Fetched articles:", articlesData);
        setArticles(articlesData);
      } catch {
        alert("Failed to fetch articles");
      }
    };

    fetchArticles();
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!token) {
      alert("Unauthorized! Please log in again.");
      navigate("/login");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this article?");
    if (!confirmDelete) return;

    try {
      console.log("Deleting article with token:", token, "ID:", id);
      await deleteArticle(token, id);
      alert("Article deleted successfully!");
      setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id));
    } catch (error: any) {
      console.error("Error deleting article:", error.response?.data);
      alert("Failed to delete article: " + (error.response?.data?.message || "An error occurred"));
    }
  };


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-4">CMS Admin</h2>
        <nav className="flex flex-col gap-4">
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 p-2 hover:bg-gray-700">
            <HomeIcon className="w-5 h-5" /> Dashboard
          </button>
          <button onClick={() => navigate("/logout")} className="flex items-center gap-2 p-2 hover:bg-red-600">
            <ArrowRightEndOnRectangleIcon className="w-5 h-5" /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-2xl flex items-center gap-2 font-bold mb-6"><ChartBarIcon className="w-5 h-5" />Dashboard Overview</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-bold">Total Articles</h3>
            <p className="text-3xl">{articles.length}</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-bold">Active Users</h3>
            <p className="text-3xl">125</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-bold">Pending Reviews</h3>
            <p className="text-3xl">8</p>
          </div>
        </div>

        {/* Article Table */}
        <h2 className="text-xl flex items-center gap-2 font-bold mb-4"><PencilSquareIcon className="w-5 h-5" /> Recent Articles</h2>
        <Button onClick={() => navigate("/create")} className="flex items-center gap-2 mb-4 bg-green-500">
          <PlusIcon className="w-5 h-5" /> Create Article
        </Button>
        <Table columns={["title"]} data={articles} actions={(article) => (
          <div className="flex gap-2">
            <Button onClick={() => navigate(`/edit/${article.id}`)} className="flex items-center gap-2 bg-blue-500">
              <PencilIcon className="w-5 h-5" /> Edit
            </Button>
            <Button onClick={() => handleDelete(article.id)} className="flex items-center gap-2 bg-red-500">
              <TrashIcon className="w-5 h-5" /> Delete
            </Button>
          </div>
        )} />
      </main>

      {/* Events & Activity Section */}
      <aside className="w-80 bg-white p-6 shadow-lg">
        <h2 className="text-xl flex items-center gap-2 font-bold mb-4"><CalendarIcon className="w-5 h-5" /> Upcoming Events</h2>
        <ul className="list-disc ml-4 mb-6">
          {events.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>

        <h2 className="text-xl flex items-center gap-2 font-bold mb-4"><MegaphoneIcon className="w-5 h-5" /> Recent Activity</h2>
        <ul className="list-disc ml-4">
          {activity.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Dashboard;
