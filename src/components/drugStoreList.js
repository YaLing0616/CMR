import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import '../css/drugStoreList.css';

import { handleDrugstoreClicked } from '../actions/index';

import buy_mask from '../assets/howtobuymask.jpg';
import ic_stock_full from '../assets/ic_stock_full@2x.png';
import ic_stock_few from '../assets/ic_stock_few@2x.png';
import ic_stock_none from '../assets/ic_stock_none@2x.png';
import ic_drugopen from '../assets/ic_drugopen.png';
import ic_drugclose from '../assets/ic_drugclose.png';
import loadingImg from '../assets/loading.svg';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const styles = {
    container: {
        '@media (min-width: 1000px)': {
            padding: '2%',
            height: '73%',
            margin: 0,
        },
        width: '100%',
        height: '70%',
        padding: '5%',
        overflow: 'auto',
    },
    buyMask: {
        '@media (min-width: 1000px)': {
            marginTop: '10px',
        },
        width: '100%',
        height: 'auto',
    },
    card: {
        width: '100%',
        marginBottom: 20,
        borderRadius: '10px',
    },
    flex: {
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
    },
    col: {
        position: 'relative',
    },
    nonList: {
        paddingTop: 20,
        textAlign: 'center',
        color: '#34495E',
    },
    adultMaskQuantity: {
        '@media (min-width: 1000px)': {
            width: '48%',
            height: 100,
        },
        width: '48%',
        height: 100,
        boxShadow: 'none',
        borderRadius: '6px',
        marginRight: 10,
        padding: '5% 4%',
    },
    childrenMaskQuantity: {
        '@media (min-width: 1000px)': {
            width: '48%',
            height: 100,
        },
        width: '48%',
        height: 100,
        boxShadow: 'none',
        borderRadius: '6px',
        padding: '5% 4%',
    },
    fullMask: {
        backgroundColor: '#117577',
        backgroundImage: `url(${ic_stock_full})`,
        backgroundSize: '40px 40px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom 20% right -8%',
    },
    fewMask: {
        backgroundColor: '#E67E22',
        backgroundImage: `url(${ic_stock_few})`,
        backgroundSize: '40px 40px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom 20% right -8%',
    },
    emptyMask: {
        backgroundColor: '#D5D6D7',
        backgroundImage: `url(${ic_stock_none})`,
        backgroundSize: '40px 40px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom 20% right -8%',
    },
    maskCH: {
        display: 'block',
        color: '#fff',
        fontSize: 15,
        marginBottom: '8%',
    },
    maskEN: {
        display: 'block',
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bolder',
    },
    drugInfoDivOpen: {
        marginTop: 15,
        marginLeft: -16,
        backgroundImage: `url(${ic_drugopen})`,
        backgroundSize: '10px 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top left -3px',
    },
    drugInfoDivClose: {
        marginTop: 15,
        marginLeft: -16,
        backgroundImage: `url(${ic_drugclose})`,
        backgroundSize: '10px 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top left -3px',
    },
    drugInfoTitle: {
        fontSize: 16,
        fontWeight: 'bolder',
        marginLeft: 16,
    },
    drugInfoTitleDis: {
        fontSize: 13,
        padding: '0 5px',
    },
    // 營業中
    drugInfoOpen: {
        minWidth: 'auto',
        fontSize: 12,
        padding: '1px 3px',
        color: '#41B19C !important',
        backgroundColor: '#E7F5F3 !important',
        marginLeft: 5,
    },
    // 即將休息
    drugInfoClose: {
        minWidth: 'auto',
        fontSize: 12,
        padding: '1px 3px',
        color: '#F6B856 !important',
        backgroundColor: '#FEF5E6 !important',
        marginLeft: 5,
    },
    drugInfoDescription: {
        marginBottom: 5,
    },
    infoDescription: {
        width: '75%',
        '& span': {
            fontSize: 14,
            color: '#687887',
        },
    },
    aHref: {
        width: '25%',
        '& a': {
            fontSize: 14,
            color: '#687887 !important',
            textDecoration: 'underline',
            cursor: 'pointer',
        },
    },
    isloading: {
        textAlign: 'center',
    },
};

class drugStoreList extends Component {

