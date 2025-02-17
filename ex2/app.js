var body, fontSelector, sizeSelector, colorSelector, fontList, target;

window.addEventListener('load', function(){
	console.log("window loaded!");
	main();
});

async function main(){
    body = document.body;
    colorSelector = document.querySelector("#color-picker");
    sizeSelector = document.querySelector("#size-picker");
    fontSelector = document.querySelector("#font-picker");
    target = document.querySelector("#target");
    await addFontsToSelector();
    initSelector();
}

async function getAvailableFonts() {
    const fontSet = await document.fonts.ready;
    const availableFonts = [];
    fontSet.forEach(font => {
        availableFonts.push(font.family);
    });
    return [...new Set(availableFonts)] ;
}

async function addFontsToSelector(){
    fontList = await getAvailableFonts();
	console.log(fontList);
    for (const font of fontList){
        const tmp = document.createElement("option");
        tmp.value = font;
        tmp.textContent = font.replace(/"/g, ""); // removing quotes
        fontSelector.appendChild(tmp);
    }
}

function initSelector(){
	colorSelector.value = "#000";
	sizeSelector.value = "40";
	updateColor();
	updateSize();
	updateFont();
	colorSelector.addEventListener("change", updateColor);
	sizeSelector.addEventListener("input", updateSize);
	fontSelector.addEventListener("change", updateFont);
}

function updateColor(){
	let color = colorSelector.value;
	target.style.color = color;
}

function updateSize(){
	let size = sizeSelector.value;
	target.style.fontSize = `${size}px`;
}

function updateFont(){
	let font = fontSelector.value;
	if (fontList.includes(font)){
		target.style.fontFamily = `${font}, serif`;
	}
}

