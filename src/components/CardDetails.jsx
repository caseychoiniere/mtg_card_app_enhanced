import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import MainStore from '../stores/MainStore';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';

@observer
class CardDetails extends Component {

    render() {
        const { card } = this.props;
        const { expandedCards } = MainStore;

        return (
            <Collapse in={expandedCards.has(card.id)} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography gutterBottom
                                variant="h6"
                                component="h6"
                    >
                        Card Details
                    </Typography>
                    <Typography paragraph>
                        {card.text}
                    </Typography>
                </CardContent>
            </Collapse>
        );
    }
}

CardDetails.propTypes = {
    expandedCards: PropTypes.object,
    card: PropTypes.object
};

export default CardDetails;