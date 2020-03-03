/*global google MarkerClusterer*/
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
// import classNames from 'classnames';
import GoogleMapReact from 'google-map-react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { fetchMaskInformation } from '../actions/index';

import centerGPS from '../assets/location.png';
import location from '../assets/location@2x.png';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

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
        width: '110px',
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
    infoContainer: {
        width: '230px',
    },
    drugstoreName: {
        width: '100%',
        borderRadius: 4,
        textAlign: 'center',
        backgroundColor: '#34495E',
        fontSize: 13,
        fontWeight: 900,
        color: '#fff',
        padding: '3px 0',
        marginBottom: 10,
    },
    describe: {
        width: '100%',
        textAlign: 'right',
        margin: '5px 0',
    }
};

const center = {
    lat: 24.1497,
    lng: 120.6838
};


class map2 extends Component {
    constructor() {
        super();
        this.state = {
            center: center,
            zoom: 16,
            features: [],
        };
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        // 如果點選其他的藥局列表後，更新地圖的中心點
        if (this.props.drugstoreId !== prevProps.drugstoreId) {
            // console.log('drugstoreId: ', this.props.drugstoreId, 'last_drugstoreId: ', prevProps.drugstoreId);
            // console.log(this.props.maskInformationLists);
            this.closeAllInfoWindows();
            const clickedObj = this.props.maskInformationLists.filter(feature => feature.properties.id === this.props.drugstoreId);
            // console.log(clickedObj[0].geometry);
            const center = {
                lat: clickedObj[0].geometry.coordinates[1],
                lng: clickedObj[0].geometry.coordinates[0],
            };

            this.infowindows.forEach((infowindow, index) => {
                if(infowindow.id === this.props.drugstoreId){
                    infowindow.infowindow.open(this.map, this.markers[index]);
                }
            });

            this.map.setCenter(center);
            this.map.setZoom(18);  
            
        }
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
            // console.log(this.map);
            // 定位完成後，刪掉起始位置的marker
            this.marker.setMap(null);
            // 新增現在位置的marker
            this.marker = new google.maps.Marker({
                position: new google.maps.LatLng(this.state.center.lat, this.state.center.lng),
                map: this.map,
                icon: location
            });
            this.map.setCenter(this.state.center);
            this.map.setZoom(16);  
        });
    }

    // 關閉所有的infowindows
    closeAllInfoWindows = () => {
        // console.log(this.infowindows);
        for (var i = 0; i < this.infowindows.length; i++) {
            this.infowindows[i].infowindow.close();
        }
    }

    handleApiLoaded = (map) => {
        this.map = map;
         // 初始marker
        this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.state.center.lat, this.state.center.lng),
            map: this.map,
            icon: location,
        });

        // constructor passing in this DIV.
        var controlDiv = document.createElement('div');
        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginRight = '10px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = `<img src=${centerGPS} alt=""></img>`;
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', this.getLocation);
        this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);

        // ApiLoaded完之後才fetch
        this.props.fetchMaskInformation(this.createMarker);

        this.getLocation();

    };

    createMarker = (features) => {
        //因為marker.addListener的this是marker的this,為了區別是component的this或是marker的this,新增一個$this來代替component的this
        const $this = this;
        $this.markers = [];
        $this.infowindows = [];
        $this.hoverInfowindows = [];
        $this.clicked = -1; //取得當前點選的marker index
        $this.features = features;
        const { classes } = this.props;

        // console.log(features);
        const newFeatures = features.map(item => ({
            ...item,
            position: new google.maps.LatLng(item.geometry.coordinates[1], item.geometry.coordinates[0])
        }));
        // console.log(newFeatures);

        // Create markers.
        newFeatures.forEach((item, index) => {
            const marker = new google.maps.Marker({
                position: item.position,
                // map: map,
            });

            this.markers = [...this.markers, marker];
            // console.log(item.properties.service_periods);
            const serviceArr = item.properties.service_periods.split('');
            
            const newServiceArr = serviceArr.map(service => {
                if(service === 'N'){
                    return `<span>⚫</span>`
                }else {
                    return `<span>❌</span>`
                }
            })
            // console.log(newServiceArr);

            const infowindow = new google.maps.InfoWindow({
                content:  `
                <div class="${classes.infoContainer}">
                    <div class="${classes.drugstoreName}">
                        ${item.properties.name}
                    </div>
                    <table style="width: 100%">
                        <tr>
                            <th>＃</th>
                            <th>一</th> 
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th> 
                            <th>六</th>
                            <th>日</th>

                        </tr>
                        <tr>
                            <td>早上</td>
                            <td>${newServiceArr[0]}</td>
                            <td>${newServiceArr[1]}</td>
                            <td>${newServiceArr[2]}</td>
                            <td>${newServiceArr[3]}</td>
                            <td>${newServiceArr[4]}</td>
                            <td>${newServiceArr[5]}</td>
                            <td>${newServiceArr[6]}</td>
                        </tr>
                        <tr>
                            <td>下午</td>
                            <td>${newServiceArr[7]}</td>
                            <td>${newServiceArr[8]}</td>
                            <td>${newServiceArr[9]}</td>
                            <td>${newServiceArr[10]}</td>
                            <td>${newServiceArr[11]}</td>
                            <td>${newServiceArr[12]}</td>
                            <td>${newServiceArr[13]}</td>
                        </tr>
                        <tr>
                            <td>晚上</td>
                            <td>${newServiceArr[14]}</td>
                            <td>${newServiceArr[15]}</td>
                            <td>${newServiceArr[16]}</td>
                            <td>${newServiceArr[17]}</td>
                            <td>${newServiceArr[18]}</td>
                            <td>${newServiceArr[19]}</td>
                            <td>${newServiceArr[20]}</td>
                        </tr>
                    </table>
                    <div class="${classes.describe}">⚫&nbsp;開診&nbsp;&nbsp;&nbsp;&nbsp;❌&nbsp;休診</div>
                    <div>備註&nbsp;&nbsp;${item.properties.note}</div>
                </div>`

            });

            const hoverInfowindow = new google.maps.InfoWindow({
                content: `
                    <div class="${classes.flex}">
                        <div 
                            class="${classNames(classes.col, classes.fullMask)}"
                            style="margin-right: 5%;"
                        >
                            ${item.properties.mask_adult}
                        </div>
                        <div class="${classNames(classes.col, classes.fewMask)}">
                            ${item.properties.mask_child}
                        </div>
                        <span style="font-size: 10px">* 點擊查看詳細資訊</span>
                    </div>`
            });

            this.infowindows.push({id: item.properties.id, infowindow: infowindow});
            this.hoverInfowindows.push(hoverInfowindow);

            marker.addListener('click', function () {
                // 開啟任一infowindow前先關閉所有infowindow
                $this.closeAllInfoWindows();
                infowindow.open($this.map, marker);
                $this.clicked = index;
                // console.log($this.clicked);
            });

            google.maps.event.addListener(infowindow, 'closeclick', function () {
                $this.clicked = -1;
            });

            marker.addListener('mouseover', function () {
                // console.log($this.clicked);
                if ($this.clicked !== index) {
                    hoverInfowindow.open($this.map, marker);
                }
            });

            marker.addListener('mouseout', function () {
                hoverInfowindow.close();
            });
        })

        // console.log(markers);

        // Add a marker clusterer to manage the markers.
        this.markerCluster = new MarkerClusterer(this.map, this.markers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDpMlskEmuBOLyhwTL0N69DQHLPkm_oLMw' }}
                    defaultCenter={center}
                    defaultZoom={this.state.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
                >
                    {/* <AnyReactComponent
                        lat={24.1497}
                        lng={120.6838}
                    // text="My Marker"
                    /> */}
                </GoogleMapReact>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        maskInformationLists: state.maskInformationLists,
        drugstoreId: state.drugstoreId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMaskInformation: (callback) => {
            dispatch(fetchMaskInformation(callback))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(map2));