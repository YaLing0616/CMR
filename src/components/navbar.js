import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import '../css/navbar.css';
import { connect } from 'react-redux';
import { maskSupply } from '../actions/index';
import { howToBuyMask } from '../actions/index';

import logo from '../assets/logo.png';
import ic_toggler from '../assets/ic_toggler@2x.png';
import ic_close from '../assets/ic_close@2x.png';
import tab_underline from '../assets/tab_underline.png';

const styles = {
    container: {
        '@media (min-width: 960px)': {
            maxWidth: '100%',
        },
        backgroundColor: '#fff',
        '& li.active': {
            '@media (min-width: 960px)': {
                backgroundImage: `url(${tab_underline})`,
                backgroundSize: '100% 10px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom center',
            }
        },
    },
    menuChange: {
        backgroundColor: '#34495E',
        '& a': {
            color: '#fff !important',
        }
    },
    navBottom: {
        '@media (max-width: 960px)': {
            marginBottom: 30,
        },
    }
};

class navbar extends Component {
    constructor() {
        super();
        this.state = {
            menuButtonClicked: false,
            maskSupplyClicked: true,
            howToBuyMaskClicked: false,
        };
    }

    handleMaskSupply = () => {
        this.props.maskSupply(true);
    }

    handleHowToBuyMask = () => {
        this.props.howToBuyMask(true);
    } 

    menuOnClick = () => {
        if(this.state.menuButtonClicked === false){
            this.setState ({
                menuButtonClicked: true
            },() => {
                // console.log(this.state.menuButtonClicked)
            });
        } else {
            this.setState ({
                menuButtonClicked: false
            },() => {
                // console.log(this.state.menuButtonClicked)
            });
        }
    }

    render() {
        const { 
            classes,
            maskSupplyClicked,
            howToBuyMaskClicked  
        } = this.props;
        return (
            <div className={classes.container}>
                <nav className={classNames("navbar navbar-expand-lg", `${this.state.menuButtonClicked === true ? classes.menuChange: ''}`)}>
                    <a className="navbar-brand" href="#">
                        <img src={logo} width="30" height="30" alt=""></img>&nbsp;&nbsp;口罩即時查
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={this.menuOnClick}>
                        <img src={`${this.state.menuButtonClicked === true ? ic_close: ic_toggler}`} width="25" height="25" alt=""></img>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto mt-lg-0">
                            <li 
                                className={classNames("nav-item", `${maskSupplyClicked ? 'active': ''}`)} 
                                id="maskSupply"
                                onClick={this.handleMaskSupply}
                            >
                                <a className="nav-link" href="#">口罩供給現況</a>
                            </li>
                            <li 
                                className={classNames("nav-item", classes.navBottom, `${howToBuyMaskClicked ? 'active': ''}`)} 
                                id="howToBuyMask"
                                onClick={this.handleHowToBuyMask}
                            >
                                <a className="nav-link" href="#">口罩怎麼買</a>
                            </li>
                        </ul>
                    </div>   
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        maskSupplyClicked: state.maskSupplyClicked,
        howToBuyMaskClicked: state.howToBuyMaskClicked
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        maskSupply: maskSupplyClicked => {
            dispatch(maskSupply(maskSupplyClicked));
        },
        howToBuyMask: howToBuyMaskClicked => {
            dispatch(howToBuyMask(howToBuyMaskClicked));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(navbar));
