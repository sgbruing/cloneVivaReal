window.onload = function() {

    document.getElementById('navMenuSideContainer').style.display = 'none';

};

document.getElementById('menuButton').onclick = function() {
    document.getElementById('navMenuSideContainer').style.cssText = 'display:flex; -webkit-transition: .4s; transition: .4s;'
}

document.getElementById('closeMenuButton').onclick = function() {
    document.getElementById('navMenuSideContainer').style.cssText = 'display: none;'
}