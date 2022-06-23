import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const pages = ["Dashboard", "Menus", "Orders", "Restaurant List"];
const settings = ["Profile", "Account", "Logout"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<any>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<any>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const handleCloseUserLogout = () => {
    localStorage.removeItem("mobileNumber");
    navigate({
      pathname: `/`,
    });
  };
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "inherit", padding: "10px 30px" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src="https://res.cloudinary.com/dq21uo3uq/image/upload/v1652702958/logo_1_seaocx.png"
            alt="food-tem"
            className="logo-food"
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/product"
            sx={{
              mr: 20,
              ml: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Kozuka Gothic Pr6N",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "#161A1D",
              fontSize: 24,
              textDecoration: "none",
              FontStyle: "B",
            }}
          >
            Food Delivery
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "black", fontSize: 30 }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              color: "#161A1D",
              fontFamily: "Bai Jamjuree",
              fontStyle: "SemiBold",
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 1, color: "#161A1D", display: "block", mr: 6 }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://res.cloudinary.com/dq21uo3uq/image/upload/v1627136029/IMG_2598_l228bd.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserLogout}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <div className="notify">
            <Badge color="secondary" badgeContent={99}>
              <NotificationsNoneIcon
                sx={{ color: "#161A1D", fontSize: 30, ml: 10, mt: 0 }}
              />
            </Badge>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
