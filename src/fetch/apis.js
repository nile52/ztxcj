const IP_URL = "http://192.168.0.111" 
const ALIYUN_URL = "https://consume.zjqrkj.cn" //阿里云 http://47.100.230.100 http://192.168.0.25
const HTTP_ALIYUN_URL = "https://www.zjqrkj.cn" //http+域名 阿里云
const HTTPS_ALIYUN_URL = "https://www.zjqrkj.cn" //https+域名 阿里云
const HTTPS_WEI_ALIYUN_URL = "https://zjqrkj.cn:8088/consume"
// 智慧小区后台接口
export const CAS_URL = HTTP_ALIYUN_URL + ''
export const WEI_URL = ALIYUN_URL + ''
// export const CAS_URL = HTTP_ALIYUN_URL
// export const WEI_URL = ALIYUN_URL
export const CAS_LOGIN = CAS_URL + "/"
// 用户授权码是否可用
export const CAS_CASCHECK = CAS_URL + '/casCheck'
// 用户内容获取
export const CAS_USERNAME = CAS_URL + '/userName'
// 用户拥有小区数量
export const CAS_XQLIST = WEI_URL + '/rpc/zoneController/getZone'
// 用户退出登录
export const CAS_LOGOUT = CAS_URL + '/logoutUser'
// 获取大华url
export const WEI_ZONE_SYSTEM = WEI_URL + '/rpc/zoneController/zoneSystem'
// 获取天气
export const WEI_WEATHER = WEI_URL + '/rpc/weatherController/selectWeather'
// 首页大屏数据
export const WEI_HOMEPAGETOTAL = WEI_URL + '/rpc/homePageController/homePageTotal'
// 大屏楼栋信息
export const WEI_HISTOGRAM = WEI_URL + '/rpc/homePageController/histogram'
// 最新入住情况
export const WEI_SELECTUSER = WEI_URL + '/rpc/userController/selectUser'
// 楼栋详细信息
export const WEI_HOMEPAGEBUILDING = WEI_URL + '/rpc/homePageController/homePageStoriedBuilding'
// 房屋信息
export const WEI_HOMEPAGEHOUSING = WEI_URL + '/rpc/homePageController/homePageHousing'
// 房屋信息查询
export const WEI_GETHOUSING = WEI_URL + '/rpc/homePageController/getHousing'
// 查询房屋居住人
export const WEI_GETHOUSINGUSER = WEI_URL + '/rpc/userController/selectUser'
// 居民查询
export const WEI_RESIDENT = WEI_URL + '/rpc/userController/selectUser'
// 获取头像地址
export const WEI_RESIDENT_PICTURE = WEI_URL + '/rpc/userController/picture'
// 最新入住
export const WEI_HOTAL_RESIDENT = WEI_URL + '/rpc/userController/selectHotelUser'