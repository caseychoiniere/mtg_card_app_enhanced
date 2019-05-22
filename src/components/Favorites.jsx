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
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        margin: '14px 0px',
    },
    row: {
        marginLeft: 0,
        marginRight: 0,
    },
    typography: {
        position: 'fixed',
        top: '50%',
        left: '33.3%',
    }
};

@observer
class Favorites extends Component {

    render() {
        const { classes } = this.props;
        const { favoriteCards, showFavorites } = MainStore;

        return (
                <Row style={styles.row}>
                    {
                        !favoriteCards.values().length && showFavorites ?
                        <Col md={12} >
                            <Typography gutterBottom
                                        variant="h6"
                                        component="h6"
                                        className={classes.typography}
                            >
                                You have no favorite cards saved. Add some to your list!
                            </Typography>
                        </Col> :
                        favoriteCards.values().map(card => (
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
        );
    }
}

Favorites.propTypes = {
    classes: PropTypes.object,
    favoriteCards: PropTypes.object,
    showFavorites: PropTypes.bool,
};

export default withStyles(styles)(Favorites);