import React, { useState } from "react";
import { useGetParcelByTrackingIdQuery } from "@/redux/features/parcels/parcel.api";
import StatusTimeline from "@/components/layout/Admin/StatusTimeline";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const ParcelTracking = () => {
  const [trackingId, setTrackingId] = useState("");
  const [submittedId, setSubmittedId] = useState("");
  const [error, setError] = React.useState("");
  // Fetch parcel only when a tracking ID is submitted
  const { data: parcelData, isFetching } = useGetParcelByTrackingIdQuery(submittedId, {
    skip: !submittedId,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingId.trim()) {
      setError("Please enter a tracking ID"); // show error
      return;
    }

    setError(""); // clear error
    setSubmittedId(trackingId.trim());
  };

  const parcel = parcelData?.data;

  console.log(parcel)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📦 Track Your Parcel</h1>

      {/* Tracking Input */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8"
      >
        <Input
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="w-full md:w-96"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <Button type="submit" className="px-6 py-2">
          Track
        </Button>
      </form>

      {/* Loading */}
      {isFetching && <p className="text-center text-gray-500 dark:text-gray-400">Loading parcel...</p>}

      {/* Error */}
      {!isFetching && submittedId && !parcel && (
        <div className="text-center text-red-500 dark:text-red-400 flex flex-col items-center gap-2">
          <AlertCircle className="w-12 h-12 mx-auto" />
          <p>Parcel not found with ID: <strong>{submittedId}</strong></p>
        </div>
      )}

      {/* Parcel Details */}
      {parcel && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Meta Info */}
          <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Parcel Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Tracking ID:</strong> {parcel.trackingId}</p>
              <p><strong>Parcel Type:</strong> {parcel.parcelType}</p>
              <p><strong>Status:</strong> {parcel.status}</p>
              <p><strong>Sender:</strong> {parcel.senderInfo?.name}</p>
              <p><strong>Receiver:</strong> {parcel.receiverInfo?.name}</p>
              <p><strong>Created At:</strong> {new Date(parcel.createdAt).toLocaleString()}</p>
            </CardContent>
          </Card>

          {/* Status Timeline */}
          <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-md">
            <CardHeader>
              <CardTitle>Status Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {parcel.statusLog && parcel.statusLog.length > 0 ? (
                <StatusTimeline updateStatusLogs={parcel.statusLog} />
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  No status updates available.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ParcelTracking;
