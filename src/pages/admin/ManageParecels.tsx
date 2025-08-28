import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// For view details link
import Swal from "sweetalert2";
import {
    useBlocklParcelMutation,
    useCancelParcelMutation,
    useConfirmlParcelMutation,
    useGetAllParcelsQuery,
    useUnblocklParcelMutation,
    useUpdateParcelStatusMutation,
} from "@/redux/features/parcels/parcel.api";
import { Link } from "react-router";

// Define status flow
const statusFlow = [
    "REQUESTED",
    "APPROVED",
    "DISPATCHED",
    "IN_TRANSIT",
    "DELIVERED",
] as const;

// Normalize status
const normalize = (status: string) =>
    status.trim().toUpperCase().replace(" ", "_");

// Get next status
const getNextStatus = (currentStatus: string | undefined) => {
    if (!currentStatus) return "DELIVERED";

    const currentIndex = statusFlow.findIndex(
        (status) => normalize(status) === normalize(currentStatus)
    );

    if (currentIndex === -1 || currentIndex === statusFlow.length - 1) {
        return "DELIVERED";
    }

    return statusFlow[currentIndex + 1];
};

const ManageParcels = () => {
    const { data } = useGetAllParcelsQuery(undefined);

    const [blockParcel, { isLoading: isBlocking }] = useBlocklParcelMutation();
    const [unblockParcel, { isLoading: isUnblocking }] = useUnblocklParcelMutation();
    const [confirmParcel, { isLoading: isConfirming }] = useConfirmlParcelMutation();
    const [updateStatus, { isLoading: isUpdating }] = useUpdateParcelStatusMutation();
    const [cancelParcel, { isLoading: isCancelling }] = useCancelParcelMutation();

    const parcels = data?.data || [];

    // Block / Unblock
    const handleToggleBlock = async (parcel: any) => {
        const isCurrentlyBlocked = parcel.isBlocked;
        const result = await Swal.fire({
            title: isCurrentlyBlocked ? "Unblock Parcel?" : "Block Parcel?",
            text: `Are you sure you want to ${isCurrentlyBlocked ? "unblock" : "block"} this parcel?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: isCurrentlyBlocked ? "Yes, Unblock" : "Yes, Block",
            background: "#1f2937", // dark modal
            color: "#e5e7eb",
        });

        if (result.isConfirmed) {
            try {
                if (isCurrentlyBlocked) {
                    await unblockParcel(parcel._id).unwrap();
                    Swal.fire("Unblocked!", "The parcel has been unblocked.", "success");
                } else {
                    await blockParcel(parcel._id).unwrap();
                    Swal.fire("Blocked!", "The parcel has been blocked.", "success");
                }
            } catch (err: any) {
                Swal.fire("Error!", err?.data?.message || "Something went wrong.", "error");
            }
        }
    };

    // Confirm
    const handleConfirm = async (id: string) => {
        try {
            await confirmParcel(id).unwrap();
            Swal.fire("Confirmed!", "Parcel has been confirmed.", "success");
        } catch (err: any) {
            Swal.fire("Error!", err?.data?.message || "Something went wrong.", "error");
        }
    };

    // Update Status
    const handleUpdateStatus = async (parcel: any) => {
        const nextStatus = getNextStatus(parcel.status);
        const result = await Swal.fire({
            title: `Update status to ${nextStatus}?`,
            text: `Update parcel status from ${parcel.status} → ${nextStatus}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Update",
            background: "#1f2937",
            color: "#e5e7eb",
        });

        if (result.isConfirmed) {
            try {
                await updateStatus(parcel._id).unwrap();
                Swal.fire("Updated!", `Parcel status updated to ${nextStatus}.`, "success");
            } catch (err: any) {
                Swal.fire("Error!", err?.data?.message || "Something went wrong.", "error");
            }
        }
    };

    // Cancel
    const handleCancelParcel = async (id: string) => {
        try {
            const result = await Swal.fire({
                title: `Cancel Parcel?`,
                text: `Are you sure you want to cancel this parcel?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Cancel",
                background: "#1f2937",
                color: "#e5e7eb",
            });

            if (result.isConfirmed) {
                await cancelParcel(id).unwrap();
                Swal.fire("Cancelled!", "Parcel has been cancelled.", "success");
            }
        } catch (error: any) {
            Swal.fire("Error!", error?.data?.message || "Something went wrong.", "error");
        }
    };

    return (
        <div className="container mx-auto px-5 py-10 text-gray-200">
            <h1 className="text-2xl font-bold mb-5">Manage Parcels</h1>
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-700 bg-gray-900">
                <Table className="min-w-full">
                    <TableHeader className="bg-gray-800 text-gray-200">
                        <TableRow>
                            <TableHead>Tracking ID</TableHead>
                            <TableHead>Parcel Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Blocked?</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {parcels.map((parcel: any) => (
                            <TableRow
                                key={parcel._id}
                                className="hover:bg-gray-800 transition-colors"
                            >
                                <TableCell>{parcel.trackingId}</TableCell>
                                <TableCell>{parcel.parcelType}</TableCell>
                                <TableCell>{parcel.status}</TableCell>
                                <TableCell className={parcel.isBlocked ? "text-red-400" : "text-green-400"}>
                                    {parcel.isBlocked ? "Blocked" : "Active"}
                                </TableCell>
                                <TableCell className="flex gap-2 justify-end flex-wrap">
                                    {/* View Details */}
                                    <Button>
                                        <Link to={`/admin/parcels/${parcel._id}`}>View Detail</Link>
                                    </Button>



                                    {/* Block / Unblock */}
                                    <Button
                                        size="sm"
                                        disabled={isBlocking || isUnblocking}
                                        className={parcel.isBlocked
                                            ? "bg-green-500 hover:bg-green-600 text-white"
                                            : "bg-red-500 hover:bg-red-600 text-white"}
                                        onClick={() => handleToggleBlock(parcel)}
                                    >
                                        {parcel.isBlocked ? "Unblock" : "Block"}
                                    </Button>

                                    {/* Confirm */}
                                    <Button
                                        size="sm"
                                        disabled={isConfirming}
                                        className="bg-blue-500 hover:bg-blue-600 text-white"
                                        onClick={() => handleConfirm(parcel._id)}
                                    >
                                        Confirm
                                    </Button>

                                    {/* Next Status */}
                                    <Button
                                        size="sm"
                                        disabled={isUpdating || parcel.isBlocked || normalize(parcel.status) === "DELIVERED"}
                                        className="bg-purple-500 hover:bg-purple-600 text-white"
                                        onClick={() => handleUpdateStatus(parcel)}
                                    >
                                        Next: {getNextStatus(parcel.status)}
                                    </Button>

                                    {/* Cancel */}
                                    <Button
                                        size="sm"
                                        className={parcel.status === "CANCELLED"
                                            ? "bg-gray-600 cursor-not-allowed text-white"
                                            : "bg-red-500 hover:bg-red-600 text-white"}
                                        disabled={isCancelling || parcel.status === "CANCELLED"}
                                        onClick={() => handleCancelParcel(parcel._id)}
                                    >
                                        Cancel
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter className="bg-gray-800 text-gray-200 font-semibold">
                        <TableRow>
                            <TableCell colSpan={4}>Total Parcels</TableCell>
                            <TableCell className="text-right">{parcels.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
};

export default ManageParcels;
