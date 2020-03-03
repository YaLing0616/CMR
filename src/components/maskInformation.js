import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import '../css/maskInformation.css';

import MaskSearch from './maskSearch';
import DrugStoreList from './drugStoreList';

const styles = {
    container: {
        '@media (min-width: 1000px)': {
            padding: '2% 2% 0 2%',
        },
        width: '100%',
        height: '100%',
        backgroundColor: '#FAFAFA',
    },
};

class maskInformation extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <MaskSearch />
                <DrugStoreList topRef={this.props.topRef} />
            </div>
        );
    }
}

export default withStyles(styles)(maskInformation);