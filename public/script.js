let myPlayerRole = 0; 
let myName = "";
let player1Name = "اللاعب الأول";
let player2Name = "اللاعب الثاني";
let roomCode = ""; 

let matchPlayers = [];
let currentPlayerIndex = 0;
let budget1 = 300, budget2 = 300;
let power1 = 0, power2 = 0;

let currentHighestBid = 0;
let currentHighestBidder = 0; 
let isP1Ready = false;
let isP2Ready = false;

const fullDatabase = [
    { name: "Messi", power: 99, pos: "FWD" }, { name: "Ronaldo", power: 98, pos: "FWD" },
    { name: "Pele", power: 98, pos: "FWD" }, { name: "Maradona", power: 97, pos: "FWD" },
    { name: "Mbappe", power: 95, pos: "FWD" }, { name: "Haaland", power: 94, pos: "FWD" },
    { name: "Neymar", power: 92, pos: "FWD" }, { name: "Salah", power: 92, pos: "FWD" },
    { name: "Lewandowski", power: 92, pos: "FWD" }, { name: "Benzema", power: 91, pos: "FWD" },
    { name: "Ronaldinho", power: 95, pos: "FWD" }, { name: "Cruyff", power: 96, pos: "FWD" },
    { name: "Henry", power: 93, pos: "FWD" }, { name: "Suarez", power: 92, pos: "FWD" },
    { name: "Rooney", power: 91, pos: "FWD" }, { name: "Ibrahimovic", power: 91, pos: "FWD" },
    { name: "Drogba", power: 90, pos: "FWD" }, { name: "Etoo", power: 91, pos: "FWD" },
    { name: "Batistuta", power: 90, pos: "FWD" }, { name: "Shevchenko", power: 90, pos: "FWD" },
    { name: "Aguero", power: 89, pos: "FWD" }, { name: "Vinicius", power: 91, pos: "FWD" },
    { name: "Kane", power: 91, pos: "FWD" }, { name: "Son", power: 89, pos: "FWD" },
    { name: "Griezmann", power: 88, pos: "FWD" }, { name: "Saka", power: 88, pos: "FWD" },
    { name: "Villa", power: 89, pos: "FWD" }, { name: "Torres", power: 89, pos: "FWD" },
    { name: "Crespo", power: 88, pos: "FWD" }, { name: "Rashford", power: 85, pos: "FWD" },

    { name: "Zidane", power: 96, pos: "MID" }, { name: "Iniesta", power: 94, pos: "MID" },
    { name: "Xavi", power: 93, pos: "MID" }, { name: "De Bruyne", power: 93, pos: "MID" },
    { name: "Pirlo", power: 92, pos: "MID" }, { name: "Modric", power: 92, pos: "MID" },
    { name: "Matthaus", power: 93, pos: "MID" }, { name: "Kaka", power: 93, pos: "MID" },
    { name: "Gullit", power: 92, pos: "MID" }, { name: "Vieira", power: 91, pos: "MID" },
    { name: "Gerrard", power: 91, pos: "MID" }, { name: "Lampard", power: 91, pos: "MID" },
    { name: "Kroos", power: 91, pos: "MID" }, { name: "Scholes", power: 90, pos: "MID" },
    { name: "Seedorf", power: 90, pos: "MID" }, { name: "Kante", power: 89, pos: "MID" },
    { name: "Beckham", power: 89, pos: "MID" }, { name: "Busquets", power: 89, pos: "MID" },
    { name: "Alonso", power: 89, pos: "MID" }, { name: "Ballack", power: 89, pos: "MID" },
    { name: "Riquelme", power: 88, pos: "MID" }, { name: "Bellingham", power: 90, pos: "MID" },
    { name: "Pedri", power: 87, pos: "MID" }, { name: "Foden", power: 88, pos: "MID" },
    { name: "Odegaard", power: 88, pos: "MID" }, { name: "Fernandes", power: 88, pos: "MID" },
    { name: "Musiala", power: 87, pos: "MID" }, { name: "Wirtz", power: 87, pos: "MID" },
    { name: "Valverde", power: 88, pos: "MID" }, { name: "Tchouameni", power: 86, pos: "MID" },

    { name: "Maldini", power: 96, pos: "DEF" }, { name: "Beckenbauer", power: 95, pos: "DEF" },
    { name: "Baresi", power: 94, pos: "DEF" }, { name: "Cannavaro", power: 93, pos: "DEF" },
    { name: "Ramos", power: 92, pos: "DEF" }, { name: "Nesta", power: 92, pos: "DEF" },
    { name: "Cafu", power: 92, pos: "DEF" }, { name: "Roberto Carlos", power: 91, pos: "DEF" },
    { name: "Puyol", power: 91, pos: "DEF" }, { name: "Van Dijk", power: 91, pos: "DEF" },
    { name: "Zanetti", power: 90, pos: "DEF" }, { name: "Terry", power: 90, pos: "DEF" },
    { name: "Ferdinand", power: 89, pos: "DEF" }, { name: "Vidic", power: 89, pos: "DEF" },
    { name: "Marcelo", power: 89, pos: "DEF" }, { name: "Dani Alves", power: 89, pos: "DEF" },
    { name: "Thiago Silva", power: 89, pos: "DEF" }, { name: "Ashley Cole", power: 88, pos: "DEF" },
    { name: "Stam", power: 88, pos: "DEF" }, { name: "Kompany", power: 88, pos: "DEF" },
    { name: "Pepe", power: 87, pos: "DEF" }, { name: "Alaba", power: 87, pos: "DEF" },
    { name: "Ruben Dias", power: 88, pos: "DEF" }, { name: "Rudiger", power: 88, pos: "DEF" },
    { name: "Saliba", power: 87, pos: "DEF" }, { name: "Hakimi", power: 86, pos: "DEF" },
    { name: "Davies", power: 86, pos: "DEF" }, { name: "Walker", power: 86, pos: "DEF" },
    { name: "Marquinhos", power: 87, pos: "DEF" }, { name: "Stones", power: 86, pos: "DEF" },

    { name: "Yashin", power: 96, pos: "GK" }, { name: "Buffon", power: 95, pos: "GK" },
    { name: "Casillas", power: 93, pos: "GK" }, { name: "Neuer", power: 93, pos: "GK" },
    { name: "Kahn", power: 92, pos: "GK" }, { name: "Schmeichel", power: 91, pos: "GK" },
    { name: "Cech", power: 90, pos: "GK" }, { name: "Courtois", power: 90, pos: "GK" },
    { name: "Alisson", power: 90, pos: "GK" }, { name: "Ter Stegen", power: 89, pos: "GK" }
];

