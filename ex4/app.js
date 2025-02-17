const colors = [
	"red",
	"orange",
	"yellow",
	"green",
	"blue",
	"indigo"
];
const len = colors.length;

window.addEventListener('load', function(){
	console.log("window loaded!");
	main();
});

function main(){
	// alert("hi");
	document.querySelector("ol#list")
		.addEventListener("click", handleClick);
}

function handleClick(event){
	let target = event.target;
	if (target.tagName=="LI" || target.classList.contains("item")){
		let currColor = target.getAttribute("data-color");
		let newIndex = Math.floor(Math.random()*len);
		let newColor = colors[newIndex];
		target.setAttribute("data-color", newColor);
	}
}
