// src/components/parcel/StatusTimeline.tsx
interface Update {
  status: string;
  note: string;
  timestamp: string;
}

const StatusTimeline = ({ updateStatusLogs }: { updateStatusLogs: Update[] }) => {
  return (
    <div className="space-y-4">
      {updateStatusLogs.map((statusLog, i) => (
        <div key={i} className="flex items-start space-x-3">
          <div className="w-3 h-3 bg-purple-500 rounded-full mt-1.5" />
          <div>
            <p className="font-semibold">{statusLog.status}</p>
            <p className="text-sm text-gray-400">{statusLog.note}</p>
            <p className="text-xs text-gray-500">{statusLog.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusTimeline;
