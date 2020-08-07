    /**
     * @description 存放用户输入的要计算的内容
     */
    var myArray = [];

    /**
     * @description 存放用户连续输入数字的临时变量
     */
    var myNumberOne = "";

    /**
     * @description 用来判断用户是否为第一次计算(0不是，1是)
     */
    var sameSymbol = 1;

$(function () {
    /**
     * @description 用户可点击的元素
     */
    var button = $("td");

    /**
     * @description 输出框
     */
    var userInput = $("th"); 

    //鼠标移入事件
    button.mouseover(function () {
        $(this).addClass("onclickchar");
    });

    //鼠标移出事件
    button.mouseout(function() {
        $(this).removeClass("onclickchar");
    });
    
    /**
      * @description 输出用户点击的内容
      * @param {string} myInput 用户点击的内容
      */
    function showInput (myInput){
        var ourInput = userInput.text();

        //如果用户输入了退格键，则删除一个字符串
        if(myInput == "del"){
            if(ourInput.charAt(ourInput.length - 1) != "="){
                ourInput = ourInput.substring(0, ourInput.length-1);

                userInput.text(ourInput);
            }
        }
        else {
            ourInput += myInput;
            userInput.text(ourInput);
        }
    }

    //鼠标单击事件
    button.click(function(){

        //用户不是第一次计算
        if(sameSymbol == 0){
            emptyVar();
            sameSymbol = 1;
        }

        /**
         * @description 用户点击的内容
         */
        var youInput = $(this).text().trim();
        
        showInput(youInput);

        if(noDoubleDot()){

            try{
                saveArray(youInput);
            }
            catch(err){
                alert(err.message);
            }

            //当用户点击等号后开始计算
            if(youInput == "="){
                try{
                    //用户是否输入了符号
                    if(myArray.some(myTest)){
                        //用户要计算的表达式是否正确
                        if(testSymbolNumber(myArray)){

                            //用户没有输入括号
                            if(myArray.lastIndexOf("(") == -1){
                                userInput.text("");
                                showInput(arraySort(myArray));
                                sameSymbol = 0;
                                myArray = [];
                            }
                            else{
                                var resultsEnd = arraySort(oneSymbolCalculation(myArray));

                                userInput.text("");
                                showInput(resultsEnd);
                                sameSymbol = 0;
                                myArray = [];
                            }

                        }else{
                            alert("输入有误!");
                        }
                    }
                    else{
                        alert("不需要进行计算!");
                    }
                }
                catch(err){
                    alert(err.message);
                }
            } 
        }
        else{
            alert("输入有误");
        }

    });

    /**
     * @description 计算完后清空必要的变量
     */
    function emptyVar(){
        userInput.text("");
        myArray = [];
        myNumberOne = "";
    }

    /**
     * @description 将用户点击的内容保存到数组中，等号不保存
     * @param {*} saveInput 用户每次点击的内容
     */
    function saveArray(saveInput){
        //将用户输入的连续的数字作为一个元素加入数组中
        switch(saveInput) {
            case "+": //用户输入符号后，将符号前面的数字和符号添加到数组中
            case "-": 
            case "x": 
            case "/": 
            case "%": 
            case ")": 
                if(myNumberOne != ""){  //前面的元素是数字
                    myArray.push(myNumberOne);
                } 
                myArray.push(saveInput);
                myNumberOne = "";
                break;

            case "(": 
                myArray.push(saveInput);
                break;
        
            case "=": 
                if(myNumberOne != ""){//等号前面的元素是数字
                    myArray.push(myNumberOne);
                } 
                myNumberOne = "";
                break;

            case "del": 
                //删除的是数字
                if(myNumberOne != ""){                    
                    myNumberOne = myNumberOne.substring(0, myNumberOne.length-1);                   
                }//删除的是等号
                else if(userInput.text().charAt(userInput.text().length - 1) == "="){
                    if(isNaN(parseFloat(myArray[myArray.length - 1])) == false){  //数组中的最后一个元素是数字则将该元素移除数组放入临时变量
                        myNumberOne = myArray[myArray.length - 1];
                        myArray = myArray.slice(0, myArray.length - 1);
                    }

                    //移除输出框里的最后一位字符
                    var inputText = userInput.text();
                    userInput.text(inputText.substring(0, inputText.length - 1));

                }//删除的是符号(+ - x / % ( ) )
                else{
                    //移除已存入待计算数组里的该符号
                    if(myArray.length - 1 == 0 || myArray == ""){
                        myArray = [];
                    }else{
                        if(myArray[myArray.length - 1] == "("){
                            myArray = myArray.slice(0, myArray.length - 1);
                        }else{
                            //删除的符号的前一个元素是数字
                            if(isNaN(parseFloat(myArray[myArray.length - 2])) == false){
                                
                                //将符号前面的元素移除数组，放入临时变量中
                                myNumberOne = myArray[myArray.length - 2];

                                //将数组替换为移除后两个元素的新数组
                                myArray = myArray.slice(0, myArray.length - 2);
                            }
                            else{
                                myArray = myArray.slice(0, myArray.length - 1);
                            }
                        }                      
                    }
                }
                break;

            default: //将用户输入的数字放入临时变量中
                myNumberOne += saveInput;
                break;
        }
    }
});

