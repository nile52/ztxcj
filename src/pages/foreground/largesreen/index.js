import React from 'react'
import ReactEcharts from 'echarts-for-react'
import axios from './../../../axios/index';
import FloatingFromArea from './FloatingFromArea.js'
// 3D资源
import * as THREE from 'three';
// import echarts from 'echarts'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入饼图和折线图
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import './index.less'
import './slider.css'
import './weather.css'
import { 
    Row, 
    Col,
    Button,
    Table,
    Select,
    Modal,
    Tag,
    Input,
 } from 'antd'
import videoBg from '../../../static/images/video_cover.jpg';
import Plan from '../../../static/images/plan.png';
import Gear1 from "../../../static/images/gear_anticlockwise.gif"
import Gear2 from "../../../static/images/gear_clockwise.gif"
import BottomIcon1 from "../../../static/images/bottom_icon1.png"
import BottomIcon2 from "../../../static/images/bottom_icon2.png"
import BottomIcon3 from "../../../static/images/bottom_icon3.png"
import BottomIcon4 from "../../../static/images/bottom_icon4.png"
import BottomIcon5 from "../../../static/images/bottom_icon5.png"
import SilderTitle1 from "../../../static/images/slider_title_01.png"
import SilderTitle2 from "../../../static/images/slider_title_02.png"
import SilderTitle3 from "../../../static/images/slider_title_03.png"
import SilderTitle4 from "../../../static/images/slider_title_04.png"
import SilderTitle6 from "../../../static/images/slider_title_06.png"
import plan1 from "../../../static/images/house_type_01.jpg"
import Silder5 from "../../../static/images/5.jpg"
import BuildOutLook from "../../../static/images/build.jpg"
import logo from "../../../static/images/qr_logo.png"
import Video from "../../../static/media/bg.mp4"
import Utils from './../../../utils/utils';
import {
    CAS_XQLIST,
    WEI_WEATHER,
    WEI_HOMEPAGETOTAL,
    WEI_HISTOGRAM,
    WEI_SELECTUSER,
    WEI_HOTAL_RESIDENT,
    WEI_HOMEPAGEBUILDING,
    WEI_HOMEPAGEHOUSING,
    WEI_GETHOUSING,
    WEI_GETHOUSINGUSER,
    CAS_USERNAME,
    CAS_LOGIN,
    WEI_RESIDENT,
    WEI_RESIDENT_PICTURE,
    CAS_LOGOUT,
} from './../../../fetch/apis';

const Option = Select.Option;
var slider
var slider2

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function lerp(_ref, _ref2) {
  var x = _ref.x;
  var y = _ref.y;
  var targetX = _ref2.x;
  var targetY = _ref2.y;
  var fraction = 0.2;
  x += (targetX - x) * fraction;
  y += (targetY - y) * fraction;
  return { x: x, y: y };
}

