import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'react-grid-system';
import Favorites from '../components/Favorites';
import Header from '../components/Header';
import Cards from '../components/Cards.jsx';

export default () => (
    <Router>
        <div>
            <Route component={Header} />
            <Container fluid className="mainContainer">
                <Switch>
                    <Route exact path="/" component={Cards} />
                    <Route exact path="/favorites" component={Favorites} />
                    <Redirect to="/" />
                </Switch>
            </Container>
        </div>
    </Router>
);