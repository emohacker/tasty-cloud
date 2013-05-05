
(function(window,undefined){
	window.$util = {
		//将标准时间格式化成 Y-m-d H:i:s
		timeToDate:function(DateIn){
			var Year=0
			,Month=0
			,Day=0
			,Hour=0
			,Minute=0
			,CurrentDate="";
		    Year = DateIn.getFullYear();
			Month= DateIn.getMonth()+1;
			Day  = DateIn.getDate();
			Hour = DateIn.getHours();
			Minute  = DateIn.getMinutes(); 
			Seconds 	= DateIn.getSeconds ();
			CurrentDate = Year + "-";
			if(Month >= 10 ){ 
				CurrentDate = CurrentDate + Month + "-";
			}else{ 
				CurrentDate = CurrentDate + "0" + Month + "-";
			} 
			if(Day >= 10 ){ 
				CurrentDate = CurrentDate + Day ;
			}else{ 
				CurrentDate = CurrentDate + "0" + Day ;
			} 
			if(Hour >=10){ 
				CurrentDate = CurrentDate + " " + Hour ; 
			}else{ 
				CurrentDate = CurrentDate + " 0" + Hour ;
			} 
			if(Minute >=10){ 
				CurrentDate = CurrentDate + ":" + Minute ;
			}else{ 
				CurrentDate = CurrentDate + ":0" + Minute ;
			}
			if(Seconds >=10){ 
				CurrentDate = CurrentDate + ":" +Seconds;
			}else{ 
				CurrentDate = CurrentDate + ":0" +Seconds;
			}
			return CurrentDate;
		}
	}
})(window);
