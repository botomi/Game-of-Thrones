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

function successAjax(xhttp) {
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
                        var textnode = document.createTextNode(chars[i].name);
                        node.appendChild(x);
                        node.appendChild(br);
                        node.appendChild(nodep);
                        nodep.appendChild(textnode);
                        document.getElementById('left-side').appendChild(node);
                }
        }

        function searchByName() {
                var nameInput = document.getElementById('inputTextBox').value;
                var content;
                for (let i = 0; i < live.length; i++) {
                        if (live[i].name.toLowerCase() === nameInput.toLowerCase()) {
                                content = live[i];
                        }
                }
                var housepic = document.getElementById('housepic');
                housepic.setAttribute('src', `assets/houses/${content.house}.png`);
                var img = document.getElementById('char-img');
                img.setAttribute('src', content.picture);
                var nameDiv = document.getElementById('char-name');
                var descDiv = document.getElementById('char-desc');
                nameDiv.innerText = content.name;
                descDiv.innerText = content.bio;
        }

        function inspectClasses() {
                var classes = document.getElementsByClassName('GoTCharacter');
                for (let i = 0; i < classes.length; i++) {
                        classes[i].onclick = showDesc(live, this.id);
                }
        }

        function addEventListeners(className, event, fn) {
                var list = document.querySelectorAll(className);
                for (var f = 0, len = list.length; f < len; f++) {
                        list[f].addEventListener(event, fn, false);
                }
        }


        function addListenertoButton() {
                console.log('fut a listener');
                var butt = document.getElementById('srchbutton');
                butt.addEventListener('click', searchByName);
        }

        function showDesc() {
                var content;
                for (let i = 0; i < live.length; i++) {
                        if (this.id === live[i].id) {
                                content = live[i];
                        }
                }
                var housepic = document.getElementById('housepic');
                housepic.setAttribute('src', `assets/houses/${content.house}.png`);
                var img = document.getElementById('char-img');
                img.setAttribute('src', content.picture);
                var nameDiv = document.getElementById('char-name');
                var descDiv = document.getElementById('char-desc');
                nameDiv.innerText = content.name;
                descDiv.innerText = content.bio;
        }

        // itt a json content, benne a data változóban
        var userDatas = JSON.parse(xhttp.responseText);
        var live = livingCharacters(userDatas);
        sortByName(live);
        console.log(live);
        listname(live);
        addEventListeners('.GoTCharacter', 'click', showDesc);
        addListenertoButton();

}

getData('json/characters.json', successAjax);