if(typeof axios !== 'undefined') {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}

function sendAction(actionData) {
    actionData.senderRole = myPlayerRole;
    actionData.roomCode = roomCode; 
    if(typeof axios !== 'undefined') {
        axios.post('/place-bid', actionData).catch(error => console.log(error));
    }
}

function generateRoomCode() {
    return Math.random().toString(36).substring(2, 6).toUpperCase();
}

function createRoom() {
    let nameInputElem = document.getElementById('player-name-input');
    if (!nameInputElem) return;
    
    let nameInput = nameInputElem.value.trim();
    if (!nameInput) { alert("من فضلك أدخل اسمك أولاً"); return; }

    myPlayerRole = 1;
    myName = nameInput;
    player1Name = myName;
    roomCode = generateRoomCode();

    setupRoomUI(true);
    connectToSocket();
}

function joinRoom() {
    let nameInputElem = document.getElementById('player-name-input');
    let codeInputElem = document.getElementById('room-code-input');
    if (!nameInputElem || !codeInputElem) return;

    let nameInput = nameInputElem.value.trim();
    let codeInput = codeInputElem.value.trim().toUpperCase();

    if (!nameInput) { alert("من فضلك أدخل اسمك أولاً"); return; }
    if (!codeInput || codeInput.length < 4) { alert("من فضلك أدخل كود غرفة صحيح"); return; }

    myPlayerRole = 2;
    myName = nameInput;
    player2Name = myName;
    roomCode = codeInput; 

    setupRoomUI(false);
    connectToSocket();

    setTimeout(() => {
        sendAction({ type: 'join', name: myName });
    }, 1000); 
}

function setupRoomUI(isCreator) {
    let roomActions = document.getElementById('room-actions');
    let nameInput = document.getElementById('player-name-input');
    
    if(roomActions) roomActions.classList.add('hidden');
    if(nameInput) nameInput.classList.add('hidden');
    
    updateNamesUI();

    let waitMsg = document.getElementById('wait-msg');
    if(waitMsg) waitMsg.classList.remove('hidden');

    if (isCreator) {
        let roomInfo = document.getElementById('room-info');
        if(roomInfo) roomInfo.classList.remove('hidden');
        
        let displayCode = document.getElementById('display-room-code');
        if(displayCode) displayCode.innerText = roomCode;
        
        if(waitMsg) waitMsg.innerText = "في انتظار انضمام صديقك للغرفة...";
    } else {
        if(waitMsg) waitMsg.innerText = "تم الانضمام! في انتظار رد الخادم...";
    }
}

function connectToSocket() {
    if (window.Echo) {
        window.Echo.channel('auction-room.' + roomCode)
            .listen('BidPlaced', (e) => {
                handleIncomingAction(e.data);
            });
    }
}

