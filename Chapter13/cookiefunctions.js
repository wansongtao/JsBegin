/**
 * @description 设置cookie
 * @param string name 
 * @param string value 
 * @param string path 
 * @param string expires
 */
function setCookie(name, value, path, expires) {
    //escape() 将非字母或数字字符转换为Latin-1字符集中对应的十六进制编码，并加上%字符前缀.
    //unescape() 将转义的字符转换为普通文本.
    value = escape(value);

    //如果expires参数被忽略，或传递空字符串，则将过期时间设置为当前时间的六个月后
    if (!expires) {
        var now = new Date();
        now.setMonth(now.getMonth() + 6);
        expires = now.toUTCString();
    }

    if (path) {
        path = ";Path=" + path;
    }

    document.cookie = name + "=" + value + ";expires=" + expires + path;
}

/**
 * @description 传入要获取的cookie的name，返回value
 * @param string name 
 */
function getCookieValue(name) {
    /**
     * @description Cookie: Name=bob;age=101;firstvisit=10%20May%202007
     */
    var value = document.cookie;
    var cookieStartsAt = value.indexOf(" " + name + "=");

    if(cookieStartsAt == -1) {
        cookieStartsAt = value.indexOf(name + "=");
    }

    if (cookieStartsAt == -1) {
        value = null;
    } else {
        //值的开始位置
        cookieStartsAt = value.indexOf("=", cookieStartsAt) + 1;

        //值的结束位置
        var cookieEndAt = value.indexOf(";", cookieStartsAt);

        //没有找到分号，则值的结束位置位于字符串结尾
        if (cookieEndAt == -1) {
            cookieEndAt = value.length;
        }

        //unescape() 将转义的字符转换为普通文本.
        value = unescape(value.substring(cookieStartsAt, cookieEndAt));
    }

    return value;
}

/**
 * @description 设置cookie的所有属性
 * @param {*string} name 
 * @param {*string} value 
 * @param {*string} expires 
 * @param {*string} path 
 * @param {*string} domain 
 * @param {*boolean} secure 
 */
function setCookieAll(name, value, expires, path, domain, secure) {

    if (!name) {
        alert("cookie的name属性不能缺失.");
    } else if (!value) {
        alert("cookie的value属性不能缺失.");
    } else {
        //escape() 将非字母或数字字符转换为Latin-1字符集中对应的十六进制编码，并加上%字符前缀
        value = escape(value);

        //如果没有设置过期时间，则设置六个月后过期
        if (!expires) {
            var expiresTime = new Date();

            expiresTime.setMonth(expiresTime.getMonth() + 6);
            expiresTime = expiresTime.toUTCString();
        }

        if (path) {
            path = ";path=" + path;
        }

        if(domain) {
            domain = ";domain=" + domain;
        }

        if (secure != "" || secure != null) {
            secure = ";secure=" + secure;
        }

        document.cookie = name + "=" + value + ";expiress=" + expiresTime + path + domain + secure;
    }
   
}

//cookie: firstname=wst;expires=Tue, 28 Dec 2020;secure=true
function getCookieValueTest(name) {
    var cookiesValue;
    var cookies = document.cookie;

    //假设name前面有空格
    var valueStartAt = cookies.indexOf(" " + name + "=");

    if(valueStartAt == -1) {
        //name前面没有空格
        valueStartAt = cookies.indexOf(name + "=");
    }

    if(valueStartAt == -1) {
        cookiesValue = null;
    } else { //cookie: firstname=wst;expires=Tue, 28 Dec 2020;secure=true
        //获取value开始的位置
        valueStartAt = cookies.indexOf("=", valueStartAt) + 1;

        //获取value结束的位置
        var valueEndAt = cookies.indexOf(";", valueStartAt);

        //最后一个value后没有分号
        if(valueEndAt == -1) {
            valueEndAt = cookies.length;
        }

        cookiesValue = cookies.substring(valueStartAt, valueEndAt);
    }

    return cookiesValue;
}