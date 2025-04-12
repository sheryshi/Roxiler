
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Search } from "lucide-react";
import { StoreModal } from "@/components/StoreModal";
import { Badge } from "@/components/ui/badge";
import { RatingDisplay } from "@/components/RatingDisplay";

interface Store {
  id: number;
  name: string;
  email: string;
  address: string;
  rating: number;
}

// Mock data - would come from API in real app
const mockStores: Store[] = [
  { id: 1, name: "Coffee Haven", email: "info@coffeehaven.com", address: "123 Main St, New York", rating: 4.5 },
  { id: 2, name: "Tech Galaxy", email: "support@techgalaxy.com", address: "456 Broadway, San Francisco", rating: 3.8 },
  { id: 3, name: "Fashion World", email: "contact@fashionworld.com", address: "789 Fashion Ave, Los Angeles", rating: 4.2 },
  { id: 4, name: "Healthy Eats", email: "hello@healthyeats.com", address: "101 Green St, Chicago", rating: 4.7 },
  { id: 5, name: "Book Corner", email: "books@bookcorner.com", address: "202 Reader Rd, Boston", rating: 4.0 },
];

export const StoreList = () => {
  const [stores, setStores] = useState<Store[]>(mockStores);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStore = () => {
    setSelectedStore(null);
    setIsModalOpen(true);
  };

  const handleEditStore = (store: Store) => {
    setSelectedStore(store);
    setIsModalOpen(true);
  };

  const handleSaveStore = (store: Store) => {
    if (selectedStore) {
      // Update existing store
      setStores(stores.map(s => s.id === store.id ? store : s));
    } else {
      // Add new store
      setStores([...stores, { ...store, id: stores.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search stores..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Button onClick={handleAddStore}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Store
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Address</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStores.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No stores found.
                </TableCell>
              </TableRow>
            ) : (
              filteredStores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell>{store.name}</TableCell>
                  <TableCell>{store.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{store.address}</TableCell>
                  <TableCell>
                    <RatingDisplay rating={store.rating} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEditStore(store)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <StoreModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveStore}
        store={selectedStore}
      />
    </div>
  );
};
