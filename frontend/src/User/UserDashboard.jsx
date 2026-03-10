import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logout, removeSuccess } from '../features/user/userslice';
import { Box, Avatar, Typography, IconButton, Menu, MenuItem, Badge, Divider } from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import PersonIcon from "@mui/icons-material/Person"
import LogoutIcon from "@mui/icons-material/Logout"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import DashboardIcon from "@mui/icons-material/Dashboard"
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";


function UserDashboard({ user }) {
    const { cartItems } = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    function logoutUser() {
        dispatch(logout())
            .unwrap()
            .then(() => {
                toast.success("Logout Successful", { position: 'top-center', autoClose: 3000 })
                dispatch(removeSuccess())
                navigate('/login')
            })
            .catch((error) => {
                toast.success(error.message || "Logout failed", { position: 'top-center', autoClose: 3000 })
            })
    }
    return (
        <>
            <Box sx={{ position: "fixed", top: 5, right: 24, zIndex: 1300 }}>
                <IconButton onClick={handleOpen}>
                    <Avatar src={user.avatar?.url || "/logo.png"} sx={{ border: "2px solid #6366f1", width: 42, height: 42, cursor: "pointer" }} />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{ sx: { mt: 1.5, borderRadius: 3, minWidth: 240, background: "#0f172a", color: "white", boxShadow: "0 20px 40px rgba(0,0,0,.5)" } }}>
                    <Box sx={{ p: 2, textAlign: "center" }}>
                        <Avatar src={user.avatar?.url || "/logo.png"} sx={{ width: 60, height: 60, mx: "auto", mb: 1 }} />
                        <Typography fontWeight="bold">{user.name}</Typography>
                        <Typography variant="body2" color="gray">
                            {user.email}
                        </Typography>
                    </Box>
                    <Divider sx={{ bgcolor: "#1e293b" }} />
                    {user.role === "admin" && (
                        <MenuItem onClick={() => navigate("/admin/dashboard")}>
                            <DashboardIcon sx={{ mr: 1 }} /> Admin Dashboard
                        </MenuItem>
                    )}
                    <MenuItem onClick={() => navigate("/profile")}>
                        <PersonIcon sx={{ mr: 1 }} /> Profile
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/orders/user")}>
                        <Inventory2Icon sx={{ mr: 1 }} /> Orders
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/wishlist")}>
                        <FavoriteIcon sx={{ mr: 1 }} /> Wishlist
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/cart")}>
                        <Badge badgeContent={cartItems.length} color="primary">
                            <ShoppingCartIcon sx={{ mr: 1 }} />
                        </Badge>
                        Cart
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/chatbot")}>
                        <ChatIcon sx={{ mr: 1 }} /> Help
                    </MenuItem>
                    <Divider sx={{ bgcolor: "#243754", my: 1 }} />
                    <MenuItem onClick={logoutUser} sx={{ color: "#e04242" }}>
                        <LogoutIcon sx={{ mr: 1 }} /> Logout
                    </MenuItem>
                </Menu>
            </Box>
        </>
    )
}

export default UserDashboard