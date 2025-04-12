
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Store Rating System</h1>
            <p className="text-xl mb-8">
              A platform where users can discover stores and share their experiences through ratings.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Browse Stores</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Discover stores registered on our platform with detailed information.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Submit Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Share your experience by rating stores on a scale of 1 to 5 stars.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Store Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Store owners can manage their profiles and view ratings from users.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our platform today and start exploring stores or register your own store.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link to="/register">Sign Up Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
