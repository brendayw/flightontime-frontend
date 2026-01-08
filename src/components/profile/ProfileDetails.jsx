import { Card, CardContent, Button } from "@mui/material";
import { motion } from 'framer-motion';

// Mock data – luego esto puede venir de tu API / Auth0
    const ProfileDetails = () => {
        const user = {
        name: "Brenda Yañez",
        email: "brenda@email.com",
        role: "Analyst",
        //joined: "2024-11-12",
    };

    return (
        <div className='p-2 md:p-6 bg-#FEFFFA'>
            {/* User info */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <Card className="rounded-2xl shadow-sm">
                    <CardContent className="p-6 space-y-4">
                        <div className="flex flex-col items-start gap-2">

                            <p className="text-xl text-[#251a79] font-medium">{user.name}</p>
                            <p className="text-sm text-[#FF854C] text-muted-foreground">{user.role}</p>

                        </div>

                        <div className="text-sm space-y-1">
                            <p className="text-[#5c5555]"><span className="font-medium text-[#251a79]">Email:</span> {user.email}</p>
                            {/* <p><span className="font-medium">Member since:</span> {user.joined}</p> */}
                        </div>

                        <Button className="w-full mt-4"
                            sx={{
                                borderRadius: 3,
                                backgroundColor: "#251A79",
                                color: '#FEFFFA',
                                fontWeight: 600,
                                textTransform: "none",
                                "&:hover": { backgroundColor: "#1d145f" },
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                transition: "all 0.3s",
                        }}>
                            Editar perfil
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}

export default ProfileDetails;