class CanvasClass {
   
    constructor(data) {

        // Data
        this.tubes = data.tubes;
        this.sys = data.sys;
        this.overlaps = data.overlaps;

        // Constants
        this.MARGIN_X = 60;
        this.MARGIN_Y = 40;
        this.PAYLOAD_DIA = 20;

        this.CANVAS_ID = 'figCanvas'
        this.CANVAS_DIV = 'figDiv'

        let c = document.getElementById(this.CANVAS_ID);

        this.g = c.getContext("2d");
        
        // WIDTH AND HEIGHT
        c.width = 0.95*document.getElementById(this.CANVAS_DIV).offsetWidth;
        c.height = 0.3*c.width;

        this.w = c.width;
        this.h = c.height;

        // x,y Scales
        this.xScale = c.width/(this.sys.extendedHeight+this.sys.zOffset+2*this.MARGIN_X+this.PAYLOAD_DIA*5);
        this.yScale = c.height/(this.tubes[0].od+2*this.MARGIN_Y);   
    }


    run() {

        this.drawTubes();
    }
  

    drawTubes() {

        // TUBES DIA-LENGTH
        this.tubes.forEach((tube) => {

            this.g.beginPath();
            this.g.fillStyle = "LightGray";
            this.g.strokeStyle = "Black";
            this.g.translate((this.MARGIN_X+tube.zA)*this.xScale,this.yScale*(this.MARGIN_Y+(this.tubes[0].od-tube.od)/2));
            this.g.scale(this.xScale,this.yScale)
            this.g.rect(0,0,tube.length,tube.od);
            this.g.stroke();
            this.g.fill();
            this.g.closePath();
        
            this.g.setTransform(1, 0, 0, 1, 0, 0);
        
            this.g.fillStyle = "Red";
        
            this.g.fillText(tube.zA,(this.MARGIN_X+tube.zA)*this.xScale,this.h-10);
            this.g.fillText(tube.zF,(this.MARGIN_X+tube.zF)*this.xScale,this.h-10);
        });

        // TUBES Z-OFFSET
        this.g.beginPath();
        this.g.lineWidth = 6;
    
        this.g.moveTo(this.xScale*(this.MARGIN_X+this.sys.extendedHeight),this.h/2);
        this.g.lineTo(this.xScale*(this.MARGIN_X+this.sys.totalHeight),this.h/2);
        this.g.stroke();
    
        this.g.setTransform(1, 0, 0, 1, 0, 0);

        // TUBES CENTERLINE
        this.g.beginPath();
        this.g.lineWidth = 0.2;
        this.g.moveTo(this.MARGIN_X*this.xScale,this.h/2);
        this.g.lineTo((this.w-this.MARGIN_X*this.xScale),this.h/2);
        this.g.stroke();
    
        // TUBES COORDINATE AXIS CIRCLE
        this.g.beginPath();
        this.g.fillStyle = "Red";
        this.g.arc(this.MARGIN_X*this.xScale, (this.MARGIN_Y+this.tubes[0].od/2)*this.yScale, 5, 0, 2 * Math.PI);
        this.g.fill();
        this.g.stroke();

        // DRAW PAYLOAD LOAD ARROW
        this.drawPayloadArrow(this.g, (this.MARGIN_X+this.sys.totalHeight)*this.xScale, 40, (this.MARGIN_X+this.sys.totalHeight)*this.xScale, this.h/2-15, 10, 'blue');
    }


    drawPayloadArrow(ctx, fromx, fromy, tox, toy, arrowWidth, color){
        //variables to be used when creating the arrow
        var headlen = 10;
        var angle = Math.atan2(toy-fromy,tox-fromx);
    
        ctx.fillText(this.sys.horLoad+'N',fromx-10,fromy-10);
        ctx.fillText(this.sys.totalHeight,(this.MARGIN_X+this.sys.totalHeight)*this.xScale,this.h-10);
    
        ctx.save();
        ctx.strokeStyle = color;
     
        //starting path of the arrow from the start square to the end square
        //and drawing the stroke
        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.lineWidth = arrowWidth;
        ctx.stroke();
     
        //starting a new path from the head of the arrow to one of the sides of the point
        ctx.beginPath();
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
                   toy-headlen*Math.sin(angle-Math.PI/7));
     
        //path from the side point of the arrow, to the other side point
        ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),
                   toy-headlen*Math.sin(angle+Math.PI/7));
     
        //path from the side point back to the tip of the arrow, and then
        //again to the opposite side point
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
                   toy-headlen*Math.sin(angle-Math.PI/7));
     
        //draws the paths created above
        ctx.stroke();
        ctx.restore();
    }
}