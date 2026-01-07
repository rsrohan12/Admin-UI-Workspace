import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { Badge } from "@/components/common";
import { useDateFormatter, useSession } from "@/hooks";
import {
  deleteUserForeverRequest,
  restoreUserRequest,
} from "@/client/endpoints";
import { showDeleteConfirmation } from "@/utils";
import toast from "react-hot-toast";

type TProps = {
  refetch: () => void;
};

export const getTrashColumns = ({ refetch }: TProps) => {
  const { session } = useSession();
  const { formatListDate, formatListTime } = useDateFormatter();

  const { mutate: deleteUser } = useMutation(deleteUserForeverRequest, {
    onSuccess: (res) => {
      refetch();
      toast.success(res.data.message);
    },
  });

  const { mutate: restoreUser } = useMutation(restoreUserRequest, {
    onSuccess: (res) => {
      refetch();
      toast.success(res.data.message);
    },
  });

  const deleteConfirmation = async (id: number) => {
    const data = await showDeleteConfirmation(
      "Do you want to delete this user?"
    );
    if (data?.isConfirmed) {
      deleteUser([id as number]);
    }
  };

  const restoreConfirmation = async (id: number) => {
    const data = await showDeleteConfirmation(
      "Do you want to restore this user?"
    );
    if (data?.isConfirmed) {
      restoreUser([id as number]);
    }
  };

  const cols = [
    { accessor: "full_name", title: "Name", sortable: true },
    { accessor: "email", title: "Email", sortable: true },
    {
      accessor: "active",
      title: "Status",
      sortable: true,
      render: (row: any) => {
        return (
          <>
            {row?.active == 1 ? (
              <Badge type="success" message="Active" />
            ) : (
              <Badge type="danger" message="Inactive" />
            )}
          </>
        );
      },
    },
    {
      accessor: "createdAt",
      title: "Created",
      sortable: true,
      render: (row: any) => {
        return (
          <>
            <div>{formatListDate(row.createdAt)}</div>
            <div className="text-primary">{formatListTime(row.createdAt)}</div>
          </>
        );
      },
    },
    {
      accessor: "actions",
      title: "Actions",
      render: (row: any) => {
        return (
          <div className="flex items-center gap-4">
            <button
              className="btn btn-success btn-sm"
              onClick={() => restoreConfirmation(row.id)}
            >
              Restore
            </button>
            {session && session?.user?.id && session?.user?.id !== row.id ? (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteConfirmation(row.id)}
              >
                Delete Forever
              </button>
            ) : null}
          </div>
        );
      },
    },
  ] as Array<any>;

  return cols;
};