    render() {
        const {
            classes,
            howToBuyMaskClicked,
            // maskInformationLists,
            searchMaskInformationLists,
        } = this.props;
        // console.log('searchMaskInformationLists', searchMaskInformationLists);
        const googleMap = 'https://www.google.com/maps?q=';
        const tel = 'tel:';
        return (
            <div className={classes.container} ref={this.props.topRef}>
                {howToBuyMaskClicked
                    ?
                    <img src={buy_mask} className={classes.buyMask} alt=""></img>
                    :
                    <div>
                        {/* 尚未輸入資料時 */}
                        {searchMaskInformationLists.length === 0
                        ? 
                            <div className={classes.nonList}>
                                <span role="img" aria-label="">❗請輸入要查詢的區域❗</span>
                            </div>
                        :
                        searchMaskInformationLists.map((item, index) => (
                            <Card
                                className={classNames(classes.card, "card_shadow")}
                                key={item.properties.id}
                                // onClick={(e) => this.handleClick(item.properties.id, e)}
                                onClick={(e) => this.props.handleDrugstoreClicked(item.properties.id, index)}
                            >
                                <CardContent>
                                    <div className={classes.flex}>
                                        <div
                                            className={classNames(classes.col,
                                                classes.adultMaskQuantity,
                                                `${item.properties.mask_adult > 50 && classes.fullMask}`,
                                                `${item.properties.mask_adult <= 50 && item.properties.mask_adult > 0 && classes.fewMask}`,
                                                `${item.properties.mask_adult === 0 && classes.emptyMask}`)
                                            }>
                                            <span className={classes.maskCH}>成人口罩數量</span>
                                            <span className={classes.maskEN}>
                                                {item.properties.mask_adult}<span className={classes.maskCH} style={{ display: 'inline', fontWeight: 'normal' }}>&nbsp;片</span>
                                            </span>
                                        </div>
                                        <div
                                            className={classNames(classes.col,
                                                classes.childrenMaskQuantity,
                                                `${item.properties.mask_child > 50 && classes.fullMask}`,
                                                `${item.properties.mask_child <= 50 && item.properties.mask_child > 0 && classes.fewMask}`,
                                                `${item.properties.mask_child === 0 && classes.emptyMask}`)}
                                        >
                                            <span className={classes.maskCH}>兒童口罩數量</span>
                                            <span className={classes.maskEN}>
                                                {item.properties.mask_child}<span className={classes.maskCH} style={{ display: 'inline', fontWeight: 'normal' }}>&nbsp;片</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`${item.properties.mask_adult > 50 ? classes.drugInfoDivClose : classes.drugInfoDivOpen}`}>
                                        <div className={classes.drugInfoDescription}>
                                            <span className={classes.drugInfoTitle}>{item.properties.name}</span>
                                            {/* <span className={classes.drugInfoTitleDis}>1.2km</span>
                                            <Button variant="contained" className={classes.drugInfoOpen} disabled>
                                                營業中
                                            </Button> */}
                                            <Button variant="contained" className={classes.drugInfoClose} disabled>
                                                藥局資訊詳見地圖
                                            </Button>
                                        </div>
                                    </div>
                                    <div className={classNames(classes.flex, classes.drugInfoDescription)}>
                                        <div className={classNames(classes.col, classes.infoDescription)}>
                                            <span>地址&nbsp;&nbsp;</span>
                                            <span>{item.properties.address}</span>
                                        </div>
                                        <div className={classNames(classes.col, classes.aHref)}>
                                            <a href={googleMap + item.properties.name} rel="noopener noreferrer" target="_blank">於地圖查看</a>
                                        </div>
                                    </div>
                                    <div className={classNames(classes.flex)}>
                                        <div className={classNames(classes.col, classes.infoDescription)}>
                                            <span>電話&nbsp;&nbsp;</span>
                                            <span>{item.properties.phone}</span>
                                        </div>
                                        <div className={classNames(classes.col, classes.aHref)}>
                                            <a href={tel + item.properties.phone}>撥打電話</a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <div className={classes.isloading}>
                            {this.props.isLoading && (
                                <img src={loadingImg} alt="" width="50" height="50" />
                            )}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        howToBuyMaskClicked: state.howToBuyMaskClicked,
        maskInformationLists: state.maskInformationLists,
        isLoading: state.isLoading,
        searchMaskInformationLists: state.searchMaskInformationLists,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleDrugstoreClicked: (drugstoreId, index) => {
            dispatch(handleDrugstoreClicked(drugstoreId, index));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(drugStoreList));