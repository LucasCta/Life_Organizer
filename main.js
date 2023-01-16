/*const { app, BrowserWindow, Tray, Menu } = require('electron');

const startup = () => {
    const myWindow = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: {nodeIntegration: true},
        frame: false,
        icon: 'icon.png'
    }); myWindow.loadFile('index.html');
    const tray = new Tray('icon.png');
    tray.setToolTip('lifeorganizer');
    const contextMenu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(contextMenu);
};

app.on('ready', startup);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit();
    }
});*/

//Draggable Div Function
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  var dragObjects = document.getElementsByClassName("draggable");
  for (var i = 0; i < dragObjects.length; i++) {
     dragElement(dragObjects.item(i));
  }
  
  //Tab Function
  function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  //OFCC Function
  function openOFCC(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("OFCCcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("OFCClinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  //Offc Specific
  document.getElementById("OFCCDopen").click();
  
  //Modals functions
  function openModal(modal){
    modal.style.display = "block";
    document.getElementById(modal.id + "Dopen").click();
  }
  var modals = document.getElementsByClassName("modal");
  window.addEventListener("click", function(event) {
    for (var i = 0; i < modals.length; i++) {
      if (event.target == modals[i]) {
        modals[i].style.display = "none";
      }
    }
  });
  
  //Interactive List
  /* 
  var list = document.getElementById("rotinalist");
  var elementos = list.getElementsByTagName("li");
  for (var i = 0; i < elementos.length; i++){
    if(localStorage.getItem(elementos[i].id) == '1'){
      elementos[i].classList.toggle('dblchecked');
    }
  }
  list.addEventListener('dblclick', function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('dblchecked');
      if (ev.target.classList.contains('dblchecked')){
        localStorage.setItem(ev.target.id, "1");
      }
      else{
        localStorage.setItem(ev.target.id, "0");
      }
    }
  }, false); */
  
  
  //Timer
  var timerStop = false;
  var timerPaused = false;
  var timerPause = document.getElementById("timerPause");
  var timerReset = document.getElementById("timerReset");
  var timer = document.getElementById("timer");
  function pauseTimer(){
    if (timerPaused){
      timerPaused = false;
      timerPause.style.background = "lightgreen";
      timerPause.innerHTML = "Pause";
    } else{
      timerPaused = true;
      timerPause.style.background = "blue";
      timerPause.innerHTML = "Unpause";
    }
  }
  function stopTimer(){
    timerStop = true;
    timerReset.setAttribute("onClick", "startTimer()");
    timerReset.innerHTML = "Restart";
    timerReset.style.background = "green";
  }
  function startTimer(){
    timerReset.setAttribute("onClick", "stopTimer()");
    timerReset.innerHTML = "Stop";
    timerReset.style.background = "red";
    timer.innerHTML = "29m " + "59s ";
    var countDownDate = new Date().getTime() + 1800000;
    var x = setInterval(function() {
      if (timerStop){
        clearInterval(x);
        timerStop=false;
        timer.innerHTML = "End of Task!";
        return;
      }
      else if (timerPaused){
        countDownDate += 1000;
      }
      else{
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        timer.innerHTML = minutes + "m " + seconds + "s ";
        if (distance < 0) {
          clearInterval(x);
          timer.innerHTML = "End of Task!";
        }
      }
    }, 1000);
  }
  
  //Table Sorting
  function sortTable(row) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("aniversarios");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[row];
        y = rows[i + 1].getElementsByTagName("TD")[row];
        if (row == 0){
          var xx = x.innerHTML.split("/");
          var xxx= +(xx[1]+xx[0]);
          var yy = y.innerHTML.split("/");
          var yyy = +(yy[1]+yy[0]);
          if (yyy < xxx) {
            shouldSwitch = true;
            break;
          }
        }
        else if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()){
            shouldSwitch = true;
            break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
  
  //Aniversários
  var birthdays = document.getElementsByClassName("itens");
  for (var i = 0; i < birthdays.length; i++) {
    var a = birthdays[i].innerHTML.split("/");
    var birth = new Date(2023,parseInt(a[1])-1,parseInt(a[0]),0,0,0,0).getTime();
    var now = new Date().getTime()
    var days = Math.floor(birth-now);
    if (-600000000 < days && days < 600000000){
      var topPos = birthdays[i-2].offsetTop;
      document.getElementById('aniover').scrollTop = topPos;
      birthdays[i].style.color = 'red';
    }
    else if (days < 0){
      var topPos = birthdays[i].offsetTop;
      document.getElementById('aniover').scrollTop = topPos;
      birthdays[i].style.color = 'green';
    }
  }
  
  //Ativos Rotina 
  for (var i = 0; i < 20; i++){
    var elem = document.getElementById(i);
    if (elem != null){
      const clone = elem.cloneNode(true);
      document.getElementById("ativos").appendChild(clone);
      if (elem.className == "accordion"){
        const child = elem.nextElementSibling.cloneNode(true);
        document.getElementById("ativos").appendChild(child);
        child.addEventListener('contextmenu', function(e) {
          e.preventDefault();
          clone.classList.toggle('checked');
          if (clone.classList.contains('checked')){
            localStorage.setItem(clone.id, "1");
          } else { localStorage.setItem(clone.id, "0");}
        }, false);
      }
      clone.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        clone.classList.toggle('checked');
        if (clone.classList.contains('checked')){
          localStorage.setItem(clone.id, "1");
        } else { localStorage.setItem(clone.id, "0");}
      }, false);
      if (localStorage.getItem(clone.id) == '1'){
        clone.classList.toggle('checked');
      }
    }
  }
  
  //Accordions
  var acc = document.getElementsByClassName("accordion"); var i;
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("activee");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
    acc[i].nextElementSibling.style.display = "none";
  } 
  
  //Embeds Copies
  function myFunction() {
    var x = document.getElementById("eRotina").contentDocument;
    const node = x.getElementById("rotina");
    const clone = node.cloneNode(true);
    document.body.appendChild(clone);
  }
  
  
  