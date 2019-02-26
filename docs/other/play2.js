
function star_image_obj(){
    self = this
    this.i=0
    this.x=0
    this.y=0
    this.dom=0
    this.angle=0
    this.r=0
    this.screen_size=undefined
    
    this.setPosition = function(self){
        //console.log("ss : "+JSON.stringify(self))
        x=(Math.cos(self.angle)*self.r)+(self.screen_size.x/2)
        y=(Math.sin(self.angle)*self.r)+(self.screen_size.y/2)
        //console.log("x : "+x+" , y : "+y)
        $(self.dom).css({position:"absolute",left:x,top:y})
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

async function init_stars(max,star_arr,screen_size){

    block = 2000
    for(i=0;i<max;++i){
        $("#main").append("<img class='star' src='image/star.png' alt='xxx'/>"); 
        star = new star_image_obj()
        
       r_block= Math.floor(Math.random()*block)
       angle_block = Math.floor(Math.random()*block)
        star.angle =  (Math.PI * 2) * (angle_block/block)
        star.r = (r_block/block) * screen_size.max
        star.i=i
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

async function renew_stars(max,star_arr){
    for(i=0;i<max;++i){

        // 包住，免得 被 i 受影響，又抓錯記憶體
        // 用 i_in ，不受外面影響
        (function(i_in){

            setInterval(function(){
           
           // 確定 i 有東西
           //console.log("i2 : "+i2)
           
           // 靠北阿，index 用 i 寫就一堆問題，幹
           // 寫實際數字就OK
           // 幹，又好了??
         // star_arr[i].aa()
           
           
           star_arr[i_in].renew_position(star_arr[i_in])
          // console.log("issss : "+JSON.stringify(star_arr[1]))
          
            },10)
            


        }(i));
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

    var star_arr = Array()
    max = 500
    screen_size = {x:0,y:0}
    //var star_arr = []
    render_screen_size(screen_size)
    setInterval('render_screen_size(screen_size)',10)    
    await init_stars(max,
        star_arr
         //star_arr_object["arr"]
        ,screen_size)
    /*
    console.log("s : "
    +JSON.stringify(star_arr[100])
    
    )
    */
    renew_stars(max,
        star_arr
        // star_arr_object["arr"]
    )
    //alert(Math.sin(Math.PI*0.5))


}

$(function(){
    $("body").css({backgroundColor:"black"})
    init()
})