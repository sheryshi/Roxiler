
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { RatingDisplay } from "@/components/RatingDisplay";
import { RatingModal } from "@/components/RatingModal";

interface Store {
  id: number;
  name: string;
  address: string;
  rating: number;
}

// Mock data - would come from API in real app
const mockStores: Store[] = [
  { id: 1, name: "Coffee Haven", address: "123 Main St, New York", rating: 4.5 },
  { id: 2, name: "Tech Galaxy", address: "456 Broadway, San Francisco", rating: 3.8 },
  { id: 3, name: "Fashion World", address: "789 Fashion Ave, Los Angeles", rating: 4.2 },
  { id: 4, name: "Healthy Eats", address: "101 Green St, Chicago", rating: 4.7 },
  { id: 5, name: "Book Corner", address: "202 Reader Rd, Boston", rating: 4.0 },
];

interface Rating {
  id: number;
  storeId: number;
  storeName: string;
  rating: number;
  date: string;
}

// Mock data for user's ratings
const mockUserRatings: Rating[] = [
  { id: 1, storeId: 1, storeName: "Coffee Haven", rating: 4, date: "2023-03-15" },
  { id: 2, storeId: 3, storeName: "Fashion World", rating: 5, date: "2023-04-10" },
];

export const UserDashboard = () => {
  const [stores, setStores] = useState<Store[]>(mockStores);
  const [userRatings, setUserRatings] = useState<Rating[]>(mockUserRatings);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRate = (store: Store) => {
    setSelectedStore(store);
    setIsRatingModalOpen(true);
  };

  const handleSaveRating = (storeId: number, rating: number) => {
    // Check if user has already rated this store
    const existingRatingIndex = userRatings.findIndex(r => r.storeId === storeId);
    
    if (existingRatingIndex !== -1) {
      // Update existing rating
      const updatedRatings = [...userRatings];
      updatedRatings[existingRatingIndex] = {
        ...updatedRatings[existingRatingIndex],
        rating,
        date: new Date().toISOString().split('T')[0],
      };
      setUserRatings(updatedRatings);
    } else {
      // Add new rating
      const store = stores.find(s => s.id === storeId);
      if (store) {
        setUserRatings([
          ...userRatings,
          {
            id: userRatings.length + 1,
            storeId,
            storeName: store.name,
            rating,
            date: new Date().toISOString().split('T')[0],
          },
        ]);
      }
    }

    // Update store's average rating (in a real app, this would be done by the backend)
    const updatedStores = stores.map(s => {
      if (s.id === storeId) {
        // Simple average calculation for demo
        const existingRatings = userRatings.filter(r => r.storeId === storeId);
        const totalRatings = existingRatings.length;
        const sum = existingRatings.reduce((acc, r) => acc + r.rating, 0) + rating;
        const newAverage = totalRatings > 0 ? sum / (totalRatings + 1) : rating;
        
        return { ...s, rating: parseFloat(newAverage.toFixed(1)) };
      }
      return s;
    });
    
    setStores(updatedStores);
    setIsRatingModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
      
      <Tabs defaultValue="stores">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="stores">Stores</TabsTrigger>
          <TabsTrigger value="ratings">My Ratings</TabsTrigger>
        </TabsList>
        <TabsContent value="stores" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Stores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search stores..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">Address</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStores.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">
                            No stores found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredStores.map((store) => (
                          <TableRow key={store.id}>
                            <TableCell>{store.name}</TableCell>
                            <TableCell className="hidden md:table-cell">{store.address}</TableCell>
                            <TableCell>
                              <RatingDisplay rating={store.rating} />
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" onClick={() => handleRate(store)}>
                                Rate
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ratings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              {userRatings.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">
                  You haven't rated any stores yet.
                </p>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Store</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userRatings.map((rating) => (
                        <TableRow key={rating.id}>
                          <TableCell>{rating.storeName}</TableCell>
                          <TableCell>
                            <RatingDisplay rating={rating.rating} />
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{rating.date}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                const store = stores.find(s => s.id === rating.storeId);
                                if (store) {
                                  setSelectedStore(store);
                                  setIsRatingModalOpen(true);
                                }
                              }}
                            >
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <RatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        store={selectedStore}
        onSave={handleSaveRating}
        initialRating={
          selectedStore 
            ? userRatings.find(r => r.storeId === selectedStore.id)?.rating 
            : undefined
        }
      />
    </div>
  );
};
