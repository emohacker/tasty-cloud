/*
	工具类
*/
var $util = {};
/* 模拟PHP中 explode方法 */
$util.explode = function(separators,inputstring,includeEmpties) {
	inputstring = new String(inputstring);
	separators = new String(separators);

	if(separators == "undefined") {
		separators = " :;";
	}

	fixedExplode = new Array(1);
	currentElement = "";
	count = 0;
	for(x=0; x < inputstring.length; x++) {
		str = inputstring.charAt(x);
		if(separators.indexOf(str) != -1) {
			if ( ( (includeEmpties <= 0) || (includeEmpties == false)) && (currentElement == "")) {
			}
			else {
				fixedExplode[count] = currentElement;
				count++;
				currentElement = "";
			}
		}
		else {
			currentElement += str;
		}
	}
	if (( ! (includeEmpties <= 0) && (includeEmpties != false)) || (currentElement != "")) {
		fixedExplode[count] = currentElement;
	}
	return fixedExplode;
}

exports.getUtil = function(){
	return $util;
}