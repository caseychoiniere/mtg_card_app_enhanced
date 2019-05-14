import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { observer } from "mobx-react";
import { withStyles} from '@material-ui/core/styles';
import debounce from 'lodash.debounce';
import MainStore from "../stores/MainStore";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchBySettings from "./SearchBySettings";

const styles = {
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
};

@observer
class Search extends Component {

    constructor(props) {
        super(props);
        this.search = debounce(this.search , 300);
    };

    search = () => {
        let page = 1;
        let { orderBy, searchBy } = MainStore;
        let query = this.searchInput.value.length ? this.searchInput.value : null;
        MainStore.setSearchState();
        MainStore.getCards(page, query, orderBy, searchBy)
    };

    render() {
        const { classes } = this.props;
        const { searchBy } = MainStore;

        return (
            <Paper
                className={classes.root}
                elevation={0}
            >
                <SearchBySettings />
                <Divider className={classes.divider} />
                <InputBase
                    className={classes.input}
                    placeholder={`Search by ${searchBy}`}
                    onChange={this.search}
                    inputRef={el => this.searchInput = el}
                />
            </Paper>
        );
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
    orderBy: PropTypes.string,
    searchBy: PropTypes.string,
};

export default withStyles(styles)(Search);