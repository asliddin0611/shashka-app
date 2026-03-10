let tg = window.Telegram.WebApp;
tg.expand();

const socket = io(https://shashka-app.onrender.com); // Socket.io ulanadi

// Telegram foydalanuvchi ismini olish
const username = tg.initDataUnsafe?.user?.username || "Anonim";

document.getElementById("mainMenu").style.display = "block";
let invitesList = [];

// O'yinni boshlash
function startGame(){
  document.getElementById("mainMenu").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  socket.emit('join', username);
  renderInvites();
}

// Orqaga tugmasi
function backToMenu(){
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("mainMenu").style.display = "block";
}

// Online foydalanuvchilarni yangilash
socket.on('onlineUsers', (users)=>{
  const container = document.getElementById("onlinePlayers");
  container.innerHTML = "";
  users.forEach(user=>{
    if(user===username) return; // o‘zini ko‘rsatmaymiz
    let div = document.createElement("div");
    div.className = "player";
    div.innerHTML = `
      <span>${user}</span>
      <button onclick="sendInvite('${user}')">O'yin taklif qilish</button>
    `;
    container.appendChild(div);
  });
});

// Taklif yuborish
function sendInvite(toUsername){
  socket.emit('sendInvite', toUsername, username);
}

// Takliflar qabul qilinishini ko‘rsatish
socket.on('newInvite', ({to, from})=>{
  if(to===username){
    invitesList.push(from);
    renderInvites();
  }
});

function renderInvites(){
  const container = document.getElementById("invites");
  container.innerHTML = "";
  if(invitesList.length===0){
    container.innerHTML = "<i>Hozircha taklif yo‘q</i>";
    return;
  }
  invitesList.forEach(name=>{
    let div = document.createElement("div");
    div.className = "player";
    div.textContent = name;
    container.appendChild(div);
  });
}

// Profil va boshqa bo‘limlar
function profile(){ alert("Profil bo'limi"); }
function settings(){ alert("Sozlamalar"); }
function info(){ alert("Shashka o'yini mini app"); }