function updateNamesUI() {
    let nd1 = document.getElementById('name-display-1');
    let nd2 = document.getElementById('name-display-2');
    let pn1 = document.getElementById('pitch-name-1');
    let pn2 = document.getElementById('pitch-name-2');
    
    if(nd1) nd1.innerText = player1Name;
    if(nd2) nd2.innerText = player2Name;
    if(pn1) pn1.innerText = "تشكيلة " + player1Name;
    if(pn2) pn2.innerText = "تشكيلة " + player2Name;
}

function checkBothJoined() {
    if (player1Name !== "اللاعب الأول" && player2Name !== "اللاعب الثاني") {
        let waitMsg = document.getElementById('wait-msg');
        let startBtn = document.getElementById('start-game-btn');
        if(waitMsg) waitMsg.innerText = "اكتمل الاتصال. أنت ضد " + (myPlayerRole === 1 ? player2Name : player1Name);
        if(startBtn) startBtn.classList.remove('hidden');
    }
}

function markReadyToStart() {
    let btn = document.getElementById('start-game-btn');
    if(btn) {
        btn.disabled = true;
        btn.innerText = "في انتظار جاهزية الخصم...";
    }

    if (myPlayerRole === 1) isP1Ready = true;
    if (myPlayerRole === 2) isP2Ready = true;

    sendAction({ type: 'ready_to_start' });
    checkBothReady();
}

function checkBothReady() {
    if (isP1Ready && isP2Ready) {
        if (myPlayerRole === 1) {
            let shuffled = [...fullDatabase];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            matchPlayers = shuffled.slice(0, 22);
            sendAction({ type: 'start_game', players: matchPlayers });
            startGameUI();
        }
    }
}

function startGameUI() {
    let setup = document.getElementById('setup-phase');
    let game = document.getElementById('game-phase');
    if(setup) setup.classList.add('hidden');
    if(game) game.classList.remove('hidden');
    loadNextPlayer();
}

function loadNextPlayer() {
    if (currentPlayerIndex < matchPlayers.length) {
        const p = matchPlayers[currentPlayerIndex];
        
        let pCounter = document.getElementById('playerCounter');
        let aName = document.getElementById('auction-name');
        let aPower = document.getElementById('auction-power');
        let aPos = document.getElementById('auction-pos');
        
        if(pCounter) pCounter.innerText = currentPlayerIndex + 1;
        if(aName) aName.innerText = p.name;
        if(aPower) aPower.innerText = p.power;
        if(aPos) aPos.innerText = p.pos;
        
        let imgElement = document.getElementById('auction-img');
        if(imgElement) {
            imgElement.src = `/images/${p.name}.jpg`;
            imgElement.onerror = function() {
                this.onerror = null; 
                this.src = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
                this.style.backgroundColor = '#1e293b'; 
                this.style.padding = '0';
            };
        }
        
        currentHighestBid = 0;
        currentHighestBidder = 0;
        let cBidAmount = document.getElementById('current-bid-amount');
        let cBidderName = document.getElementById('current-bidder-name');
        let cBid = document.getElementById('custom-bid');
        let statusMsg = document.getElementById('status-msg');
        
        if(cBidAmount) cBidAmount.innerText = "0";
        if(cBidderName) cBidderName.innerText = "لا أحد";
        if(cBid) cBid.value = "";
        if(statusMsg) statusMsg.innerText = "يبدأ المزاد من 1 مليون. من سيفتتح المزاد؟";
        
        enableBiddingControls();
    } else {
        endGame();
    }
}

function placeBid() {
    let bidInput = document.getElementById('custom-bid');
    if(!bidInput) return;
    
    let bidVal = parseInt(bidInput.value);
    
    if (isNaN(bidVal) || bidVal <= currentHighestBid) {
        alert("يجب أن تزايد برقم أعلى من السعر الحالي");
        return;
    }
    
    let myBudget = myPlayerRole === 1 ? budget1 : budget2;
    if (bidVal > myBudget) {
        alert("الرصيد لا يكفي");
        return;
    }

    applyBid(myPlayerRole, bidVal);
    sendAction({ type: 'bid', amount: bidVal });
}

function passBid() {
    applyPass(myPlayerRole);
    sendAction({ type: 'pass' });
}

function applyBid(role, amount) {
    currentHighestBid = amount;
    currentHighestBidder = role;

    let bidderName = role === 1 ? player1Name : player2Name;
    let cBidAmount = document.getElementById('current-bid-amount');
    let cBidderName = document.getElementById('current-bidder-name');
    let statusMsg = document.getElementById('status-msg');
    
    if(cBidAmount) cBidAmount.innerText = amount;
    if(cBidderName) cBidderName.innerText = bidderName;

    if (role === myPlayerRole) {
        if(statusMsg) statusMsg.innerText = "أنت صاحب أعلى سعر. في انتظار رد الخصم...";
        disableBiddingControls(); 
    } else {
        if(statusMsg) statusMsg.innerText = `قام ${bidderName} برفع السعر إلى ${amount}. ما قرارك؟`;
        enableBiddingControls(); 
    }
}

