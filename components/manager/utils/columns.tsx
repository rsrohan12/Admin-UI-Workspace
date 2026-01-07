import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { useSession } from '@/hooks';
import { deleteManagerForeverRequest } from '@/client/endpoints/manager';
import { showDeleteConfirmation } from '@/utils';
import { USER_ROLE_ENUM, USER_ROLE_LABELS } from '@/types'; 
import IconPencil from '@/components/icon/icon-pencil';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import { LINKS } from '@/constants';
import toast from 'react-hot-toast';

type TProps = {
  refetch: () => void;
};

export const getColumns = ({ refetch }: TProps) => {
  const router = useRouter();
  const { session } = useSession();

  const { mutate: deleteUser } = useMutation(deleteManagerForeverRequest, {
    onSuccess: res => {
      refetch();
      toast.success(res.data.message);
    },
  });

  const deleteConfirmation = async (id: number) => {
    const data = await showDeleteConfirmation(
      "Do you want to delete this manager?"
    );
    if (data?.isConfirmed) {
      deleteUser([id as number]);
    }
  };

  const cols = [
    {
      accessor: 'name',
      title: 'Name',
      sortable: true,
      render: (row: any) => `${row.first_name} ${row.last_name}`,
    },
    {
      accessor: 'role',
      title: 'Role',
      sortable: true,
      render: (row: any) => USER_ROLE_LABELS[row.role as USER_ROLE_ENUM], 
    },
    { accessor: 'email', title: 'Email', sortable: true },

    {
      accessor: 'actions',
      title: 'Actions',
      render: (row: any) => {
        return (
          <div className="flex items-center gap-4">
            <span
              className="cursor-pointer"
              onClick={() => router.push(LINKS.manager.edit(row.id))}>
              <IconPencil />
            </span>
            {session && session?.user?.id && session?.user?.id !== row.id ? (
              <span
                className="cursor-pointer"
                onClick={() => deleteConfirmation(row.id)}>
                <IconTrashLines />
              </span>
            ) : null}
          </div>
        );
      },
    },
  ] as Array<any>;

  return cols;
};
