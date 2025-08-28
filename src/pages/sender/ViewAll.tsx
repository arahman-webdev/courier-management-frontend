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
import Swal from "sweetalert2";
import { Link } from "react-router";

const statusColors: Record<string, string> = {
  Requested: "text-blue-400",
  Approved: "text-green-400",
  Dispatched: "text-purple-400",
  IN_TRANSIT: "text-yellow-400",
  Delivered: "text-green-500",
  Cancelled: "text-red-400",
  Blocked: "text-gray-400",
  Returned: "text-orange-400",
  Rescheduled: "text-indigo-400",
};

const ViewAll = () => {
  const { data: myParcel } = useGetParcelMeQuery(undefined);
  const [cancelParcel, { isLoading: isCancelling }] = useCancelParcelMutation();

  const parcels: IParcel[] = myParcel?.data || [];

  const handleCancelParcel = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3b82f6",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Yes, cancel it!",
        background: "#1f2937",
        color: "#f9fafb",
      });

      if (result.isConfirmed) {
        const res = await cancelParcel(id).unwrap();

        Swal.fire({
          title: "Cancelled!",
          text: "Your parcel has been cancelled.",
          icon: "success",
          background: "#1f2937",
          color: "#f9fafb",
        });

        console.log("cancel response", res);
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error!",
        text:
          typeof error === "object" && error !== null && "data" in error
            ? (error as any).data?.message
            : "An unexpected error occurred.",
        icon: "error",
        background: "#1f2937",
        color: "#f9fafb",
      });
    }
  };

  return (
    <div className="container mx-auto px-5 py-10">
      <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-700 bg-gray-900">
        <Table className="min-w-full text-gray-200">
          <TableHeader>
            <TableRow className="bg-gray-950 hover:bg-gray-950 transition-colors border-b border-gray-700">
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
                className="hover:bg-gray-800 transition-colors border-b border-gray-700"
              >
                <TableCell className="font-medium">{parcel.parcelType}</TableCell>
                <TableCell>
                  {new Date(parcel.deliveryDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{parcel.deliveryAddress}</TableCell>
                <TableCell>{parcel.receiverInfo?.name}</TableCell>
                <TableCell
                  className={`${statusColors[parcel.status] || "text-gray-300"} font-semibold`}
                >
                  {parcel.status}
                </TableCell>
                <TableCell className="text-right">{parcel.weight}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    className={`px-3 py-1 rounded-lg shadow-md font-semibold ${
                      parcel.status === "Cancelled"
                        ? "bg-gray-600 cursor-not-allowed text-gray-300"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                    disabled={isCancelling || parcel.status === "Cancelled"}
                    onClick={() => handleCancelParcel(parcel._id)}
                  >
                    Cancel
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
                  >
                    <Link to={`/sender/view-status-log/${parcel._id}`}>
                      View Status Log
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
                    <TableFooter className="">
                        <TableRow className="">
                            <TableCell colSpan={8} className="text-center bg-gray-950 transition-colors border-t border-gray-700">
                                Showing {parcels.length} Parcels
                            </TableCell>
                        </TableRow>
                    </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default ViewAll;
