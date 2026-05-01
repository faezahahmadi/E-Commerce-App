import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useThemeContext } from "../context/ThemeContext";

export default function Layout() {
    const { state } = useThemeContext();
    const toggleMode = () => {
        dispatch({ type: "ToggleMode" })
    };

    return (
        <Box>
            <Navbar mode={state.mode}
                onToggleMode={toggleMode} />
            <Outlet />
        </Box>
    )
}