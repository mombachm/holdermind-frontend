import React from 'react';
import './App.css';
import StocksTable from './components/StocksTable';
import { createMuiTheme, MuiThemeProvider, Box, makeStyles, AppBar, Toolbar, IconButton, Typography, Button, Menu } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { green, orange, grey } from '@material-ui/core/colors';

const customTheme = createMuiTheme({
  palette: {
    primary: {
      contrastText: "rgba(0, 0, 0, 0.87)",
      dark: "rgb(100, 141, 174)",
      light: "rgb(166, 212, 250)",
      main: orange[500]
    },
    secondary: {
      contrastText: "rgba(0, 0, 0, 0.87)",
      dark: "rgb(170, 100, 123)",
      light: "rgb(246, 165, 192)",
      main: "#0A0A0A"
    },
    text:{
      disabled: "rgba(255, 255, 255, 0.5)",
      hint: "rgba(255, 255, 255, 0.5)",
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)"
    },
    background: {
      default: "#121212",
      paper: "#424242"
    }
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#222',
    backgroundSize: '100%',
  },
  title: {
    flexGrow: 1,
  },
  content: { }
}));

function App() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={customTheme}>
      <div className={classes.root}>
        <Box height="100%" className={classes.root}>
          <AppBar color="secondary" position="static">
            <Toolbar>
              <IconButton edge="start" color="default" aria-label="menu">
                {/* <Menu /> */}
              </IconButton>
              <Typography color="textPrimary" variant="h6" className={classes.title}>
                Holdermind
              </Typography>
              <Button color="default" endIcon={<VpnKeyIcon/>}>Login</Button>
            </Toolbar>
          </AppBar>
          <Box color="primary" height="100%" className={classes.content}>
            {/* <Route exact path="/" title="Teste" component={Home}/> */}
            <StocksTable/>
          </Box>
        </Box>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
