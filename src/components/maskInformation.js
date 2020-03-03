import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import '../css/maskInformation.css';

import MaskSearch from './maskSearch';
import DrugStoreList from './drugStoreList';
import { callbackify } from 'util';

const styles = {
    container: {
        '@media (min-width: 1000px)': {
            padding: '2% 2% 0 2%',
        },
        width: '100%',
        height: '100%',
        backgroundColor: '#FAFAFA',
    },
    MaskSearch: {
        '@media (min-width: 1000px)': {
            padding: '2% 2% 0 2%',
        },
        width: '100%',
    },
    MaskSearch: {
        '@media (min-width: 1000px)': {
            width: '100%',
            height: 200,
        },
        width: '100%',
        height: 210,
    },
    DrugStoreList: {
        '@media (min-width: 1000px)': {
            width: '100%',
            height: 'calc(100% - 200px)',
        },
        width: '100%',
        height: 'calc(100% - 200px)',
    },
};

class maskInformation extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.MaskSearch}>
                    <MaskSearch />
                </div>
                <div className={classes.DrugStoreList}>
                    <DrugStoreList topRef={this.props.topRef} />
                </div>
                
            </div>
        );
    }
}

export default withStyles(styles)(maskInformation);