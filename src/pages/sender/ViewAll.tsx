import { useCancelParcelMutation, useGetParcelMeQuery } from "@/redux/features/parcels/parcel.api";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";

import type { IParcel } from "@/types/parcel";
import Swal from 'sweetalert2'
import { Link } from "react-router";


const statusColors: Record<string, string> = {
  Requested: "text-blue-500",
  Approved: "text-green-500",
  Dispatched: "text-purple-500",
  IN_TRANSIT: "text-yellow-500",
  Delivered: "text-green-700",
  Cancelled: "text-red-500",
  Blocked: "text-gray-500",
  Returned: "text-orange-500",
  Rescheduled: "text-indigo-500",
};

const ViewAll = () => {

  const { data: myParcel } = useGetParcelMeQuery(undefined)
  const [cancelParcel, { isLoading: isCancelling }] = useCancelParcelMutation()

  const parcels: IParcel[] = myParcel?.data || []

  console.log("get my parcels", parcels)





  const handleCancelParcel = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      });

      if (result.isConfirmed) {
        const res = await cancelParcel(id).unwrap();

        Swal.fire({
          title: "Cancelled!",
          text: "Your parcel has been confirmed.",
          icon: "success",
        });

        console.log("cancel response", res);
      }
    } catch (error) {
      console.error(error);

            Swal.fire({
                title: "Error!",
                text: (typeof error === "object" && error !== null && "data" in error && (error as any).data?.message)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ? (error as any).data.message
                    : "An unexpected error occurred.",
                icon: "error",
            });
    }
  };

  return (
<div className="container mx-auto px-5 py-10">
  <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-700">
    <Table className="min-w-full">
      <TableHeader className="bg-gray-800 text-gray-200 ">
        <TableRow className="border border-gray-800">
          <TableHead>Parcel Type</TableHead>
          <TableHead>Delivery Date</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Receiver</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Weight (kg)</TableHead>
          <TableHead className="text-right">Action</TableHead>
          <TableHead className="text-right">View</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {parcels?.map((parcel: IParcel) => (
          <TableRow
            key={parcel._id}
            className="hover:bg-gray-900 transition-colors border-b border-gray-800"
          >
            <TableCell className="font-medium">{parcel.parcelType}</TableCell>
            <TableCell>{new Date(parcel.deliveryDate).toLocaleDateString()}</TableCell>
            <TableCell>{parcel.deliveryAddress}</TableCell>
            <TableCell>{parcel.receiverInfo?.name}</TableCell>
            <TableCell className={`${statusColors[parcel.status] || "text-gray-300"} font-semibold`}>
              {parcel.status}
            </TableCell>
            <TableCell className="text-right">{parcel.weight}</TableCell>
            <TableCell className="text-right">
              <Button
                size="sm"
                className={`px-3 py-1 rounded font-semibold ${
                  parcel.status === "Cancelled"
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
                disabled={isCancelling || parcel.status === "Cancelled"}
                onClick={() => handleCancelParcel(parcel._id)}
              >
                Cancel
              </Button>
            </TableCell>
            <TableCell className="text-right">
              <Button>
                <Link to={`/sender/view-status-log/${parcel._id}`}>Veiw Status Log</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter className="bg-gray-800 text-gray-200 font-semibold">
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">—</TableCell>
          <TableCell className="text-right">—</TableCell>
          <TableCell className="text-right">—</TableCell>
          <TableCell className="text-right">—</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </div>
</div>

  );
};

export default ViewAll;