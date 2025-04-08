document.addEventListener('DOMContentLoaded', function () {
    let user = {
        rubble: 1000000,
        luna: 1000,
        mailbox: 42,
        postcards: [],
        guild: null
    };

    function getTotalFame() {
        return user.postcards.reduce((sum, p) => sum + p.fame, 0);
    }

    function getExpansionCost() {
        return (user.mailbox - 32) * 1000;
    }

    function updateUI() {
        user.fame = getTotalFame();
        document.getElementById("fame").textContent = user.fame;
        document.getElementById("rubble").textContent = user.rubble;
        document.getElementById("luna").textContent = user.luna;
        document.getElementById("mailbox-count").textContent = `${user.postcards.length}/${user.mailbox}`;
        updateMailboxGrid();
    }

    function updateMailboxGrid() {
        const grid = document.getElementById("mailbox-grid");
        grid.innerHTML = "";
        user.postcards.forEach((p, index) => {
            let card = document.createElement("div");
            card.className = "mailbox-card";
            card.innerHTML = `
                <div class="mailbox-card">
                    <img src="/static/images/PostcardSimulator/postcard/${p.name}.webp" alt="엽서">
                    <div class="fame-duration">
                        <span>+${p.fame}</span>
                        <span>${p.duration}일</span>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        // 삭제 버튼 이벤트 연결
        document.querySelectorAll(".remove-postcard").forEach(button => {
            button.addEventListener("click", function () {
                let idx = parseInt(this.dataset.index);
                user.postcards.splice(idx, 1);
                updateUI();
            });
        });
    }

    $(".buy-postcard").click(function () {
        let type = $(this).data("type");
        if (user.mailbox <= user.postcards.length) {
            alert("우체통이 가득 찼습니다!");
            return;
        }
        let postcard;
        if (type === "normal" && user.rubble >= 2500) {
            postcard = { name: "일반 엽서", fame: 1, duration: 30 };
            user.rubble -= 2500;
        } else if (type === "premium" && user.luna >= 10) {
            postcard = { name: "고급 엽서", fame: 2, duration: 30 };
            user.luna -= 10;
        } else if (type === "random" && user.luna >= 50) {
            postcard = { name: "주사위 엽서", fame: getRandomFame(), duration: Math.floor(Math.random() * 40) + 1 };
            user.luna -= 50;
        } else if (type === "special" && user.rubble >= 42000) {
            postcard = { name: "깜짝 엽서", fame: 42, duration: 5 };
            user.rubble -= 42000;
        } else {
            alert("잔액 부족!");
            return;
        }
        user.postcards.push(postcard);
        updateUI();
    });

    $(".join-guild").click(function () {
        let type = $(this).data("type");
        if (type === "silver" && user.fame >= 100) {
            user.guild = "silver";
            $("#guild-flag").attr("src", "/static/images/PostcardSimulator/ui/guild/flag/guild_flag_silver.webp");
        } else if (type === "gold" && user.fame >= 400) {
            user.guild = "gold";
            $("#guild-flag").attr("src", "/static/images/PostcardSimulator/ui/guild/flag/guild_flag_gold.webp");
        } else if (type === "platinum" && user.fame >= 800) {
            user.guild = "platinum";
            $("#guild-flag").attr("src", "/static/images/PostcardSimulator/ui/guild/flag/guild_flag_platinum.webp");
        } else {
            alert("명성이 부족합니다!");
        }
        updateUI();
    });

    $("#expand-button").click(function () {
        let cost = getExpansionCost();
        $("#expand-cost").text(cost);
        $("#popup").fadeIn();
    });

    $("#confirm-expand").click(function () {
        let cost = getExpansionCost();
        if (user.rubble >= cost) {
            user.rubble -= cost;
            user.mailbox += 10;
            $("#popup").fadeOut();
            updateUI();
        } else {
            alert("루블이 부족합니다!");
        }
    });

    $("#cancel-expand").click(function () {
        $("#popup").fadeOut();
    });

    // 다음날 진행 버튼
    $("#next-day").click(function () {
        // 1. 엽서 데이터 (user.postcards) 직접 갱신
        user.postcards.forEach((p) => {
            p.duration -= 1;
        });
    
        // 2. 0일 이하인 엽서는 삭제
        user.postcards = user.postcards.filter((p) => p.duration > 0);
    
        // 3. 유저 재화 갱신
        user.fame = getTotalFame();
        user.rubble += user.fame * 100;
        user.luna += Math.floor(user.fame / 42);
    
        // 4. UI 갱신
        updateUI();
    }); 
    
    updateUI();
});