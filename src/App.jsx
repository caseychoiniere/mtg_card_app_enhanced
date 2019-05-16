import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { palette, typography } from './theme'
import MainStore from "./stores/MainStore";
import Routes from './routes/index';
import './styles/index.css';
import ErrorModal from "./components/ErrorModal";

const theme = createMuiTheme({
    palette: palette,
    typography: typography
});

@observer
class App extends Component {

    constructor(props) {
        super(props);
        window.onresize = this.onResize;
    }

    componentWillMount() {
        let { page, query, orderBy, searchBy } = MainStore;
        MainStore.getCards(page, query, orderBy, searchBy);
        MainStore.setWindowWidth();
    }

    onResize = () => {
        MainStore.setWindowWidth();
    };

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <ErrorModal />
                <Routes />
            </MuiThemeProvider>
        );
    }
}

export default App;