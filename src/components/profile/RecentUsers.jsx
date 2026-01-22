import { Card, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { AppAlert } from '../'; 
import useUsersAdmin from "../../hooks/users/useUsersAdmin";
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';

const RecentUsers = () => {
    const navigate = useNavigate();
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
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            //lg:col-span-2
            className="mt-4"
        >
            <Card className="rounded-2xl"
                sx={{
                    background: 'rgba(65, 64, 64, 0.35)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                    border: '0.5px solid #d9d9d954',
                    borderRadius: '25px',
                    p: 1, mb: 8
                }}
            >
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg md:text-xl text-[#EAE8EC] font-semibold">Usuarios registrados</h2>
                        </div>

                        <Button variant="outline" size="sm" onClick={() => navigate("/admin/history")}
                            sx={{
                                borderRadius: 3,
                                backgroundColor: "#222E60",
                                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                                color: '#FEFFFA',
                                fontWeight: 600,
                                textTransform: "none",
                                "&:hover": { backgroundColor: "#1d145f" },
                                transition: "all 0.3s"
                        }}>
                            Ver más
                        </Button>
                    </div>

                    {!users || users.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 px-4">
                            <PeopleOutlineRoundedIcon 
                                sx={{ 
                                    fontSize: 64, 
                                    color: '#d9d9d954',
                                    mb: 2
                                }} 
                            />
                            <p className="text-[#EAE8EC] text-lg font-medium mb-1">
                                No hay usuarios registrados
                            </p>
                            <p className="text-[#E5E6EA]/70 text-sm text-center">
                                Los usuarios registrados en el sistema aparecerán aquí
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {users.slice(0, 3).map((u, index) => (
                                <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-[#d9d9d954]/30 bg-[#FEFFFA]/10" >
                                    <div>
                                        <p className="flex items-center font-medium text-[#FEAB77]">
                                            <AlternateEmailRoundedIcon className="w-4 h-4 mr-2" />
                                            {u.username}
                                        </p> 

                                        <p className="flex items-center text-[#83ff71]">
                                            <MailOutlineRoundedIcon className="w-4 h-4 mr-2" />
                                            {u.email}
                                        </p>

                                        <p className="flex items-center text-sm text-[#E5E6EA] text-muted-foreground">
                                            <PermIdentityRoundedIcon className="w-4 h-4 mr-2" />
                                            {u.rol}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}
export default RecentUsers;