function isValidTelephoneNumber(telephoneNumber){
    var telRegExp = /^(\+\d{1,3} ?)?(\(\d{1,5}\)|\d{1,5}) ?\d{3} ?\d{0,7}( (x|xtn|ext|extn|pax|pbx|extension)?\.? ?\d{2,5})?$/;
    return telRegExp.test(telephoneNumber);
}

function isValidPostalCode(postalCode){
    var pcodeRegExp = /^(\d{6})$/;

    return pcodeRegExp.test(postalCode);
}

function isValidEmail(emailAddress){
    //18101837209@163.com  2294215581@qq.com  980504@gmail.com
    //var emailRegExp = /^(\d{6,11})@(\d{3}|[a-z]{2,5})\.([a-z]{2,4})$/;
    var emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    return emailRegExp.test(emailAddress);
}