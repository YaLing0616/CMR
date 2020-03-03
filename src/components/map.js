import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

// material-ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const styles = {
    container: {
        '@media (min-width: 1000px)': {
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            padding: '2% 2% 0 2%',
        },
        width: '100%',
        backgroundColor: '#FAFAFA',
    },
    flex: {
        width: 110,
        height: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
    },
    col: {
        width: '47.5%',
        position: 'relative',
        fontSize: 17,
        fontWeight: 900,
        color: '#fff',
        borderRadius: 2,
        lineHeight: '35px',
        textAlign: 'center',
    },
    fullMask: {
        backgroundColor: '#117577',
    },
    fewMask: {
        backgroundColor: '#E67E22',
    },
    emptyMask: {
        backgroundColor: '#D5D6D7',
    },
};

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class map extends Component {
    constructor() {
        super();
        this.state = {
            center: {
                lat: 24.1497,
                lng: 120.6838,
            },
            zoom: 16,
            // places: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            markerclicked: false,
            tempmarker: '',
        };
    }

    componentDidMount() {
        this.getLocation(); //取得目前位置
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.updateLocation);
        }
    }

    updateLocation = (position) => {
        this.setState({
            center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            }
        }, () => {
            // console.log(this.state.center);
        });
    }

    onMouseoverMarker = (props, marker, e) => {
        if (!this.state.showingInfoWindow) {
            this.setState({
                selectedPlace: props,
                activeMarker: marker,
                showingInfoWindow: true,
                markerclicked: false
            });
        }
    }

    mouseMoveOutOfMarker = (e) => {
        if(!this.state.markerclicked && this.state.showingInfoWindow){
            this.setState({
                showingInfoWindow: false,
            });
        }
    }

    onMarkerClick = (props, marker, e) => {
        // console.log(this.state.tempmarker);
        if(this.state.tempmarker !== marker.name){
            this.setState({
                showingInfoWindow: false,
            },() => {
                this.setState({
                    selectedPlace: props,
                    activeMarker: marker,
                    showingInfoWindow: true,
                    markerclicked: true,
                    tempmarker: marker.name,
                });
            });
            
        }
    }
 
    // onMarkerClick = (lat, lng) => (props, marker, e) => {
    //     if(this.state.tempmarker !== marker.name){
    //         this.setState({
    //             showingInfoWindow: false,
    //         },() => {
    //             this.setState({
    //                 center: {
    //                     lat,
    //                     lng,
    //                 },
    //                 selectedPlace: props,
    //                 activeMarker: marker,
    //                 showingInfoWindow: true,
    //                 markerclicked: true,
    //                 tempmarker: marker.name,
    //             });
    //         });
            
    //     }
    // }
 
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    closeInfoWindow = () => {
        this.setState({
            showingInfoWindow: false,
            markerclicked: false,
            activeMarker: null,
        });
    }


    render() {
        const { classes } = this.props;

        return(
            <div className={classes.container}>
                <Map 
                    google={this.props.google}
                    style={{width: '100%', height: '100%', position: 'relative'}}
                    initialCenter={{
                        lat: this.state.center.lat,
                        lng: this.state.center.lng
                    }}
                    className={'map'}
                    zoom={this.state.zoom}
                >
                    <Marker
                        name={'Dolores park'}
                        position={{lat: this.state.center.lat, lng: this.state.center.lng}} 
                        onClick={this.onMarkerClick}
                        onMouseover={this.onMouseoverMarker} // 游標移動到Marker上面的時候
                        onMouseout={this.mouseMoveOutOfMarker} // 游標離開Marker的時候

                    />
                    <Marker
                        name={'park'}
                        position={{lat: 24.1562973, lng: 120.659478}} 
                        onClick={this.onMarkerClick}
                        onMouseover={this.onMouseoverMarker} // 游標移動到Marker上面的時候
                        onMouseout={this.mouseMoveOutOfMarker} // 游標離開Marker的時候
                    />

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.closeInfoWindow}
                    >
                        {!this.state.markerclicked
                        ?(
                            <div className={classes.flex}>
                                <div 
                                    className={classNames(classes.col, classes.fullMask)}
                                    style={{ marginRight: '5%' }}
                                >
                                    200
                                </div>
                                <div className={classNames(classes.col, classes.fewMask)}>
                                    4
                                </div>
                                <span style={{ fontSize: 10 }}>* 點擊查看詳細資訊</span>
                            </div>
                        ):(
                            <div>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Dessert (100g serving)</TableCell>
                                                <TableCell align="right">Calories</TableCell>
                                                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map(row => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="right">{row.calories}</TableCell>
                                                    <TableCell align="right">{row.fat}</TableCell>
                                                    <TableCell align="right">{row.carbs}</TableCell>
                                                    <TableCell align="right">{row.protein}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        )}
                        </InfoWindow>
                </Map> 
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDpMlskEmuBOLyhwTL0N69DQHLPkm_oLMw'
  })(withStyles(styles)(map));