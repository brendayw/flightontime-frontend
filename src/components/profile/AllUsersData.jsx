import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import useUsersAdmin from '../../hooks/users/useUsersAdmin';
import { AppAlert } from '../'; 

const columns = [
  { field: 'idUsuario', headerName: 'ID', width: 100 },
  { field: 'username', headerName: 'Nombre de usuario', width: 350 },
  { field: 'email', headerName: 'Email', width: 350 },
  { field: 'rol', headerName: 'Rol asignado', width: 350 },
];

const AllUsersData = () => {
    const { users, loading, error } = useUsersAdmin();

    if (loading) {
        return (
            <div>
                <AppAlert severity="info">Cargando datos...</AppAlert>
            </div>
        )
    }
    
    if (error) {
        return (
            <div className="px-4 py-4">
                <AppAlert severity="error">Error al cargar datos</AppAlert>
            </div>
        );
    }
    
    return (
        <Box sx={{ height: 650, width: '100%', mb: 8 }} >
            <Typography variant="h5" gutterBottom fontWeight="bold">
                Todos los usuarios registrados ({users.length})
            </Typography>

            <DataGrid
                rows={users}
                columns={columns}
                getRowId={(row) => row.idUsuario}
                pageSizeOptions={[10, 25, 50]}
                //checkboxSelection
                disableRowSelectionOnClick
                getRowHeight={() => 'auto'}
                sx={{
                    borderRadius: 4,
                    background: 'rgba(65, 64, 64, 0.35)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                    border: '0.5px solid #d9d9d954',
                    color: '#EAE8EC',
                    // Encabezados
                    '& .MuiDataGrid-columnHeaders': { backgroundColor: 'transparent', borderBottom: 'none' },
                    '& .MuiDataGrid-columnHeader': { backgroundColor: 'transparent !important' },
                    '& .MuiDataGrid-columnHeadersInner': { backgroundColor: 'transparent !important' },
                    '& .MuiDataGrid-filler': { backgroundColor: 'transparent !important' },

                    // Iconos de ordenamiento en headers
                    '& .MuiDataGrid-sortIcon': {
                        color: '#EAE8EC',
                        opacity: 0.7,
                    },
                    '& .MuiDataGrid-menuIcon': {
                        color: '#EAE8EC',
                        opacity: 0.7,
                    },
                    '& .MuiDataGrid-iconButtonContainer': {
                        color: '#EAE8EC',
                    },
                    
                    // Celdas y filas
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid rgba(217, 217, 217, 0.1)',
                        borderRight: '1px solid #d9d9d954',
                        color: '#EAE8EC',
                        padding: '16px 12px', // Aumenta el padding vertical
                    },
                    '& .MuiDataGrid-row': {
                        '&:hover': {
                            backgroundColor: 'rgba(254, 171, 119, 0.1)',
                        },
                    },
                    '& .MuiDataGrid-row.Mui-selected': {
                        backgroundColor: 'rgba(254, 171, 119, 0.15)',
                        '&:hover': {
                            backgroundColor: 'rgba(254, 171, 119, 0.2)',
                        },
                    },
                    
                    
                    
                    // Footer y paginación
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: '1px solid #d9d9d954',
                        backgroundColor: 'transparent',
                    },
                    '& .MuiDataGrid-overlay': { backgroundColor: 'transparent' },
                    '& .MuiTablePagination-root': {
                        color: '#EAE8EC',
                    },
                    '& .MuiTablePagination-displayedRows': { color: '#EAE8EC' },
                    '& .MuiTablePagination-actions .MuiSvgIcon-root': { color: '#EAE8EC' },
                    '& .MuiTablePagination-selectLabel': {
                        color: '#EAE8EC',
                    },
                    '& .MuiTablePagination-select': {
                        color: '#EAE8EC',
                    },
                    '& .MuiSelect-icon': {
                        color: '#EAE8EC',
                    },

                    // Scrollbar personalizado
                    '& .MuiDataGrid-virtualScroller': {
                        '&::-webkit-scrollbar': {
                            width: '8px',
                            height: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'rgba(217, 217, 217, 0.1)',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: 'rgba(254, 171, 119, 0.5)',
                            borderRadius: '4px',
                            '&:hover': {
                                background: 'rgba(254, 171, 119, 0.7)',
                            },
                        },
                    },
                }}
            />
        </Box>
  );
};

export default AllUsersData;