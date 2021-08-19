// 요일 한글 변환
function dayKor(day) {
    switch(day){
        case 0: day = "일"; break;
        case 1: day = "월"; break;
        case 2: day = "화"; break;
        case 3: day = "수"; break;
        case 4: day = "목"; break;
        case 5: day = "금"; break;
        case 6: day = "토"; break;
    }
    return day;
}

// 월,일,시간,분,초 한 자릿 수인 경우 0 붙이기
function zeroBased(num) {
    return num = (num > 9 ? '' : '0') + num;
}

// 해당 자릿 수 만큼 replace (YYYY인 경우 YYYY replace, YY인 경우 YY replace)
function strReplace(regexAll,formatStr,subStr,newSubStr) {
    newSubStr = newSubStr.toString().substr(-formatStr.match(regexAll).length);
    var replaceSubStr = '';
    for(var i=0;i<formatStr.match(regexAll).length;i++) {
        replaceSubStr += subStr;
    }
    return replaceSubStr;
}

// 년도 4자릿 수 보다 적은 경우 format 자릿 수 맞게 replace
function shortStr(formatStr,subStr,newSubStr) {
    let regexAll = new RegExp(subStr, "g");
    replaceSubStr = strReplace(regexAll,formatStr,subStr,newSubStr);
    formatStr = formatStr.replace(replaceSubStr,newSubStr)
    return formatStr;
}

// 월,일,시간,분,초 format 자릿 수 맞게 replace
function zeroFill(formatStr,subStr,newSubStr) {
    let regexAll = new RegExp(subStr, "g");
    replaceSubStr = strReplace(regexAll,formatStr,subStr,newSubStr);
    formatStr = formatStr.match(regexAll).length != 1 ? formatStr.replace(replaceSubStr,zeroBased(newSubStr)) : formatStr.replace(replaceSubStr,newSubStr)
    return formatStr;
}

// 년,월,일,시간,분,초,밀리초,요일 replace
function formatStrReplace(formatStr,year,month,date,hours,minutes,seconds,day,milliseconds) {
    formatStr = shortStr(formatStr,'Y',year);
    formatStr = zeroFill(formatStr,'M',month);
    formatStr = zeroFill(formatStr,'D',date);
    formatStr = zeroFill(formatStr,'H',hours);
    formatStr = zeroFill(formatStr,'m',minutes);
    formatStr = zeroFill(formatStr,'s',seconds);
    formatStr = formatStr.match(/d/g).length == 4 ? formatStr.replace('dddd',dayKor(day)+'요일') : formatStr.replace('ddd',dayKor(day));
    formatStr = formatStr.replace('SSS',milliseconds);

    return formatStr;
}

// String 날짜 Date로 변환
function moment(date) {
    // 인자 null인 경우 현재 시간
    if(date == null) {
        date = new Date();
    } else {
        // dash 있는 경우
        date = date.replace(/-/g,'/');
        // 년,월,일 있는 경우
        date = date.replace(/(년|월|일)/g,'/');
        date = new Date(Date.parse(date));
    }
    return date;
}

function add(unit,value) {
    switch(value) {
        case 'Y' : break;
        case 'M' : break;
        case 'D' : break;
        case 'h' : break;
        case 'm' : break;
        case 's' : break;
    }
}

Date.prototype.format = function(formatStr='YYYY-MM-DD ddd HH:mm:ss.SSS') {
    //년,월,일,시,분,초 로드
    var year = this.getFullYear();
    var month = this.getMonth() + 1;
    var date = this.getDate();
    var day = dayKor(this.getDay());
    var hours = this.getHours();
    var minutes = this.getMinutes();
    var seconds = this.getSeconds();
    var milliseconds = this.getMilliseconds();

    formatStr = formatStrReplace(formatStr,year,month,date,hours,minutes,seconds,day,milliseconds);

    return formatStr;
}