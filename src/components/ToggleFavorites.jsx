import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Color } from '../theme';
import MainStore from '../stores/MainStore'
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import ToolTip from '@material-ui/core/Tooltip';

const styles = {
    iconButtonActive: {
        color: Color.peach
    },
    iconButtonInactive: {
        color: Color.white
    },
};

@observer
class ToggleFavorites extends Component {

    showFavoriteCards = () => {
        MainStore.showFavoriteCards();
    };

    render() {
        const { classes } = this.props;
        const { showFavorites } = MainStore;

        return (
            <div>
                {
                     <ToolTip title="Show Favorites">
                         <IconButton className={showFavorites ? classes.iconButtonActive : classes.iconButtonInactive}
                                     aria-label="Add to favorites"
                                     onClick={() => this.showFavoriteCards()}
                         >
                             <FavoriteIcon/>
                         </IconButton>
                     </ToolTip>
                }
            </div>
        );
    }
}

ToggleFavorites.propTypes = {
    classes: PropTypes.object,
    showFavorites: PropTypes.bool,
};

export default withStyles(styles)(ToggleFavorites);