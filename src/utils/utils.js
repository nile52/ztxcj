import React from 'react';
import { Select } from 'antd'
const Option = Select.Option;

// 农历信息
var CalendarData=new Array(100);
var madd=new Array(12);
var tgString="甲乙丙丁戊己庚辛壬癸";
var dzString="子丑寅卯辰巳午未申酉戌亥";
var numString="一二三四五六七八九十";
var monString="正二三四五六七八九十冬腊";
var weekString="日一二三四五六";
var sx="鼠牛虎兔龙蛇马羊猴鸡狗猪";
var cYear,cMonth,cDay,TheDate;
CalendarData = new Array(0xA4B,0x5164B,0x6A5,0x6D4,0x415B5,0x2B6,0x957,0x2092F,0x497,0x60C96,0xD4A,0xEA5,0x50DA9,0x5AD,0x2B6,0x3126E, 0x92E,0x7192D,0xC95,0xD4A,0x61B4A,0xB55,0x56A,0x4155B, 0x25D,0x92D,0x2192B,0xA95,0x71695,0x6CA,0xB55,0x50AB5,0x4DA,0xA5B,0x30A57,0x52B,0x8152A,0xE95,0x6AA,0x615AA,0xAB5,0x4B6,0x414AE,0xA57,0x526,0x31D26,0xD95,0x70B55,0x56A,0x96D,0x5095D,0x4AD,0xA4D,0x41A4D,0xD25,0x81AA5,0xB54,0xB6A,0x612DA,0x95B,0x49B,0x41497,0xA4B,0xA164B, 0x6A5,0x6D4,0x615B4,0xAB6,0x957,0x5092F,0x497,0x64B, 0x30D4A,0xEA5,0x80D65,0x5AC,0xAB6,0x5126D,0x92E,0xC96,0x41A95,0xD4A,0xDA5,0x20B55,0x56A,0x7155B,0x25D,0x92D,0x5192B,0xA95,0xB4A,0x416AA,0xAD5,0x90AB5,0x4BA,0xA5B, 0x60A57,0x52B,0xA93,0x40E95);
madd[0]=0;
madd[1]=31;
madd[2]=59;
madd[3]=90;
madd[4]=120;
madd[5]=151;
madd[6]=181;
madd[7]=212;
madd[8]=243;
madd[9]=273;
madd[10]=304;
madd[11]=334;

var D=new Date();
var yy=D.getFullYear();
var mm=D.getMonth()+1;
var dd=D.getDate();
var ww=D.getDay();
var ss=parseInt(D.getTime() / 1000);
if (yy<100) yy="19"+yy;




