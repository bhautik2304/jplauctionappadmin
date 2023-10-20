import React, { useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
// import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../Stores/Slice/userSlice';
import { fetchteams } from '../Stores/Slice/teamSlice';
import { fetcchplayer } from '../Stores/Slice/playerSlice';
import { fetchplayercategury } from '../Stores/Slice/playerCategurySlice';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import { BsBroadcastPin, BsFillDatabaseFill, BsPower } from 'react-icons/bs';
import { appRoutes } from '../Constants';
import { logout } from '../Stores/Slice/authSlice';
import { fetchSoldplayer } from '../Stores/Slice/soldPlayerSlice';

function AppLayouts({ children }) {

  const [open, setOpen] = React.useState(true);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSoldplayer())
    dispatch(fetchUsers())
    dispatch(fetchteams())
    dispatch(fetcchplayer())
    dispatch(fetchplayercategury())
  }, [])

  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Auction Dashboard
              </Typography>
              <IconButton color="error" onClick={() => dispatch(logout())} >
                <BsPower color='red' />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: [1],
              }}
            >
              {/* <img src="https://electrozevents.in/webimage/electroz-logo.png" style={{ height: '50px' }} /> */}
              Electrozevents
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <Link to={appRoutes.home} >
                <ListItemButton>
                  <ListItemIcon>
                    <BsBroadcastPin />
                  </ListItemIcon>
                  <ListItemText primary="Live Auction" />
                </ListItemButton>
              </Link>
              <Link to={appRoutes.database} >
                <ListItemButton>
                  <ListItemIcon>
                    <BsFillDatabaseFill />
                  </ListItemIcon>
                  <ListItemText primary="Auction Data Base" />
                </ListItemButton>
              </Link>
              <Divider sx={{ my: 1 }} />
              {/* { } */}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
              mt: 5,
              mb: 5
            }}
          >
            <Toolbar />
            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Outlet />
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default AppLayouts

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
        // [theme.breakpoints.up('xs')]: {
        //   width: theme.spacing(0),
        // },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
