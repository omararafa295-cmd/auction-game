<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مزاد الأساطير</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="{{ asset('style.css') }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    
<div class="container">
    <header class="game-header">
        <h1>مزاد الأساطير</h1>
    </header>
    
    <!-- شاشة إعداد الغرف -->
    <div id="setup-phase" class="setup-container">
        <h2>إعدادات الغرفة</h2>
        <p class="subtitle">أنشئ غرفة جديدة أو انضم لغرفة صديقك</p>
        
        <input type="text" id="player-name-input" class="modern-input" placeholder="اسم المدرب..." style="margin-bottom: 15px;">
        
        <div id="room-actions" style="display: flex; flex-direction: column; gap: 15px;">
            <button type="button" class="btn btn-primary" onclick="createRoom()">إنشاء غرفة جديدة (اللاعب الأول)</button>
            
            <div style="display: flex; gap: 5px;">
                <input type="text" id="room-code-input" class="modern-input" placeholder="كود الغرفة (مثال: A5X9)" style="width: 65%; font-family: monospace; text-transform: uppercase;">
                <button type="button" class="btn btn-secondary" onclick="joinRoom()" style="width: 35%;">انضمام</button>
            </div>
        </div>
        
        <div id="room-info" class="hidden" style="margin-top: 20px; font-size: 1.2rem; color: #f1c40f;">
            كود الغرفة الخاص بك: <br>
            <span id="display-room-code" style="font-size: 2rem; font-weight: bold; background: #334155; padding: 5px 15px; border-radius: 8px; display: inline-block; margin-top: 10px; letter-spacing: 3px;"></span>
            <p style="font-size: 1rem; color: #94a3b8; margin-top: 10px;">أعطِ هذا الكود لصديقك للانضمام</p>
        </div>
        
        <div id="wait-msg" class="hidden status-text"></div>
        <button type="button" id="start-game-btn" class="btn btn-success hidden" onclick="markReadyToStart()">تأكيد الجاهزية للبدء</button>
    </div>

    <!-- شاشة اللعب -->
    <div id="game-phase" class="hidden">
        <div class="stats-panel">
            <div class="stat-card">
                <div class="stat-name" id="name-display-1">اللاعب الأول</div>
                <div class="stat-details">
                    <div>الميزانية: <span class="highlight" id="budget1">300</span>M</div>
                    <div>القوة: <span class="highlight" id="power1">0</span></div>
                </div>
            </div>
            
            <div class="live-auction-board">
                <div class="auction-header">المزايدة الحالية</div>
                <div class="highest-bid">
                    <span id="current-bid-amount">0</span><span class="currency">M</span>
                </div>
                <div class="bidder-name">بواسطة: <span id="current-bidder-name">لا أحد</span></div>
                <div id="status-msg" class="auction-status">بانتظار افتتاح المزاد...</div>
            </div>

            <div class="stat-card">
                <div class="stat-name" id="name-display-2">اللاعب الثاني</div>
                <div class="stat-details">
                    <div>الميزانية: <span class="highlight" id="budget2">300</span>M</div>
                    <div>القوة: <span class="highlight" id="power2">0</span></div>
                </div>
            </div>
        </div>

        <div class="auction-section">
            <div class="player-auction-card">
                <div class="card-header">اللاعب <span id="playerCounter">1</span> / 22</div>
                <img id="auction-img" src="" alt="صورة اللاعب">
                <h2 id="auction-name" class="player-name">اسم اللاعب</h2>
                <div class="badges-container">
                    <span class="badge bg-pos" id="auction-pos">المركز</span>
                    <span class="badge bg-power">التقييم: <span id="auction-power">90</span></span>
                </div>
            </div>
            
            <div class="bidding-controls" id="bidding-controls">
                <input type="number" id="custom-bid" class="modern-input" min="1" placeholder="أدخل السعر..." step="1">
                <button type="button" class="btn btn-warning" onclick="placeBid()">رفع السعر</button>
                <button type="button" class="btn btn-danger" onclick="passBid()">انسحاب</button>
            </div>
        </div>

        <div class="pitch-container">
            <div class="pitch">
                <div class="pitch-title" id="pitch-name-1">تشكيلة اللاعب الأول</div>
                <div class="pitch-row" data-pos="هجوم" id="team1-FWD"></div>
                <div class="pitch-row" data-pos="وسط" id="team1-MID"></div>
                <div class="pitch-row" data-pos="دفاع" id="team1-DEF"></div>
                <div class="pitch-row" data-pos="حارس" id="team1-GK"></div>
            </div>
            <div class="pitch">
                <div class="pitch-title" id="pitch-name-2">تشكيلة اللاعب الثاني</div>
                <div class="pitch-row" data-pos="هجوم" id="team2-FWD"></div>
                <div class="pitch-row" data-pos="وسط" id="team2-MID"></div>
                <div class="pitch-row" data-pos="دفاع" id="team2-DEF"></div>
                <div class="pitch-row" data-pos="حارس" id="team2-GK"></div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="{{ asset('script.js') }}"></script>
</body>
</html>