/**
 * @description 判断用户连续输入的数字中是否有多个小数点或没有
 * @returns true没有 false有
 */
function noDoubleDot(){
    var returnNoDoubleDot = false;

    if(myNumberOne.indexOf(".") == myNumberOne.lastIndexOf(".")){
        returnNoDoubleDot = true;
    }

    return returnNoDoubleDot;
}

/**
 * @description 根据用户输入的符号处理两个数并返回结果
 * @method calculationMethod
 * @param1 {number} number1 操作数1
 * @param2 {string} userSymbol 操作符号 
 * @param3 {number} number2 操作数2
 * @return {number} result 计算后的结果
 */
function calculationMethod(number1, userSymbol, number2){
    var result = 0;

    switch(userSymbol) {
        case "+": 
            result = parseFloat(number1) + parseFloat(number2);
            break;
        
        case "-": 
            result = parseFloat(number1) - parseFloat(number2);
            break;

        case "x": 
            result = parseFloat(number1) * parseFloat(number2);
            break;

        case "/": 
            result = parseFloat(number1) / parseFloat(number2);
            break;

        case "%": 
            result = parseFloat(number1) % parseFloat(number2);
            break;

        default: 
            result = 0;
            break;
    }

    return result;
}

/**
 * @description 测试用户要计算的表达式里是否输入了的符号
  * @method myTest
 * @returns testResult 测试结果
*/
function  myTest(value, index, array){
    var testResult = true;

    switch(value) {
        case "+": 
        case "-":
        case "x": 
        case "/": 
        case "%": 
            testResult = true;
            break;

        default: 
            testResult = false;
            break;
    }

    return testResult;
}


    /**
     * @description 测试用户要计算的表达式是否正确
     * @method testSymbolNumber
     * @param {Array()} testArray 要处理的数组
     * @return {boolean} boResults1 结果
    */
