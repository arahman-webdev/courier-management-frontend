import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAllUsersQuery, useBlockOrUnblockMutation } from "@/redux/features/auth.api";

const ManageAllUsers = () => {
  const { data } = useAllUsersQuery(undefined);
  const [blockOrUnblock, { isLoading: isBlocking }] = useBlockOrUnblockMutation();

  const users = data?.data?.filter((user)=> user.email !== "admin@email.com")

  console.log(users)

  // toggle block/unblock
  const handleToggleBlock = async (userId: string, status: string) => {
    try {
      const isBlocked = status === "BLOCKED";
      await blockOrUnblock({ id: userId, block: !isBlocked }).unwrap();
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  return (
    <div className="container mx-auto px-5 py-10">
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
                {data?.data?.length || 0}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default ManageAllUsers;
