import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';

import MaskInformation from './maskInformation';

import top from '../assets/top.png';

const styles = {
    container: {
        '@media (min-width: 1000px)': {
            width: '100%',
            height: '100%',
        },
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    topDiv: {
        position: 'absolute',
        width: 80,
        height: 50,
        right: '0',
        bottom: '2%',
        zIndex: 999,
    },
    backToTop: {
        width: 80,
        height: 50,
        padding: '5px 0',
        color: '#fff',
        fontSize: 18,
        borderRadius: 10,
        fontWeight: 900,
        backgroundImage: `url(${top})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        '&:hover': {
            color: '#fff',
        },
        '&:focus': {
            boxShadow: 'none',
        }
    },
};

class maskContainer extends Component {
    constructor() {
        super();
        this.topRef = React.createRef();
    }

    handleClickBackToTop = () => {
        if (this.topRef) {
            this.topRef.current.scrollTo(0, 0);
        }

    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <MaskInformation topRef={this.topRef} />
                {/* Back to top */}
                <div className={classes.topDiv}>
                    <button
                        type="button"
                        className={classNames("btn", classes.backToTop)}
                        onClick={this.handleClickBackToTop}
                    >
                        TOP
                    </button>
                </div>
            </div>

        );
    }
}

export default withStyles(styles)(maskContainer);