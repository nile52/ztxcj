import React, {Component} from 'react';
import renderBubbleChart from '../../../static/js/bubbleUtil.js'
import axios from './../../../axios/index';
import Utils from './../../../utils/utils';

import {
    WEI_RESIDENT,
    WEI_RESIDENT_PICTURE,
} from './../../../fetch/apis';


class FloatingFromArea extends Component {
    constructor(props) {
        super(props)
        this.initOptions = this.initOptions.bind(this)
        this.state = {
            nativePlace: null
        }
    }

    initOptions = () => {
        let _this = this
        const nativePlace = this.state.nativePlace
        if(nativePlace) {
            let data = []
            nativePlace.map((item) => {
                data.push({
                    "name": item.native_place,
                    "value": item.number
                })
            })
            renderBubbleChart(data, document.getElementById('floatingfromarea'), (params) => {
                let index = params.id.charAt(params.id.length -1)
                let value = nativePlace[index].native_place                
                _this.props.getArea(value, 1)
            });
        }  
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.nativePlace) {
            // console.log(nextProps.nativePlace)
            nextProps.nativePlace.sort((a, b) => {
                return b.number - a.number
            })
            let newNativePlace = nextProps.nativePlace.slice(0,10)
            this.setState({
                nativePlace: newNativePlace,
            }, () => {
                this.initOptions()
            })
        }
    }

    componentDidMount() {
        const homePageTotal = this.props.homePageTotal

        if(homePageTotal && homePageTotal.nativePlace) {
            // console.log(homePageTotal.nativePlace)
            homePageTotal.nativePlace.sort((a, b) => {
                return b.number - a.number
            })
            let newNativePlace = homePageTotal.nativePlace.slice(0,10)
            this.setState({
                nativePlace: newNativePlace
            }, () => {
                this.initOptions()
            })
        }
    }

    render() {
        return (
            <div id="floatingfromarea"  style={{width:'260px', height: '180px'}} className="floatingfromarea"></div>
        )  
    }
}

export default FloatingFromArea;