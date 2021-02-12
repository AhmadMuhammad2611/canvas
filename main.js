    /*1- canvas => resize , 2- get context*/
    mycanvas = document.getElementById('mycanvas');
    mycanvas.width = window.innerWidth;
    mycanvas.height = window.innerHeight;
    // get context
    mycontext = mycanvas.getContext("2d");
    isdrawable = false;
    // register events with canvas
    mycanvas.addEventListener('mousemove', drawcircle);
    mycanvas.addEventListener('mousedown', enabledrawing);
    mycanvas.addEventListener('mouseup', disabledrawing);

    radius = 10;
    /* radius bar */
    radiusvalue = document.getElementById('radiusvalue');
    incre = document.getElementById('incre');
    decre = document.getElementById('decre');
    incre.addEventListener('click', increaseradius);
    decre.addEventListener('click', decreaseradius);

    /***** save button *******/
    saveBtn = document.getElementById("savebtn");

    saveBtn.addEventListener('click', saveCanvas);

    function saveCanvas() {
        var link = document.getElementById('link');
        link.setAttribute('download', 'canvas.png');
        link.setAttribute('href', mycanvas.toDataURL());
        link.click();
    }

    /* create colors using script*/
    var allcolors = ['red', 'yellow', 'green', 'blue', 'magenta', 'pink','gray'];
    colorsbar = document.getElementById('colorsbar');
    for (var i = 0; i < allcolors.length; i++) {
        var createddiv = document.createElement('div');
        createddiv.style.backgroundColor = allcolors[i];
        createddiv.classList.add('colors');
        createddiv.addEventListener('click', changecolor);
        if (localStorage.getItem('newcolor') == allcolors[i]) {
            createddiv.classList.add('active');
            mycontext.fillStyle = allcolors[i];
        }
        colorsbar.appendChild(createddiv);
    }

//end of load event

function changecolor(data) {
    var oldselectedcolor = document.getElementsByClassName('active')[0];
    if(oldselectedcolor!=null)
    oldselectedcolor.classList.remove('active');

    data.target.classList.add('active');
    var newselectedcolor = data.target.style.backgroundColor;
    mycontext.fillStyle = newselectedcolor;
    localStorage.setItem('newcolor', data.target.style.backgroundColor);
}
function increaseradius() {
    radius++;
    checkradius(radius);

}
function decreaseradius() {
    radius--;
    checkradius(radius);
}

function checkradius(newradius) {
    if (newradius > 30) { newradius = 30; }
    else if (newradius < 10) { newradius = 10; }
    radius = newradius;
    radiusvalue.innerText = radius;
}

function enabledrawing() {
    isdrawable = true;
}
function disabledrawing() {
    isdrawable = false;
}
function drawcircle(data) {
    if(isdrawable){
    mycontext.beginPath();
    mycontext.arc(data.clientX, data.clientY, radius, 0, Math.PI * 2);
    mycontext.fill();
    mycontext.closePath();
    }
}