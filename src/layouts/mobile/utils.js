function getCookie(c_name) {
  var i,
    x,
    y,
    ARRcookies = document.cookie.split(";");
  for (i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x == c_name) {
      return y;
    }
  }
  return "";
}
function setCookie(c_name, value, exdays, domain) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value =
    escape(value) +
    (exdays == null
      ? ""
      : "; expires=" + exdate.toUTCString() + ";domain=" + domain + ";path=/");
  document.cookie = c_name + "=" + c_value;
}
export function deleteCookies() {
  var count = 0;
  if (document.cookie != "") {
    var cookies = document.cookie.split("; ");
    count = cookies.length;
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + -1);
    for (var i = 0; i < count; i++) {
      var cookieName = cookies[i].split("=")[0];
      setCookie(cookieName, "", -1, ".jahwa.co.kr");
    }
  }
}

export function setSessionCookie(c_name, value, domain) {
  var c_value = escape(value) + " ; domain=" + domain + ";path=/";
  document.cookie = c_name + "=" + c_value;
}
function setLanguage() {
  var strLanguage = "";
  if (strLanguage == "") strLanguage = getCookie("Language");
  if (strLanguage == "") {
    if (navigator.appName == "Netscape") strLanguage = navigator.language;
    else strLanguage = navigator.browserLanguage;
    if (strLanguage.length == 2) {
      switch (strLanguage.toUpperCase()) {
        case "EN":
          strLanguage = "en-US";
          break;
        case "VI":
          strLanguage = "vi-VN";
          break;
        case "KO":
          strLanguage = "ko-KR";
          break;
        case "ZH":
          strLanguage = "zh-CN";
          break;
        default:
          strLanguage = "ko-KR";
      }
    }
  }
  var arrLang = new Array();
  arrLang = strLanguage.split("-");
  arrLang[0] = arrLang[0].toLowerCase();
  if (arrLang.length > 1) arrLang[1] = arrLang[1].toUpperCase();
  strLanguage = arrLang.join("-");
  return strLanguage;
}
function makeMessage(code, data) {
  var msgCode = translateData(code);
  var arrData = data.split("♭");
  for (var i = 0; i < arrData.length; i++) {
    msgCode = msgCode.setReplaceAll("@" + i, translateData(arrData[i]));
  }
  return msgCode;
}
function translateData(code) {
  var returnData = code;
  var strLanguage = setLanguage();
  if (typeof Dictionary != "undefined" && Dictionary != null && code != null) {
    var json = $.parseJSON(Dictionary);
    $.each(json.DD, function (i, v) {
      if (
        v.Code.toUpperCase() == code.toUpperCase() &&
        v.Lang.toUpperCase() == strLanguage.toUpperCase()
      ) {
        returnData = v.Name;
      }
    });
  }
  return returnData;
}

export async function checkCookieNSession() {
  var strMessage = "";
  var strLanguage = setLanguage();
  if (getCookie("Language") == null || getCookie("Language") == "")
    setCookie("Language", strLanguage, 1, ".jahwa.co.kr");
  if (
    // getCookie("JHTokenA") == null ||
    // getCookie("JHTokenA") == "" || // công nhân không có tokenA
    getCookie("JHTokenB") == null ||
    getCookie("JHTokenB") == "" ||
    getCookie("JHTokenC") == null ||
    getCookie("JHTokenC") == ""
  ) {
    return false;
    // return "로그인 정보가 존재하지 않습니다.\n로그인을 먼저 진행해 주시기 바랍니다.\nLogin Information does not exist.\nPlease login first.";
  } else if (
    //Cái này để làm gì ta?
    // getCookie("GWLevel") == null ||
    // getCookie("GWLevel") == "" ||
    getSession("EntCode") == null ||
    getSession("EntCode") == "" ||
    // getSession("DeptCode") == null ||
    // getSession("DeptCode") == "" || Cái này hình như là bị bỏ rồi hay sao ấy
    getSession("EmpCode") == null ||
    getSession("EmpCode") == ""
  ) {
    // const res = await httpPost(
    //   "https://sso.jahwa.co.kr/Common/Util/CheckCookieNSession.aspx",
    // );
    // return !res.data;
  }

  // try {
  //   const res = await httpPost(
  //     "https://sso.jahwa.co.kr/Common/Util/CheckCookieNSession.aspx",
  //   );
  //   console.log("check cookie result :>> ", res);
  // } catch (error) {
  //   console.log("check cookie fail :>> ", error);
  // }
  // return !res.data;

  return ""; // Do bị cors nên đang mặc định cookie hợp lệ

  //Check cookie có hợp lệ hay ko

  // return strMessage;
}

function getSession(name) {
  var rData = "";

  var arrData = decodeURIComponent(getCookie("JHMain"));
  if (arrData == null || typeof arrData == "undefined") rData = "";
  else {
    if (name == "EntCode") rData = arrData.split("♪")[0];
    else if (name == "DeptCode") rData = arrData.split("♪")[1];
    else if (name == "EmpCode") rData = arrData.split("♪")[2];
    else rData = "";
  }

  return rData;
}
