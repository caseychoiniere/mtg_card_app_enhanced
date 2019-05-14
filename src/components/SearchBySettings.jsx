import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { observer } from "mobx-react";
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import {palette, typography} from "../theme";
import MainStore from "../stores/MainStore";
import IconButton from '@material-ui/core/IconButton';
import Menu from "@material-ui/core/Menu";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Settings from '@material-ui/icons/Settings';
import ToolTip from '@material-ui/core/Tooltip';

const theme = createMuiTheme({
    typography: typography,
    palette: palette,
});

const styles = {
    formControl: {
        margin: theme.spacing.unit * 2,
        outline: 'none',
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
        outline: 'none'
    },
    iconButton: {
        padding: 10,
    },
};

@observer
class SearchBySettings extends Component {

    handleChange = e => {
        MainStore.setSearchByValue(e.target.value);
        this.openMenu(e, 'searchMenu')
    };

    openMenu = (event, i) => {
        MainStore.setAnchorElement(event.currentTarget, i)
    };

    render() {
        const { classes } = this.props;
        const { anchorElements, searchBy } = MainStore;
        const open = anchorElements.has('searchMenu');

        return (
            <div>
                <ToolTip title="Set search type">
                    <IconButton
                        className={classes.iconButton}
                        aria-owns={open ? 'menu-appbar' : null}
                        aria-haspopup="true"
                        aria-label="Menu"
                        onClick={(e) => this.openMenu(e, 'searchMenu')}>
                        <Settings />
                    </IconButton>
                </ToolTip>
                <Menu
                    id="simple-menu"
                    anchorEl={MainStore.anchorElements.get('searchMenu')}
                    open={MainStore.anchorElements.has('searchMenu')}
                    onClose={(e) => this.openMenu(e, 'searchMenu')}
                >
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Search Cards By</FormLabel>
                        <RadioGroup
                            aria-label="Search By"
                            name="searchby"
                            className={classes.group}
                            value={searchBy}
                            onChange={this.handleChange}
                        >
                            <FormControlLabel value="name" control={<Radio />} label="Card Name" />
                            <FormControlLabel value="artist" control={<Radio />} label="Artist" />
                            <FormControlLabel value="rarity" control={<Radio />} label="Rarity" />
                            <FormControlLabel value="setname" control={<Radio />} label="Set" />
                        </RadioGroup>
                    </FormControl>
                </Menu>
            </div>
        );
    }
}

SearchBySettings.propTypes = {
    classes: PropTypes.object.isRequired,
    anchorElements: PropTypes.object,
    searchBy: PropTypes.string,
};

export default withStyles(styles)(SearchBySettings);