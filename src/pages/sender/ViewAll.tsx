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
          text: "Your parcel has been cancelled.",
          icon: "success",
        });

        console.log("cancel response", res);
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error!",
        text: "Something went wrong while cancelling the parcel.",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <div className="container mx-auto px-5 py-10">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border border-gray-800">
              <TableHead>Parcel Type</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Weight</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border border-gray-800">
            {parcels?.map((parcel: IParcel) => (
              <TableRow key={parcel._id} className="border-b border-gray-800">
                <TableCell className="font-medium">{parcel?.parcelType}</TableCell>
                <TableCell>{parcel.deliveryDate}</TableCell>
                <TableCell>{parcel.deliveryAddress}</TableCell>
                <TableCell>{parcel?.receiverInfo?.name}</TableCell>
                <TableCell className={statusColors[parcel.status] || "text-gray-700"}>{parcel.status}</TableCell>
                <TableCell className="text-right">{parcel.weight}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    disabled={isCancelling || parcel.status === "Cancelled"}
                    onClick={() => handleCancelParcel(parcel._id)}> Cancel </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-transparent">
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default ViewAll;