var Slider = function () {
  function Slider(el) {
    _classCallCheck(this, Slider);
    var imgClass = this.IMG_CLASS = 'slider__images-item';
    var textClass = this.TEXT_CLASS = 'slider__text-item';
    var activeImgClass = this.ACTIVE_IMG_CLASS = imgClass + '--active';
    var activeTextClass = this.ACTIVE_TEXT_CLASS = textClass + '--active';
    this.el = el;
    this.contentEl = document.getElementById('slider-content');
    this.contentEl2 = document.getElementById('slider-content2');
    // this.contentEl = document.getElementsByClassName('slider__content');
    
    this.onMouseMove = this.onMouseMove.bind(this);
    // taking advantage of the live nature of 'getElement...' methods
    this.activeImg = el.getElementsByClassName(activeImgClass);
    this.activeText = el.getElementsByClassName(activeTextClass);
    this.images = el.getElementsByTagName('img');
    // document.getElementById('slider-dots').addEventListener('click', this.onDotClick.bind(this));
    // document.getElementById('left').addEventListener('click', this.prev.bind(this));
    // document.getElementById('right').addEventListener('click', this.next.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
    this.onResize();
    this.length = this.images.length;
    this.lastX = this.lastY = this.targetX = this.targetY = 0;
  }

  Slider.prototype.onResize = function onResize() {
    var htmlStyles = getComputedStyle(document.documentElement);
    var mobileBreakpoint = htmlStyles.getPropertyValue('--mobile-bkp');
    var isMobile = this.isMobile = matchMedia('only screen and (max-width: ' + mobileBreakpoint + ')').matches;
    this.halfWidth = innerWidth / 2;
    this.halfHeight = innerHeight / 2;
    this.zDistance = htmlStyles.getPropertyValue('--z-distance');
    if (!isMobile && !this.mouseWatched) {
      this.mouseWatched = true;
      this.el.addEventListener('mousemove', this.onMouseMove);
    //   this.el.style.setProperty('--img-prev', 'url(' + this.images[+this.activeImg[0].dataset.id - 1].src + ')');

      if (this.contentEl) {
        this.contentEl.style.setProperty('transform', 'translateZ(' + this.zDistance + ')');          
      }
      if (this.contentEl2) {
        this.contentEl2.style.setProperty('transform', 'translateZ(' + this.zDistance + ')');          
      }


    } else if (isMobile && this.mouseWatched) {
      this.mouseWatched = false;
      this.el.removeEventListener('mousemove', this.onMouseMove);
      if (this.contentEl) {
        this.contentEl.style.setProperty('transform', 'none');          
      }
      if (this.contentEl2) {
        this.contentEl2.style.setProperty('transform', 'none');         
      }
    }
  };

  Slider.prototype.getMouseCoefficients = function getMouseCoefficients() {
    var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var pageX = _ref3.pageX;
    var pageY = _ref3.pageY;
    var halfWidth = this.halfWidth;
    var halfHeight = this.halfHeight;
    var xCoeff = ((pageX || this.targetX) - halfWidth) / halfWidth;
    var yCoeff = (halfHeight - (pageY || this.targetY)) / halfHeight;
    return { xCoeff: xCoeff, yCoeff: yCoeff };
  };

  Slider.prototype.onMouseMove = function onMouseMove(_ref4) {
    var pageX = _ref4.pageX;
    var pageY = _ref4.pageY;
    this.targetX = pageX;
    this.targetY = pageY;
    if (!this.animationRunning) {
      this.animationRunning = true;
      this.runAnimation();
    }
  };

  Slider.prototype.runAnimation = function runAnimation() {
    if (this.animationStopped) {
      this.animationRunning = false;
      return;
    }
    var maxX = 10;
    var maxY = 10;
    var newPos = lerp({
      x: this.lastX,
      y: this.lastY
    }, {
      x: this.targetX,
      y: this.targetY
    });
    var _getMouseCoefficients = this.getMouseCoefficients({
      pageX: newPos.x,
      pageY: newPos.y
    });
    var xCoeff = _getMouseCoefficients.xCoeff;
    var yCoeff = _getMouseCoefficients.yCoeff;
    this.lastX = newPos.x;
    this.lastY = newPos.y;
    this.positionImage({ xCoeff: xCoeff, yCoeff: yCoeff });

    if (this.contentEl) {
        this.contentEl.style.setProperty('transform', '\n      translateZ(' + this.zDistance + ')\n      rotateX(' + maxY * yCoeff + 'deg)\n      rotateY(' + maxX * xCoeff + 'deg)\n    ');
    }
    if (this.contentEl2) {
        this.contentEl2.style.setProperty('transform', '\n      translateZ(' + this.zDistance + ')\n      rotateX(' + maxY * yCoeff + 'deg)\n      rotateY(' + maxX * xCoeff + 'deg)\n    ');
    }
    
    
    if (this.reachedFinalPoint) {
      this.animationRunning = false;
    } else {
      requestAnimationFrame(this.runAnimation.bind(this));
    }
  };

  Slider.prototype.positionImage = function positionImage(_ref5) {
    var xCoeff = _ref5.xCoeff;
    var yCoeff = _ref5.yCoeff;
    var maxImgOffset = 1;
    // var currentImage = this.activeImg[0].children[0];
    // currentImage.style.setProperty('transform', '\n      translateX(' + maxImgOffset * -xCoeff + 'em)\n      translateY(' + maxImgOffset * yCoeff + 'em)\n    ');
  };

  Slider.prototype.onDotClick = function onDotClick(nextId) {
    // var target = _ref6.target;
    // if (this.inTransit) return;
    // var dot = target.closest('.slider__nav-dot');
    // if (!dot) return;
    // var nextId = dot.dataset.id;
    // var currentId = this.activeImg[0].dataset.id;
    // if (currentId == nextId) return;
    this.startTransition(nextId);
  };

  Slider.prototype.transitionItem = function transitionItem(nextId) {
    var _this = this;
    function onImageTransitionEnd(e) {
      e.stopPropagation();
      nextImg.classList.remove(transitClass);
      self.inTransit = false;
      this.className = imgClass;
      this.removeEventListener('transitionend', onImageTransitionEnd);
    }

    var self = this;
    var el = this.el;
    // var currentImg = this.activeImg[0];
    // var currentId = currentImg.dataset.id;
    var imgClass = this.IMG_CLASS;
    var textClass = this.TEXT_CLASS;
    var activeImgClass = this.ACTIVE_IMG_CLASS;
    var activeTextClass = this.ACTIVE_TEXT_CLASS;
    var subActiveClass = imgClass + '--subactive';
    var transitClass = imgClass + '--transit';
    // console.log(Slider,nextImg)
    var nextImg = el.querySelector('.' + imgClass + '[data-id=\'' + nextId + '\']');
    var nextText = el.querySelector('.' + textClass + '[data-id=\'' + nextId + '\']');
    var outClass = '';
    var inClass = '';
    this.animationStopped = true;
    nextText.classList.add(activeTextClass);
    el.style.setProperty('--from-left', nextId);
    // currentImg.classList.remove(activeImgClass);
    // currentImg.classList.add(subActiveClass);
    // if (currentId < nextId) {
    //   outClass = imgClass + '--next';
    //   inClass = imgClass + '--prev';
    // } else {
    //   outClass = imgClass + '--prev';
    //   inClass = imgClass + '--next';
    // }
    nextImg.classList.add(outClass);
    requestAnimationFrame(function () {
      nextImg.classList.add(transitClass, activeImgClass);
      nextImg.classList.remove(outClass);
      _this.animationStopped = false;
      _this.positionImage(_this.getMouseCoefficients());

    //   currentImg.classList.add(transitClass, inClass);
    //   currentImg.addEventListener('transitionend', onImageTransitionEnd);
    });
    if (!this.isMobile) this.switchBackgroundImage(nextId);
  };

  Slider.prototype.startTransition = function startTransition(nextId) {
    function onTextTransitionEnd(e) {
    //   if (!e.pseudoElement) {
        // e.stopPropagation();
        requestAnimationFrame(function () {
          self.transitionItem(nextId);
        });
        // this.removeEventListener('transitionend', onTextTransitionEnd);
    //   }
    }

    if (this.inTransit) return;
    // var activeText = this.activeText[0];
    var backwardsClass = this.TEXT_CLASS + '--backwards';
    var self = this;
    this.inTransit = true;
    onTextTransitionEnd()
    // activeText.classList.add(backwardsClass);
    // activeText.classList.remove(this.ACTIVE_TEXT_CLASS);
    // activeText.addEventListener('transitionend', onTextTransitionEnd);

    // requestAnimationFrame(function () {
    //   activeText.classList.remove(backwardsClass);
    // });
  };

  Slider.prototype.next = function next() {
    if (this.inTransit) return;
    var nextId = +this.activeImg[0].dataset.id + 1;
    if (nextId > this.length) nextId = 1;
    this.startTransition(nextId);
  };

  Slider.prototype.prev = function prev() {
    if (this.inTransit) return;
    var nextId = +this.activeImg[0].dataset.id - 1;
    if (nextId < 1) nextId = this.length;
    this.startTransition(nextId);
  };

  Slider.prototype.switchBackgroundImage = function switchBackgroundImage(nextId) {
    function onBackgroundTransitionEnd(e) {
      if (e.target === this) {
        // this.style.setProperty('--img-prev', imageUrl);
        this.classList.remove(bgClass);
        this.removeEventListener('transitionend', onBackgroundTransitionEnd);
      }
    }
    var bgClass = 'slider--bg-next';
    var el = this.el;
    var imageUrl = 'url(' + this.images[+nextId - 1].src + ')';
    // el.style.setProperty('--img-next', imageUrl);
    el.addEventListener('transitionend', onBackgroundTransitionEnd);
    el.classList.add(bgClass);
  };
  _createClass(Slider, [{
    key: 'reachedFinalPoint',
    get: function get() {
      var lastX = ~ ~this.lastX;
      var lastY = ~ ~this.lastY;
      var targetX = this.targetX;
      var targetY = this.targetY;

      return (lastX == targetX || lastX - 1 == targetX || lastX + 1 == targetX) && (lastY == targetY || lastY - 1 == targetY || lastY + 1 == targetY);
    }
  }]);

  return Slider;
}();

class UnitTab extends React.Component {
    modalHandleCancel(){
        this.props.onClick();
    }
    render(){
        var list = (length) => {
            var res = [];
            for(var i = 1; i <= length; i++) {
                res.push(<div className="slider_info_tab_item" key={i} onClick={this.props.modalHandleCancel}> {i} 单元</div>)
            }
            return res
        }
        return (
            <div>{list(this.props.length)}</div>
        )
    }
}

// var userKey = localStorage.getItem('userKey');

export default class largesreen extends React.Component{
    constructor(props) {
        super(props)

        this.getSliderYearBarOption = this.getSliderYearBarOption.bind(this)
        this.getArea = this.getArea.bind(this)
        this.state = {
            id: '',
            realTime: '',
            dimensional3D: true,
            dimensionalText: '3D',
            tmp:'',
            cond_code:'',
            silderVisible: false,
            nativeVisible: false,
            barData: [],
            bubbleChartData: [],
            building_info: {},
            unit_info: {},
            floor_info: {},
            house_info: {},
            person_info: {},
            homePageTotal: '',
            homeResidentList:[],
            houseInfo: [],
            internetTotal:'',
            liveRooms: '',
            historyUserTotal:'',
            housingTotal:'',
            userTotal:'',
            nativePlace:[],
            numberRooms:'',
            lastCheckIn: [],
            houseList:'',
            layer: '',
            layerInfo:'',
            userName: localStorage.getItem('userName'),
            lastLoginTime: localStorage.getItem('lastLoginTime'),
            buildid: '',
            userKey: '',
            houseNum: '',
            residentList: [],
            flow: true,
            residentListTitle: '',
            dpLoading: false,
            residentTogal: '',
            residentListType: 'area',
            residentListParams: '',
            bgIsVideo: false,
            bgDom: <img id="background_video" src={videoBg} />,
            videoSourceVisible: false,
            videoSource: Video
        }
    }