export default {
    addZero(data){
        if (data<10) {
            data = "0"+data
        }
        return data
    },
    formateDate(time){
        if(!time)return '';
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    },
    lasttime(){
        var timestamp = Date.parse(new Date());
        let date = new Date(timestamp-6666666);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+this.addZero(date.getHours())+':'+this.addZero(date.getMinutes())+':'+this.addZero(date.getSeconds());
    },
    pagination(data,callback){
        return {
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total: data.result.total_count,
            showTotal:()=>{
                return `共${data.result.total_count}条`
            },
            showQuickJumper:true
        }
    },
    // 格式化金额,单位:分(eg:430分=4.30元)
    formatFee(fee, suffix = '') {
        if (!fee) {
            return 0;
        }
        return Number(fee).toFixed(2) + suffix;
    },
    // 格式化公里（eg:3000 = 3公里）
    formatMileage(mileage, text) {
        if (!mileage) {
            return 0;
        }
        if (mileage >= 1000) {
            text = text || " km";
            return Math.floor(mileage / 100) / 10 + text;
        } else {
            text = text || " m";
            return mileage + text;
        }
    },
    // 隐藏手机号中间4位
    formatPhone(phone) {
        phone += '';
        return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2')
    },
    // 隐藏身份证号中11位
    formatIdentity(number) {
        number += '';
        return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2')
    },
    getOptionList(data){
        if(!data){
            return [];
        }
        let options = [] //[<Option value="0" key="all_key">全部</Option>];
        data.map((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    },
    /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows
            })
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            })
        }
    },
    // 获取当前日期-中文年月日
    GetCurrentDate() {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var date = d.getDate();
        var curDateTime = year;
        if (month > 9)
            curDateTime = curDateTime + "年" + month;
        else
            curDateTime = curDateTime + "年0" + month;
        if (date > 9)
            curDateTime = curDateTime + "月" + date + "日";
        else
            curDateTime = curDateTime + "月0" + date + "日";
        return curDateTime;
    },
    // 获取当前日期-时分
    GetCurrentTime() {
        var d = new Date();
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var seconds = d.getSeconds();
        var ms = d.getMilliseconds();
        var curDateTime = '';
        if (hours > 9)
            curDateTime = curDateTime + " " + hours;
        else
            curDateTime = curDateTime + " 0" + hours;
        if (minutes > 9)
            curDateTime = curDateTime + ":" + minutes;
        else
            curDateTime = curDateTime + ":0" + minutes;
        // if (seconds > 9)
        //     curDateTime = curDateTime + ":" + seconds;
        // else
        //     curDateTime = curDateTime + ":0" + seconds;
        return curDateTime;
    },    
    // 获取当前日期-中文星期
    GetCurrentWeek() {
        var d = new Date();
        var week = d.getDay();
        var weekday = "";
        if (week == 0)
            weekday = "星期日";
        else if (week == 1)
            weekday = "星期一";
        else if (week == 2)
            weekday = "星期二";
        else if (week == 3)
            weekday = "星期三";
        else if (week == 4)
            weekday = "星期四";
        else if (week == 5)
            weekday = "星期五";
        else if (week == 6)
            weekday = "星期六";
        return weekday;
    },


    // 获取当天农历
    GetBit(m,n){  
        return (m>>n)&1;
    },
    e2c(){
        TheDate= (arguments.length!=3) ? new Date() : new Date(arguments[0],arguments[1],arguments[2]);
        var total,m,n,k;
        var isEnd=false;
        var tmp=TheDate.getYear();
        if(tmp<1900){
            tmp+=1900;
        }
        total=(tmp-1921)*365+Math.floor((tmp-1921)/4)+madd[TheDate.getMonth()]+TheDate.getDate()-38; 
        if(TheDate.getYear()%4==0&&TheDate.getMonth()>1) {
            total++;
        }
        for(m=0;;m++){
            k=(CalendarData[m]<0xfff)?11:12;
            for(n=k;n>=0;n--){
                if(total<=29+this.GetBit(CalendarData[m],n)){
                    isEnd=true; break;
                }
                total=total-29-this.GetBit(CalendarData[m],n);
            }
            if(isEnd) break;
        }
        cYear=1921 + m;
        cMonth=k-n+1;
        cDay=total;
        if(k==12){
            if(cMonth==Math.floor(CalendarData[m]/0x10000)+1){
                cMonth=1-cMonth;
            }
            if(cMonth>Math.floor(CalendarData[m]/0x10000)+1){
                cMonth--;
            }
        }
    },
    GetcDateString(){
        var tmp="";
        tmp+=tgString.charAt((cYear-4)%10);
        tmp+=dzString.charAt((cYear-4)%12);
        tmp+="(";
        tmp+=sx.charAt((cYear-4)%12);
        tmp+=")年 ";
        if(cMonth<1){
            tmp+="(闰)";
            tmp+=monString.charAt(-cMonth-1);
        }else{
            tmp+=monString.charAt(cMonth-1);
        }
        tmp+="月";
        tmp+=(cDay<11)?"初":((cDay<20)?"十":((cDay<30)?"廿":"三十"));
        if (cDay%10!=0||cDay==10){
            tmp+=numString.charAt((cDay-1)%10);
        }
        return tmp;
    },
    GetLunarDay(solarYear,solarMonth,solarDay){
        //solarYear = solarYear<1900?(1900+solarYear):solarYear;
        if(solarYear<1921 || solarYear>2020){
            return "";
        }else{
            solarMonth = (parseInt(solarMonth)>0) ? (solarMonth-1) : 11;
            this.e2c(solarYear,solarMonth,solarDay);
            return this.GetcDateString();
        }
    },
    showCal(){
        return this.GetLunarDay(yy,mm,dd)
    },

    compare(property, word){
        return function(a, b){
            var value1 = Number(a[property].split(word)[1]);
            var value2 = Number(b[property].split(word)[1]);
            return value2 - value1;
        }
    },

    isNumber(val){
        var regPos = /^\d+(\.\d+)?$/; //非负浮点数
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
        if(regPos.test(val) || regNeg.test(val)){
            return true;
        }else{
            return false;
        }
    },


    // 判断系统
    isIOS() {
        var isIphone = navigator.userAgent.includes('iPhone')
        var isIpad = navigator.userAgent.includes('iPad');
        return isIphone || isIpad;
    },

    queryString(){
        let _queryString = {};
        const _query = window.location.search.substr(1);
        const _vars = _query.split('&');
        _vars.forEach((v, i) => {
            const _pair = v.split('=');
            if (!_queryString.hasOwnProperty(_pair[0])) {
                _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
            } else if (typeof _queryString[_pair[0]] === 'string') {
                const _arr = [ _queryString[_pair[0]], decodeURIComponent(_pair[1])];
                _queryString[_pair[0]] = _arr;
            } else {
                _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
            }
        });
        return _queryString;
    },

    // 跳转登录页
    toLoginUrl(loginUrl) {
        window.location.href = loginUrl
    },



    // 生成新的导航栏
    createMenu(firstAuth, listAuth) {
        let itemMenu = {}
        itemMenu.key = firstAuth.value
        itemMenu.title = firstAuth.name
        itemMenu.sub = listAuth.map(function(item) {
            return { key: item.value, title: item.name, icon: '', }
        })
        return itemMenu
    },

    // 身份证号校验
    isShenFenZheng(id){
        var format = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
        //号码规则校验
        if(!format.test(id)){
            return {'status':0,'msg':'身份证号码不合规'};
        }
        return {'status':1,'msg':'校验通过'}
    },
    // 车牌号校验
    isCarNumber(vehicleNumber){
        var xreg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
        var creg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
        if(vehicleNumber.length == 7){
            return creg.test(vehicleNumber);
        } else if(vehicleNumber.length == 8){
            return xreg.test(vehicleNumber);
        } else{
            return false;
        }
    },

    howOld(birthDate){
        let now = new Date().getFullYear();
        let birthDateYear = birthDate.split('-')[0]
        let old = now - birthDateYear
        return old
        // let now = new Date().getTime();
        // let hours = (now - birthDate)/1000/60/60;
        // let year = Math.floor(hours / (24 * 30 * 12));
        // hours = hours % (24 * 30 * 12);
        // let months = Math.floor(hours / (24 * 30 ));
        // hours = hours % (24 * 30 );
        // let days = Math.floor(hours / (24));
        // return {
        //     years: year,
        //     months: months,
        //     days: days
        // }
    },

    timeToDate(time){
        let date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let year = date.getFullYear()
        let month = date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth() + 1;
        let day = date.getDate()
        return year + '-' + month + '-' + day;
    },
    
    timeToHMS(time){
        let date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let year = date.getFullYear();
        let month = date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth() + 1;
        let day = date.getDate()< 10 ? '0' + date.getDate() : date.getDate();
        let hour = date.getHours()< 10 ? '0' + date.getHours() : date.getHours();
        let minute = date.getMinutes()< 10 ? '0' + date.getMinutes() : date.getMinutes();
        let second = date.getSeconds()< 10 ? '0' + date.getSeconds() : date.getSeconds();
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    },
    
    // 居民房屋信息关联-本地数据转成服务端要求的格式
    houseLocalToServer(houstList, type){
        const relationHouseJson = {0:'本人', 6:'租客', 2:'配偶', 3:'子女', 4:'孙子女', 5:'祖父母', 7:'其他亲属', 8:'朋友', 9:'其他', 10:'二房东', 11:'退租'}
        if(houstList.length > 0) {
            if(type == 'edit') {
                return houstList.map((item, index) => {
                    if(!(item.isAdd && item.delete)) {
                        return {
                            "housingId": item.housingId,
                            "consistent": item.consistent == '1' ? true : false,
                            "dwell": item.dwell == '1' ? true : false,
                            "id": item.id,
                            "userId": item.userId,
                            "delete": item.delete?true:false,
                            "relation": relationHouseJson[item.relation]
                        }
                    }
                    
                })
            } else if (type == 'add') {
                return houstList.map((item, index) => {
                    if(item.isAdd && !item.id) {
                        return {
                            "housingId": item.housingId,
                            "consistent": item.consistent == '1' ? true : false,
                            "dwell": item.dwell == '1' ? true : false,
                            "delete": item.delete?true:false,
                            "relation": relationHouseJson[item.relation]
                        }
                    }
                })
            }
        } else {
            return []
        }  
    },
    
    // 居民车位信息关联-本地数据转成服务端要求的格式
    parkLocalToServer(parkList, type){
        const positionTypeJson = {'0': '公有', '1': '专属', '2': '自有', '3': '私有', '4': '其他'}
        if (type == 'edit') {
            //{"positionType":"自有","id":55,"userId":0}
            return parkList.map((item, index) => {
                return {
                    "id": item.id,
                    "userId": item.userId,
                    "positionType": item.positionType,
                    "parkingLotId": item.parkingLotId,
                    "parkingSpaceCoding": item.parkingSpaceCoding,
                    "expireDate": item.expireDate,
                }
            })
        } else if (type == 'add') {
            return parkList.map((item, index) => {
                return {
                    "positionType": item.positionType,
                    "parkingLotId": item.parkingLotId,
                    "parkingSpaceCoding": item.parkingSpaceCoding,
                    "expireDate": item.expireDate,
                }
            })
        }  
    },
    
    // 转化房屋状态
    getHouseUsage(usage){
        const positionTypeJson = {
            'rentOut': '出租', 
            'personalUse': '自住', 
            'other': '其他', 
            'groupLive': '群租', 
            'idle': '闲置', 
            'closeDown': '查封', 
            'Internet': '网约'
        }
        return positionTypeJson[usage]
    },

    getHouseUsageCode(usage){
        const positionTypeJson = {
            '出租': 'rentOut', 
            '自住': 'personalUse', 
            '其他': 'other', 
            '群租': 'groupLive', 
            '闲置': 'idle', 
            '查封': 'closeDown', 
            '网约': 'Internet'
        }
        return positionTypeJson[usage]
    },
    
    // 获取楼幢名称
    getBuildingName(ever){
        let newEver = ''
        let newEverArr = ever.split('-')
        let newEverArrLength = newEverArr.length
        if( newEverArrLength > 1) {
            newEver = newEverArr[newEverArrLength -1]
        } else {
            newEver = ever
        }
        return newEver
    },

    // 转换房间号
    getRoomNum(ever){
        let newEver = ''
        let newEverArr = ever.split('-') // ["4", "1", "2", "1011"]
        let newEverArrLength = newEverArr.length
        if( newEverArrLength > 1) {
            newEver = newEverArr[0] + '幢' + newEverArr[1] + '单元' + newEverArr[3]
        } else {
            newEver = ever
        }
        return newEver
    },

    // 身份证、手机号加*
    plusXing(str, frontLen, endLen){
        var len = str.length - frontLen - endLen
        var xing = ''
        for(let i = 0; i < len; i++) {
            xing += "*"
        }
        return str.substr(0, frontLen) + xing + str.substr(str.length - endLen)
    },
    
    // 手机号砍+86，加星
    plusXingDe86(str, frontLen, endLen, saveLen) {
        var len = str.length - frontLen - endLen
        var xing = ''
        for(let i = 0; i < len; i++) {
            xing += "*"
        }
        var xingStr = str.substr(0, frontLen) + xing + str.substr(str.length - endLen)
        return xingStr.slice(saveLen); 
    },
    
    IdCardBGY(UUserCard,num){
        if(num==1){
            //获取出生日期
            var birth=UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
            return birth;
        }
        if(num==2){
            //获取性别
            if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
                //男
                return "男";
            } else {
                //女
                return "女";
            }
        }
        if(num==3){
            //获取年龄
            var myDate = new Date();
            var month = myDate.getMonth() + 1;
            var day = myDate.getDate();
            var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
            if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
                age++;
            }
            return age;
        }
        if(num==4) {
            var area = { 11: "北京市", 12: "天津市", 13: "河北省", 14: "山西省", 15: "内蒙古自治区",
                21: "辽宁省", 22: "吉林省", 23: "黑龙江省", 31: "上海市", 32: "江苏省",
                33: "浙江省", 34: "安徽省", 35: "福建省", 36: "江西省", 37: "山东省", 41: "河南省", 42: "湖北省",
                43: "湖南省", 44: "广东省", 45: "广西壮族自治区",
                46: "海南省", 50: "重庆市", 51: "四川省", 52: "贵州省", 53: "云南省", 54: "西藏自治区", 61: "陕西省",
                62: "甘肃省", 63: "青海省", 64: "宁夏回族自治区",
                65: "新疆维吾尔自治区", 71: "台湾省", 81: "香港特别行政区", 82: "澳门特别行政区", 91: "国外"
            }
            var provinceName = "";
            var provinceNo = UUserCard.substr(0, 2);
            if (area[parseInt(provinceNo)] != null) {
                provinceName = area[parseInt(provinceNo)];
            }
            return provinceName;
        }
    },
    
    getStyle(el, name){　　
        if (window.getComputedStyle) {　　　
          return window.getComputedStyle(el, null);　　
        } else {　　　
          return el.currentStyle;　　
        }　
    },
    
    // JS获取url参数
    getQueryVariable(variable){
        var query = window.location.pathname;
        var vars = query.split(variable+"/");
        if (vars && vars[1]) {
            var pair = vars[1].split("/");
            return pair[0];        
        } else {
            return (false);   
        }
    },
    
    // 小区名称
    getZoneName(variable){
        let name = ''
        switch (variable) {
            case '3': name = '蔡马人家'
                break;
            case '21': name = '中铁建'
                break;   
            default:
                break;
        }
    },
    
}







