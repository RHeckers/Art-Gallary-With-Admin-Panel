import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  body: HTMLElement;
  holder: HTMLElement;
  canvas: any;  
  circleArr: Array<any>;

  constructor() { }

  ngOnInit() {
    this.body = document.getElementById('body');
    this.body.style.background = "rgb(1, 19, 137)";

    this.holder = document.getElementById('holder');
    this.holder.style.height = window.innerHeight + "px";

    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.setupCanvas();
    
  }

  setupCanvas(){
    this.circleArr = [];
    const snowAmount = 100;
    //get DPI
    const dpi = window.devicePixelRatio;
    //get context
    const c = this.canvas.getContext('2d');    

    const fix_dpi = (canvas) => {
      //scale the canvas
      canvas.setAttribute('height', window.innerHeight * dpi);
      canvas.setAttribute('width', window.innerWidth * dpi);
    }
    fix_dpi(this.canvas);

    //Draw snowflakes 
    for(let i = 0; i < snowAmount; i++){
      let xPos = Math.floor(Math.random() * window.innerWidth) - 49;
      let size = Math.floor(Math.random() * 4) + 1;
      let circle = new Circle(xPos, size);
      this.circleArr.push(circle);  
      console.log(this.circleArr)

    }

    function Circle(xPos, size){
      this.x = xPos;
      this.y = 0;
      this.xSpeed = Math.random() - 0.5;
      this.ySpeed = Math.random()

      this.draw = () => {
        c.beginPath();
        c.arc(this.x ,this.y ,size, 0, 2*Math.PI);
        c.strokeStyle = "rgb(225, 225, 225)";
        c.fillStyle = "rgb(225, 225, 225)";
        c.fill();
        c.stroke();

      }
  
      this.update = () => {
        if(this.y > window.innerHeight){
          this.y = 0;
        }

        if(this.x > window.innerWidth || this.x < -49){
          this.x = Math.floor(Math.random() * window.innerWidth) - 49;
        }

        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.draw()
      }

      this.speedUp = () => {
        this.x += 1;
        this.y += 1;
      }

    }

    

    const animate = () => {
      requestAnimationFrame(animate)
      c.clearRect(0,0,innerWidth,innerHeight)
      window.addEventListener('mousedown', speedUp)
      for (let i = 0; i < this.circleArr.length; i++){
        this.circleArr[i].update()
      }

      
    }
    const speedUp = () => {
      for (let i = 0; i < this.circleArr.length; i++){
        this.circleArr[i].speedUp();
      }
      

    }
    
    animate();
  }

  

}
