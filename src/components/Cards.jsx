import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Col, Row } from 'react-grid-system';
import MainStore from '../stores/MainStore';
import Card from '@material-ui/core/Card';
import CardControls from './CardControls';
import CardDetails from "./CardDetails";
import CardImage from "./CardImage";
import CardInformation from "./CardInformation";
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from "react-infinite-scroll-component";

const styles = {
    card: {
        margin: '14px 0px',
    },
    progress: {
        zIndex: 3000,
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginTop: -50,
        marginLeft: -50,
    },
    row: {
        marginLeft: 0,
        marginRight: 0,
    },
};

@observer
class Cards extends Component {

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
                <Row style={styles.row}>
                    {loading && <CircularProgress color="secondary" size={80} className={classes.progress} />}
                    {
                        cards.map(card => (
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
    classes: PropTypes.object,
    page: PropTypes.number,
    orderBy: PropTypes.string,
    searchBy: PropTypes.string,
    query: PropTypes.string,
};

export default withStyles(styles)(Cards);