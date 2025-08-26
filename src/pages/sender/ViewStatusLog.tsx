
// adjust API hook name
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router";
import { useGetParcelMeQuery } from "@/redux/features/parcels/parcel.api";

const statusColors: Record<string, string> = {
  Requested: "text-blue-500",
  Approved: "text-green-500",
  Dispatched: "text-purple-500",
  "In Transit": "text-yellow-500",
  Delivered: "text-green-700",
  Cancelled: "text-red-500",
  Blocked: "text-gray-500",
  Returned: "text-orange-500",
  Rescheduled: "text-indigo-500",
};

const ViewStatusLog = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetParcelMeQuery(undefined); // fetch all parcels

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong!</p>;
  }

  // Use find to get the parcel with the matching id
  const parcel = data?.data?.find((item: any) => item._id === id);

  if (!parcel) {
    return <p>Parcel not found!</p>;
  }

  console.log(parcel);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

console.log(id)

//   const parcel = data?.data;

  if (!parcel) {
    return <p className="text-center text-red-500">Parcel not found</p>;
  }

  return (
    <div className="container mx-auto px-5 py-10">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">📦 Parcel Details</h1>

      {/* Parcel Info */}
      <Card className="mb-8 shadow-lg">
        <CardContent className="grid md:grid-cols-2 gap-6 p-6">
          <div>
            <p><span className="font-semibold">Parcel Type:</span> {parcel.parcelType}</p>
            <p><span className="font-semibold">Weight:</span> {parcel.weight} kg</p>
            <p><span className="font-semibold">Delivery Date:</span> {parcel.deliveryDate}</p>
            <p><span className="font-semibold">Status:</span> 
              <span className={`ml-2 font-semibold ${statusColors[parcel.status] || "text-gray-700"}`}>
                {parcel.status}
              </span>
            </p>
          </div>
          <div>
            <p><span className="font-semibold">Receiver:</span> {parcel.receiverInfo?.name}</p>
            <p><span className="font-semibold">Phone:</span> {parcel.receiverInfo?.phone}</p>
            <p><span className="font-semibold">Address:</span> {parcel.deliveryAddress}</p>
          </div>
        </CardContent>
      </Card>

      {/* Delivery History */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">📜 Delivery History</h2>
          <div className="relative border-l border-gray-300 pl-6 space-y-6">
            {parcel.statusLog?.map((log: any, idx: number) => (
              <div key={idx} className="relative">
                {/* Dot */}
                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></span>
                <p className={`font-semibold ${statusColors[log.status] || "text-gray-700"}`}>
                  {log.status}
                </p>
                <p className="text-sm text-gray-600">{new Date(log.timestamp).toLocaleString()}</p>
                {log.note && <p className="text-sm text-gray-500 italic">Note: {log.note}</p>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3">
        <Button className="bg-blue-500 text-white">Back to Parcels</Button>
        {parcel.status === "In Transit" && (
          <Button className="bg-green-500 text-white">Confirm Delivery</Button>
        )}
      </div>
    </div>

  );
};

export default ViewStatusLog;