function testSymbolNumber(testArray){
    var boResults1 = false;

    //用户第一个输入的字符不能为如下字符
    switch(testArray[0]){
        case "+": 
        case "-":
        case "x": 
        case "/": 
        case "%": 
        case ")": 
            boResults1 = false;
            break;
    
        default: 
            boResults1 = true;
            break;
    }
    
    if(boResults1 == true){
                
        for(var loopCounter = 0; loopCounter < testArray.length; loopCounter++){
            //用户不能连续输入两个字符
            if( (testArray[loopCounter] == "+" || testArray[loopCounter] == "-" || testArray[loopCounter] == "x" || testArray[loopCounter] == "/" || testArray[loopCounter] == "%") && (testArray[loopCounter + 1] == "+" || testArray[loopCounter + 1] == "-" || testArray[loopCounter + 1] == "x" || testArray[loopCounter + 1] == "/" || testArray[loopCounter + 1] == "%") )
            {
                boResults1 = false;
                break;
            } 
                    
        }

        //用户没有连续输入符号
        if(boResults1 == true){

            //检查用户输入的符号数目是否正确
            var symbolNumber = 0;
            var userNumber = 0;

            for(var i = 0; i < testArray.length; i++){
                switch(testArray[i]){
                    case "+": 
                    case "-":
                    case "x": 
                    case "/": 
                    case "%": 
                        symbolNumber++;
                        break;

                    case "(":
                    case ")":
                        break;
        
                    default: 
                        userNumber++;
                        break;
                }
            }
        
            if(userNumber - symbolNumber != 1){
                boResults1 = false;
            }

            //用户输入的符号数目正确
            if(boResults1 == true){
                var charPosition1 = testArray.indexOf("(", charPosition1);
                var charPosition2 = testArray.indexOf(")", charPosition2);

                //用户输入了括号并且 "（" 要在 "）" 的前面且里面必须要有内容
                if( (charPosition1 != -1 && charPosition2 != -1) && charPosition2 > charPosition1 + 1){
                    //判断用户是否输入了成对的括号
                    var count1 = 0;
                    var count2 = 0;

                    while(charPosition1 != -1){
                        charPosition1 = testArray.indexOf("(", charPosition1);
        
                        if(charPosition1 != -1){
                            charPosition1++;
                            count1++;
                        }
                    }
        
                    while(charPosition2 != -1){
                        charPosition2 = testArray.indexOf(")", charPosition2);
        
                        if(charPosition2 != -1){
                            charPosition2++;
                            count2++;
                        }
                    }
        
                    if(count1 != count2){
                        boResults1 = false;
                    }
                    
                }
            }
        }
    }    

    return boResults1;
}

/**
 * @description 对计算顺序进行排序，并计算
 * @param {*} array1 数组本身
 * @returns returnArray 返回计算结果
 */
function arraySort(array1){
    var endResults = 0;

    /**
     * @description 存放（/、x、%）的出现的次数
     */
    var calCount1 = 0;

    /**
     * @description 存放(+ -)符号出现的次数
     */
    var calCount = 0;

    for(var loCou1 = 0; loCou1 < array1.length; loCou1++){
        switch(array1[loCou1]){
            case "x": 
            case "/":
            case "%":
                calCount1++;
                break;

            case "+":
            case "-":
                calCount++;
                break; 
    
            default: 
                break;        
        }
    }

    //即用户只进行加减法 array1 数组长度等于calCount * 2
    if(calCount1 == 0){
        endResults = oneCalculator(array1, calCount);
    }//用户只进行(%、/、x)操作
    else if(calCount == 0){
        endResults = oneCalculator(array1, calCount1);
    }//混合运算
    else{
        var oneSymbolPosition = returnSymbolPosition(array1);

        //将array1数组变成一个只有加减法的数组(将（x、/、%）计算后的结果放回数组，直到数组中没有（x、/、%）运算符)
        for(var loCou4 = 0; loCou4 < calCount1; loCou4++){

            endResults = calculationMethod(array1[oneSymbolPosition - 1], array1[oneSymbolPosition], array1[oneSymbolPosition + 1]);

            //2*5+3
            if(oneSymbolPosition - 1 == 0){
                var temArr1 = array1.slice(oneSymbolPosition + 2);
                var temArr2 = [];

                temArr2.push(endResults);

                array1 = temArr2.concat(temArr1);

                oneSymbolPosition = returnSymbolPosition(array1);
            }//2+5*3
            else if(oneSymbolPosition + 2 > array1.length){

                array1 = array1.slice(0, oneSymbolPosition -1);
                array1.push(endResults);
                oneSymbolPosition = returnSymbolPosition(array1);

            }//2+3*5+6
            else{
                var temArr = array1.slice(oneSymbolPosition + 2);

                array1 = array1.slice(0, oneSymbolPosition -1);
                array1.push(endResults);
                array1 = array1.concat(temArr);
                oneSymbolPosition = returnSymbolPosition(array1);
            }

        }

        //计算这个只有加减法的数组要进行几次计算即有几个符号
        var temCount = 0;

        for(var loCou5 = 0; loCou5 < array1.length; loCou5++){
            switch(array1[loCou5]){
                case "+":
                case "-":
                    temCount++;
                    break; 
        
                default: 
                    break;        
            }
        }

        endResults = oneCalculator(array1, temCount);
    }

    return endResults;
}

