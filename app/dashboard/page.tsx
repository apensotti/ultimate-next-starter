"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpIcon, ArrowDownIcon, DollarSignIcon, UsersIcon, ActivityIcon, ShoppingCartIcon } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import AuthGuard from "@/components/auth/AuthGuard"

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button>Download Report</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <ShoppingCartIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                    -8.3% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                  <ActivityIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ChartContainer config={{
                    revenue: { theme: { light: "#0ea5e9", dark: "#0ea5e9" } },
                    users: { theme: { light: "#22c55e", dark: "#22c55e" } }
                  }}>
                    <BarChart
                      data={[
                        { name: "Jan", revenue: 4000, users: 2400 },
                        { name: "Feb", revenue: 3000, users: 1398 },
                        { name: "Mar", revenue: 2000, users: 9800 },
                        { name: "Apr", revenue: 2780, users: 3908 },
                        { name: "May", revenue: 1890, users: 4800 },
                        { name: "Jun", revenue: 2390, users: 3800 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      width={800}
                      height={350}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="revenue" fill="var(--color-revenue)" />
                      <Bar dataKey="users" fill="var(--color-users)" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {recentSales.map((sale, index) => (
                      <div key={index} className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={sale.avatar} alt="Avatar" />
                          <AvatarFallback>{sale.initials}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{sale.name}</p>
                          <p className="text-sm text-muted-foreground">{sale.email}</p>
                        </div>
                        <div className="ml-auto font-medium">+${sale.amount}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 grid-cols-1">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>
                    You have 156 orders this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.product}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                order.status === "Completed" ? "default" :
                                order.status === "Processing" ? "secondary" :
                                "destructive"
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">${order.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AuthGuard>
  )
}

const recentSales = [
  {
    name: "John Doe",
    email: "john@example.com",
    amount: "250",
    avatar: "/avatars/01.png",
    initials: "JD"
  },
  {
    name: "Sarah Smith",
    email: "sarah@example.com",
    amount: "890",
    avatar: "/avatars/02.png",
    initials: "SS"
  },
  {
    name: "Mike Johnson",
    email: "mike@example.com",
    amount: "450",
    avatar: "/avatars/03.png",
    initials: "MJ"
  },
  {
    name: "Lisa Anderson",
    email: "lisa@example.com",
    amount: "790",
    avatar: "/avatars/04.png",
    initials: "LA"
  },
  {
    name: "David Wilson",
    email: "david@example.com",
    amount: "550",
    avatar: "/avatars/05.png",
    initials: "DW"
  }
]

const recentOrders = [
  {
    id: "ORD001",
    product: "iPhone 13 Pro",
    date: "2024-03-15",
    status: "Completed",
    amount: "999.00"
  },
  {
    id: "ORD002",
    product: "MacBook Air M2",
    date: "2024-03-14",
    status: "Processing",
    amount: "1299.00"
  },
  {
    id: "ORD003",
    product: "AirPods Pro",
    date: "2024-03-14",
    status: "Failed",
    amount: "249.00"
  },
  {
    id: "ORD004",
    product: "iPad Air",
    date: "2024-03-13",
    status: "Completed",
    amount: "599.00"
  },
  {
    id: "ORD005",
    product: "Apple Watch Series 8",
    date: "2024-03-13",
    status: "Processing",
    amount: "399.00"
  }
]
