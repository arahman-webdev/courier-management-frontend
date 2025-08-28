// src/pages/admin/ParcelDetails.tsx

import StatusTimeline from "@/components/layout/Admin/StatusTimeline";
import { useGetParcelByIdQuery } from "@/redux/features/parcels/parcel.api";
import { useParams } from "react-router";

const ParcelDetails = () => {
  const { id } = useParams<{ id: string }>();

  // Only call the query if id is defined
  const { data: parcel, isLoading, isError } = useGetParcelByIdQuery(id as string, { skip: !id });

  if (!id) return <div className="p-6 text-red-400">Invalid parcel ID</div>;
  if (isLoading) return <div className="p-6 text-white">Loading...</div>;
  if (isError) return <div className="p-6 text-red-400">Error loading parcel</div>;

  const updates = parcel?.data?.statusLog || [];

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Parcel Details</h1>

      {/* Parcel Meta Info */}
      <div className="mb-6 p-4 bg-gray-800 rounded shadow">
        <p><strong>Tracking ID:</strong> {parcel?.data?.trackingId}</p>
        <p><strong>Parcel Type:</strong> {parcel?.data?.parcelType}</p>
        <p><strong>Status:</strong> {parcel?.data?.status}</p>
      </div>

      {/* Status Timeline */}
      <StatusTimeline
        updateStatusLogs={updates.map((statusLog: any) => ({
          status: statusLog.status,
          note: statusLog.note || "No note",
          timestamp: new Date(statusLog.timestamp).toLocaleString(),
        }))}
      />
    </div>
  );
};

export default ParcelDetails;

