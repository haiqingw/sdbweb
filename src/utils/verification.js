

export function checkPhone(rule, phone, callback) {  // 验证手机号
    if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(phone))) {
        return callback(new Error('请输入正确手机号'))
    } else {
        return callback()
    }
}


export function checkBankCardNo(rule, bankno, callback) {
    var bankno = bankno.replace(/\s/g, '');
    if (bankno.length < 16 || bankno.length > 19) {
        return callback(new Error("银行卡号长度必须在16到19之间"))
    }
    var num = /^\d*$/;//全数字
    if (!num.exec(bankno)) {
        return callback(new Error("银行卡号必须全为数字"))
    }
    //开头6位
    var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
    if (strBin.indexOf(bankno.substring(0, 2)) == -1) {
        return callback(new Error("银行卡号开头6位不符合规范"))
    }
    //Luhn校验
    // if(!luhnCheck(bankno)){
    //       return false;
    //   }
    // return true;
}


export function isvalidUsername(str) {
    // const valid_map = ['admin', 'editor']
    // return valid_map.indexOf(str.trim()) >= 0
    if (str === '') return false
    return true
}

/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}

/* 只允许数字*/
export function validateDigital(str) {
    const reg = /^\d{1,}$/
    return reg.test(str)
}

/* 只允许小数*/
export function validateDecimal(str) {
    const reg = /^\d{1,}(.\d{1,2})?$/
    return reg.test(str)
}

export function validateDigitalCallback(rule, value, callback) {
    if (validateDigital(value)) {
        callback();
    } else {
        callback(new Error("请填写整数"));
    }
};
export function validateDecimalCallback(rule, value, callback) {
    if (validateDecimal(value)) {
        callback();
    } else {
        callback(new Error("请填写小数"));
    }
}
//校验密码：只能输入6-20个字母、数字、下划线 
export function checkPassWord(password) { //必须为字母加数字且长度不小于6位
    var str = password;
    if (str == null || str.length < 6) {
        return false;
    }
    var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
    if (!reg1.test(str)) {
        return false;
    }
    var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
}