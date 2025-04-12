
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RatingDisplay } from "@/components/RatingDisplay";
import { Star, User } from "lucide-react";

// Mock data for the store
const mockStoreData = {
  id: 1,
  name: "Coffee Haven",
  email: "info@coffeehaven.com",
  address: "123 Main St, New York",
  description: "A cozy coffee shop with a wide variety of specialty coffees and pastries.",
  rating: 4.5,
  totalRatings: 128,
};

// Mock data for ratings
const mockRatings = [
  { id: 1, username: "John D.", rating: 5, date: "2023-05-10" },
  { id: 2, username: "Sarah M.", rating: 4, date: "2023-05-08" },
  { id: 3, username: "Mike P.", rating: 5, date: "2023-05-05" },
  { id: 4, username: "Emma L.", rating: 3, date: "2023-05-01" },
  { id: 5, username: "David K.", rating: 4, date: "2023-04-28" },
];

export const StoreDashboard = () => {
  const [storeData, setStoreData] = useState(mockStoreData);
  const [ratings, setRatings] = useState(mockRatings);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: storeData.name,
    email: storeData.email,
    address: storeData.address,
    description: storeData.description,
  });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleSaveProfile = () => {
    setStoreData({
      ...storeData,
      name: editForm.name,
      email: editForm.email,
      address: editForm.address,
      description: editForm.description,
    });
    setIsEditing(false);
  };

  // Calculate rating distribution for the chart
  const ratingDistribution = [0, 0, 0, 0, 0]; // 1 to 5 stars
  ratings.forEach(r => {
    if (r.rating >= 1 && r.rating <= 5) {
      ratingDistribution[r.rating - 1]++;
    }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Store Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Overview</CardTitle>
            <div className="flex items-center">
              <RatingDisplay rating={storeData.rating} size="lg" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Ratings</span>
                <span className="font-medium">{storeData.totalRatings}</span>
              </div>
              
              {/* Rating distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(starCount => (
                  <div key={starCount} className="flex items-center gap-2">
                    <div className="flex items-center w-16">
                      <span className="text-sm mr-1">{starCount}</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400 rounded-full" 
                        style={{
                          width: `${ratings.length > 0 ? (ratingDistribution[starCount - 1] / ratings.length) * 100 : 0}%`
                        }}
                      />
                    </div>
                    <span className="text-sm w-8 text-right">
                      {ratingDistribution[starCount - 1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Store Profile</CardTitle>
              {!isEditing && (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Store Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={editForm.address}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    rows={4}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile}>
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Store Name</h3>
                  <p>{storeData.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p>{storeData.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                  <p>{storeData.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <p>{storeData.description}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Ratings</CardTitle>
        </CardHeader>
        <CardContent>
          {ratings.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">
              No ratings yet.
            </p>
          ) : (
            <div className="space-y-4">
              {ratings.map(rating => (
                <div key={rating.id} className="flex items-start p-4 border rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{rating.username}</h4>
                      <span className="text-sm text-muted-foreground">{rating.date}</span>
                    </div>
                    <RatingDisplay rating={rating.rating} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
