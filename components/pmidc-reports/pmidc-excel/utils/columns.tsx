import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { Badge } from '@/components/common';
import { useDateFormatter, useSession } from '@/hooks';
import { deleteUserRequest } from '@/client/endpoints';
import { LINKS } from '@/constants';
import IconPencil from '@/components/icon/icon-pencil';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import { showDeleteConfirmation } from '@/utils';
import toast from 'react-hot-toast';
import { TPmdicExcelRow } from '@/types/pdmic-excel';

type TProps = {
  refetch: () => void;
};

export const getColumns = ({ refetch }: TProps) => {
  const router = useRouter();
  const { session } = useSession();
  const { formatListDate, formatListTime } = useDateFormatter();

  const { mutate: deleteUser } = useMutation(deleteUserRequest, {
    onSuccess: res => {
      refetch();
      toast.success(res.data.message);
    },
  });

  const deleteConfirmation = async (id: number) => {
    const data = await showDeleteConfirmation(
      'Do you want to move this user to trash?',
    );
    if (data?.isConfirmed) {
      deleteUser([id as number]);
    }
  };

  const cols = [
    {
      accessor: 'id',
      title: '#',
      width: 50,
    },
    {
      accessor: 'parcel_no',
      title: 'Parcel',
      width: 70,
      sortable: true,
    },
    {
      accessor: 'pmidc_id',
      title: 'Pmidc Id',
      width: 100,
      sortable: true,
    },
    {
      accessor: 'old_id',
      title: 'Old Id',
      width: 100,
    },
    {
      accessor: 'plot_map_id',
      title: 'Plot Map Id',
      width: 70,
    },
    {
      accessor: 'property_type',
      title: 'Property',
      width: 70,
    },
    {
      accessor: 'owner_name',
      title: 'Owner Name',
      width: 150,
      sortable: true,
    },
    {
      accessor: 'father_husband_name',
      title: 'F/H Name',
      width: 150,
    },
    {
      accessor: 'mobile_no',
      title: 'Mob No',
      width: 80,
    },
    {
      accessor: 'email',
      title: 'Email',
      width: 120,
    },
    {
      accessor: 'house_no',
      title: 'H.No',
      width: 60,
    },
    {
      accessor: 'building_name',
      title: 'B.Name',
      width: 100,
    },
    {
      accessor: 'locality_name',
      title: 'Locality Name',
      width: 150,
    },
    {
      accessor: 'road_name',
      title: 'Road Name',
      width: 150,
    },
    {
      accessor: 'pin_code',
      title: 'Pin',
      width: 60,
    },
    {
      accessor: 'property_address',
      title: 'Prop Address',
      width: 200,
    },
    {
      accessor: 'property_use',
      title: 'Prop. Use',
      width: 100,
    },
    {
      accessor: 'occupancy',
      title: 'Occupancy',
      width: 270,
    },
    {
      accessor: 'construction_type',
      title: 'Const Type',
      width: 80,
    },
    {
      accessor: 'construction_year',
      title: 'Const Yr',
      width: 80,
    },
    {
      accessor: 'building_age',
      title: 'Building Age',
      width: 90,
    },
    {
      accessor: 'plot_area_sqft',
      title: 'Plot Area Sqft',
      width: 100,
    },
    {
      accessor: 'builtup_area_sqft',
      title: 'Builtup Area Sqft',
      width: 120,
    },
    {
      accessor: 'floor_count',
      title: 'Floor',
      width: 80,
    },
    {
      accessor: 'property_tax_id',
      title: 'Property Tax Id',
      width: 120,
    },
    {
      accessor: 'water_connection_no',
      title: 'Water Con No',
      width: 150,
    },
    {
      accessor: 'sewer_connection_no',
      title: 'Sewer Con No',
      width: 150,
    },
    {
      accessor: 'electric_connection_no',
      title: 'Elec Con No',
      width: 150,
    },
    {
      accessor: 'business_name',
      title: 'Business Name',
      width: 150,
    },
    {
      accessor: 'remarks',
      title: 'Remarks',
      width: 200,
    },
  ];

  return cols;
};
