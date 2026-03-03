async function loadGame() {
    const response = await fetch("gameState.json");
    const gameState = await response.json();
    renderHUD(gameState);
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

function renderHUD(state) {

    // 상단 플레이어 정보
    document.getElementById("hud-top").innerHTML = `
        <div class="player-info">
            <div class="player-name">♡ ${state.player.name}</div>
            <div class="tag">💲${state.player.money}</div>
            <div class="tag">${state.player.outfit}</div>
        </div>
        <div class="time-info">
            <div class="d-day">📅 D-${state.time.dday}</div>
            <div class="date-loc">
                ${state.time.date} | ${state.time.clock} | ${state.player.location}
            </div>
        </div>
    `;

    const container = document.getElementById("hud-characters");
    container.innerHTML = "";

    state.characters.forEach(char => {
        container.innerHTML += `
        <div class="char-card">
            <div class="char-header">
                <span class="char-name">${char.name}</span>
                <span class="char-outfit">${char.outfit}</span>
            </div>
            <div class="char-action">「${char.action}」</div>

            <div class="stat-row">
                ❤️ ${createBar(char.love, state.maxStat, '#ff9a9e', '#fecfef')}
                ${char.love}
            </div>

            <div class="stat-row">
                💟 ${createBar(char.hp, state.maxStat, '#ff4e50', '#f9d423')}
                ${char.hp}
            </div>

            <div class="stat-row">
                🧩 ${createBar(char.social, state.maxStat, '#454545', '#42b746')}
                ${char.social}
            </div>

            <div class="stat-row">
                📍 ${char.location}
            </div>
        </div>
        `;
    });
}

loadGame();