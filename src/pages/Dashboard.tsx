
import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { AdminDashboard } from "@/components/AdminDashboard";
import { UserDashboard } from "@/components/UserDashboard";
import { StoreDashboard } from "@/components/StoreDashboard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Store } from "lucide-react";

const Dashboard = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Get user role
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, [navigate]);

  const renderDashboard = () => {
    switch (userRole) {
      case "admin":
        return <AdminDashboard />;
      case "store":
        return <StoreDashboard />;
      case "normal":
        return <UserDashboard />;
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")} className="flex items-center gap-2">
              <Home size={16} /> Home
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/stores")} className="flex items-center gap-2">
              <Store size={16} /> Stores
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-2">
              <ArrowLeft size={16} /> Back
            </Button>
          </div>
        </div>
        {renderDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;