function applyPass(role) {
    disableBiddingControls();
    
    let passName = role === 1 ? player1Name : player2Name;
    let statusMsg = document.getElementById('status-msg');
    
    if (currentHighestBidder === 0) {
        if(statusMsg) statusMsg.innerText = `انسحب ${passName}. تم تخطي اللاعب.`;
        setTimeout(proceedToNextRound, 3000);
        return;
    }

    let winnerRole = currentHighestBidder;
    let winnerName = winnerRole === 1 ? player1Name : player2Name;
    let p = matchPlayers[currentPlayerIndex];

    if(statusMsg) statusMsg.innerText = `انسحب ${passName}. فاز ${winnerName} باللاعب مقابل ${currentHighestBid} مليون.`;

    if (winnerRole === 1) {
        budget1 -= currentHighestBid;
        power1 += p.power;
        addPlayerToPitch(1, p);
    } else {
        budget2 -= currentHighestBid;
        power2 += p.power;
        addPlayerToPitch(2, p);
    }

    let b1 = document.getElementById('budget1');
    let b2 = document.getElementById('budget2');
    let pw1 = document.getElementById('power1');
    let pw2 = document.getElementById('power2');
    
    if(b1) b1.innerText = budget1;
    if(b2) b2.innerText = budget2;
    if(pw1) pw1.innerText = power1;
    if(pw2) pw2.innerText = power2;

    setTimeout(proceedToNextRound, 4000);
}

function proceedToNextRound() {
    currentPlayerIndex++;
    loadNextPlayer();
}

function enableBiddingControls() {
    let bidInput = document.getElementById('custom-bid');
    if(bidInput) bidInput.disabled = false;
    let buttons = document.querySelectorAll('.bidding-controls button');
    buttons.forEach(btn => { btn.disabled = false; });
}

function disableBiddingControls() {
    let bidInput = document.getElementById('custom-bid');
    if(bidInput) bidInput.disabled = true;
    let buttons = document.querySelectorAll('.bidding-controls button');
    buttons.forEach(btn => { btn.disabled = true; });
}

function addPlayerToPitch(playerNum, p) {
    const fallbackImage = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
    
    const playerHtml = `
        <div class="pitch-player">
            <img src="/images/${p.name}.jpg" onerror="this.onerror=null; this.src='${fallbackImage}'; this.style.backgroundColor='#1e293b'; this.style.padding='0';" alt="صورة اللاعب">
            ${p.name}<br>(${p.power})
        </div>`;
        
    let teamTarget = document.getElementById(`team${playerNum}-${p.pos}`);
    if(teamTarget) teamTarget.innerHTML += playerHtml;
}

function endGame() {
    const box = document.querySelector('.auction-section');
    if(!box) return;
    
    let msg = "";
    if (power1 > power2) msg = `🎉 مبروك! ${player1Name} هو بطل المزاد 🎉`;
    else if (power2 > power1) msg = `🎉 مبروك! ${player2Name} هو بطل المزاد 🎉`;
    else msg = "🤝 تعادل أسطوري بين الفريقين! 🤝";
    
    box.innerHTML = `
        <div style="text-align:center; padding: 30px; background: var(--bg-panel); border-radius: 12px; box-shadow: 0 10px 20px rgba(0,0,0,0.5);">
            <h2 style="font-size: 2rem; margin-bottom: 20px;">انتهى المزاد 🏁</h2>
            <h1 style="color: var(--warning); text-shadow: 2px 2px 4px #000; font-size: 2.5rem;">${msg}</h1>
        </div>
    `;
}

function handleIncomingAction(data) {
    if (data.senderRole === myPlayerRole) return; 

    if (data.type === 'join') {
        if (data.senderRole === 1) player1Name = data.name;
        if (data.senderRole === 2) player2Name = data.name;
        updateNamesUI();
        checkBothJoined();
        
        if (myName !== "") {
            sendAction({ type: 'sync_name', name: myName });
        }
    } 
    else if (data.type === 'sync_name') {
        if (data.senderRole === 1) player1Name = data.name;
        if (data.senderRole === 2) player2Name = data.name;
        updateNamesUI();
        checkBothJoined();
    }
    else if (data.type === 'ready_to_start') {
        if (data.senderRole === 1) isP1Ready = true;
        if (data.senderRole === 2) isP2Ready = true;
        checkBothReady();
    }
    else if (data.type === 'start_game') {
        matchPlayers = data.players;
        startGameUI();
    }
    else if (data.type === 'bid') {
        applyBid(data.senderRole, data.amount);
    }
    else if (data.type === 'pass') {
        applyPass(data.senderRole);
    }
}