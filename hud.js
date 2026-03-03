function getParams() {
    const p = new URLSearchParams(window.location.search);

    return {
        player: p.get("player") || "플레이어",
        outfit: p.get("outfit") || "기본 의상",
        room: p.get("room") || "어딘가",
        char: p.get("char") || "???",
        hp: Number(p.get("char_hp")) || 0,
        love: Number(p.get("char_love")) || 0,
        social: Number(p.get("char_social"))||0,
        action: p.get("char_action") || "행동 없음",
        img: p.get("img") || ""
    };
}

function createBar(value, max, color1, color2) {
    const percent = Math.min((value / max) * 100, 100);

    return `
    <svg viewBox="0 0 100 10" preserveAspectRatio="none">
        <rect width="100" height="10" fill="rgba(255,255,255,0.1)" rx="5"/>
        <rect width="${percent}" height="10" rx="5" fill="url(#grad-${color1})"/>
        <defs>
            <linearGradient id="grad-${color1}" x1="0%" x2="100%">
                <stop offset="0%" stop-color="${color1}"/>
                <stop offset="100%" stop-color="${color2}"/>
            </linearGradient>
        </defs>
    </svg>`;
}

function renderHUD() {

    const data = getParams();

    document.getElementById("hud-top").innerHTML = `
        <div class="player-info">
            <div class="player-name">♡ ${data.player}</div>
            <div class="tag">${data.outfit}</div>
        </div>
        <div class="time-info">
            <div class="date-loc">📍 ${data.room}</div>
        </div>
    `;

    document.getElementById("hud-characters").innerHTML = `
        <div class="char-card">

            ${data.img ? 
                `<img src="${data.img}" style="width:120px;border-radius:12px;margin-bottom:10px;">`
            : ""}

            <div class="char-header">
                <span class="char-name">${data.char}</span>
            </div>

            <div class="char-action">「${data.action}」</div>

            <div class="stat-row">
                ❤️ ${createBar(data.love, 100, '#ff9a9e', '#fecfef')}
                ${data.love}
            </div>

            <div class="stat-row">
                💟 ${createBar(data.hp, 100, '#ff4e50', '#f9d423')}
                ${data.hp}
            </div>

            <div class="stat-row">
                🧩 ${createBar(data.social, 100, '#454545', '#42b746')}
                ${data.social}
            </div>

        </div>
    `;
}

renderHUD();