import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAllUsersQuery, useBlockOrUnblockMutation } from "@/redux/features/auth.api";
import Swal from "sweetalert2";

const ManageAllUsers = () => {
  const { data } = useAllUsersQuery(undefined);
  const [blockOrUnblock, { isLoading: isBlocking }] = useBlockOrUnblockMutation();

  // exclude main admin
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const users = data?.data?.filter((user:any) => user.email !== "admin@email.com");

  // toggle block/unblock with confirmation
  const handleToggleBlock = async (userId: string, status: string) => {
    const isBlocked = status === "BLOCKED";

    const result = await Swal.fire({
      title: isBlocked ? "Unblock User?" : "Block User?",
      text: `Are you sure you want to ${isBlocked ? "unblock" : "block"} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isBlocked ? "#16a34a" : "#dc2626", // green or red
      cancelButtonColor: "#6b7280",
      confirmButtonText: isBlocked ? "Yes, Unblock!" : "Yes, Block!",
    });

    if (result.isConfirmed) {
      try {
        await blockOrUnblock({ id: userId, block: !isBlocked }).unwrap();
        Swal.fire({
          icon: "success",
          title: `User ${isBlocked ? "unblocked" : "blocked"} successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Action Failed",
          text: "Something went wrong. Please try again.",
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-5 py-10">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-100 mb-6">👥 Manage Users</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-700">
        <Table className="min-w-full">
          <TableHeader className="bg-gray-800 text-gray-200">
            <TableRow className="border border-gray-800">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users?.map((user: any) => (
              <TableRow
                key={user._id}
                className="hover:bg-gray-900 transition-colors border-b border-gray-800"
              >
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell
                  className={`${
                    user.isActive === "BLOCKED"
                      ? "text-red-400"
                      : "text-green-400"
                  } font-semibold`}
                >
                  {user.isActive}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    disabled={isBlocking}
                    className={`px-3 py-1 rounded font-semibold ${
                      user.isActive === "BLOCKED"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                    onClick={() => handleToggleBlock(user._id, user.isActive)}
                  >
                    {user.isActive === "BLOCKED" ? "Unblock" : "Block"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter className="bg-gray-800 text-gray-200 font-semibold">
            <TableRow>
              <TableCell colSpan={4}>Total Users</TableCell>
              <TableCell className="text-right">
                {users?.length || 0}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        
      </div>
    </div>
  );
};

export default ManageAllUsers;
