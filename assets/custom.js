 
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("overlay").style.display = "block";
    document.getElementById("close-btn").style.display = "inline-block";
    document.getElementById("menu-opener").style.display = "none";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("overlay").style.display = "none";
    document.getElementById("close-btn").style.display = "none";
    document.getElementById("menu-opener").style.display = "inline-block";
}

