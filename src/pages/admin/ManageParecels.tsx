// src/pages/admin/ManageParcels.tsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

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


import {
  useBlocklParcelMutation,
  useCancelParcelMutation,
  useConfirmlParcelMutation,
  useGetAllParcelsQuery,
  useUnblocklParcelMutation,
  useUpdateParcelStatusMutation,
} from "@/redux/features/parcels/parcel.api";

// ---- Status flow helpers ----
const statusFlow = [
  "REQUESTED",
  "APPROVED",
  "DISPATCHED",
  "IN_TRANSIT",
  "DELIVERED",
] as const;

// Normalize (for backend enum safety)
const normalizeStatus = (s: string) =>
  s ? s.trim().toUpperCase().replace(/\s+/g, "_") : s;

const normalize = (status: string) => status.trim().toUpperCase().replace(" ", "_");

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

type Parcel = {
  _id: string;
  trackingId: string;
  parcelType: string;
  status: string;
  isBlocked: boolean;
  createdAt: string;
  deliveryDate?: string;
  deliveryAddress?: string;
};

type ParcelResponse = {
  data: Parcel[];
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
};

const ManageParcels = () => {
  // ---------------- UI state (pagination + filters) ----------------
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);


  const [parcelType, setParcelType] = useState<string>("");


  const [addressInput, setAddressInput] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");

  // Date filter
  const [deliveryDate, setDeliveryDate] = useState<string>("");


  const [status, setStatus] = useState<string>("");


  const [isBlocked, setIsBlocked] = useState<string>(""); // "", "true", "false"


  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setDeliveryAddress(addressInput.trim());
    }, 400);
    return () => clearTimeout(t);
  }, [addressInput]);


  const queryObject: Record<string, string> = {
    page: String(page),
    limit: String(limit),
    ...(parcelType ? { parcelType } : {}),
    ...(deliveryAddress ? { deliveryAddress } : {}),
    ...(deliveryDate ? { deliveryDate } : {}),
    ...(status ? { status: normalizeStatus(status) } : {}),
    ...(isBlocked ? { isBlocked } : {}),
  };

  const { data, isLoading, isFetching } = useGetAllParcelsQuery(
    // pass undefined if no filters at all? (but we send page/limit always)
    queryObject as any
  ) as { data: ParcelResponse | undefined; isLoading: boolean; isFetching: boolean };

  const parcels = data?.data ?? [];
  const total = data?.meta?.total ?? 0;
  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);

  // ---------------- Mutations ----------------
  const [blockParcel, { isLoading: isBlocking }] = useBlocklParcelMutation();
  const [unblockParcel, { isLoading: isUnblocking }] = useUnblocklParcelMutation();
  const [confirmParcel, { isLoading: isConfirming }] = useConfirmlParcelMutation();
  const [updateStatus, { isLoading: isUpdating }] = useUpdateParcelStatusMutation();
  const [cancelParcel, { isLoading: isCancelling }] = useCancelParcelMutation();

  // ---------------- Handlers ----------------
  const handleToggleBlock = async (parcel: Parcel & { isBlocked: boolean }) => {
    const isCurrentlyBlocked = parcel.isBlocked;
    const result = await Swal.fire({
      title: isCurrentlyBlocked ? "Unblock Parcel?" : "Block Parcel?",
      text: `Are you sure you want to ${isCurrentlyBlocked ? "unblock" : "block"} this parcel?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: isCurrentlyBlocked ? "Yes, Unblock" : "Yes, Block",
      background: "#1f2937",
      color: "#e5e7eb",
    });

    if (!result.isConfirmed) return;

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
  };

  const handleConfirm = async (id: string) => {
    try {
      await confirmParcel(id).unwrap();
      Swal.fire("Confirmed!", "Parcel has been confirmed.", "success");
    } catch (err: any) {
      Swal.fire("Error!", err?.data?.message || "Something went wrong.", "error");
    }
  };

  const handleUpdateStatus = async (parcel: Parcel) => {
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

    if (!result.isConfirmed) return;

    try {
      await updateStatus(parcel._id).unwrap();
      Swal.fire("Updated!", `Parcel status updated to ${nextStatus}.`, "success");
    } catch (err: any) {
      Swal.fire("Error!", err?.data?.message || "Something went wrong.", "error");
    }
  };

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

      if (!result.isConfirmed) return;

      await cancelParcel(id).unwrap();
      Swal.fire("Cancelled!", "Parcel has been cancelled.", "success");
    } catch (error: any) {
      Swal.fire("Error!", error?.data?.message || "Something went wrong.", "error");
    }
  };

  const handleClearFilters = () => {
    setParcelType("");
    setAddressInput("");
    setDeliveryAddress("");
    setDeliveryDate("");
    setStatus("");
    setIsBlocked("");
    setPage(1);
  };

  // ---------------- UI ----------------
  return (
    <div className="container mx-auto px-5 py-10 text-gray-200">
      <h1 className="text-2xl font-bold mb-5">Manage Parcels</h1>

      {/* Filters Bar: parcel type + address + date + status + active/blocked */}
      <div className="mb-4 p-4 rounded-lg border border-gray-700 bg-gray-900 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex gap-3 items-center w-full md:w-auto">
          {/* Parcel Type select */}
          <select
            value={parcelType}
            onChange={(e) => {
              setParcelType(e.target.value);
              setPage(1);
            }}
            className="rounded-md bg-gray-800 border border-gray-700 text-gray-100 px-3 py-2"
          >
            <option value="">All Types</option>
            {/* adjust values based on your domain values */}
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Clothes">Clothes</option>
            <option value="Documents">Documents</option>
            <option value="Home Appliances">Home Appliances</option>
          </select>




          {/* Delivery date filter */}
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => {
              setDeliveryDate(e.target.value);
              setPage(1);
            }}
            className="rounded-md bg-gray-800 border border-gray-700 text-gray-100 px-3 py-2"
          />
        </div>

        <div className="flex gap-3 items-center w-full md:w-auto">
          {/* Status filter */}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="w-full md:w-48 rounded-md bg-gray-800 border border-gray-700 text-gray-100 px-3 py-2"
          >
            <option value="">All Statuses</option>
            {/* user-facing values, normalized when sent */}
            <option value="Requested">Requested</option>
            <option value="Approved">Approved</option>
            <option value="Dispatched">Dispatched</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Blocked filter */}
          <select
            value={isBlocked}
            onChange={(e) => {
              setIsBlocked(e.target.value);
              setPage(1);
            }}
            className="w-full md:w-40 rounded-md bg-gray-800 border border-gray-700 text-gray-100 px-3 py-2"
          >
            <option value="">All</option>
            <option value="false">Active</option>
            <option value="true">Blocked</option>
          </select>

          <Button
            size="sm"
            onClick={handleClearFilters}
            className="bg-gray-700 hover:bg-gray-600 text-gray-100"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-700 bg-gray-900">
        {isLoading ? (
          <div className="p-8 text-center text-gray-400">Loading parcels…</div>
        ) : parcels.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No parcels found.</div>
        ) : (
          <Table className="min-w-full">
            <TableHeader className="bg-gray-800 text-gray-200">
              <TableRow>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Parcel Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Blocked?</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {parcels.map((parcel) => (
                <TableRow key={parcel._id} className="hover:bg-gray-800 transition-colors">
                  <TableCell className="font-medium">{parcel.trackingId}</TableCell>
                  <TableCell>{parcel.parcelType}</TableCell>
                  <TableCell>{parcel.status}</TableCell>
                  {/* <TableCell>{new Date(parcel.deliveryDate).toLocaleDateString("en-US", { timeZone: "UTC" })}</TableCell> */}
                  <TableCell>
                    {parcel?.deliveryDate ? parcel.deliveryDate.split("T")[0] : "—"}
                  </TableCell>
                  <TableCell className={parcel.isBlocked ? "text-red-400" : "text-green-400"}>
                    {parcel.isBlocked ? "Blocked" : "Active"}
                  </TableCell>

                  <TableCell className="flex gap-2 justify-end flex-wrap">
                    {/* View Details */}
                    <Button variant="secondary" className="bg-gray-800 border border-gray-700 text-gray-100 hover:bg-gray-700">
                      <Link to={`/admin/parcels/${parcel._id}`}>View Detail</Link>
                    </Button>

                    {/* Block / Unblock */}
                    <Button
                      size="sm"
                      disabled={isBlocking || isUnblocking}
                      className={
                        parcel.isBlocked
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }
                      onClick={() => handleToggleBlock(parcel as any)}
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
                      onClick={() => handleUpdateStatus(parcel as any)}
                    >
                      Next: {getNextStatus(parcel.status)}
                    </Button>

                    {/* Cancel */}
                    <Button
                      size="sm"
                      className={
                        parcel.status === "CANCELLED"
                          ? "bg-gray-600 cursor-not-allowed text-white"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }
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
                <TableCell colSpan={4}>
                  {isFetching ? "Updating…" : `Showing ${parcels.length} of ${total} parcels`}
                </TableCell>
                <TableCell colSpan={2} className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      className="bg-gray-800 border-gray-700 text-gray-100"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page <= 1}
                    >
                      Prev
                    </Button>
                    <span className="px-2 py-1 rounded bg-gray-800 border border-gray-700">
                      Page {page} / {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      className="bg-gray-800 border-gray-700 text-gray-100"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page >= totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ManageParcels;
