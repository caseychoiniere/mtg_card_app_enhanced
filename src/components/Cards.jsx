import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import { Col, Row } from 'react-grid-system';
import MainStore from '../stores/MainStore';
import noImage from '../images/noImage.jpg';
import {palette, typography} from "../theme";
import Card from '@material-ui/core/Card';
import CardControls from './CardControls';
import CardDetails from "./CardDetails";
import CardInformation from "./CardInformation";
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from "react-infinite-scroll-component";
import CardImage from "./CardImage";

const theme = createMuiTheme({
    palette: palette,
    typography: typography
});

const styles = {
    actions: {
        display: 'flex',
    },
    card: {
        margin: '14px 0px',
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
    progress: {
        zIndex: 3000,
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginTop: -50,
        marginLeft: -50
    },
    row: {
        marginLeft: 0,
        marginRight: 0,
    }
};

@observer
class Cards extends Component {

    getCardsToDisplay = (cards, favoriteCards, showFavorites) => {
        return showFavorites ? favoriteCards.values() : cards;
    };

    fetchMoreCards = () => {
        let { page, query, orderBy, searchBy } = MainStore;
        MainStore.getCards(page, query, orderBy, searchBy);
    };

    render() {
        const { classes } = this.props;
        const { cards, favoriteCards, loading, showFavorites } = MainStore;
        const cardList = this.getCardsToDisplay(cards, favoriteCards, showFavorites);

        return (
            <InfiniteScroll
                dataLength={cards.length}
                next={this.fetchMoreCards}
                hasMore={true}
            >
                <Row style={styles.row}>
                    {loading && <CircularProgress color="secondary" size={80} className={classes.progress} />}
                    {
                        cardList.map(card => (
                            /*
                             * Using a function to generate a UUID for the key because there are a few
                             * duplicate cards returned by the server which causes React duplicate key warnings
                             */
                            <Col key={MainStore.generateUuid()} md={3} sm={4}>
                                <Card className={classes.card}>
                                    <CardImage card={card} />
                                    <CardInformation card={card} />
                                    <CardControls card={card} />
                                    <CardDetails card={card} />
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