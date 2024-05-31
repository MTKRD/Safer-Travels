// setting variables to get/open/close the modal.
var modal = document.getElementById("btnid");
var btn = document.getElementById("modall"); 
var span = document.getElementsByClassName("close")[0];

//telling the html if the button gets click to open the modal
btn.onclick = function() {
    modal.style.display = "block";
}
 
// close the modal
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event){
    if (event.target == modal) {
        modal.style.display = "none";
    }
}