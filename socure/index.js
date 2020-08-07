$(function() {
    var nav = $(".navlink");

    nav.mouseover(function() {
        $(this).addClass("navli");
    });

    nav.mouseout(function (){
        $(this).removeClass("navli");
    });

    nav.click(function() {
        window.location.href = "calculator.html";
    });

});