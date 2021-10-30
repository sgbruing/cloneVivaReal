window.onload = function() {

    document.getElementById('menuAside').style.display = 'none';

};

document.getElementById('menuButton').onclick = function() {
    document.getElementById('menuAside').style.cssText = 'display:flex'
}

document.getElementById('closeMenuButton').onclick = function() {
    document.getElementById('menuAside').style.cssText = 'display: none;'
}