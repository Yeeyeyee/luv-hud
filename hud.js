function getParams() {
    const p = new URLSearchParams(window.location.search);

    function parseList(key) {
        const value = p.get(key);
        return value ? value.split(",") : [];
    }

    return {
        player: p.get("player") || "플레이어",
        money: Number(p.get("money")) || 0,
        outfit: p.get("outfit") || "기본 의상",
        room: p.get("room") || "어딘가",
        dday: p.get("dday") || 0,
        date: p.get("date") || "날짜 없음",
        time: p.get("time") || "00:00",

        chars: parseList("char"),
        hps: parseList("char_hp").map(n => Number(n)),
        loves: parseList("char_love").map(n => Number(n)),
        socials: parseList("char_social").map(n => Number(n)),
        loc: parseList("loc"),
        actions: parseList("char_action")
    };
}

function renderTopHUD(data) {
    const hudTop = document.getElementById("hud-top");
    if (!hudTop) return;

    hudTop.innerHTML = `
        <div class="player-info">
            <div class="player-name">♡ ${data.player}</div>
            <div class="tag">💲${data.money}</div>
            <div class="tag">${data.outfit}</div>
        </div>

        <div class="time-info">
            <div class="d-day">📅 D-${data.dday}</div>
            <div class="date-loc">
                ${data.date} | ${data.time} | ${data.room}
            </div>
        </div>
    `;
}

function createBar(value, max, color1, color2) {
    const percent = Math.max(0, Math.min((value / max) * 100, 100));

    const gradId = `grad-${color1.replace("#","")}-${Math.random()}`;

    return `
    <svg viewBox="0 0 100 10" preserveAspectRatio="none">
        <defs>
            <linearGradient id="${gradId}" x1="0%" x2="100%">
                <stop offset="0%" stop-color="${color1}"/>
                <stop offset="100%" stop-color="${color2}"/>
            </linearGradient>
        </defs>
        <rect width="100" height="10" fill="rgba(255,255,255,0.1)" rx="5"/>
        <rect width="${percent}" height="10" rx="5" fill="url(#${gradId})"/>
    </svg>`;
}

function renderHUD() {
    const data = getParams();
    renderTopHUD(data);
    const container = document.getElementById("hud-characters");

    let html = "";

    data.chars.forEach((name, i) => {

        const hp = data.hps[i] ?? 0;
        const love = data.loves[i] ?? 0;
        const social = data.socials[i] ?? 0;
        const location = data.loc[i] || "위치 미정";
        const action = data.actions[i] ?? "";

        const loveClass = love >= 80 ? "love-max" : "";
        const deadClass = hp <= 0 ? "dead" : "";

        html += `
            <div class="char-card ${deadClass}">
                <div class="char-header">
                    <span class="char-name ${loveClass}">${name}</span>
                </div>

                <div class="char-action">「${action}」</div>

                <div class="stat-row">
                    ❤️ ${createBar(love, 100, '#ff9a9e', '#fecfef')} ${love}
                </div>

                <div class="stat-row">
                    💟 ${createBar(hp, 100, '#ff4e50', '#f9d423')} ${hp}
                </div>

                <div class="stat-row">
                    🧩 ${createBar(social, 100, '#454545', '#42b746')} ${social}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

renderHUD();