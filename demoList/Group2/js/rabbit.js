function HoverRabbit(){
	this.explodeImage=new Image();
	this.explodeImage.src="img/explode.png"
	for(var i=1;i<=6;i++){
		this.images[i]=new Image();
		this.images[i].src="img/s"+i+".png";
	}
	if(typeof(CanvasGradient)!='undefined' && screen.width>1100){
		this.canvas=document.createElement("canvas");
		this.canvas.width=screen.width;
		this.canvas.height=screen.height;
		this.canvas.style.position='absolute';
		this.canvas.style.left='0px';
		this.canvas.style.top='0px';
		this.canvas.style.display='none';
		document.getElementsByClassName('canvas_rabbit')[0].appendChild(this.canvas);
		this.canvas.style.position='fixed';
	}
}
HoverRabbit.prototype={
	images:[],
	explodeImage:null,
	eyePositions:[],
	current:1,
	frame:1,
	canvas:null,
	interval:null,
	start:function(){
		var me=this;
		this.eyePositions[1]={eye1x:123,eye1y:47,eye2x:104,eye2y:53};
		this.eyePositions[2]={eye1x:120,eye1y:50,eye2x:101,eye2y:54};
		this.eyePositions[3]={eye1x:119,eye1y:54,eye2x:97,eye2y:56};
		this.eyePositions[4]={eye1x:112,eye1y:61,eye2x:90,eye2y:61};
		this.eyePositions[5]={eye1x:105,eye1y:64,eye2x:85,eye2y:61};
		this.eyePositions[6]={eye1x:98,eye1y:68,eye2x:79,eye2y:56};
		document.onmousemove=function(e){
			me.onmousemove(e);
		}
		if(this.canvas){
			document.addEventListener("click",function(e){
				me.ondblclick(e);
			});
		}
	},
	onmousemove:function(e){
		var event=e||window.event;
		var deg=Math.abs(screen.height-event.screenY)/(Math.abs(screen.width-event.screenX)+1);
		var n=1;
		if(deg>2) n=6;
		else if(deg>1.4) n=5;
		else if(deg>0.7) n=4;
		else if(deg>0.45) n=3;
		else if(deg>0.2) n=2;
		if(this.current!=n){
			document.getElementsByClassName('canvas_rabbit')[0].style.backgroundImage="url("+this.images[n].src+")";
			this.current=n;
		}
	},
	drawBomb:function(ctxt,n,x,y){
		var sx=64*(n%4);
		var sy=64*(Math.floor(n/4));
		ctxt.drawImage(this.explodeImage,sx,sy,64,64,x-32,y-32,64,64);
	},
	ondblclick:function(e){
		if(this.canvas.style.display!='none') return;
		var me=this;
		if(e.clientX>window.innerWidth-200 && e.clientY>window.innerHeight-200) return;
		var ctxt=this.canvas.getContext("2d");
		this.frame=1;
		this.interval=setInterval(function(e2){
			ctxt.clearRect(0,0,me.canvas.width,me.canvas.height);
			switch(me.frame){
			case 1:
				ctxt.strokeStyle='rgba(247,166,71,1)';
				me.canvas.style.display='block';
			case 2:
				if(me.frame==2){
					ctxt.strokeStyle='rgba(247,166,71,0.5)';
					me.drawBomb(ctxt,0,e.clientX,e.clientY);
					//document.body.style.marginTop='-3px';
					//document.body.style.marginLeft='-3px';
				}
			case 3:
				if(me.frame==3){
					ctxt.strokeStyle='rgba(247,166,71,0.1)';
					me.drawBomb(ctxt,1,e.clientX,e.clientY);
					//document.body.style.marginTop='3px';
					//document.body.style.marginLeft='3px';
				}
				var eye1x=window.innerWidth-me.eyePositions[me.current].eye1x;
				var eye1y=window.innerHeight-me.eyePositions[me.current].eye1y;
				ctxt.lineWidth=3;
				ctxt.beginPath();
				ctxt.moveTo(eye1x,eye1y);
				ctxt.lineTo(e.clientX,e.clientY);
				ctxt.stroke();
				var eye2x=window.innerWidth-me.eyePositions[me.current].eye2x;
				var eye2y=window.innerHeight-me.eyePositions[me.current].eye2y;
				ctxt.beginPath();
				ctxt.moveTo(eye2x,eye2y);
				ctxt.lineTo(e.clientX,e.clientY);
				ctxt.stroke();
				break;
			case 4:
				me.drawBomb(ctxt,2,e.clientX,e.clientY);
				//document.body.style.marginTop='0px';
				//document.body.style.marginLeft='0px';
				break;
			case 14:
				me.canvas.style.display='none';
				window.clearInterval(me.interval);
				break;
			default:
				me.drawBomb(ctxt,me.frame-2,e.clientX,e.clientY);
			}
			me.frame++;
		},50);
	}
};
