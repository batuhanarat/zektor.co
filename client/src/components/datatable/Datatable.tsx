import React, { useEffect, useState } from 'react';
import "./datatable.scss";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {  getPlants } from '../../api/getPlants';
import { Link } from 'react-router-dom';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 180 },
  { field: 'plantType', headerName: 'Plant Type', width: 180 },
  { field: 'plantOrder', headerName: 'Plant Location', width: 180 },
  {
    field: 'devStatus',
    headerName: 'Development Phase',
    width: 180,
  },
  {
    field: 'healthStatus',
    headerName: 'Health Status',
    width: 180,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.healthStatus === 'Healthy' ? 'healthy' : 'unhealthy'}`}>
          {params.row.healthStatus}
        </div>
      );
    },
  },
  {
    field: 'remainingHarvestTime',
    headerName: 'Remaining Harvest Time',
    width: 200,
  },
];

type RowData = {
  id: string;
  plantType: string;
  plantOrder: number;
  devStatus: string;
  healthStatus: string;
  remainingHarvestTime: string;
};

const getHealthStatus = (status: number): string => {
  return status === 0 ? 'Unhealthy' : 'Healthy';

};

const getDevStatus = (stage: number): string => {
  switch (stage) {
    case 1:
      return 'Cotyledon';
    case 2:
      return 'Rosetta';
    case 3:
      return 'Heading';
    case 4:
      return 'Harvest';
    default:
      return 'Unknown';
  }
};

const getRemainingHarvestTime = (stage: number): string => {
  switch (stage) {
    case 1:
      return '52 days';
    case 2:
      return '45 days';
    case 3:
      return '20 days';
    case 4:
      return 'Ready to Harvest';
    default:
      return 'Unknown';
  }
};

const Datatable: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const userID = '66468419b1c6da6f5f91dafd'; // Replace with the actual user ID

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const plants = await getPlants(userID);
        const rowData = plants.map((plant) => ({
          id: plant._id,
          plantType: plant.type,
          plantOrder: plant.order,
          devStatus: getDevStatus(plant.developmentPhase),
          healthStatus: getHealthStatus(plant.healthStatus),
          remainingHarvestTime: getRemainingHarvestTime(plant.developmentPhase),
        }));
        setRows(rowData);
      } catch (error) {
        console.error("Failed to fetch plants:", error);
      }
    };
    fetchPlants();
  }, [userID]);

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => (
      <div className="cellAction">
        <Link to={`/plants/${params.row.id}`}>
          <div className="viewButton">View</div>
        </Link>
      </div>
    ),
  };

  return (
    <div className='datatable'>
      <DataGrid
        rows={rows}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}

export default Datatable;
