import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';

import configureStore from './configureStore';
// Provider 是 react-redux 中的組件，它會接收上方在 Redux 中創建的 store ，並根據和 component 綁在一起的需求單 mapStateToProps 上要求的資料從 store 中取出，再透過 props 流向 component 。
import { Provider } from 'react-redux';

import Header from './components/navbar';
import MaskContainer from './components/maskContainer';
// import Map from './components/map';
import MapV from './components/map2';

const styles = {
    container: {
        '@media (min-width: 1000px)': {
            // maxWidth: '100vw',
            maxWidth: 1260,
            height: '100vh',
            margin: '0 auto ',
            backgroundColor: '#fff',
        },
        backgroundColor: '#FAFAFA',
        height: '100vh',
    },
    '@media (min-width: 1000px)': {
        flex: {
            width: '100%',
            height: '92%',
            display: 'flex',
            flexWrap: 'wrap',
            position: 'relative',
        },
        col: {
            height: '100%',
            position: 'relative',
        },
        list: {
            width: '30%',
        },
        map: {
            width: '70%',
        },
    },
    flex: {
        height: '90%',
    },
    list: {
        height: '100%',
    },
};

const store = configureStore();

class App extends Component {
    render() {
        const { classes } = this.props;
        return (
            // 接收 reducer 所創建好的 store
            <Provider store={store}>
                <div className={classes.container}>
                    <Header />
                    <div className={classes.flex}>
                        <div className={classNames(classes.col, classes.list)}>
                            <MaskContainer />
                        </div>
                        <div className={classNames(classes.col, classes.map)}>
                            {/* <Map />  */}
                            <MapV /> 
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }
    
}

export default withStyles(styles)(App);
