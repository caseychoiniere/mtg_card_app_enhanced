import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Col, Row } from 'react-grid-system';
import noImage from '../images/noImage.jpg';
import MainStore from '../stores/MainStore';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from "react-infinite-scroll-component";
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        margin: '14px 0px',
    },
    media: {
        objectFit: 'cover',
    },
    progress: {
        zIndex: 3000,
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginTop: -50,
        marginLeft: -50
    }
};

@observer
class Cards extends Component {

    getCardText = (card, property) => {
        // Check that property exists and if not then return 'Unknown' rather than undefined
        return !card[property] ? 'Unknown' : card[property]
    };

    fetchMoreCards = () => {
        let { page, query, orderBy, searchBy } = MainStore;
        MainStore.getCards(page, query, orderBy, searchBy);
    };

    render() {
        const { classes } = this.props;
        const { cards, loading } = MainStore;

        return (
            <InfiniteScroll
                dataLength={cards.length}
                next={this.fetchMoreCards}
                hasMore={true}
            >
                <Row>
                    {loading && <CircularProgress color="secondary" size={80} className={classes.progress} />}
                    {
                        cards.map(card => (
                            /*
                             * Using a function to generate a UUID for the key because there are a few
                             * duplicate cards returned by the server which causes React duplicate key warnings
                             */
                            <Col key={MainStore.generateUuid()} md={3} sm={4}>
                                <Card className={classes.card}>
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
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </InfiniteScroll>
        );
    }
}

Cards.propTypes = {
    loading: PropTypes.bool,
    cards: PropTypes.array,
    classes: PropTypes.object
};

export default withStyles(styles)(Cards);