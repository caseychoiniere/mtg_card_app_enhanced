import React, { Component } from 'react';
import PropTypes from "prop-types";
import { observer } from 'mobx-react';
import { Color } from '../theme';
import { createMuiTheme } from '@material-ui/core/styles';
import MainStore from '../stores/MainStore'
import MTGLogo from '../images/MTGLogo.png';
import { palette, typography } from '../theme'
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Search from './Search';
import SortCards from './SortCards';
import ToggleFavorites from "./ToggleFavorites";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { unstable_Box as Box } from '@material-ui/core/Box';


const theme = createMuiTheme({
    palette: palette,
    typography: typography
});

const styles = {
    appBar: {
        backgroundColor: Color.blue
    },
    flex: {
        flex: 1,
    },
    logo: {
        maxWidth: 160,
        marginTop: 10,
        margin: '10px 0 0 20px'
    },
    toolbar: {
        zIndex: theme.zIndex.drawer + 1,
    }
};

@observer
class Header extends Component {

    render() {
        const { classes } = this.props;
        const { windowWidth } = MainStore;

        return (
            <div>
                <AppBar position="fixed"
                        style={styles.appBar}>
                    <Toolbar style={styles.toolbar}>
                        <SortCards />
                        <ToggleFavorites />
                        {
                            windowWidth >= 500 &&
                            <Typography
                                variant="h6"
                                color="inherit"
                                className={classes.flex}
                            >
                                <img src={MTGLogo}
                                     alt="Magic the Gathering logo"
                                     style={styles.logo}
                                />
                            </Typography>
                        }
                        <Search />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object,
    windowWidth: PropTypes.number,
};

export default withStyles(styles)(Header);