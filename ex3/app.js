let n;

window.addEventListener('load', function(){
	console.log("window loaded!");
	main();
});

function main(){
	n = 0;
	document.querySelector("#list-cnt")
		.addEventListener("click", function(event){
			event.preventDefault();
			let target = event.target;
			if (target.classList.contains("rm-note")){
				let note = target.parentNode.parentNode;
				if (note || note.classList.contains("note")){
					note.remove();
					n-=1;
					if (n==0){
						const noTodos = document.querySelector("#no-todos");
						noTodos.classList.remove("d-none");
					}
				}
			}
		});
	document.querySelector("button")
		.addEventListener("click", function(event){
			event.preventDefault();
			let title = document.querySelector("#title").value;
			document.querySelector("#title").value = "";
			let ctn = document.querySelector("#content").value;
			document.querySelector("#content").value = "";
			if(title!="" || ctn!="")
				addNote(title, ctn);
		});
}

function addNote(title, content){
	const note = document.createElement("div");
	note.classList.add("note", "d-flex", "flex-column", "justify-content-center", "border", "border-dark", "rounded");
	const noteHeader = document.createElement("div");
	noteHeader.classList.add("d-flex", "align-items-stretch", "justify-content-between", "p-2", "font-weight-bold");
	note.appendChild(noteHeader);
	const titleEl = document.createElement("p");
	titleEl.classList.add("mb-0");
	titleEl.textContent = title;
	noteHeader.appendChild(titleEl);
	const rmBtn = document.createElement("p");
	rmBtn.classList.add("rm-note", "ml-auto", "mb-0");
	rmBtn.textContent = String.fromCharCode(10060);
	noteHeader.appendChild(rmBtn);
	const ctn = document.createElement("p");
	ctn.classList.add("p-4");
	ctn.textContent = content;
	note.appendChild(ctn);

	if (n==0){
		const noTodos = document.querySelector("#no-todos");
		noTodos.classList.add("d-none");
	}

	const listCnt = document.querySelector("#list-cnt");
	listCnt.appendChild(note);
	n+=1;
}
