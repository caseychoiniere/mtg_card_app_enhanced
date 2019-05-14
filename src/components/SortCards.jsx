import React, { Component } from 'react';
import PropTypes from "prop-types";
import { observer } from 'mobx-react';
import { Color } from '../theme';
import { createMuiTheme } from '@material-ui/core/styles';
import MainStore from '../stores/MainStore'
import { palette, typography } from '../theme'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Sort } from '@material-ui/icons'
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
        color: Color.white
    },
};

@observer
class SortCards extends Component {

    handleChange = e => {
        const { searchBy } = MainStore;
        MainStore.setSortByValue(e.target.value, searchBy);
        this.openMenu(e, 'headerMenu')
    };

    openMenu = (event, i) => {
        MainStore.setAnchorElement(event.currentTarget, i)
    };

    render() {
        const { classes } = this.props;
        const { anchorElements, orderBy } = MainStore;
        const open = anchorElements.has('headerMenu');

        return (
            <div>
                <ToolTip title="Sort Cards">
                    <IconButton
                        className={classes.iconButton}
                        aria-owns={open ? 'menu-appbar' : null}
                        aria-haspopup="true"
                        onClick={(e) => this.openMenu(e, 'headerMenu')}>
                        <Sort />
                    </IconButton>
                </ToolTip>
                <Menu
                    id="simple-menu"
                    anchorEl={MainStore.anchorElements.get('headerMenu')}
                    open={MainStore.anchorElements.has('headerMenu')}
                    onClose={(e) => this.openMenu(e, 'headerMenu')}
                >
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Sort Cards</FormLabel>
                        <RadioGroup
                            aria-label="Sort By"
                            name="sort"
                            className={classes.group}
                            value={orderBy}
                            onChange={this.handleChange}
                        >
                            <FormControlLabel value="name" control={<Radio />} label="Card Name" />
                            <FormControlLabel value="artist" control={<Radio />} label="Artist" />
                            <FormControlLabel value="rarity" control={<Radio />} label="Rarity" />
                            <FormControlLabel value="setName" control={<Radio />} label="Set" />
                        </RadioGroup>
                    </FormControl>
                </Menu>
            </div>
        );
    }
}

SortCards.propTypes = {
    anchorElements: PropTypes.object,
    classes: PropTypes.object,
    orderBy: PropTypes.string,
};

export default withStyles(styles)(SortCards);