/**
 * @description 用户只进行同优先级的计算
 * @param {*} array2 数组本身
 * @param {*} numbers1 循环次数
 * @returns returnArray 返回计算结果
 */
function oneCalculator(array2, numbers1){
    var indexOne = 0;
    var resultsOne = 0;

    for(var loCou2 = 1; loCou2 <= numbers1; loCou2++){
            
        if(indexOne == 0){
            resultsOne = calculationMethod(array2[indexOne], array2[indexOne+ 1], array2[indexOne + 2]);

            indexOne += 2;
        }
        else{
            resultsOne = calculationMethod(resultsOne, array2[indexOne + 1], array2[indexOne + 2]);

            indexOne += 2;
        }
    }

    return resultsOne;
}


/**
 * @description 查找数组中第一个(x, /, %)的位置
 * @param {*} sliceArray 数组
 * @returns symbolPosition 查找到的符号索引
 */
function returnSymbolPosition (sliceArray){
    var symbolPosition = -1;

    for(var loopCounter1 = 0; loopCounter1 < sliceArray.length; loopCounter1++){
        switch(sliceArray[loopCounter1]){
            case "x": 
            case "/": 
            case "%": 
                symbolPosition = loopCounter1;
                break;

            default: 
                break;
        }

        //找到了，跳出循环
        if(symbolPosition != -1){
            break;
        }
    }

    return symbolPosition;
}

/**
 * @description 计算括号里面的内容并返回一个没有括号的数组
 * @param {*} oneArray 数组
 */
function oneSymbolCalculation (oneArray){
    var reArr;
    /**
     * @description 有几组括号
     */
    var calculationCount = 0;

    for(var temVar = 0; temVar < oneArray.length; temVar++){
        if(oneArray[temVar] == "("){
            calculationCount++;
        }
    }


    //有几组括号需要优先计算
    for(var temVar1 = 0; temVar1 < calculationCount; temVar1++){
        /**
         * @description 存放（的位置
         */
        var beginPosition = 0;
    
        /**
         * @description 存放）的位置
         */
        var endPosition = oneArray.indexOf(")");
    
        while(oneArray.indexOf("(", beginPosition) != -1){
            
            beginPosition = oneArray.indexOf("(", beginPosition);
    
            //判断有没有嵌套的括号
            if(oneArray.indexOf("(", beginPosition + 1) != -1 && oneArray.indexOf("(", beginPosition + 1) < endPosition){
                //存放括号里嵌套的（的位置
                beginPosition = oneArray.indexOf("(", beginPosition + 1);
            }else{
                break;
            }
        }

        if(beginPosition == 0 && endPosition == oneArray.length - 1){
            //(2+3+5)
            oneArray = oneArray.slice(1, endPosition);
        }
        else if(beginPosition == 0){
            //(2+5)*3+6
            var endOneArray = oneArray.slice(endPosition + 1);
            var calArr = oneArray.slice(1, endPosition);

            oneArray = [];  //清空该数组，重新赋值
            oneArray.push(arraySort(calArr));
            oneArray = oneArray.concat(endOneArray);
        }
        else if(endPosition == oneArray.length - 1){
            //2*(3+5+6)
            var begArr = oneArray.slice(0, beginPosition);
            var calArr = oneArray.slice(beginPosition + 1, endPosition);

            oneArray = [];  //清空该数组，重新赋值
            oneArray = begArr;
            oneArray.push(arraySort(calArr));
        }
        else{
            //2*(3+5)/2
            var begArr = oneArray.slice(0, beginPosition);
            var endOneArray = oneArray.slice(endPosition + 1);
            var calArr = oneArray.slice(beginPosition + 1, endPosition);

            oneArray = [];  //清空该数组，重新赋值
            begArr.push(arraySort(calArr));
            oneArray = begArr.concat(endOneArray);
        }
    }
    
    reArr = oneArray;
    return reArr;
}