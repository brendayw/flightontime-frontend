import { Card, CardContent, Button } from "@mui/material";
import { motion } from 'framer-motion';
import useProfile from "../../hooks/useProfile";

/**
 * ProfileDetails Component
 * 
 * Componente que muestra los detalles de perfil de un usuario.
 * Actualmente utiliza datos mockeados, pero está preparado para integrar
 * una llamada al backend en el futuro para obtener la información real del usuario.
 * 
 * Comportamiento:
 * - Muestra un Card animado con Framer Motion:
 *    - Animación inicial: opacidad 0 y desplazamiento X -20
 *    - Animación final: opacidad 1 y posición X 0
 * - Dentro del Card se muestran:
 *    - Nombre del usuario (resaltado)
 *    - Rol del usuario
 *    - Email del usuario
 * - Botón "Editar perfil" al final del card
 * 
 * Props:
 * - Ninguna (actualmente usa datos internos mockeados)
 * 
 * Hooks / Librerías utilizadas:
 * - motion (framer-motion) → animación de aparición
 * - Card y CardContent (MUI) → contenedor estilizado
 * - Button (MUI) → botón de acción
 * 
 * Uso:
 * <ProfileDetails />
 */

const ProfileDetails = () => {
    const { profile, error } = useProfile();
    
    if (error) return <p>{error}</p>; //aca modificar por Alert
    if (!profile) return <p>No se encontró el perfil.</p>;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <Card className="rounded-2xl"
                sx={{
                    background: 'rgba(65, 64, 64, 0.35)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                    border: '0.5px solid #d9d9d954',
                    borderRadius: '25px',
                    p: 1
                }}
            >
                <CardContent className="p-6 space-y-4">
                    <div className="flex flex-col items-start gap-2">
                        <p className="text-xl text-[#FEAB77] font-medium">{profile.username}</p>
                        {profile.role === "ADMIN" && ( //solo si el rol es admin se muestra
                            <p className="text-sm text-[#E5E6EA] text-muted-foreground">{profile.role}</p>
                        )}
                    </div>

                    <div className="text-sm space-y-1">
                        <p className="text-[#E5E6EA]"><span className="font-medium color='#E5E6EA'">Email:</span> {profile.email}</p>
                    </div>

                    <Button className="w-full mt-4"
                        sx={{
                            borderRadius: 3,
                            backgroundColor: "#222E60",
                            color: '#FEFFFA',
                            fontWeight: 600,
                            textTransform: "none",
                            "&:hover": { backgroundColor: "#1d145f" },
                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                            transition: "all 0.3s"
                    }}>
                        Editar perfil
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default ProfileDetails;