import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import NavBar from "./NavBar";

const getTitle = (pathname: string) => {
    if (pathname.startsWith("/contact/")) return "Contact Details";
    if (pathname.startsWith("/add-contact")) return "Add Contact";
    return "Contacts";
};

const Layout = () => {
    const location = useLocation();

    return (
        <Box>
            <NavBar title={getTitle(location.pathname)} showBackButton={location.pathname !== "/"} />
            <Box sx={{ padding: "16px", marginTop: "16px" }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;
