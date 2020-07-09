import React from 'react';
import './App.css';
import StocksTable from './components/StocksTable';
import { createMuiTheme, MuiThemeProvider, Box, makeStyles } from '@material-ui/core';

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#b72f4d'
    },
    secondary: {
      main: '#fff'
    },
    text:{
      primary: '#333',
      secondary: '#777'
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'white',
    backgroundSize: '100%',
  },
  content: { }
}));

function App() {
  const classes = useStyles();

  return (
    <div>
      <MuiThemeProvider theme={customTheme}>
        <Box height="100%" className={classes.root}>
          <h2>Holdermind</h2>
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
