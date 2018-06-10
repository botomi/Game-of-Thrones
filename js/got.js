function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function livingCharacters(chars) {
    var alive = [];
    for (let i = 0; i < chars.length; i++) {
        if (!chars[i].dead) {
            alive.push(chars[i]);
        }
    }
    return alive;
}

function sortByName(chars) {
    var i = chars.length - 1;
    var tmp;
    var swap = false;
    do {
        swap = false;
        for (let j = 0; j < i; j++) {
            if (chars[j].name > chars[j + 1].name) {
                tmp = chars[j];
                chars[j] = chars[j + 1];
                chars[j + 1] = tmp;
                swap = true;
            }
        }
        i--;
    } while (i >= 0 && swap)
    return chars;
}

function listname(chars) {
    for (let i = 0; i < chars.length; i++) {
        var x = document.createElement("IMG");
        x.setAttribute("src", chars[i].portrait);
        x.setAttribute("alt", "Game of Thrones character portrait");
        var br = document.createElement('br');
        var node = document.createElement('div');
        var nodep = document.createElement('p');
        node.setAttribute('class', 'GoTCharacter');
        node.setAttribute('id', chars[i].id)
        node.addEventListener('click', showDesc);
        // node.setAttribute('onclick', 'showDesc(Array, this.id);')
        var textnode = document.createTextNode(chars[i].name);
        node.appendChild(x);
        node.appendChild(br);
        node.appendChild(nodep);
        nodep.appendChild(textnode);
        document.getElementById('left-side').appendChild(node);
    }
}


function inspectClasses() {
    var classes = document.getElementsByClassName('GoTCharacter');
    for (let i = 0; i < classes.length; i++) {
        classes[i].onclick = showDesc(live, this.id);
    }
}

function addEventListenerByClass(className, event, fn) {
    var list = document.querySelectorAll(className);
    for (var f = 0, len = list.length; f < len; f++) {
        list[f].addEventListener(event, fn, false);
    }
    console.log(list);
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var userDatas = JSON.parse(xhttp.responseText);
    var live = livingCharacters(userDatas);
    sortByName(live);
    console.log(live);
    listname(live);

}

function showDesc() {
    console.log(live);
}

function searchByName(chars) {
    var nameInput = document.getElementById('nameInput').value;
    var result;
    for (let i = 0; i < chars.length; i++) {
        if (chars[i].name.toLowerCase() === nameInput.toLowerCase()) {
            result = chars[i];
        }
    }
    result = `I'm sorry, but ${nameInput} is not in our database.`
    document.getElementById('result').innerHTML = result;
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */