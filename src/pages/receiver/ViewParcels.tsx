import { useConfirmlParcelMutation, useGetParcelMeQuery } from "@/redux/features/parcels/parcel.api";
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
import { Link } from "react-router";
import Swal from "sweetalert2";

import type { IParcel } from "@/types/parcel";

const statusColors: Record<string, string> = {
    Requested: "text-blue-500",
    Approved: "text-green-500",
    Dispatched: "text-purple-500",
    IN_TRANSIT: "text-yellow-500",
    InTransit: "text-yellow-500", // to handle camelCase
    Delivered: "text-green-700",
    Cancelled: "text-red-500",
    Blocked: "text-gray-500",
    Returned: "text-orange-500",
    Rescheduled: "text-indigo-500",
};

const ViewAllParcels = () => {
    const { data: myParcel } = useGetParcelMeQuery(undefined);
    const [confirmParcel, { isLoading: isConfirming }] = useConfirmlParcelMutation();

    const parcels: IParcel[] = myParcel?.data || [];

    const handleConfirmParcel = async (id: string) => {
        try {
            const result = await Swal.fire({
                title: "Confirm Delivery?",
                text: "Once confirmed, the parcel will be marked as delivered.",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, confirm it!",
            });

            if (result.isConfirmed) {
                const res = await confirmParcel(id).unwrap();

                Swal.fire({
                    title: "Confirmed!",
                    text: "The parcel has been delivered successfully.",
                    icon: "success",
                });

                console.log("confirm response", res);
            }
        } catch (error) {
            console.error(error);

            Swal.fire({
                title: "Error!",
                text:
                    typeof error === "object" &&
                    error !== null &&
                    "data" in error &&
                    (error as any).data?.message
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
                    <TableHeader className=" text-gray-200">
                        <TableRow className="bg-gray-800 hover:bg-gray-800 transition-colors border-b border-gray-700">
                            <TableHead>Parcel Type</TableHead>
                            <TableHead>Delivery Date</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Receiver</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Weight (kg)</TableHead>
                            <TableHead className="text-right">Confirm</TableHead>
                            <TableHead className="text-right">Details</TableHead>
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
                                <TableCell>{parcel.senderInfo?.name}</TableCell>
                                <TableCell
                                    className={`${statusColors[parcel.status] || "text-gray-300"} font-semibold`}
                                >
                                    {parcel.status}
                                </TableCell>
                                <TableCell>{parcel.weight}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        size="sm"
                                        className={`px-3 py-1 rounded font-semibold ${
                                            parcel.status === "In Transit"
                                                ? "bg-green-600 hover:bg-green-700 text-white"
                                                : "bg-gray-400 cursor-not-allowed text-white"
                                        }`}
                                        disabled={isConfirming || parcel.status !== "In Transit"}
                                        onClick={() => handleConfirmParcel(parcel._id)}
                                    >
                                        Confirm
                                    </Button>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Link to={`/receiver/view-histroy/${parcel._id}`}>
                                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                            View Detail
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter className="">
                        <TableRow className="">
                            <TableCell colSpan={8} className="text-center bg-gray-800 hover:bg-gray-900 transition-colors border-t border-gray-700">
                                Showing {parcels.length} Parcels
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
};

export default ViewAllParcels;