    logout= () => {
        window.location.href=`${CAS_LOGOUT}?userKey=${this.state.userKey}`
        localStorage.setItem('userKey', null)
        localStorage.setItem('id', null)
    }

    changeBg= () => {
        var bgIsVideo = this.state.bgIsVideo
        var videoSource = this.state.videoSource
        var bgDom = ''
        if (bgIsVideo) {
            bgDom = <img id="background_video" src={videoBg} />
        } else {
            bgDom = <video id="background_video" loop="loop" autoPlay="autoplay" poster={videoBg}>  
                        <source src={videoSource} type="video/mp4"/>
                    </video> 
        }
        this.setState({
            bgIsVideo: !bgIsVideo,
            bgDom: bgDom
        })     
    }

    changeVideoSource= () => {
        this.setState({
            videoSourceVisible: true,
        })     
    }

    videoSourceHandleOk = () => {
        this.setState({
            bgDom: ''
        })
        var videoSourceValue = document.getElementById("videoSource").value;
        var bgDom = ''
        bgDom = <video id="background_video" loop="loop" autoPlay="autoplay" poster={videoBg}>  
                    <source src={videoSourceValue} type="video/mp4"/>
                </video> 
        this.setState({
            bgDom: bgDom,
            videoSource: videoSourceValue,
            videoSourceVisible: false,
        })
    }

    videoSourceHandleCancel = () => {
        this.setState({
            videoSourceVisible: false,
        })
    }

    componentWillMount() {
        const QueryString = Utils.queryString();
        const userKey = QueryString.userKey || localStorage.getItem('userKey')
        let _this = this
        if(userKey) {
          // 判断授权码是否可用
          axios.ajax({
            url: CAS_USERNAME,
            data:{
                params:{
                    userKey: userKey
                }
            }
          }).then(function (res) {
            let data = res            
            if(data.msg == "成功" && data.success) {
                let lastLoginTime = data.obj.loginDate
                let userName = data.obj.userName
                localStorage.setItem('userKey', userKey)
                localStorage.setItem('userName', userName)
                localStorage.setItem('lastLoginTime', lastLoginTime )
                _this.setState({
                    'userKey': userKey
                })
            } else {
                Utils.toLoginUrl(CAS_LOGIN)
                localStorage.setItem('userKey', null)
                localStorage.setItem('userName', null)
                localStorage.setItem('lastLoginTime', null )
                this.setState({
                    'userKey': ''
                })
            }
          })  
        } else {
            Utils.toLoginUrl(CAS_LOGIN)
        }
    }

