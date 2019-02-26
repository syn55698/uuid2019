(function($,window){

    

    $.next_stage=function(){

       
       $("#html5_3d_animation").remove()


       $("body").append("<div id='back'></div><div id='main' class='grid-container'></div>")
       $("#back").css({"z-index":"1"})
       $("#main").width($(window).width()).height($(window).height()).css({position:"absolute",top:"0px",left:"0px","z-index":"2",backgroundColor:"transparent"})

       $.init_back()

      
       var str=//'<div class="grid-container">'+
						  '<div id="header" class="grid-item header">'+
						   // '<div>Header</div>'+
						  '</div>'+

                           '<div id="left_blank" class="grid-item left_blank">'+
						    '<div></div>'+
						  '</div>'+
						  
                          '<div id="left_point_area" class="grid-item left_point_area">'+
                                '<i class="ui angle left icon icon1" style="font-size:50px;margin:-22px;color:white;"></i>'+
                                '<i class="ui angle left icon icon2" style="font-size:50px;margin:-22px;color:white;"></i>'+
                                '<i class="ui angle left icon icon3" style="font-size:50px;margin:-22px;color:white;"></i>'+
                          '</div>'+

                          '<div id="main_block" class="grid-item main_block">'+
						   '<div></div>'+
						  '</div>'+
						  
                           '<div id="right_point_area" class="grid-item right_point_area">'+
                                '<i class="ui angle right icon icon3" style="font-size:50px;margin:-22px;color:white;"></i>'+
                                '<i class="ui angle right icon icon2" style="font-size:50px;margin:-22px;color:white;"></i>'+
                                '<i class="ui angle right icon icon1" style="font-size:50px;margin:-22px;color:white;"></i>'+
                          '</div>'+
                          
                          '<div id="right_blank" class="grid-item right_blank">'+
						    '<div></div>'+
						  '</div>'
                        //+'</div>'

        

        $("#main").append(str)
       // 所有的 point icon 做顯隱動畫

        $(".icon").css({opacity:"0"}).animate({opacity:"1"},5000)
       
       //console.log("A1 : "+$(".grid-item div").length)
        $(".grid-item div").each(function(){
            parent = $(this).parent()
            
            $(parent).height($(parent).height())
            
        })

        // 初始化 icon 翻頁功能
        $.init_icon()

        //console.log("A2")
        /*
        var str2=""
        for(i=0;i<100;++i){
            str2 = str2 + "<br>fewhgihiewhghrweii"
        }
        $("#main_block").append(str2)
        */
        


    }
}(jQuery,window))
