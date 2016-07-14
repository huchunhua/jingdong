window.onload = function() {
	var detailtype = document.getElementById("detailtype");
	var lis = detailtype.getElementsByClassName("type-item");
	for(i = 0 ; i < lis.length ; i++) {
		lis[i].i = i;
		lis[i].onmouseover = function() {
			this.setAttribute ('class',"itemhover type-item");
			var h = (this.i + 1) * 31;
			var h1 = (lis.length - this.i) * 31;
			var x = this.getElementsByTagName("div")[2];
			var y = x.offsetTop;
			var z = x.offsetHeight;
			if (z > h) {
				x.style.top = (31 - h) + "px";
			} 
			else if (z > h1) {
				x.style.bottom = z - h1 - 1 + "px";
			}
		}
		lis[i].onmouseout = function() {
			this.className = "type-item";
		}	
	}
	var rollaid = document.getElementById("rollaid");
	var list = document.getElementById("list");
	var buttons = document.getElementById("buttons").getElementsByTagName("span");
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	var index = 1;
	var animated = false;
	var timer;

	function showButton() {
		for(i = 0; i < buttons.length; i++){
			if(buttons[i].className == "on"){
				buttons[i].className = "";
				break;
			}
		}
		buttons[index-1].className = "on";
	}

	function animate(offset) {
		animated = true;
		var newleft = parseInt(list.style.left) + offset;
		var time = 500;
		var interval = 5;
		var speed = offset / (time / interval);

		function go() {
			if ((speed < 0 && parseInt(list.style.left) > newleft) || (speed > 0 && parseInt(list.style.left) < newleft)){
				list.style.left = parseInt(list.style.left) + speed + "px";
				setTimeout(go,interval);
			}
			else {
				animated  = false;
				list.style.left = newleft + "px";
				if (newleft>-730){
					list.style.left = -2920 + "px";
				}
				if (newleft < -2920){
					list.style.left = -730 + "px";
				}
			}
		}
		go();	
	}

	function play() {
		timer = setInterval(function() {
			next.onclick();
		},3000);
	}
	function stop() {
		clearInterval(timer);
	}
	next.onclick = function(){
		if(index == 4) {
			index = 1;
		}
		else {
			index += 1;
		}
		showButton();
		if (!animated) {
			animate(-730);
		}	
	}
	prev.onclick = function() {
		if(index == 1) {
			index = 4;
		}
		else {
			index -= 1;
		}
		showButton();
		if (!animated) {
			animate(730);
		}	
	}

	for (i = 0;i < buttons.length;i++) {
		buttons[i].onclick = function() {
			if (this.className == "on") {
				return;
			}
			var myIndex = parseInt(this.getAttribute("index"));
			var offset = -730 * (myIndex - index);
			if (!animated) {
				animate(offset);
			}
			index = myIndex;
			showButton();
		}
	}
	rollaid.onmouseover = stop;
	rollaid.onmouseout = play;
	play();
}