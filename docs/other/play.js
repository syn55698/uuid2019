												
											$(function(){

											
												var w_w = $(window).width()
												var w_h = $(window).height()
												var game = new Phaser.Game($(window).width(),$(window).height(), Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
												//alert("1")
												

												function resize_star(){
												     w_w = $(window).width()
												    w_h = $(window).height()
												    game.width = w_w
												    game.height = w_h
												
												
												    console.log("resize")
												}

												$(window).resize(function(){
													resize_star()
												})
												
												
												function preload() {
												
												    game.load.image('star', 'image/star.png');
												
												}
												
												var distance = 300;
												var speed = 4;
												var stars;
												
												var max = 200;
												var xx = [];
												var yy = [];
												var zz = [];
												var re = []; // 重複的次數
												var hasRemove = []
												// !! 我想要的場景
												// 滿天星空 
												// 星星不斷外擴
												function create() {
												
												    if (game.renderType === Phaser.WEBGL)
												    {
												        max = 2000;
												    }
													// 常見，處理群sprite
												    var sprites = game.add.spriteBatch();
												
												    stars = [];
												
												    for (var i = 0; i < max; i++)
												    {
												        xx[i] = Math.floor(Math.random() * 800) - 400;
												        yy[i] = Math.floor(Math.random() * 600) - 300;
												
												        // 寫 < 500 ，太小，一輪就沒了
												        zz[i] = Math.floor(Math.random() * 1700) - 100;
												
												        // x 為 -400 ~ 400
												        // y 為 -300 ~ 300
												        // z 為 -100 ~ 1600
												
												     //  console.log("i : "+i+" , xx : "+xx[i]+" , yy : "+yy[i]+" , zz : "+zz[i])
												        // 用 game.make. 加入的圖片，都得在 update 設置 x,y 位置
												        // (0,0)為初始插入位置，其實沒差，因為在 update() 內會一直改
												        var star = game.make.sprite(0, 0, 'star');
												        
												        // 這句沒寫好像沒差....
												        star.anchor.set(0.5);
												
												        sprites.addChild(star);
												
												        stars.push(star);
												        re.push(1)
												        hasRemove.push(0)
												    }
                                                    
												}
												
												function update() {
													console.log("update")
												    for (var i = 0; i < max; i++)
												    {
												        // 這招確定有用，跑完幾輪就不跑了
												        /*
												        if(re[i]>3){
												            if(!hasRemove[i]){
												                game.world.remove(stars[i])
												                hasRemove[i] = 1
												            }
												            continue
												        }
												        */
												
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
												        
												
												        // 如果關掉這個，往外跑一輪，就沒了
												        // 要拉回裡面
												        // 寫 <290 ，星星太散太稀疏，
												        // 寫 > 800，星星往外跑一輪就沒了
												        if (zz[i] > 590)
												        {
												            zz[i] -= 600;
												            //re[i] = re[i]+1
												        }
												
												        
												        // 用這招，星體不斷往右跑
												        if(xx[i]>=400){
												            xx[i] = -400
												        }
												        
												        /*
												        // 用這招，星體不斷左跑
												        if(xx[i]<=-400){
												            xx[i] = 400
												        }
												        */
												        
												        // 用這招，星體不斷往下跑
												        
														if(yy[i]>=300){
												            //console.log("y m i : "+i)
												            yy[i] = -300
												        }
												        
												        /*
												        // 用這招，星體不斷往上跑
												        if(yy[i]<=-300){
												            //console.log("y s i : "+i)
												            yy[i] = 300
												        }
												        */
												 
												        stars[i].alpha = Math.min(stars[i].perspective / 2, 1);
												        stars[i].scale.set(stars[i].perspective / 2);
												        stars[i].rotation += 0.1;
												        
												    }
												    
												
												}
												
											})