import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import MainStore from '../stores/MainStore';
import { palette, typography } from "../theme";
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import ToolTip from '@material-ui/core/Tooltip';

const theme = createMuiTheme({
    palette: palette,
    typography: typography
});

const styles = {
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
};

@observer
class CardControls extends Component {

    handleExpandClick = (id) => {
        MainStore.expandCard(id);
    };

    addFavoriteCard = (id, card) => {
        MainStore.addFavoriteCard(id, card);
    };

    render() {
        const { classes, card } = this.props;
        const { expandedCards, favoriteCards } = MainStore;

        return (
            <CardActions className={classes.actions}
                         disableActionSpacing
            >
                <ToolTip title="Add to Favorites">
                    <IconButton color={favoriteCards.has(card.id) ? "secondary" : "default"}
                                aria-label="Add to favorites"
                                onClick={() => this.addFavoriteCard(card.id, card)}
                    >
                        <FavoriteIcon />
                    </IconButton>
                </ToolTip>
                <ToolTip title="Show Card Details">
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: expandedCards.get(card.id),
                        })}
                        onClick={() => this.handleExpandClick(card.id)}
                        aria-expanded={expandedCards.get(card.id)}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </ToolTip>
            </CardActions>
        );
    }
}

CardControls.propTypes = {
    card: PropTypes.object,
    classes: PropTypes.object,
    favoriteCards: PropTypes.object
};

export default withStyles(styles)(CardControls);