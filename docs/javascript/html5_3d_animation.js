    (function(a){  
        a.fn.html5_3d_animation=function(p){  
            var p=p||{};  
      
            var w_w=p&&p.window_width?p.window_width:"500";  
            var w_h=p&&p.window_height?p.window_height:"400";  
            var w_b=p&&p.window_background?p.window_background:"#000";  
            var s_c=p&&p.star_count?p.star_count:"20000";  
            var s_color=p&&p.star_color?p.star_color:"#FFF";  
            var s_d=p&&p.star_depth?p.star_depth:"25000";  
            var dom=a(this);  
            var fov = parseInt(s_d);  
            var SCREEN_WIDTH = parseInt(w_w);  
            var SCREEN_HEIGHT = parseInt(w_h);  
            var HALF_WIDTH = SCREEN_WIDTH/2;  
            var HALF_HEIGHT = SCREEN_HEIGHT/2;  
            var c_id = dom.attr("id");  
            var numPoints = s_c;  
            var re = [];
            var hasRemove = []
            var next_stage = p.next_stage
            var next_stage_ok = 0
            var has_do_next_stage = false
            dom.attr({ width: w_w, height: w_h});  
            //console.log("P1")
            a.pre_back = dom;
            //console.log("P0")
            setup();  
            function setup()  
            {  
                function draw3Din2D(point3d)  
                {  
                    x3d = point3d[0];  
                    y3d = point3d[1];  
                    z3d = point3d[2];  
                    var scale = fov/(fov+z3d);  
                    var x2d = (x3d * scale) + HALF_WIDTH;  
                    var y2d = (y3d * scale)  + HALF_HEIGHT;  
      
                    c.lineWidth= scale;  
                    c.strokeStyle = s_color;  
                    c.beginPath();  
                    c.moveTo(x2d,y2d);  
                    c.lineTo(x2d+scale,y2d);  
                    c.stroke();  
                }  
      
                var canvas = document.getElementById(c_id);  
                var c = canvas.getContext('2d');  
                var points = [];  
      
                function initPoints()  
                {  
                    for (i=0; i<numPoints; i++)  
                    {  
                        point = [(Math.random()*400)-200, (Math.random()*400)-200 , (Math.random()*400)-200 ];  
                        points.push(point);
                        re.push(1)
					    hasRemove.push(0)  
                        
                    }  
      
                }  
      
                function render()  
                {  
                    /*
                    if(points.length==0){
                        next_stage["next_stage"] = true
                        console.log("啟動 next_stage")
                    }
                   
                    if(re>=3){
                         console.log("points.length : "+points.length)
                        if(points.length!=0){
                            for (i=(numPoints-1); i>=0; i--){
                                point = points[i]
                                points.pop(point)
                            }
                        }
                        
                    }
                    */
                    c.fillStyle=w_b;  
                    c.fillRect(0,0, SCREEN_WIDTH, SCREEN_HEIGHT);  
      
                    for (i=0; i<numPoints; i++)  
                    {  
                        if(re[i]>1){
						        if(!hasRemove[i]){
									//points.pop(points[i])
							        hasRemove[i] = 1 // 重點是這句

                                    
					            }else{
                                    if(i==(numPoints-1)){
                                        if( (next_stage_ok==60) && (!has_do_next_stage)){ // 好，就60，進入下一階段
                                             next_stage["next_stage"] = true
                                            //console.log("啟動 next_stage")
                                            has_do_next_stage = true
                                            a.next_stage()
                                        }
                                         next_stage_ok += 1
                                    }
                                        
                                    
                                    
                                   
                                }
				               continue
						}
                       
                        
                        
                        point3d = points[i];  
                        
                        if(point3d){
                        z3d = point3d[2];  
                        z3d-=4;  
                        if(z3d<-fov){
                             z3d +=400;  
                             re[i] = re[i]+1

                           
                        }
                        point3d[2] = z3d;  
                        draw3Din2D(point3d);  
                        }
                    }  
                    var show = document.getElementById('show');  
                    try{
                        $(show).appendChild('p');
                    }catch(e){

                    }
                      
                }  
      
                initPoints();  
      
                var loop = setInterval(function(){  
                    render();  
                }, 50);  
      
            }
              
    }  
})(jQuery);  