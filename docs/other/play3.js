
function star_image_obj(){
    self = this
    this.i=0
    this.x=0
    this.y=0
    this.z=0
    this.dom=0
    this.angle=0
    this.r=0
    this.screen_size=undefined
    this.perspective=0
    this.setPosition = function(self){
        //console.log("ss : "+JSON.stringify(self))
        
        //console.log("x : "+x+" , y : "+y)
        $(self.dom).css({position:"absolute",left:self.x,top:self.y})
    }
    
    this.renew_position = function(self){
        self.r = self.r+20
        if(self.r>screen_size.out_max){
            block = 1000
            new_r = Math.floor(Math.random()*1000) / block
            self.r= 50*new_r + 10
        }

        
       console.log("self.i : "+self.i)
        self.setPosition(self)
    }
   
    this.aa = function(){
        alert("aa")
    }

   
   
}

async function init_stars(max,star_arr,screen_size,xx,yy,zz){

    block = 2000
    for(i=0;i<max;++i){
        $("#main").append("<img class='star' src='image/star.png' alt='xxx'/>"); 
        star = new star_image_obj()
        

        /*
       r_block= Math.floor(Math.random()*block)
       angle_block = Math.floor(Math.random()*block)
         star.angle =  (Math.PI * 2) * (angle_block/block)
        star.r = (r_block/block) * screen_size.max
        star.i=i
       */
       
       rand_x = (Math.random()*block)/block 
       rand_y = (Math.random()*block)/block
       rand_z = (Math.random()*block)/block
       console.log("rand_x : "+rand_x)
        xx[i]= Math.floor(rand_x * screen_size.x) - (screen_size.x/2)
        yy[i]= Math.floor(rand_y *screen_size.y) - (screen_size.y/2);
												
												        // 寫 < 500 ，太小，一輪就沒了
		zz[i] = Math.floor(rand_z * 1800) - 100;
        //console.log("xx["+i+"] : "+xx[i])
       
       // console.log("star.r : "+star.r)
        star.screen_size=screen_size
        star.dom = $("#main .star").eq(i)
        star.setPosition(star)
        //$(star.dom).css({position:"absolute",left:star.x,top:star.y})
        /*
        setInterval(function(){
    
            star.renew_position(star)

        },200)
        */
        star_arr.push(star)
        //await delay(10)
    }

    console.log("size : "+star_arr.length)
    
}

async function renew_stars(max,star_arr,distance,speed,xx,yy,zz){
    for(i=0;i<max;++i){

        // 包住，免得 被 i 受影響，又抓錯記憶體
        // 用 i_in ，不受外面影響
        (function(i_in,max,star_arr,distance,speed,xx,yy,zz){

            setInterval(function(){
           /*
                // 幹，這句是啥小啦
	        stars[i].perspective = distance / (distance - zz[i]);
												        
												
												        //xx[i] = xx[i] + 10;
												        //console.log("x["+i+"] : "+xx[i])
			 stars[i].x = game.world.centerX + xx[i] * stars[i].perspective;
	        stars[i].y = game.world.centerY + yy[i] * stars[i].perspective;
												        
												
												
												        //用這招，星體不斷往右下跑
												
			xx[i] = xx[i] + 5;
			yy[i] = yy[i] + 5;
												        
			zz[i] += speed;
            */
           
            star_arr[i_in].perspective = distance / (distance - zz[i_in]);
												        
												
												        //xx[i] = xx[i] + 10;
												        //console.log("x["+i+"] : "+xx[i])
			star_arr[i_in].x =  (star_arr[i_in].screen_size.x/2) + xx[i_in] * star_arr[i_in].perspective;
	        star_arr[i_in].y = (star_arr[i_in].screen_size.y/2) + yy[i_in] * star_arr[i_in].perspective;
			console.log(" star_arr["+i_in+"].x : "+star_arr[i_in].x)					        
			star_arr[i_in].setPosition(star_arr[i_in])
												
												        //用這招，星體不斷往右下跑
												
			xx[i_in] = xx[i_in] + 5;
			yy[i_in] = yy[i_in] + 5;
												        
			zz[i_in] += speed;

			if (zz[i_in] > 590)  {
				zz[i_in] -= 600;
												            //re[i] = re[i]+1
			}


			if(yy[i_in]>=(star_arr[i_in].screen_size.y/2)){
				 //console.log("y m i : "+i)
				yy[i_in] = -(star_arr[i_in].screen_size.y/2)
			}

          // console.log("issss : "+JSON.stringify(star_arr[1]))
          
            },1)
            


        }(i,max,star_arr,distance,speed,xx,yy,zz));
       // await delay(1)
    }
    /*
   console.log("i : "
    +JSON.stringify(star_arr[100])
    
    )
    */
   //star_arr[1].renew_position(star_arr[1])
}

function render_screen_size(screen_size){
    x= $(window).width()
    y=$(window).height()
    screen_size.x = x
    screen_size.y = y
    
    if(x>y){
        screen_size.max = y/2 - 10 
        screen_size.out_max = x/2
    }else{
        screen_size.max = x/2 - 10
        screen_size.out_max = y/2 
    }

    
    //console.log("render_screen_size , x : "+x+" , y : "+y)
}



async function init(){
    /*
    var star_arr_object = {}
    star_arr_object["arr"]=[]
    */
    var distance = 300;
	var speed = 4;
    var star_arr = Array()
    
    
    max = 500
    
    var xx=new Array(max)
    var yy=new Array(max)
    var zz=new Array(max)
    screen_size = {x:0,y:0}
    //var star_arr = []
    render_screen_size(screen_size)
    setInterval('render_screen_size(screen_size)',10)    
    await init_stars(max,
        star_arr
         //star_arr_object["arr"]
        ,screen_size,xx,yy,zz)
    /*
    console.log("s : "
    +JSON.stringify(star_arr[100])
    
    )
    */
    renew_stars(max,
        star_arr
        // star_arr_object["arr"]
        ,distance,speed,xx,yy,zz
    )
    //alert(Math.sin(Math.PI*0.5))


}

$(function(){
    $("body").css({backgroundColor:"black"})
    init()
})