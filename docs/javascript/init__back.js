(function($,window,Phaser){
    var game;
    $.init_back=function(){
            

               // console.log("init_back()")
                var back_image;
                var back_image_scale=1;
                var back_opacity = 0;
                var timer = 0;
                var w_w = $(window).width()
                var w_h = $(window).height()
                var complete_init_back = false;
                var has_init_panel = false;
                while((w_w==0)||(w_h==0)){
                    w_w = $(window).width()
                    w_h = $(window).height()
                     //console.log("[LOOP] game , w_w : "+w_w+" , w_h : "+w_h)
                }
                var window_size = {w:w_w,h: w_h}
                //console.log("game , w_w : "+w_w+" , w_h : "+w_h)

                game = new Phaser.Game(w_w, w_h, Phaser.WEBGL, 'back', { 
				        preload: preload, create: create, update: update 
				});
				$.game = game;
				function preload() {
				    // game.load
                    game.load.image('universe', 'image/universe1.jpg');
				}
				
				function create(){
                    back_image = game.add.sprite(0, 0, 'universe');
                    back_image.width = window_size.w * back_image_scale
                    back_image.height =window_size.h * back_image_scale
                    //back_image.scale.set(back_image_scale,back_image_scale)
                    
                    
                    back_image.centerX= game.world.centerX
                    back_image.centerY= game.world.centerY

                    back_image.alpha = back_opacity;
				}
				
				function update(){
                    /*
                    if(back_image_scale<1){
                        back_image.width = window_size.w * back_image_scale
                        back_image.height =window_size.h * back_image_scale
                        back_image.centerX= game.world.centerX
                        back_image.centerY= game.world.centerY
                        back_image_scale += 0.03
                    }
                    */

                    if(!complete_init_back){
                        if( (back_opacity<1) && (game.time.now > timer)){
                            
                        
                            back_image.alpha = back_opacity;
                            
                            back_opacity += 0.1;
                            timer = game.time.now + 50;
                        }else{
                            if(back_opacity>1){
                                complete_init_back = true
                            }
                        }
                    }else{
                        if(! has_init_panel){
                            //
                        
                             has_init_panel=true
                             console.log("init_panel")
                             $.init_panel()
                        }
                    }
				}
    }
    
    $.resize_back=function(){

        $.game.width = $(window).width()
        $.game.height = $(window).height()

    }
    
}(jQuery,window,Phaser))