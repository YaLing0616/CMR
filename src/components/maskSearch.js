import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/styles';
import '../css/maskSearch.css';
import { connect } from 'react-redux';

import { searchMaskInformation } from '../actions/index';

import ic_location from '../assets/ic_location@2x.png';
import ic_help from '../assets/ic_help@2x.png';

import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

const styles = {
    container: {
        '@media (min-width: 1000px)': {
            paddingBottom: '10px',
            height: '27%',
        },
        width: '100%',
        height: '30%',
        padding: '3% 5% 0 5%',
    },
    inputflex: {
        '@media (min-width: 1000px)': {
            display: 'flex',
            flexWrap: 'wrap',
        },
    },
    col: {
        position: 'relative',
    },
    inputFrame: {
        '@media (min-width: 1000px)': {
            width: '70%',
            paddingRight: '5px',
        },
        width: '100%',
    },
    iconVis: {
        '@media (min-width: 1000px)': {
            display: 'none',
        },
        visibility: 'visible',
    },
    iconPosition: {
        width: 23,
        height: 23,
    },
    searchBtn: {
        '@media (min-width: 1000px)': {
            width: '30%',
            display: 'block',
        },
        display: 'none',
    },
    search: {
        width: '100%',
        color: '#fff',
        backgroundColor: '#34495E',
        fontSize: 16,
        borderRadius: 8,
        '&:hover': {
            color: '#fff',
        },
        '&:focus': {
            border: '1px solid #34495E',
            boxShadow: 'none',
        }
    },
    information: {
        padding: '15px',
    },
    evenOrOdd: {
        fontSize: 40,
        fontWeight: 'bolder',
        color: '#34495E',
    },
    buyDay: {
        marginLeft: 5,
        color: '#34495E',
    },
    iconHelp: {
        '@media (min-width: 1000px)': {
            width: 20,
            height: 20,
        },
        width: 23,
        height: 23,
    },
    infoflex: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    infoDescription: {
        width: '70%',
        paddingLeft: 15,
    },
    description: {
        color: '#34495E',
        fontSize: 13,
        lineHeight: '18px',
        display: 'block',
    },
    refresh: {
        width: '30%',
    },
    refreshList: {
        width: '100%',
        color: '#34495E',
        backgroundColor: '#FAFAFA',
        fontSize: 14,
        borderRadius: 20,
        padding: '5px 10px',
        border: '2px solid #38495C',
        '&:hover': {
            backgroundColor: '#4C5B6C',
            color: '#fff',
        },
        '&:focus': {
            border: '2px solid #38495C',
            boxShadow: 'none',
        }
    },
};

class maskSearch extends Component {
    constructor() {
        super();
        this.state = {
            // new Date().getDay(); // 會是 0 ~ 6 的值
            day: new Date().getDay(), //星期幾
            oddOrEven: '',
            text: '',
            lastText: '',
        };
    }

    componentDidMount() {
        if (this.state.day === 1 | this.state.day === 3 | this.state.day === 5) {
            this.setState({
                oddOrEven: '奇數',
            });
        } else if (this.state.day === 2 | this.state.day === 4 | this.state.day === 6) {
            this.setState({
                oddOrEven: '偶數',
            });
        } else {
            this.setState({
                oddOrEven: '皆可',
            });
        }
    }

    onInputChange = (e) => {
        // 處理 input 的 onChange 事件，將輸入的內容存在 state 中
        this.setState({
            text: e.target.value
        });
    }

    handleClick = () => {
        if (this.state.text) {
            this.props.searchMaskInformation(this.state.text);
            this.setState({
                lastText: this.state.text
            });
        }
        // 將 input 內容改變為初始狀態
        this.setState({
            text: '',
        })
    }

    handleClickRefreshBtn = () => {
        if (this.state.lastText) {
            this.props.searchMaskInformation(this.state.lastText);
        }
    }

    render() {
        const { classes, updateTime } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.inputflex}>
                    <FormControl className={classNames(classes.col, classes.inputFrame)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-position"></InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-position"
                            style={{ borderRadius: '8px' }}
                            onChange={e => this.onInputChange(e)}
                            value={this.state.text}
                            endAdornment={
                                <InputAdornment position="end" className={classes.iconVis}>
                                    <IconButton
                                        aria-label="toggle visibility"
                                        edge="end"
                                        onClick={this.handleClick}
                                    >
                                        <img src={ic_location} className={classes.iconPosition} alt=""></img>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <div className={classNames(classes.col, classes.searchBtn)}>
                        <button 
                            type="button" 
                            className={classNames("btn", classes.search)}
                            onClick={this.handleClick}
                        >
                            搜尋
                        </button>
                    </div>
                </div>
                <div className={classes.information}>
                    <span className={classes.evenOrOdd}>{this.state.oddOrEven}</span>
                    <span className={classes.buyDay}>購買日</span>
                    <IconButton aria-label="delete">
                        <img src={ic_help} className={classes.iconHelp} alt=""></img>
                    </IconButton>
                </div>
                <div className={classes.infoflex}>
                    <div className={classNames(classes.col, classes.infoDescription)}>
                        <span className={classes.description}>全台口罩供應商</span>
                        <span className={classes.description}>資訊更新時間 {updateTime}</span>
                    </div>
                    <div className={classNames(classes.col, classes.refresh)}>
                        <button 
                            type="button" 
                            className={classNames("btn", classes.refreshList)}
                            onClick={this.handleClickRefreshBtn}
                        >
                            重整列表
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        updateTime: state.updateTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchMaskInformation: (searchText) => {
            dispatch(searchMaskInformation(searchText));
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(maskSearch));