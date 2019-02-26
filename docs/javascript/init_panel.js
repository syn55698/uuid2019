(function($,window){

    // 翻頁相關，閉鎖型共享變數
     var now_page={now_page:0} // 用0~1，比較好算
     var all_page=2
      var now_flip_page = {now_flip_page:false}
    $.init_panel1 = function(data){

            if((data==undefined)||(data===undefined)){
                return
            }

            $("#panel1").html("") // 清空
            var uuid2019_svg_str = String(data)
            $("#panel1").append(uuid2019_svg_str)
            
            var panel1_sub_str = "<div class='ui segment' id='panel1_description'>Enjoy Web Design</div>"
            $("#panel1").append(panel1_sub_str)
            //alert("see : \n\n"+uuid2019_svg_str)
            
            $("#uui2019_svg").css({position:"relative"})
            $("#panel1_description").css({position:"relative",opacity:"0"})
            $("#uui2019_svg").animate({top:"-20px"},2000)
            $("#panel1_description").animate({top:"-20px",opacity:"1"},2000)
            
            // 電腦 width 用 600
			var config={}
			$("#uui2019_svg").prop("width","600").prop("height","150")

            // 以下為畫線動畫
            $("#uui2019_svg").css({width:"600",height:"150"})
            $("#u1,#u2,#i,#d,#2,#0,#1,#9").css({ fill: 'transparent' });
			
			let svg = document.querySelector('#uui2019_svg');
            // 生成 lazt painter 物件
			animation = new LazyLinePainter(svg, config); 
			 // 動畫開始前，callback
			animation.on('start', function(){ })
             // 動畫完成後，callback
			animation.on('complete', function(){
				$("#u1,#u2,#i,#d,#2,#0,#1,#9").css({ fill: 'transparent' });
				// 啟動 fade ，顯示字體充滿 fill 顏色
				$("#u1,#u2,#i,#d").animate({ svgFill: 'red' },1000);
				$("#2,#0,#1,#9").animate({ svgFill: '#00BFFF' },1000);
				//console.log("至邊")
			});
			animation.paint()
            //console.log("OK init_panel1")
    }

    $.init_panel2 = function(data){
        $("#panel2").html("")
        var panel2_str = String(data)
        $("#panel2").append(panel2_str)
        //alert("panel2 : \n\n"+panel2_str)

                var files=["cpp","java","csharp","python","html5","css3","javascript","bootstrap","jquery","react"
                    ,"php","laravel","nodejs","tomcat","django","mysql"
                ]
                var pl_svg = {}
                var file_count = files.length
                var file_index = 0
                for(file_index = 0;file_index<file_count;++file_index){
                    $.ajax({
                        url:"component/svg/"+files[file_index]+".txt",
                        async:false,
                        dataType:"text",
                        type:"GET",
                        success:function(data){
                            var pl_name = String(files[file_index])
                            pl_svg[pl_name]=String(data)
                            //console.log("file_index : "+file_index+" , pl_name : "+pl_name)
                        }
                    })
                }

                // 輪流放入
                var out_i=0
                var in_i=0
                for(out_i=0;out_i<4;++out_i){
                    for(in_i=0;in_i<4;++in_i){

                        var block_id="panel2-block"+(out_i+1)+(in_i+1)
                        var index = (out_i*4)+in_i
                        var content = pl_svg[files[index]]
                        $("#"+block_id).append(content)
                    }
                }
                // 可用 120X120，沒問題
                $("#panel2-grid-container svg").css({width:"120",height:"120"})
                
                $("#panel2-grid-container").css({position:"relative",top:"250px",opacity:"0"}).animate({top:"150px",opacity:"1"},1000)
                //console.log("DDS")
               // alert(pl_svg["cpp"])

    }

    $.init_each_panel=function(panel){
        //alert(1)
        if(panel==="panel1"){
            //alert(2)
            $.get("component/uuid2019.txt",function(data){
                
                $.init_panel1(data)
            })
        }else if(panel==="panel2"){
            //alert(3)
            $.get("component/panel2_new.txt",function(data){

                $.init_panel2(data)
            })
        }else if(panel==="panel3"){


        }
        return 

    }


    // 給 icon click 後，可以翻頁
    $.init_icon = function(){
       async function init_icon_func(icon_obj){
            if(!now_flip_page["now_flip_page"]){
                // 正在翻頁
                now_flip_page["now_flip_page"]=true
                var self = icon_obj;
                var is_right ; // 往右翻頁
                is_right = Boolean($(self).hasClass("right"))
                console.log("is_right : "+is_right+" , : "+$(self).prop("id"))
                
                var toward_page; // 翻到第幾頁，可寫 0~1
                var now_page_id = "panel"+(now_page["now_page"]+1)
                var toward_page_id;

                var time = 1000
                var deg='75'
                if(is_right){
                    //console.log("P1")
                    toward_page = ((now_page["now_page"]+1)%all_page)
                    toward_page_id = "panel"+(toward_page+1)
                    
                    //$('#'+now_page_id).css({display:"block"}).rotate('0deg').animate({rotate: '+='+deg+'deg'}, {queue: false, duration: time});
                    //$('#'+now_page_id).css({position:"relative"}).animate({left:"+500px"},time) // 往右移動
                    $('#'+now_page_id).css({display:"block",position:"relative",opacity:"1"}).rotate('0deg').animate({rotate: '+='+deg+'deg',left:"+500px",top:"+100px",opacity:"0"}, {queue: false, duration: time});
                    
                    await delay(time+200);
                    $('#'+now_page_id).css({display:"none"})
                    $('#'+now_page_id).html("")
                    
                    
                    $.init_each_panel(toward_page_id)
                    $('#'+toward_page_id).css({display:"block",position:"relative",left:"-500px",top:"-100px",opacity:"0"})
                        .rotate('-'+deg+'deg')
                        // 別想太多，回到原位就寫 left:"0px",top:"0px"
                        .animate({rotate: '+='+deg+'deg',left:"0px",top:"0px",opacity:"1"}, {queue: false, duration: time})
                    await delay(time+200)
                    
                    //console.log("P2")


                }else{
                    toward_page = ((now_page["now_page"]+(all_page-1))%all_page)
                    toward_page_id = "panel"+(toward_page+1)

                    $('#'+now_page_id).css({display:"block",position:"relative",opacity:"1"}).rotate('0deg').animate({rotate: '-='+deg+'deg',left:"-500px",top:"-100px",opacity:"0"}, {queue: false, duration: time});
                    
                    await delay(time+200);
                    $('#'+now_page_id).css({display:"none"})
                    $('#'+now_page_id).html("")


                    $.init_each_panel(toward_page_id)
                    $('#'+toward_page_id).css({display:"block",position:"relative",left:"+500px",top:"-100px",opacity:"0"})
                        
                        // 不知為啥，寫 + 沒效果，寫 - 就有效，所以就弄了個 360 度的互補角
                        //.rotate('+'+deg+'deg')
                        .rotate('-'+(360-deg)+'deg')
                        // 別想太多，回到原位就寫 left:"0px",top:"0px"
                        .animate({
                            rotate: '-='+deg+'deg',
                            left:"0px",top:"0px",opacity:"1"}, {queue: false, duration: time})//.rotate('0deg')
                        
                    await delay(time+200)

                }

                now_page["now_page"] = toward_page


                
                // 翻頁完畢
                now_flip_page["now_flip_page"]=false
                
            }
       }
       
       $(".icon").click(function(){
           init_icon_func(this)
       })
    }

    $.init_panel = function(){
        console.log("in init_panel")
        var topmenu;
        var panels_str;
        

        function complete_get_panels(data){
            panels_str = String(data)
            $("#main_block").append(panels_str)
            console.log("complete_get_panels")

            // 先設 panel1 為 active，其他不顯示
            $("#panel2 , #panel3").css({display:"none"})
            $("#panel1").css({display:"block"})


            // 先初始化 panel1
            /*$.get("component/uuid2019.txt",function(data){

                $.init_panel1(data)
            })
            */
             $.init_each_panel("panel1")
        }

        function complete_get_topmenu(data){
            topmenu = String(data)
            $("#header").append(topmenu)
            $("#topmenu").css({backgroundColor:"transparent",opacity:0})


            $("#topmenu").animate({opacity:0.2},100)
                .animate({opacity:0.4},100)
                .animate({opacity:0.6},100)
                .animate({opacity:0.8},100)
                .animate({opacity:1},100)

            $("#topmenu button").click(function(){

                return false
            })

            // 定義在外面
            // var now_page={now_page:1} // 1 (Home) , 2 (Profile) , 3(Game) 

            // 設置 icon 閃爍; 
            var flash_icon_count = 1 // 1~3
            var flash_time = 500
            function flash_icon(){
                var grey1="#778899"
                var grey2="#708090"
                var white = "white"
            
                i=flash_icon_count
                i1 = ((i+0)%3) +1
                i2 = ((i+1)%3) +1
                i3 = ((i+2)%3) +1

                $(".icon"+i3).css({color:grey1})
                $(".icon"+i2).css({color:grey2})
                $(".icon"+i1).css({color:white})


                flash_icon_count = ((flash_icon_count+1)%3) +1
            }
            setInterval(flash_icon,flash_time)

            //先把第一個 tab 作為 active
            $(".tab_button").eq(now_page["now_page"]-1).addClass("tab_button_active")
            //console.log("cc : ")

            
            
            $.get("component/panels.txt",function(data){

                complete_get_panels(data)
            })
            
        }
        $.get("component/topmenu.txt",function(data){
            complete_get_topmenu(data)
        })
        
        


    }
}(jQuery,window))