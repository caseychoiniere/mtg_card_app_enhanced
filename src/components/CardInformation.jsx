import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

@observer
class CardInformation extends Component {

    getCardText = (card, property) => {
        // Check that property exists and if not then return 'Unknown' rather than undefined
        return !card[property] ? 'Unknown' : card[property]
    };

    render() {
        const { card } = this.props;

        return (
            <CardContent>
                <Typography gutterBottom variant="h6" component="h6">
                    {card.name}
                </Typography>
                <Typography variant="subtitle2" component="p" color="textSecondary">
                    {`Artist: ${this.getCardText(card, 'artist')}`}
                </Typography>
                <Typography variant="subtitle2" component="p" color="textSecondary">
                    {`Set: ${this.getCardText(card, 'set')}`}
                </Typography>
                <Typography variant="subtitle2" component="p" color="textSecondary">
                    {`Original Type: ${this.getCardText(card, 'originalType')}`}
                </Typography>
                <Typography variant="subtitle2" component="p" color="textSecondary">
                    {`Rarity: ${this.getCardText(card, 'rarity')}`}
                </Typography>
            </CardContent>
        );
    }
}

CardInformation.propTypes = {
    card: PropTypes.object,
};

export default CardInformation;