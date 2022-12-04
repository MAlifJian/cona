let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.cssText = `background: radial-gradient(ellipse at bottom, #223344 0%, #090a0f 100%);
                        position: absolute;
                        top: 0;
                        margin : 0;
                        z-index: -99999;`;
const ctx = canvas.getContext("2d");


// Mengubah Width dan Height Canvas saat Resize
window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
})


class Particle{
	constructor(position, velocity,radius,color, fade = true){
		this.position = position;
		this.velocity = velocity;
		this.opacity = 1;
		this.radius = radius;
		this.color = color;
		this.fade = fade
	}
	draw(){
		ctx.save()
		ctx.globalAlpha = this.opacity;
		ctx.beginPath()
		ctx.arc(this.position.x,this.position.y, this.radius, 0 , Math.PI * 2)
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath()
		ctx.restore()
	}
	update(){
		if(this.fade){
			this.opacity -= .01
		}
		// this.position.x += this.velocity.x;
		this.position.y -= this.velocity.y;
		this.draw()
	}
}

const particles = [];

for(let n = 0; n < 100; n++){
	particles.push(
		new Particle(
			{x: Math.random() * canvas.width
			,y: Math.random() * canvas.height},
			{x: 0
			,y: 1},
			Math.random() * 2,
			"white",
			false
		)
	)
}
const particle = ()=>{
	particles.forEach((particle, index) => {
		if(particle.position.y <= 0){
			particle.position.x = Math.random() * canvas.width;
			particle.position.y = canvas.height + particle.radius
		}
		if (particle.opacity <= 0) {
			setTimeout(() => {
				particles.splice(index,1)
			},0)
		}else{
			particle.update();
		}
	})
}


function animate () {
	ctx.clearRect(0,0,canvas.width,canvas.height)
	particle()
	requestAnimationFrame(animate)
}

animate()