import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withStyles} from '@material-ui/core/styles';
import noImage from '../images/noImage.jpg';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
    media: {
        objectFit: 'cover',
    },
};

@observer
class CardImage extends Component {

    render() {
        const { classes, card } = this.props;

        return (
            <CardMedia
                component="img"
                alt="Contemplative Reptile"
                className={classes.media}
                /*
                 * Using a default "no image available" image due to an issue
                 * with the API that is not returning only cards with images
                 * It looks like Jeremy from Highspot has opened an issue on the MTG repo
                 * https://github.com/MagicTheGathering/mtg-api/issues/37
                */
                src={card.imageUrl ? card.imageUrl : noImage }
                title={card.name}
            />
        );
    }
}

CardImage.propTypes = {
    classes: PropTypes.object,
    card: PropTypes.object
};

export default withStyles(styles)(CardImage);