    componentDidMount(){
        const QueryString = Utils.queryString();
        const userKey = QueryString.userKey || localStorage.getItem('userKey')
        this.getZone(userKey);
        this.requestWeather(userKey);
        this.getThree();
        this.tick()
        this.timerID = setInterval(
            () => this.tick(),
            10000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    
    tick() {
        const QueryString = Utils.queryString();
        const userKey = QueryString.userKey || localStorage.getItem('userKey')
        this.getLastCheckIn(userKey);
        this.setState({
            realTime: Utils.GetCurrentTime()
        })
    }


    getArea = (value, page=1) => {
        var _this = this
        const QueryString = Utils.queryString();
        const userKey = QueryString.userKey || localStorage.getItem('userKey')
        var id = this.state.id
        const PARAMS = {
            userKey: userKey,
            zoneId: id,
            nativePlace: value,
            pages: page
        }
        axios.ajax({
            url: WEI_RESIDENT,
            data:{
                params: PARAMS
            }
        })
        .then(function (res) {
            if(res.msg === "成功" && res.success) {
                const data = res.obj.data
                const total = res.obj.total
                if(data.length > 0) {
                    let newData = []
                    data.forEach((item, index) => {
                        newData.push(item)
                        if(item.id) {
                            axios.ajax({
                                url: WEI_RESIDENT_PICTURE,
                                data:{
                                    params: {
                                        userKey: userKey,
                                        userId: item.id,
                                        type: 'personal'
                                    }
                                }
                            })
                            .then(function (res) {
                                if(res.msg === "成功" && res.success) {
                                    let pic = null;
                                    if(res.obj) {
                                        pic = res.obj.file
                                    }
                                    newData[index].personalPicture = pic
                                    if(index === (data.length-1)) {
                                        // if(cb) cb()
                                        _this.setState({
                                            residentList: newData,
                                            flow: true,
                                            residentListTitle: value,
                                            dpLoading: false,
                                            residentTogal: total,
                                            residentListType: 'area',
                                            residentListParams: value
                                        })
                                    }
                                } else if(res.msg === "微服务异常" && !res.success) {
                                    
                                }
                            })
                        }
                    })
                } else {
                    this.setState({
                        residentList: data,
                        flow: true,
                        residentListTitle: ''
                    })
                }
            } else if(res.msg === "微服务异常" && !res.success) {
                console.log(res)
            }
        }).catch(function (error) {
            console.log(error)
        });

        this.setState({
            nativeVisible: true,
        });
    }


    // 获取小区
    getZone = (userKey)=>{
        axios.ajax({
            url: CAS_XQLIST,
            data: {
                params: {
                    userKey: userKey
                }
            }
        }).then((res)=>{  
            let id = res.obj[0].id
            this.setState({
                id:id
            })
            this.getHomepagetotal(userKey)
            this.getHistogram(userKey)
            this.getLastCheckIn(userKey)
        })
    }

    // 首页大屏数据（历史居住人数、当前住客数、当前空房数量、住客户籍统计）
    getHomepagetotal = (userKey)=>{
        var id = this.state.id
        axios.ajax({
            url: WEI_HOMEPAGETOTAL,
            data: {
                params: {
                    userKey: userKey,
                    zoneId: id
                }
            }
        }).then((res)=>{  
            var internetTotal = res.obj.internetTotal
            var historyUserTotal = res.obj.historyUserTotal
            var housingTotal = res.obj.housingTotal
            var userTotal = res.obj.userTotal
            var numberRooms  = res.obj.numberRooms
            var liveRooms  = res.obj.liveRooms
            this.setState({
                internetTotal: internetTotal,
                historyUserTotal: historyUserTotal,
                housingTotal: housingTotal,
                userTotal: userTotal,
                homePageTotal: res.obj,
                numberRooms: housingTotal - liveRooms ,
                liveRooms: liveRooms
            })
        })
    }

    // 大屏楼栋信息
    getHistogram = (userKey)=>{
        var id = this.state.id
        axios.ajax({
            url: WEI_HISTOGRAM,
            data: {
                params: {
                    userKey: userKey,
                    zoneId: id
                }
            }
        }).then((res)=>{
            this.setState({
                barData: res.obj.storiedBuildingTotal
            })
        })
    }

    // 获取最新入住信息
    getLastCheckIn = (userKey)=>{
        var id = this.state.id
        axios.ajax({
            url: WEI_HOTAL_RESIDENT,
            data: {
                isShowLoading: false,
                params: {
                    userKey: userKey,
                    zoneId: id,
                    pages: 1,
                    limit: 2,
                    fields: "createDate",
                    rule: "desc"
                }
            }
        }).then((res)=>{ 
            this.setState({
                lastCheckIn: res.obj.data
            })
        })
    }
    
    // 生成楼层
    buildOption(layer){
        var tools = [];
        for( var i = 1; i <= layer; i++ ){
            tools.push(<Option key={i} >{i}</Option>);
        }
        return tools;
    }

    // 转换房屋类型
    getUsage(usage){
        var tools = '';
        switch (usage) {
            case 'personal': tools = '自住'
                break;
            case 'Internet': tools = '网约'
                break;
            case 'rentOut': tools = '出租'
                break;
            default:
                break;
        }
        return tools;
    }

    // 房屋格子
    HouseCol(houseDataJson){
        var _this = this
        var housing = houseDataJson
        var tools = [];
        for( var i = 0; i < housing.length; i++ ){
            let item = housing[i]
            tools.push(<Col span={2} key={i} ><div onClick={this.changeSliderActive.bind(this, item.housingId, 'house', item.room)} className={'room '+ Utils.getHouseUsageCode(item.usage)}>{Utils.getBuildingName(item.room)}</div></Col>);
        }
        return tools;
    }
    
    FullSlide = ()=>{
        var sliderEl = document.getElementById('slider');
        var sliderEl2 = document.getElementById('slider2');
        if (sliderEl) {
            slider = new Slider(sliderEl);
        } 
        if (sliderEl2) {
            slider2 = new Slider(sliderEl2);
        }          
    }

    // 天气
    requestWeather = (userKey)=>{
        axios.ajax({
            // url: 'https://free-api.heweather.com/s6/weather/now?key=f255beba0cea4e6ebcb5677d99d527e7&location=gongshu,hangzhou',
            url: WEI_WEATHER,
            data: {
                params: {
                    userKey: userKey
                }
            }
        }).then((res)=>{  
            var data = res.obj;
            let tmp = data.temp
            let weathercode = data.weathercode
            this.setState({
                tmp:tmp,
                cond_code:weathercode,
            })
        })
    }

    // 2D,3D切换
    changeDimensional = () => {
        this.setState({
            dimensional3D: !this.state.dimensional3D,
            dimensionalText: this.state.dimensional3D ? '2D' : '3D'         
        })
    }
    
    // 柱状图配置
    getBarOption = () => {
        let barData = this.state.barData
        let builds = []
        let totals = []
        let longTimeTotals = []
        for(var ever in barData) { 
            let newEver = ''
            let newEverArr = ever.split('-')
            let newEverArrLength = newEverArr.length
            if( newEverArrLength > 1) {
                newEver = newEverArr[newEverArrLength -1]
            } else {
                newEver = ever
            }
            builds.push(newEver+'')
            totals.push(barData[ever].Total)
            longTimeTotals.push(barData[ever].Internet)
        }  
        let option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['网约房','本幢房屋总量']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis:  {
                type: 'value',
                max: '550'
            },
            yAxis: {
                type: 'category',
                data: builds,
            },
            series: [
                {
                    name: '本幢房屋总量',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            textStyle: {
                                color: '#fff',
                                fontSize: 10,
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#273A65',
                            barBorderRadius:[10, 10, 10, 10],
                        }
                    },
                    barWidth: 8,
                    barGap: '-100%',
                    data: totals
                }, 
                {
                    name: '网约房',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            textStyle: {
                                color: '#fff',
                                fontSize: 10,
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#FFC971',
                            barBorderRadius:[10, 10, 10, 10],
                        }
                    },
                    barWidth: 8,
                    data: longTimeTotals
                }
            ]
        }
        return option
    }

    // Slider年龄分布柱状图配置
    getSliderYearBarOption = () => {
        var ageData = this.state.building_info.age
        var ageDataValue
        if (ageData) {
            ageDataValue = [ageData.age0_6, ageData.age7_17, ageData.age18_44, ageData.age45_59, ageData.age60_74, ageData.age75_89, ageData.age90]
        } else {
            ageDataValue = [0,0,0,0,0,0,0]
        }
        var option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis:  {
                type: 'category',
                data: ['0-6','7-17','18-44','45-59','60-74','75-89','90+']                
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: ageDataValue
                },
            ]
        };
        return option
    }

    // 3D图
    getThree = () => {
        var APP = {
            Player: function () {
                var loader = new THREE.ObjectLoader();
                var camera, scene, renderer;
                var events = {};
                var dom = document.createElement( 'div' );
                this.dom = dom;
                this.width = 500;
                this.height = 500;
                this.load = function ( json ) {
                    renderer = new THREE.WebGLRenderer( { antialias: true, alpha:true } );
                    renderer.setClearColor( 0xfff000, 0 );
                    renderer.setPixelRatio( window.devicePixelRatio );
                    var project = json.project;
                    if ( project.gammaInput ) renderer.gammaInput = true;
                    if ( project.gammaOutput ) renderer.gammaOutput = true;
                    if ( project.shadows ) renderer.shadowMap.enabled = true;
                    if ( project.vr ) renderer.vr.enabled = true;
                    dom.appendChild( renderer.domElement );
                    this.setScene( loader.parse( json.scene ) );
                    this.setCamera( loader.parse( json.camera ) );
                    events = {
                        init: [],
                        start: [],
                        stop: [],
                        keydown: [],
                        keyup: [],
                        mousedown: [],
                        mouseup: [],
                        mousemove: [],
                        touchstart: [],
                        touchend: [],
                        touchmove: [],
                        update: []
                    };
                    var scriptWrapParams = 'player,renderer,scene,camera';
                    var scriptWrapResultObj = {};
                    for ( var eventKey in events ) {
                        scriptWrapParams += ',' + eventKey;
                        scriptWrapResultObj[ eventKey ] = eventKey;
                    }
                    var scriptWrapResult = JSON.stringify( scriptWrapResultObj ).replace( /\"/g, '' );
                    for ( var uuid in json.scripts ) {
                        var object = scene.getObjectByProperty( 'uuid', uuid, true );
                        if ( object === undefined ) {
                            // console.warn( 'APP.Player: Script without object.', uuid );
                            continue;
                        }
                        var scripts = json.scripts[ uuid ];
                        for ( var i = 0; i < scripts.length; i ++ ) {
                            var script = scripts[ i ];
                            var functions = ( new Function( scriptWrapParams, script.source + '\nreturn ' + scriptWrapResult + ';' ).bind( object ) )( this, renderer, scene, camera );
                            for ( var name in functions ) {
                                if ( functions[ name ] === undefined ) continue;
                                if ( events[ name ] === undefined ) {
                                    // console.warn( 'APP.Player: Event type not supported (', name, ')' );
                                    continue;
                                }
                                events[ name ].push( functions[ name ].bind( object ) );
                            }
                        }
                    }
                    dispatch( events.init, arguments );
                };
                this.setCamera = function ( value ) {
                    camera = value;
                    camera.aspect = this.width / this.height;
                    camera.updateProjectionMatrix();
                    if ( renderer.vr.enabled ) {
                        dom.appendChild( WEBVR.createButton( renderer ) );
                    }
                };
                this.setScene = function ( value ) {
                    scene = value;
                };
                this.setSize = function ( width, height ) {
                    this.width = width;
                    this.height = height;
                    if ( camera ) {
                        camera.aspect = this.width / this.height;
                        camera.updateProjectionMatrix();
                    }
                    if ( renderer ) {
                        renderer.setSize( width, height );
                    }
                };
                function dispatch( array, event ) {
                    for ( var i = 0, l = array.length; i < l; i ++ ) {
                        array[ i ]( event );
                    }
                }
                var time, prevTime;
                function animate() {
                    time = performance.now();
                    try {
                        dispatch( events.update, { time: time, delta: time - prevTime } );
                    } catch ( e ) {    
                        // console.error( ( e.message || e ), ( e.stack || "" ) );
                    }    
                    renderer.render( scene, camera );    
                    prevTime = time;    
                }    
                this.play = function () {    
                    prevTime = performance.now();    
                    document.addEventListener( 'keydown', onDocumentKeyDown );
                    document.addEventListener( 'keyup', onDocumentKeyUp );
                    document.addEventListener( 'mousedown', onDocumentMouseDown );
                    document.addEventListener( 'mouseup', onDocumentMouseUp );
                    document.addEventListener( 'mousemove', onDocumentMouseMove );
                    document.addEventListener( 'touchstart', onDocumentTouchStart );
                    document.addEventListener( 'touchend', onDocumentTouchEnd );
                    document.addEventListener( 'touchmove', onDocumentTouchMove );    
                    dispatch( events.start, arguments );    
                    renderer.setAnimationLoop( animate );    
                };    
                this.stop = function () {    
                    document.removeEventListener( 'keydown', onDocumentKeyDown );
                    document.removeEventListener( 'keyup', onDocumentKeyUp );
                    document.removeEventListener( 'mousedown', onDocumentMouseDown );
                    document.removeEventListener( 'mouseup', onDocumentMouseUp );
                    document.removeEventListener( 'mousemove', onDocumentMouseMove );
                    document.removeEventListener( 'touchstart', onDocumentTouchStart );
                    document.removeEventListener( 'touchend', onDocumentTouchEnd );
                    document.removeEventListener( 'touchmove', onDocumentTouchMove );    
                    dispatch( events.stop, arguments );    
                    renderer.setAnimationLoop( null );    
                };    
                this.dispose = function () {    
                    while ( dom.children.length ) {    
                        dom.removeChild( dom.firstChild );    
                    }    
                    renderer.dispose();    
                    camera = undefined;
                    scene = undefined;
                    renderer = undefined;    
                };
                function onDocumentKeyDown( event ) {
                    dispatch( events.keydown, event );
                }
                function onDocumentKeyUp( event ) {
                    dispatch( events.keyup, event );
        
                }
                function onDocumentMouseDown( event ) {
                    dispatch( events.mousedown, event );
                }
                function onDocumentMouseUp( event ) {
                    dispatch( events.mouseup, event );
                }
                function onDocumentMouseMove( event ) {
                    dispatch( events.mousemove, event );
                }
                function onDocumentTouchStart( event ) {
                    dispatch( events.touchstart, event );
                }
                function onDocumentTouchEnd( event ) {
                    dispatch( events.touchend, event );
                }
                function onDocumentTouchMove( event ) {
                    dispatch( events.touchmove, event );
                }
            }
        };
        var loader = new THREE.FileLoader();
        loader.load( 'app.json', function ( text ) {
            var player = new APP.Player();
            var wrap3d = document.getElementById('wrap-3d');
            // console.log(wrap3d.offsetWidth)
            player.load( JSON.parse( text ) );
            player.setSize( wrap3d.offsetWidth, wrap3d.offsetHeight );
            player.play();
            wrap3d.appendChild( player.dom );
            window.addEventListener( 'resize', function () {
                player.setSize( wrap3d.offsetWidth, wrap3d.offsetHeight );
            } );
        } );        
    }

    // 仪表盘
    getGaugeOption = () => {
        var internetTotal = this.state.internetTotal
        var liveRooms = this.state.liveRooms
        let option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}"
            },
            series: [
                {
                    name: '网约房',
                    type: 'gauge',
                    detail: {
                        formatter:'{value}',
                        offsetCenter: [0, '60%'], 
                        textStyle: {      
                            color: '#1E2E5C',
                            fontSize: 14
                        }
                    },
                    data: [{value: liveRooms, name: '入住数（套）'}],
                    max: internetTotal,
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[1, '#1E2E5C']],
                            width: 2,
                            shadowColor : '#1E2E5C', //默认透明
                            shadowBlur: 5
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        length: 7,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto'
                        }
                    },
                    splitLine: {           // 分隔线
                        length: 7,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: 'auto'
                        }
                    },
                    axisLabel: {
                        show: false
                    },
                    pointer: {
                        width:2
                    },
                    title : {
                        offsetCenter: [0, '30%'], 
                        fontSize: 14,
                        color: '#1E2E5C'
                    },
                }
            ]
        };
        return option               
    }

    // 关闭模态框
    modalHandleCancel = (e) => {
        this.setState({
            silderVisible: false,
        });
    }

    // 关闭模态框
    nativeModalHandleCancel = (e) => {
        this.setState({
            nativeVisible: false,
        });
    }

    // 打开模态框
    modalHandleOpen = (buildid, level, props) => {
        if (level == 'build') {
            // 获取楼幢数据
            var id = this.state.id
            var userKey = this.state.userKey
            axios.ajax({
                url: WEI_HOMEPAGEBUILDING,
                data: {
                    params:{
                        userKey: userKey,
                        zoneId:	id,
                        storiedBuildingId: buildid,
                    }
                }
            }).then((res)=>{
                this.setState({
                    building_info: res.obj
                })
            })
            this.setState({
                buildid: buildid
            })
        } else if (level == 'unit') {
            // 获取单元数据
            // axios.ajax({
            //     url: 'http://47.100.230.100:8084//rpc/archController/selectStoriedBuilding?userKey='+ userKey +'&zoneId=3&id=4'+ buildid,
            // }).then((res)=>{
            //     this.setState({
            //         building_info: res.obj.data[0]
            //     })
            // })
        }
            this.setState({
                silderVisible: true,
            });
        if (slider) {
            var el = slider.el;

            if (el.querySelector('.slider__images-item--active')) {
                el.querySelector('.slider__images-item--active').classList.remove('slider__images-item--active');
            } 
            
            el.querySelector('.slider__images-item' + '[data-id=\'' + level + '\']').classList.add('slider__images-item--active');
      
        }

    }

    changeSliderActive = (index, level, roomname, props) => {
        var _this = this
        var layer = this.state.layer
        var id = this.state.id
        var buildid = this.state.buildid
        var userKey = this.state.userKey

        if (roomname) {
            _this.setState({
                houseNum: roomname
            })
        }
        
        if (index !== '') {
            // 获取房屋信息
            axios.ajax({
                url: WEI_GETHOUSING,
                data: {
                    params: {
                        userKey: userKey,
                        zoneId: id,
                        housingId: index,
                    }
                }
            }).then((res)=>{ 
                this.setState({
                    houseInfo: res.obj,
                })
            })
            // 获取房屋住客信息
            axios.ajax({
                url: WEI_GETHOUSINGUSER,
                data: {
                    params: {
                        userKey: userKey,
                        zoneId: id,
                        housingId: index,
                        dwell:true
                    }
                }
            }).then((res)=>{ 
                const data = res.obj.data
                const total = res.obj.total
                if(data.length > 0) {
                    let newData = []
                    data.forEach((item, index) => {
                        newData.push(item)
                        if(item.id) {
                            axios.ajax({
                                url: WEI_RESIDENT_PICTURE,
                                data:{
                                    params: {
                                        userKey: userKey,
                                        userId: item.id,
                                        type: 'personal'
                                    }
                                }
                            })
                            .then(function (res) {
                                if(res.msg === "成功" && res.success) {
                                    let pic = null;
                                    if(res.obj) {
                                        pic = res.obj.file
                                    }
                                    newData[index].personalPicture = pic
                                    if(index === (data.length-1)) {
                                        // if(cb) cb()
                                        _this.setState({
                                            homeResidentList: newData,
                                        })
                                    }
                                } else if(res.msg === "微服务异常" && !res.success) {
                                    
                                }
                            })
                        }
                    })
                } else {
                    this.setState({
                        homeResidentList: data,
                    })
                }


                // this.setState({
                //     homeResidentList: res.obj.data
                // })
            })
        } else {
            if(!layer){ 
                Modal.info({
                    title: '提示',
                    content: '请选择楼层',
                })
                return
            }
            // console.log(this.state.buildid)
            axios.ajax({
                url: WEI_HOMEPAGEHOUSING,
                data: {
                    params: {
                        userKey: userKey,
                        zoneId: id,
                        storiedBuildingId: buildid,
                        layer: layer
                    }
                }
            }).then((res)=>{
                // console.log(this.state.buildid)
                this.setState({
                    houseList: res.obj.housing,
                    layerInfo: {
                        layer: res.obj.layer,
                        buildName: Utils.getBuildingName(res.obj.storiedBuilding.name)
                    }
                })
            })
        }
        this.setState({
            silderVisible: true,
        });                
        if (slider) {
            var el = slider.el;
            if (el.querySelector('.slider__images-item--active')) {
                el.querySelector('.slider__images-item--active').classList.remove('slider__images-item--active');;
            }
            el.querySelector('.slider__images-item' + '[data-id=\'' + level + '\']').classList.add('slider__images-item--active');
        }
    }

    getLayer = (value) => {
        this.setState({
            layer: value
        });    
    }

    render(){
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '手机号',
                dataIndex: 'mobile',
                key: 'mobile',
                render: mobile => <span>{Utils.plusXingDe86(mobile, 7, 4, 4)}</span>,
            }, {
                title: '入住时间',
                key: 'modifyDate',
                dataIndex: 'modifyDate',
            }
        ];
        const {
            dimensional3D,
            dimensionalText,
            tmp,
            houseList,
            silderVisible,
            nativeVisible,
            layerInfo,
            building_info,
            homeResidentList,
            houseInfo,
            homePageTotal,
            realTime,
            historyUserTotal,
            numberRooms,
            userTotal,
            lastCheckIn,
            userName,
            lastLoginTime,
            residentList,
            houseNum,
            userKey,
            bgDom
        } = this.state        

        const FloatingFromAreaProps = {
            homePageTotal,
            getArea: this.getArea
        }

        const layer = 21
        var element = ''
        for (let index = 1; index <= layer; index++) {
            element += <Option>index</Option>;
        }

        return (
            // 整体
            <div className="largesreen-wrap">
                {bgDom}

                <div className="largesreen-logo">
                    <img src={logo}></img>浙江启融科技有限公司
                </div>
                <div className="largesreen-top">
                    <div className="largesreen-top-title clearfix">
                        <div className="largesreen-top-left fl">
                            <div className="largesreen-top-left-block now-date fl">
                                <div className="solar-calendar">{Utils.GetCurrentDate()}</div>
                                <div className="lunar-calendar">{Utils.showCal()}</div>
                            </div>
                            <div className="largesreen-top-left-block now-time fl">
                                <div className="week-info">{Utils.GetCurrentWeek()}</div>
                                <div className="time-info">{realTime}</div>
                            </div>
                            <div className="largesreen-top-left-block weather fl">
                                <div className="weather-icon fl">
                                    {/* <img src={'../../../assets/cond-icon/'+ this.state.cond_code +'.png'} alt="天气" className="weather-icon" /> */}
                                    {/* <img src={'http://www.help.bj.cn/weather/images/'+ this.state.cond_code +'.png'} alt="天气" className="weather-icon" /> */}
                                    <big className="jpg80 d01"></big>
                                </div>
                                <div className="temperature fl"><span className="temperature-value">{tmp}</span>℃</div>
                            </div>
                        </div>
                    </div>
                    <div className="largesreen-top-right fr">
                        <div className="toggle-button fl">
                            <Button className="square-btn blue-btn" size="default">切换后台</Button>
                        </div>
                        <div className="user-wrap fl">
                            <div className="user-top">
                                {userName} <Button className="blue-btn" size="default" onClick={this.logout}>退出账号</Button> <Button className="transparent-btn" onClick={this.changeBg}></Button> <Button className="transparent-btn" onClick={this.changeVideoSource}></Button>
                            </div>
                            <div className="last-login-time">
                                上次登录时间：{lastLoginTime}
                            </div>
                        </div>
                    </div>  
                </div>
                <div className="largesreen-middle">
                    <div className="gutter-example">
                        <Row gutter={16}>
                            <Col className="gutter-row largesreen-mid-side" span={6}>
                                <div className="gutter-box">
                                    <div className="block-title-left">各幢住客统计</div>
                                    <div id="bar-chart">
                                        <ReactEcharts option={this.getBarOption()} notMerge={true} lazyUpdate={true} style={{ height: "100%" }} />
                                    </div>
                                    <div className="block-title-left">住客原籍统计</div>
                                    <div id="pop-chart">
                                        {homePageTotal ? <FloatingFromArea {...FloatingFromAreaProps}/> : ''}
                                    </div>
                                    
                                </div>
                                <div className="gear_box gear_box1">
                                    <div className="gear gear1">
                                        <img src={Gear1} alt="gear_anticlockwise" style={{width: '67px'}} />
                                    </div>
                                    <div className="gear gear2">
                                        <img src={Gear2} alt="gear_clockwise" style={{width: '48px'}} />
                                    </div>
                                    <div className="gear gear3">
                                        <img src={Gear1} alt="gear_anticlockwise" style={{width: '54px'}} />
                                    </div>
                                </div>
                            </Col>
                            <Col className="gutter-row largesreen-mid-center" span={12}>
                                <div className="gutter-box">
                                    <div className="block-title-left">中天西城纪</div>
                                    <div className="block-title-right">当前空房数： {numberRooms} 套 当前住客数： {userTotal} 人</div>
                                    <div id="wrap-3d" style={{display: dimensional3D ? 'block': 'none'}}>
                                    </div>
                                    <div id="wrap-2d" style={{display: !dimensional3D ? 'block': 'none'}}>
                                        <img src={Plan} alt="平面图" className="" useMap="#zoomtmap" />
                                        <map name="zoomtmap" id="zoomtmap">
                                            <area shape="rect" coords="409,90,473,295" alt="1幢" title="1幢" onClick={this.modalHandleOpen.bind(this, "55", "build")} />
                                            <area shape="rect" coords="507,55,705,144" alt="2幢" title="2幢" onClick={this.modalHandleOpen.bind(this, "56", "build")} />
                                            <area shape="rect" coords="741,58,836,290" alt="3幢" title="3幢" onClick={this.modalHandleOpen.bind(this, "57", "build")} />
                                            <area shape="rect" coords="51,55,140,311" alt="4幢" title="4幢" onClick={this.modalHandleOpen.bind(this, "58", "build")} />
                                            <area shape="rect" coords="174,55,369,144" alt="5幢" title="5幢" onClick={this.modalHandleOpen.bind(this, "59", "build")} />
                                        </map>
                                    </div>         
                                    <div className="largesreen-mid-center-bottom">
                                        <div className="toggle-dimensional">
                                            <div className="dimensional-title" onClick={this.changeDimensional}>{dimensionalText}</div>
                                            {/* <div className="extre-fun">
                                                <div className="fun fun1">功能1</div>
                                                <div className="fun fun2">功能2</div>
                                                <div className="fun fun3">功能3</div>
                                                <div className="fun fun4">功能4</div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col className="gutter-row largesreen-mid-side" span={6}>
                                <div className="gutter-box">
                                    <div className="block-title-right">网约房状态</div>
                                    <div className="clearfix"></div>
                                    <div id="gauge-chart">
                                        <ReactEcharts option={this.getGaugeOption()} notMerge={true} lazyUpdate={true} style={{ height: "100%" }}/>
                                    </div>
                                    <div className="block-title-right" style={{marginTop: '-20px'}}>最新入住情况</div>
                                    <div className="clearfix"></div>
                                    <div className="table">
                                        <Table columns={columns} showHeader={false} dataSource={lastCheckIn} pagination={false} />
                                    </div>
                                    <div className="block-title-right">近十天入住人数</div>
                                    <div className="clearfix"></div>
                                    <div id="nowcheckin">{historyUserTotal}</div>
                                </div>
                                <div className="gear_box gear_box2">
                                    <div className="gear gear1">
                                        <img src={Gear1} alt="gear_anticlockwise" style={{width: '67px'}} />
                                    </div>
                                    <div className="gear gear2">
                                        <img src={Gear2} alt="gear_clockwise" style={{width: '48px'}} />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="largesreen-bottom">
                    <div className="largesreen-bottom-warp">
                        <div className="gutter-example">
                            <Row gutter={20}>
                                <Col className="gutter-row" span={5}>
                                    <div className="gutter-box">
                                        <i className="anticon">
                                            <img src={BottomIcon1} alt="住客管理" className="menu_btn" />
                                        </i>
                                        <span className="anticon-class">
                                            <span className="ant-badge">住客管理</span>
                                        </span>                                    
                                    </div>
                                </Col>
                                <Col className="gutter-row" span={5}>
                                    <div className="gutter-box">
                                        <i className="anticon">
                                            <img src={BottomIcon2} alt="房屋管理" className="menu_btn" />
                                        </i>
                                        <span className="anticon-class">
                                            <span className="ant-badge">房屋管理</span>
                                        </span>
                                    </div>
                                </Col>
                                <Col className="gutter-row" span={5}>
                                    <div className="gutter-box">
                                        <i className="anticon">
                                            <img src={BottomIcon3} alt="设备管理" className="menu_btn" />
                                        </i>
                                        <span className="anticon-class">
                                            <span className="ant-badge">设备管理</span>
                                        </span>                                    
                                    </div>
                                </Col>
                                <Col className="gutter-row" span={5}>
                                    <div className="gutter-box">
                                        <i className="anticon">
                                            <img src={BottomIcon4} alt="监控播放" className="menu_btn" />
                                        </i>
                                        <span className="anticon-class">
                                            <span className="ant-badge">监控播放</span>
                                        </span>
                                    </div>
                                </Col>
                                <Col className="gutter-row" span={5}>
                                    <div className="gutter-box">
                                        <i className="anticon">
                                            <img src={BottomIcon5} alt="大屏设置" className="menu_btn" />
                                        </i>
                                        <span className="anticon-class">
                                            <span className="ant-badge">大屏设置</span>
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>  

                <Modal
                    className="silderModal"
                    visible={silderVisible}
                    onCancel={this.modalHandleCancel}
                    footer={null}
                    width={"100%"}
                >
                    {this.FullSlide()}

                    <div className="slider" id="slider"> 
                        <div className="slider__content" id="slider-content">
                            <div className="slider__images">
                                {/* 楼幢信息 */}
                                {/* slider__images-item--active */}
                                <div className="slider__images-item slider__images-item--active" data-id="build">
                                    <div className="slider_info_block">
                                        <div className="slider_info_left fl">
                                            <img src={BuildOutLook} />
                                        </div>
                                        <div className="slider_info_right fr">
                                            <div className="slider_info_title">
                                                <img src={SilderTitle1} />
                                            </div>
                                            <div className="slider_info_main">
                                                <div className="slider_info_head">{building_info.zoneName}{building_info.storiedBuildingName ? Utils.getBuildingName(building_info.storiedBuildingName): ''}<span>楼层数：{building_info.layer}</span></div>
                                                <Select style={{ width: 120 }}
                                                    onChange={this.getLayer}
                                                >
                                                    {this.buildOption(building_info.layer)}                           
                                                </Select>
                                                <Button onClick={this.changeSliderActive.bind(this, '', "floor", '')} type="primary">进入楼层</Button>
                                                {/* <div className="slider_info_tab clearfix">
                                                    <UnitTab length={building_info.unit} modalHandleCancel={this.modalHandleOpen.bind(this, "1", "unit")}/>
                                                </div> */}
                                                <div className="slider_info_sub_head">房屋数量：{building_info.housingTotal}套</div>		
                                                <div className="slider_info_label clearfix">
                                                    <div className="slider_info_label_item type_personal">自住：{building_info.personalUse}</div>
                                                    <div className="slider_info_label_item type_rant">长租：{building_info.rentOut}</div>
                                                    <div className="slider_info_label_item type_internet">网约：{building_info.Internet}</div>
                                                    <div className="slider_info_label_item type_vacant">空置：{building_info.idle}</div>
                                                </div>	                                                
                                                <div className="slider_info_sub_head">住户人数：{building_info.userTotal}人</div>		
                                                <div className="slider_info_label clearfix">
                                                    <div className="slider_info_label_item">常住人口：{building_info.longTimeTotal}</div>
                                                    <div className="slider_info_label_item">流动人口：{building_info.userTotal-building_info.longTimeTotal}</div>
                                                </div>
                                                <div className="slider_info_sub_head">年龄分布</div>	
                                                <div id="slider_chart1" style={{height: '230px', marginTop: '-50px'}}>
                                                    <ReactEcharts option={this.getSliderYearBarOption()} notMerge={true} lazyUpdate={true} style={{ height: "100%" }} />
                                                </div>				
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* 楼层信息 */}
                                <div className="slider__images-item" data-id="floor">
                                        <div className="btn_block">
                                            <Button onClick={this.changeSliderActive.bind(this, '', 'build', '')} type="primary">返回</Button>        
                                        </div>
                                        <div>
                                            <div className="slider_info_head">{layerInfo.buildName}<span>第{layerInfo.layer}层</span></div>
                                            <Row className="slider_info_usage_tab">
                                                <Col span={24} className="data_info_right_1_item">
                                                    <Col span={6} className="data_info_right_1_item_item">
                                                    <div className="">
                                                        <div className="data_info_right_buttom_text">
                                                        <Tag color="blue">自住</Tag>
                                                        </div>
                                                    </div>
                                                    </Col>
                                                    <Col span={6} className="data_info_right_1_item_item">
                                                    <div className="">
                                                        <div className="data_info_right_buttom_text">
                                                        <Tag color="green">出租</Tag>
                                                        </div>
                                                    </div>
                                                    </Col>
                                                    <Col span={6} className="data_info_right_1_item_item">
                                                    <div className="">
                                                        <div className="data_info_right_buttom_text">
                                                        <Tag color="red">群租</Tag>
                                                        </div>
                                                    </div>
                                                    </Col>
                                                    <Col span={6} className="data_info_right_1_item_item">
                                                    <div className="">
                                                        <div className="data_info_right_buttom_text">
                                                        <Tag color="yellow">网约</Tag>
                                                        </div>
                                                    </div>
                                                    </Col>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                {houseList?this.HouseCol(houseList):''} 
                                            </Row>
                                        </div>
                                </div>
                                {/* 房屋信息 */}
                                <div className="slider__images-item" data-id="house">
                                    <div className="slider_info_block">
                                        <div className="btn_block">
                                            <Button onClick={this.changeSliderActive.bind(this, '', 'floor', '')} type="primary">返回</Button>        
                                        </div>
                                        <div className="slider_info_left fl">
                                            <img src={houseInfo?houseInfo.pictureAddress?houseInfo.pictureAddress:plan1:plan1 } />
                                        </div>
                                        <div className="slider_info_right fr">
                                            <div className="slider_info_title">
                                                <img src={SilderTitle4} />
                                            </div>
                                            <div className="slider_info_main">
                                                <div className="slider_info_head">{Utils.getRoomNum(houseNum)}<span> 类型：{houseInfo.usage?this.getUsage(houseInfo.usage):''}</span></div>
                                                <div className="slider_info_text">建筑面积: {houseInfo.area?houseInfo.area:'0'}㎡</div>
                                                <div className="slider_info_text">房东姓名：{houseInfo.name?houseInfo.name:'未知'}</div>
                                                <div className="slider_info_text">联系方式: {houseInfo.mobile?houseInfo.mobile:'未知'}</div>
                                                <div className="slider_info_text">当前居住人数: {houseInfo.total?houseInfo.total:'0'}人</div>
                                                <div className="slider_info_text">入住时间：{homeResidentList && homeResidentList[0] ? homeResidentList[0].createDate : '未知'}</div>
                                                <div className="slider_info_text">预计退房时间：{houseInfo.liveEnd?houseInfo.liveEnd:'未知'}</div>                                               
                                                <div className="person_info" style={{height: '19vw', overflow: 'auto', marginTop: '5px'}}>
                                                    {
                                                        homeResidentList.map((item, index) => {                                                
                                                        // if(item.file) {
                                                            return (
                                                            <li className="resident_info_item" key={index}>
                                                                <Row>
                                                                    <Col span={6} className="resident_img_item" >
                                                                        <img src={item.personalPicture} alt=""/>
                                                                    </Col>
                                                                    <Col span={18}>
                                                                        <Row>
                                                                            <Col span={12}>
                                                                                <div className="resident_info_item_content">
                                                                                    <ul>
                                                                                        <li>
                                                                                            <label>姓名:</label>
                                                                                            <span>{item.name}</span> 
                                                                                        </li>
                                                                                        <li>
                                                                                            <label>性别:</label>
                                                                                            <span>{item.gender == 'male' ? '男' : '女'}</span> 
                                                                                        </li>
                                                                                        <li>
                                                                                            <label>民族:</label>
                                                                                            <span>{item.racial}</span> 
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </Col>
                                                                            <Col span={12}>
                                                                                <div className="resident_info_item_content">
                                                                                    <ul>
                                                                                        <li>
                                                                                            <label>年龄:</label>
                                                                                            <span>{Utils.howOld(item.birthDate)}</span> 
                                                                                        </li>
                                                                                        <li>
                                                                                            <label>人员类型:</label>
                                                                                            <span>{item.flowIsPermanent}</span> 
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                        <Col span={24}>
                                                                            <div className="resident_info_item_content_idCard">
                                                                                <ul>
                                                                                    <li>
                                                                                        <label>籍贯:</label>
                                                                                        <span>{item.nativePlace}</span>
                                                                                    </li>
                                                                                    <li>
                                                                                        <label>身份证号:</label>
                                                                                        <span>{Utils.plusXing(item.idCard, 9, 0)}</span>
                                                                                    </li>
                                                                                    <li>
                                                                                        <label>房间号:</label>
                                                                                        <span>{item.housingAddress}</span>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </Col> 
                                                                        </Row>                                                                    
                                                                    </Col>
                                                                </Row>
                                                            </li>
                                                            )
                                                        // }
                                                        })
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal
                    className="silderModal"
                    visible={nativeVisible}
                    onCancel={this.nativeModalHandleCancel}
                    footer={null}
                    width={"100%"}
                >
                    {this.FullSlide()}
                    <div className="slider" id="slider2"> 
                        <div className="slider__content" id="slider-content2">
                            <div className="slider__images">
                                {/* 居民信息 */}
                                <div className="slider__images-item slider__images-item--active" data-id="user">
                                    <div className="slider_info_block">
                                        <div className="slider_info_right" style={{width: '100%'}}>
                                            <div className="slider_info_title">
                                                <img src={SilderTitle6} />
                                            </div>
                                            <div className="slider_info_main">                                     
                                                <div className="person_info" style={{height: '19vw', overflow: 'auto', marginTop: '5px', height: '28vw'}}>
                                                    {
                                                        residentList.map((item, index) => {
                                                            return (
                                                            <li className="resident_info_item item_half" style={{width: '48%', float: 'left', marginRight: '1%'}} key={index}>
                                                                <Row>
                                                                <Col span={6} className="resident_img_item" >
                                                                    <img src={item.personalPicture} alt=""/>
                                                                </Col>
                                                                <Col span={18}>
                                                                    <Row>
                                                                    <Col span={12}>
                                                                        <div className="resident_info_item_content">
                                                                            <ul>
                                                                                <li>
                                                                                    <label>姓名:</label>
                                                                                    <span>{item.name}</span> 
                                                                                </li>
                                                                                <li>
                                                                                    <label>性别:</label>
                                                                                    <span>{item.gender == 'male' ? '男' : '女'}</span> 
                                                                                </li>
                                                                                <li>
                                                                                    <label>民族:</label>
                                                                                    <span>{item.racial}</span> 
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <div className="resident_info_item_content">
                                                                            <ul>
                                                                                <li>
                                                                                    <label>年龄:</label>
                                                                                    <span>{Utils.howOld(item.birthDate)}</span> 
                                                                                </li>
                                                                                <li>
                                                                                    <label>人员类型:</label>
                                                                                    <span>{item.flowIsPermanent}</span> 
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </Col>
                                                                    </Row>
                                                                    <Row>
                                                                    <Col span={24}>
                                                                        <div className="resident_info_item_content_idCard">
                                                                            <ul>
                                                                                <li>
                                                                                    <label>籍贯:</label>
                                                                                    <span>{item.nativePlace}</span>
                                                                                </li>
                                                                                <li>
                                                                                    <label>身份证号:</label>
                                                                                    <span>{Utils.plusXing(item.idCard, 9, 0)}</span>
                                                                                </li>
                                                                                <li>
                                                                                    <label>房间号:</label>
                                                                                    <span>{item.housingAddress}</span>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </Col> 
                                                                    </Row>                                                                    
                                                                </Col>
                                                                </Row>                                                                
                                                            </li>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal
                    title="更换视频源"
                    visible={this.state.videoSourceVisible}
                    onOk={this.videoSourceHandleOk}
                    onCancel={this.videoSourceHandleCancel}
                >
                    <Input id="videoSource"/>
                </Modal>



                <style>{"\
                        .silderModal .ant-modal-content{\
                            background-color: transparent!important;\
                            box-shadow: none!important;\
                        }\
                "}</style>
            </div>
        );
    }
}