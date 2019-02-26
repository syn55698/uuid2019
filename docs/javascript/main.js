(function($,window){
    async function main(){

        $(window).resize(function(){


            w_w = $(window).width()
            w_h = $(window).height()

            if($.next_stage_flag["next_stage"]){
                $("#main").width(w_w).height(w_h)
                $("#block").width(w_w).height(w_h)
                $.resize_back()
            }else{
                //console.log("$.pre_back : "+$.pre_back)
                $.pre_back.attr({ width: w_w, height: w_h}); 

            }
        })
        // 先設
         $("body").css({backgroundColor:"#000000"})


        var pre_back = '<canvas id="html5_3d_animation">Internet Explorer Not  Supported</canvas>'
        $("body").append(pre_back)
        
        var next_stage={next_stage:false}
        $.next_stage_flag = next_stage
        $("#html5_3d_animation").html5_3d_animation({  
                window_width: $(window).width(),  
                window_height: $(window).height(),  
                window_background: '#000000',  
                star_count: '10000',  
                star_color: '#FBFFAF',  
                star_depth: '250',
                next_stage:next_stage,
        });
        
        
    }
    $(function() {  
        //alert(1)
        //alert(window)
        
        
        main()
    }); 
}(jQuery,window))