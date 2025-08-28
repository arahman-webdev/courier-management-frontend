import { useGetAllParcelsQuery } from "@/redux/features/parcels/parcel.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Package, Truck, CheckCircle, XCircle } from "lucide-react";

const AdminAnalytic = () => {
  const { data: allParcels } = useGetAllParcelsQuery(undefined);

  const parcels = allParcels?.data || [];


  
  // Status counts
  const statusCounts = parcels.reduce(
    (acc: any, parcel: any) => {
      acc[parcel.status] = (acc[parcel.status] || 0) + 1;
      return acc;
    },
    {}
  );

  console.log("status count ",statusCounts)
  console.log("status count ",statusCounts?.IN_TRANSIT)

  const pieData = Object.keys(statusCounts).map((key) => ({
    name: key,
    value: statusCounts[key],
  }));

  const COLORS = ["#22c55e", "#3b82f6", "#eab308", "#ef4444"];

  // Monthly shipments (dummy grouping by createdAt month)
  const monthlyData = parcels.reduce((acc: any, parcel: any) => {
    const month = new Date(parcel.createdAt).toLocaleString("default", { month: "short" });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.keys(monthlyData).map((key) => ({
    month: key,
    shipments: monthlyData[key],
  }));

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-100">📊 Parcel Analytics</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border border-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-100 gap-2">
              <Package className="text-purple-400" /> Total Parcels
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-gray-100">{parcels.length}</CardContent>
        </Card>

        <Card className="bg-gray-900 border border-gray-800 shadow-lg">
          <CardHeader className="text-gray-100">
            <CardTitle className="flex items-center  gap-2">
              <CheckCircle className="text-green-400" /> Delivered
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl text-gray-100 font-bold">{statusCounts["Delivered"] || 0}</CardContent>
        </Card>

        <Card className="bg-gray-900 border border-gray-800 shadow-lg">
          <CardHeader className="text-gray-100">
            <CardTitle className="flex items-center  gap-2">
              <Truck className="text-blue-400 " /> In Transit
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl text-gray-100 font-bold">{statusCounts["In Transit"] || 0}</CardContent>
        </Card>

        <Card className="bg-gray-900 border border-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-100 gap-2">
              <XCircle className="text-red-400" /> Cancelled
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-gray-100">{statusCounts["Cancelled"] || 0}</CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border border-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-100">Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border border-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-100">Monthly Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="shipments" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytic;
