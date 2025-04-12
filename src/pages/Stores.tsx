
import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { RatingDisplay } from "@/components/RatingDisplay";
import { RatingModal } from "@/components/RatingModal";
import { useToast } from "@/hooks/use-toast";

interface Store {
  id: number;
  name: string;
  address: string;
  description: string;
  rating: number;
  image: string;
}

// Mock data for stores
const mockStores: Store[] = [
  {
    id: 1,
    name: "Coffee Haven",
    address: "123 Main St, New York",
    description: "A cozy coffee shop with a wide variety of specialty coffees and pastries.",
    rating: 4.5,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Tech Galaxy",
    address: "456 Broadway, San Francisco",
    description: "The latest in technology gadgets and accessories. Expert staff to help with all your tech needs.",
    rating: 3.8,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Fashion World",
    address: "789 Fashion Ave, Los Angeles",
    description: "Trendy clothing and accessories for all seasons. From casual to formal, we've got you covered.",
    rating: 4.2,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Healthy Eats",
    address: "101 Green St, Chicago",
    description: "Organic and locally sourced ingredients. Vegan and gluten-free options available.",
    rating: 4.7,
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Book Corner",
    address: "202 Reader Rd, Boston",
    description: "A quiet bookstore with a vast collection of books across all genres. Coffee shop inside.",
    rating: 4.0,
    image: "/placeholder.svg",
  },
];

const Stores = () => {
  const [stores, setStores] = useState<Store[]>(mockStores);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const { toast } = useToast();
  const isAuthenticated = localStorage.getItem("token") !== null;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRate = (store: Store) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to rate stores",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedStore(store);
    setIsRatingModalOpen(true);
  };

  const handleSaveRating = (storeId: number, rating: number) => {
    // In a real app, this would call an API to save the rating
    // For demo purposes, we'll just update the local state
    
    const updatedStores = stores.map(store => {
      if (store.id === storeId) {
        // Simple update for demo purposes
        const newRating = (store.rating + rating) / 2;
        return { ...store, rating: parseFloat(newRating.toFixed(1)) };
      }
      return store;
    });
    
    setStores(updatedStores);
    setIsRatingModalOpen(false);
    
    toast({
      title: "Rating Submitted",
      description: "Thank you for your feedback!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Browse Stores</h1>
          <div className="relative max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, address, or description..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        {filteredStores.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No stores found matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map(store => (
              <Card key={store.id} className="overflow-hidden">
                <div className="h-48 bg-gray-200">
                  <img 
                    src={store.image} 
                    alt={store.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{store.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {store.address}
                      </CardDescription>
                    </div>
                    <RatingDisplay rating={store.rating} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{store.description}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleRate(store)}>
                    Rate This Store
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <RatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        store={selectedStore}
        onSave={handleSaveRating}
      />
    </div>
  );
};

export default Stores;
