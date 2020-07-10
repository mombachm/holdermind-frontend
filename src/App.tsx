import React from 'react';
import './App.css';
import StocksTable from './components/StocksTable';
import { createMuiTheme, MuiThemeProvider, Box, makeStyles, AppBar, Toolbar, IconButton, Typography, Button, Menu } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#01A0DB'
    },
    secondary: {
      main: '#eee'
    },
    text:{
      primary: '#333',
      secondary: '#777'
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'black',
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
    <div>
      <MuiThemeProvider theme={customTheme}>
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
          <Box className={classes.content}>
            {/* <Route exact path="/" title="Teste" component={Home}/> */}
            <StocksTable/>
          </Box>
        </Box>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
