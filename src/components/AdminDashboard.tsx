
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserList } from "@/components/UserList";
import { StoreList } from "@/components/StoreList";
import { DashboardStats } from "@/components/DashboardStats";

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      
      <DashboardStats />
      
      <Tabs defaultValue="stores">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="stores">Stores</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="stores" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Management</CardTitle>
            </CardHeader>
            <CardContent>
              <StoreList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <UserList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
