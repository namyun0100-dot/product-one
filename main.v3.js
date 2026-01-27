// Global Translations Data
const translations = {
    en: {
        title: "Today's Cosmic Fortune",
        wealth: "Wealth",
        bonds: "Bonds",
        btnReveal: "Reveal Fortune",
        btnRevealed: "Fortune Revealed",
        msgWait: "Press the button to see your forecast.",
        msgFinancial: "Press the button to see your financial forecast.",
        msgRelationship: "Press the button to see your relationship forecast.",
        fortunes: {
            81: "🌟 <strong>Cosmic alignment!</strong> A universe of opportunities awaits!",
            61: "✨ <strong>Starlight favor!</strong> Good vibes are flowing your way.",
            41: "☀️ <strong>Neutral space.</strong> Your path is your own to forge.",
            21: "☁️ <strong>Minor nebula.</strong> Navigate with care and intention.",
            0: "☄️ <strong>Asteroid field!</strong> Keep your head up and stay positive."
        },
        contactTitle: "Cosmic Collaboration Inquiry",
        labelName: "Your Name:",
        labelEmail: "Your Email:",
        labelMessage: "Your Message:",
        btnSendSignal: "Send Signal",
        formInstructions: "We usually respond to cosmic signals within 24 light-hours."
    },
    ko: {
        title: "오늘의 우주 운세",
        wealth: "금전운",
        bonds: "인연운",
        btnReveal: "운세 확인하기",
        btnRevealed: "운세 확인 완료",
        msgWait: "버튼을 눌러 오늘의 운세를 확인하세요.",
        msgFinancial: "버튼을 눌러 금전운을 확인하세요.",
        msgRelationship: "버튼을 눌러 인연운을 확인하세요.",
        fortunes: {
            81: "🌟 <strong>우주의 축복!</strong> 엄청난 기회가 기다리고 있어요!",
            61: "✨ <strong>별빛의 가호!</strong> 좋은 기운이 흐르고 있네요!",
            41: "☀️ <strong>고요한 우주.</strong> 당신이 길을 개척할 시간입니다.",
            21: "☁️ <strong>작은 성운.</strong> 신중하게 나아가는 게 좋겠어요.",
            0: "☄️ <strong>소행성 주의!</strong> 긍정적인 마음을 잃지 마세요!"
        },
        contactTitle: "우주 협력 문의",
        labelName: "이름:",
        labelEmail: "이메일:",
        labelMessage: "메시지:",
                    btnSendSignal: "신호 보내기",
                    formInstructions: "우주 신호는 보통 24광시(시간) 내에 응답해 드립니다.",
                    disqusTitle: "우주 토론"
                }
            };
// Global Quotes Data
const quotes = {
    en: [
        "\"The universe is under no obligation to make sense to you.\" - Neil deGrasse Tyson",
        "\"Somewhere, something incredible is waiting to be known.\" - Carl Sagan",
        "\"We are all in the gutter, but some of us are looking at the stars.\" - Oscar Wilde",
        "\"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.\" - Albert Einstein",
        "\"Look up at the stars and not down at your feet.\" - Stephen Hawking",
        "\"For my part I know nothing with any certainty, but the sight of the stars makes me dream.\" - Vincent Van Gogh",
        "\"We are made of starstuff.\" - Carl Sagan",
        "\"Astronomy compels the soul to look upwards and leads us from this world to another.\" - Plato",
        "\"Turn your face to the sun and the shadows fall behind you.\" - Ralph Waldo Emerson",
        "\"Earth is the cradle of humanity, but one cannot live in a cradle forever.\" - Konstantin Tsiolkovsky"
    ],
    ko: [
        "\"우주는 당신을 이해시킬 의무가 없습니다.\" - 닐 타이슨",
        "\"어딘가에 믿을 수 없는 무언가가 알려지길 기다리고 있습니다.\" - 칼 세이건",
        "\"우리는 모두 시궁창에 살고 있지만, 우리 중 누군가는 별을 바라보고 있습니다.\" - 오스카 와일드",
        "\"무한한 것은 두 가지입니다. 우주와 인간의 어리석음. 우주는 확실하지 않네요.\" - 아인슈타인",
        "\"고개를 숙여 발을 보지 말고 고개를 들어 별을 바라보세요.\" - 스티븐 호킹",
        "\"나는 아무것도 확실히 알지 못하지만, 별을 바라보면 꿈을 꾸게 된다.\" - 빈센트 반 고흐",
        "\"우리는 별의 물질로 이루어져 있습니다.\" - 칼 세이건",
        "\"천문학은 영혼을 위로 보게 하고, 우리를 이 세상에서 다른 세상으로 인도한다.\" - 플라톤",
        "\"태양을 향해 얼굴을 돌려라. 그리하면 그림자는 당신 뒤로 떨어질 것이다.\" - 랄프 왈도 에머슨",
        "\"지구는 인류의 요람이지만, 영원히 요람에서 살 수는 없다.\" - 콘스탄틴 치올코프스키"
    ]
};


class CosmicOracle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.lang = localStorage.getItem('lang') || 'ko'; // Default to Korean

    this._setupUI();
    
    this.themeToggle.addEventListener('change', () => this._toggleTheme());
    this.langBtn.addEventListener('click', () => this._toggleLang());
    this.fortuneButton.addEventListener('click', () => this.getFortune());

    this._applyInitialTheme();
    // this._updateText() will be called by updateGlobalText in DOMContentLoaded after all elements are ready.
    // However, for the Shadow DOM elements, we need an initial call.
    this._updateText(); 
    this.checkFortuneAvailability();
  }
  _setupUI() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        --font-main: 'Orbitron', sans-serif;
        --text-color-dark: #edf2f7;
        --card-bg-dark: rgba(26, 32, 44, 0.7);
        --primary-glow-dark: #f04a75;
        --text-color-light: #1a202c;
        --card-bg-light: rgba(255, 255, 255, 0.6);
        --primary-glow-light: #667eea;

        --card-bg: var(--card-bg-dark);
        --text-color: var(--text-color-dark);
        --glow-color: var(--primary-glow-dark);
        --border-color: rgba(139, 148, 191, 0.3);
      }
      :host([data-theme='light']) {
        --card-bg: var(--card-bg-light);
        --text-color: var(--text-color-light);
        --glow-color: var(--primary-glow-light);
        --border-color: rgba(56, 66, 138, 0.2);
      }
      * { box-sizing: border-box; } /* Reset for Shadow DOM */
      
      .fortune-card {
        background: var(--card-bg);
        color: var(--text-color);
        padding: 2rem 2.5rem;
        border-radius: 20px;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid var(--border-color);
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 12px var(--glow-color);
        text-align: center;
        transition: all 0.5s ease;
        width: 100%;
        max-width: 500px;
        position: relative;
        /* margin: 1rem; Removed to prevent overflow/alignment issues */
      }

      @media (max-width: 600px) {
        .fortune-card {
          padding: 1.2rem 1rem; /* Compact padding */
          border-radius: 15px;
        }
        h1 {
          font-size: 1.5rem !important; /* Force smaller title */
          margin-bottom: 1rem !important;
        }
        .score-value {
          font-size: 2rem !important;
        }
        .scores-container {
          flex-direction: column;
          gap: 0.8rem !important; /* Tighter gap */
          margin: 1rem 0 !important;
        }
        .score-section {
            padding: 1rem !important;
            min-width: auto;
            width: 100%;
        }
        .score-section h2 {
            font-size: 1.2rem !important;
            margin-bottom: 0.5rem !important;
        }
        button {
            padding: 0.8rem 2rem !important;
            font-size: 1rem !important;
            margin-top: 0.5rem !important;
        }
      }

      h1 {
        font-family: var(--font-main);
        font-size: 2.2rem;
        font-weight: 700;
        text-shadow: 0 0 5px var(--glow-color), 0 0 10px var(--glow-color);
        margin-bottom: 1.5rem;
        margin-top: 0.5rem;
      }
      .scores-container {
        display: flex;
        justify-content: space-around;
        gap: 1.5rem;
        margin: 2rem 0;
        flex-wrap: wrap;
      }
      .score-section {
        flex: 1;
        min-width: 150px; /* Reduced min-width */
        padding: 1.5rem;
        border: 1px solid var(--border-color);
        border-radius: 15px;
        transition: all 0.3s ease;
      }
      .score-section h2 {
        font-family: var(--font-main);
        font-size: 1.5rem;
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 0;
        margin-bottom: 1rem;
        color: var(--text-color);
      }
      .score-value {
        font-family: var(--font-main);
        font-size: 3.5rem;
        font-weight: 700;
        margin: 0;
        color: var(--glow-color);
        text-shadow: 0 0 8px var(--glow-color);
      }
      .score-message {
        margin-top: 1rem;
        min-height: 2.5em;
        font-size: 0.9rem;
        opacity: 0.8;
      }
      button {
        background: linear-gradient(45deg, var(--glow-color), #4e54c8);
        color: white;
        padding: 1rem 2.5rem;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        font-family: var(--font-main);
        font-size: 1.1rem;
        font-weight: 700;
        transition: all 0.3s ease;
        box-shadow: 0 0 10px var(--glow-color), 0 0 20px var(--glow-color) inset;
        margin-top: 1rem;
      }
      button:hover:not(:disabled) {
        transform: scale(1.05);
        box-shadow: 0 0 15px var(--glow-color), 0 0 30px var(--glow-color) inset;
      }
      button:disabled {
        background: #555;
        cursor: not-allowed;
        box-shadow: none;
        opacity: 0.6;
      }
      .controls-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
        width: 100%;
        margin-bottom: 0.5rem; /* Push content down */
        position: relative; /* No longer absolute overlap */
      }
      @media (max-width: 600px) {
        .controls-container {
            justify-content: center; /* Center controls on mobile for symmetry */
            margin-bottom: 1rem;
        }
      }
      .lang-btn {
        background: transparent;
        border: 1px solid var(--text-color);
        color: var(--text-color);
        padding: 4px 8px; /* Slightly easier to tap */
        border-radius: 5px;
        cursor: pointer;
        font-family: var(--font-main);
        font-size: 0.8rem;
        transition: all 0.3s ease;
      }
      .lang-btn:hover {
        background: var(--glow-color);
        border-color: var(--glow-color);
        color: white;
      }
      .theme-switch {
        display: inline-block;
        height: 28px;
        position: relative;
        width: 55px;
      }
      .theme-switch input { display:none; }
      .slider {
        background-color: #3e445b;
        bottom: 0;
        cursor: pointer;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transition: .4s;
        border-radius: 28px;
      }
      .slider:before {
        background-color: #fff;
        bottom: 4px;
        content: "☀️";
        height: 20px;
        width: 20px;
        left: 4px;
        line-height:20px;
        font-size:12px;
        text-align:center;
        position: absolute;
        transition: .4s;
        border-radius: 50%;
      }
      input:checked + .slider {
        background: linear-gradient(45deg, var(--glow-color), #4e54c8);
      }
      input:checked + .slider:before {
        transform: translateX(27px);
        content: "🌙";
      }
    `;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'fortune-card';
    wrapper.innerHTML = `
      <div class="controls-container">
        <button id="lang-btn" class="lang-btn">KO</button>
        <label class="theme-switch">
          <input type="checkbox" id="theme-toggle">
          <span class="slider"></span>
        </label>
      </div>
      <h1 id="title"></h1>
      <div class="scores-container">
        <div class="score-section">
          <h2><span role="img" aria-label="money">💰</span> <span id="label-wealth"></span></h2>
          <p class="score-value" id="financial-score">--</p>
          <p class="score-message" id="financial-message"></p>
        </div>
        <div class="score-section">
          <h2><span role="img" aria-label="people">🤝</span> <span id="label-bonds"></span></h2>
          <p class="score-value" id="relationship-score">--</p>
          <p class="score-message" id="relationship-message"></p>
        </div>
      </div>
      <button id="fortune-button"></button>
    `;

    this.shadowRoot.append(style, wrapper);

    this.themeToggle = this.shadowRoot.getElementById('theme-toggle');
    this.langBtn = this.shadowRoot.getElementById('lang-btn');
    this.fortuneButton = this.shadowRoot.getElementById('fortune-button');
    
    this.titleDisplay = this.shadowRoot.getElementById('title');
    this.labelWealth = this.shadowRoot.getElementById('label-wealth');
    this.labelBonds = this.shadowRoot.getElementById('label-bonds');
    
    this.financialScoreDisplay = this.shadowRoot.getElementById('financial-score');
    this.relationshipScoreDisplay = this.shadowRoot.getElementById('relationship-score');
    this.financialMessageDisplay = this.shadowRoot.getElementById('financial-message');
    this.relationshipMessageDisplay = this.shadowRoot.getElementById('relationship-message');
  }
  
  _applyInitialTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.dataset.theme = savedTheme;
    this.dataset.theme = savedTheme;
    this.themeToggle.checked = savedTheme === 'dark';
  }

  _toggleTheme() {
    const newTheme = this.themeToggle.checked ? 'dark' : 'light';
    document.body.dataset.theme = newTheme;
    this.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);

    // Inform Disqus about the theme change to ensure it re-evaluates its color scheme.
    // User needs to ensure Disqus admin panel is set to "Auto" for color scheme detection.
    if (typeof DISQUS !== 'undefined') {
        // Add a small delay to ensure DOM and CSS (color-scheme) are fully updated
        setTimeout(() => {
            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.url = window.location.href;  // Re-set URL
                    this.page.identifier = 'cosmic-fortune-page'; // Re-set identifier
                }
            });
        }, 200);
    }
  }

  _toggleLang() {
      this.lang = this.lang === 'en' ? 'ko' : 'en';
      localStorage.setItem('lang', this.lang);
      this._updateText(); // Update Shadow DOM elements
      updateGlobalText(this.lang); // Update global DOM elements (contact form)
      updateQuote(this.lang); // Update global quote
  }

  _updateText() { // Updates elements inside Shadow DOM
      const t = translations[this.lang]; // Access global translations
      // Switch button text to the *target* language for better UX
      this.langBtn.textContent = this.lang === 'en' ? '한국어' : 'English';
      this.titleDisplay.textContent = t.title;
      this.labelWealth.textContent = t.wealth;
      this.labelBonds.textContent = t.bonds;
      
      // Refresh the state/messages to reflect the new language immediately
      this.checkFortuneAvailability();
  }

  getFortune() {
    if (!this.checkFortuneAvailability(false)) return;

    const financialScore = Math.floor(Math.random() * 100) + 1;
    const relationshipScore = Math.floor(Math.random() * 100) + 1;
    
    // Store score only, messages are dynamic based on lang
    const fortuneData = {
        financialScore,
        relationshipScore
    };

    localStorage.setItem('fortuneData', JSON.stringify(fortuneData));
    localStorage.setItem('lastFortuneDate', new Date().toDateString());

    this._animateScore(this.financialScoreDisplay, financialScore);
    this._animateScore(this.relationshipScoreDisplay, relationshipScore);

    setTimeout(() => {
        this.checkFortuneAvailability(true);
    }, 1500);

    this.checkFortuneAvailability(true); // Disable button immediately
  }

  _animateScore(element, finalScore) {
    let currentScore = 0;
    const duration = 1500;
    const stepTime = Math.max(1, Math.floor(duration / finalScore));
    
    const timer = setInterval(() => {
      currentScore++;
      element.textContent = currentScore;
      if (currentScore >= finalScore) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  getFortuneMessage(score) {
    const t = translations[this.lang].fortunes; // Access global translations
    if (score >= 81) return t[81];
    if (score >= 61) return t[61];
    if (score >= 41) return t[41];
    if (score >= 21) return t[21];
    return t[0];
  }

  checkFortuneAvailability(isAfterClick = false) {
    const today = new Date().toDateString();
    const lastFortuneDate = localStorage.getItem('lastFortuneDate');
    const t = translations[this.lang]; // Access global translations

    if (lastFortuneDate === today) {
      this.fortuneButton.disabled = true;
      this.fortuneButton.textContent = t.btnRevealed;
      
      const savedFortune = localStorage.getItem('fortuneData');
      if (savedFortune) {
            const data = JSON.parse(savedFortune);
            this.financialScoreDisplay.textContent = data.financialScore;
            this.relationshipScoreDisplay.textContent = data.relationshipScore;
            
            // Generate message dynamically based on current lang
            this.financialMessageDisplay.innerHTML = this.getFortuneMessage(data.financialScore);
            this.relationshipMessageDisplay.innerHTML = this.getFortuneMessage(data.relationshipScore);
      }
      return false;
    } else {
      this.fortuneButton.disabled = false;
      this.fortuneButton.textContent = t.btnReveal;
      
      // Only reset display if we aren't mid-reveal (though logic usually prevents this overlap)
      if (!isAfterClick) {
        this.financialScoreDisplay.textContent = '--';
        this.relationshipScoreDisplay.textContent = '--';
        this.financialMessageDisplay.textContent = t.msgFinancial;
        this.relationshipMessageDisplay.textContent = t.msgRelationship;
      }
      return true;
    }
  }
}

customElements.define('cosmic-oracle', CosmicOracle);

// Global function to update contact form and other main document texts

// Zodiac Data
const zodiacData = {
    aries: {
        id: 'aries',
        icon: "♈",
        date: "03.21 - 04.19",
        rulingPlanet: "Mars",
        ko: {
            name: "양자리",
            catchphrase: "\"나를 따르라! 멈추지 않는 불꽃 엔진\"",
            desc: "순수한 열정과 에너지가 넘치는 개척자입니다. 원하는 것이 있으면 뒤도 돌아보지 않고 돌진하는 실행력이 엄청나죠. 솔직하고 뒤끝이 없는 쿨한 성격의 소유자입니다.",
            shadow: "성격이 너무 급해서 컵라면 익기 10초 전에 뚜껑을 엽니다. 화를 불같이 내지만 금방 까먹어서 주변 사람만 당황하게 만들기도 해요.",
            love: "금방 사랑에 빠지고(금사빠), 좋아하면 직진입니다. 밀당? 그게 뭐죠?",
            match: "사자자리, 사수자리",
            lucky: "빨간색, 모자"
        },
        en: {
            name: "Aries",
            catchphrase: "\"I am the first! The Unstoppable Engine\"",
            desc: "A bold pioneer full of pure passion and energy. When you want something, you charge forward without looking back. You are honest, direct, and hold no grudges.",
            shadow: "You're too impatient to wait for the microwave to beep. You get angry like a volcano but forget why 5 minutes later, confusing everyone.",
            love: "You fall in love fast and chase hard. Playing hard to get? You don't know her.",
            match: "Leo, Sagittarius",
            lucky: "Red, Hats"
        }
    },
    taurus: {
        id: 'taurus',
        icon: "♉",
        date: "04.20 - 05.20",
        rulingPlanet: "Venus",
        ko: {
            name: "황소자리",
            catchphrase: "\"내 거 건드리지 마 (평화주의자)\"",
            desc: "안정과 평화를 사랑하는 우아한 쾌락주의자입니다. 맛있는 음식, 좋은 향기, 부드러운 감촉을 즐길 줄 알며, 한 번 마음먹은 일은 끝까지 해내는 뚝심이 있습니다.",
            shadow: "고집이 세상을 멸망시킬 수준입니다. 한 번 삐치면 동굴 속으로 들어가서 3박 4일 동안 안 나옵니다.",
            love: "천천히 스며드는 사랑을 합니다. 하지만 내 사람이다 싶으면 엄청난 소유욕을 보이죠.",
            match: "처녀자리, 염소자리",
            lucky: "초록색, 맛집 쿠폰"
        },
        en: {
            name: "Taurus",
            catchphrase: "\"Don't touch my food (Peace Lover)\"",
            desc: "An elegant hedonist who loves stability. You appreciate good food, nice scents, and comfort. Once you decide on something, you stick to it with immense persistence.",
            shadow: "Your stubbornness could rival a brick wall. If you get sulky, you retreat into a cave and won't come out for days.",
            love: "Slow burn love. But once committed, your possessiveness kicks in big time.",
            match: "Virgo, Capricorn",
            lucky: "Green, Restaurant Coupons"
        }
    },
    gemini: {
        id: 'gemini',
        icon: "♊",
        date: "05.21 - 06.21",
        rulingPlanet: "Mercury",
        ko: {
            name: "쌍둥이자리",
            catchphrase: "\"근데 그거 들었어? (정보 수집가)\"",
            desc: "호기심 천국! 세상의 모든 재미있는 뉴스에 귀를 기울이는 정보통입니다. 재치 있는 말솜씨로 주변을 즐겁게 하며, 동시에 두 가지 일을 처리하는 멀티태스킹의 귀재입니다.",
            shadow: "싫증을 너무 빨리 냅니다. 기분이 롤러코스터처럼 변해서 '너 이중인격이야?'라는 소리를 자주 듣습니다.",
            love: "대화가 통하는 게 1순위! 지루한 사람은 딱 질색입니다.",
            match: "천칭자리, 물병자리",
            lucky: "노란색, 스마트폰"
        },
        en: {
            name: "Gemini",
            catchphrase: "\"Wait, did you hear that? (Info Collector)\"",
            desc: "Curiosity heaven! You are the news hub who knows everything. Witty and quick-minded, you are a master of multitasking and keeping things fun.",
            shadow: "You get bored faster than light speed. Your mood swings make people ask if you're two different people.",
            love: "Communication is key! Boring people are your worst nightmare.",
            match: "Libra, Aquarius",
            lucky: "Yellow, Smartphone"
        }
    },
    cancer: {
        id: 'cancer',
        icon: "♋",
        date: "06.22 - 07.22",
        rulingPlanet: "Moon",
        ko: {
            name: "게자리",
            catchphrase: "\"내 사람들은 내가 지켜 (감성 보호자)\"",
            desc: "따뜻한 모성애/부성애를 가진 감성적인 수호자입니다. 공감 능력이 뛰어나 남의 아픔을 내 것처럼 느끼며, 내 사람이라고 생각하면 간도 쓸개도 빼줍니다.",
            shadow: "감정 기복이 파도처럼 심합니다. 과거의 서운한 일을 엑셀 파일로 정리해서 기억하고 있다가 싸울 때 꺼냅니다.",
            love: "헌신적인 사랑꾼. 하지만 상처받으면 단단한 껍질 속으로 숨어버립니다.",
            match: "전갈자리, 물고기자리",
            lucky: "진주색, 푹신한 베개"
        },
        en: {
            name: "Cancer",
            catchphrase: "\"I protect my own (Emotional Guardian)\"",
            desc: "A warm, emotional guardian with great empathy. You feel others' pain as your own and would do anything for the people you consider 'yours'.",
            shadow: "Your mood swings are like tidal waves. You remember every slight from 10 years ago and bring it up during arguments.",
            love: "Devoted lover. But if hurt, you retreat into your hard shell immediately.",
            match: "Scorpio, Pisces",
            lucky: "Pearl, Fluffy Pillow"
        }
    },
    leo: {
        id: 'leo',
        icon: "♌",
        date: "07.23 - 08.22",
        rulingPlanet: "Sun",
        ko: {
            name: "사자자리",
            catchphrase: "\"주인공은 나야 나 (무대 체질)\"",
            desc: "태양처럼 빛나는 존재감! 어디서나 주목받기를 즐기는 타고난 스타입니다. 자신감이 넘치고 화끈하며, 리더로서 주변 사람들을 이끄는 카리스마가 있습니다.",
            shadow: "칭찬을 안 해주면 시들해집니다. 허세가 좀 있어서 지갑을 너무 잘 엽니다. (이번 달 카드값 주의)",
            love: "화려하고 드라마틱한 로맨스를 꿈꿉니다. 나를 왕/여왕처럼 대접해줘!",
            match: "양자리, 사수자리",
            lucky: "금색(Gold), 거울"
        },
        en: {
            name: "Leo",
            catchphrase: "\"All eyes on me (Born Star)\"",
            desc: "Shining like the Sun! You are a natural-born star who loves the spotlight. Confident and charismatic, you lead others with warmth and boldness.",
            shadow: "You wither without compliments. Your desire to show off makes you spend too much money. (Watch your credit card!)",
            love: "You want a dramatic, movie-like romance. Treat me like Royalty!",
            match: "Aries, Sagittarius",
            lucky: "Gold, Mirror"
        }
    },
    virgo: {
        id: 'virgo',
        icon: "♍",
        date: "08.23 - 09.23",
        rulingPlanet: "Mercury",
        ko: {
            name: "처녀자리",
            catchphrase: "\"이거, 1mm 비뚤어졌는데요? (완벽주의자)\"",
            desc: "섬세하고 분석적인 완벽주의자입니다. 남들이 놓치는 디테일을 잡아내는 능력이 탁월하며, 현실적이고 실용적인 해결책을 제시하는 든든한 참모입니다.",
            shadow: "잔소리가 랩(Rap) 수준입니다. 본인에게도 너무 엄격해서 스트레스를 사서 받습니다.",
            love: "까다로운 눈높이. 하지만 한 번 마음을 열면 섬세하게 챙겨주는 츤데레.",
            match: "황소자리, 염소자리",
            lucky: "네이비, 다이어리"
        },
        en: {
            name: "Virgo",
            catchphrase: "\"It's 1mm off-center (Perfectionist)\"",
            desc: "A delicate and analytical perfectionist. You spot details everyone else misses and offer practical solutions. A reliable strategist.",
            shadow: "Your nagging skills are rap-god level. You are too strict with yourself and buy unnecessary stress.",
            love: "High standards. But once you open up, you are a caring 'Tsundere'.",
            match: "Taurus, Capricorn",
            lucky: "Navy, Planner"
        }
    },
    libra: {
        id: 'libra',
        icon: "♎",
        date: "09.24 - 10.22",
        rulingPlanet: "Venus",
        ko: {
            name: "천칭자리",
            catchphrase: "\"아, 못 고르겠어... (결정장애?)\"",
            desc: "조화와 균형을 중시하는 평화주의자입니다. 뛰어난 미적 감각과 사교성을 지녀 누구와도 잘 어울리며, 우아하고 세련된 매너로 인기가 많습니다.",
            shadow: "점심 메뉴 고르는 데 1시간 걸립니다. 갈등을 피하려고 무조건 '좋아'라고 하다가 나중에 힘들어합니다.",
            love: "로맨틱하고 우아한 연애를 선호합니다. 외모(스타일)를 좀 많이 봅니다.",
            match: "쌍둥이자리, 물병자리",
            lucky: "파스텔 핑크, 향수"
        },
        en: {
            name: "Libra",
            catchphrase: "\"I can't decide... (Indecisive)\"",
            desc: "A peace lover who values harmony and balance. With great aesthetic sense and social skills, you are popular and elegant.",
            shadow: "It takes you an hour to pick a lunch menu. You say 'yes' to everything to avoid conflict and suffer later.",
            love: "Prefers romantic and elegant dates. Looks (style) matter to you.",
            match: "Gemini, Aquarius",
            lucky: "Pastel Pink, Perfume"
        }
    },
    scorpio: {
        id: 'scorpio',
        icon: "♏",
        date: "10.23 - 11.22",
        rulingPlanet: "Pluto",
        ko: {
            name: "전갈자리",
            catchphrase: "\"진실을 말해. 다 알고 있으니까. (통찰력)\"",
            desc: "강렬한 눈빛과 신비로운 매력을 지닌 승부사입니다. 겉으로는 조용해 보이지만 내면에는 뜨거운 열정을 품고 있으며, 본질을 꿰뚫어 보는 무서운 통찰력이 있습니다.",
            shadow: "질투와 집착의 화신입니다. 한 번 배신당하면 지구 끝까지 쫓아가서 복수할지도 모릅니다.",
            love: "영혼까지 결합되는 깊고 진한 사랑을 원합니다. 바람피우면... 아시죠?",
            match: "게자리, 물고기자리",
            lucky: "버건디, 선글라스"
        },
        en: {
            name: "Scorpio",
            catchphrase: "\"Tell the truth. I already know. (Insight)\"",
            desc: "Mysterious charm with intense eyes. Quiet on the outside but burning with passion inside. You see through lies instantly.",
            shadow: "The avatar of jealousy and obsession. Betray a Scorpio, and they might chase you to the ends of the earth.",
            love: "Deep, soul-binding love. If you cheat... run.",
            match: "Cancer, Pisces",
            lucky: "Burgundy, Sunglasses"
        }
    },
    sagittarius: {
        id: 'sagittarius',
        icon: "♐",
        date: "11.23 - 12.24",
        rulingPlanet: "Jupiter",
        ko: {
            name: "사수자리",
            catchphrase: "\"일단 가보자! 어떻게든 되겠지 (자유로운 영혼)\"",
            desc: "낙천적이고 자유로운 영혼의 모험가입니다. 새로운 세상, 철학, 여행을 사랑하며 긍정적인 에너지를 전파합니다. 얽매이는 것을 가장 싫어합니다.",
            shadow: "너무 솔직해서 남에게 상처를 줍니다(악의는 없음). 마무리가 약해서 벌려놓은 일만 100개입니다.",
            love: "친구 같은 편안한 연애, 구속하지 않는 연애를 추구합니다.",
            match: "양자리, 사자자리",
            lucky: "보라색, 여행 가방"
        },
        en: {
            name: "Sagittarius",
            catchphrase: "\"Let's just go! It'll work out (Free Spirit)\"",
            desc: "Optimistic adventurer. You love travel, philosophy, and new worlds. You spread positive vibes and hate being tied down.",
            shadow: "Too blunt that it hurts others (no malice intended). You start 100 things but finish 0.",
            love: "Prefers a friend-like relationship without restrictions.",
            match: "Aries, Leo",
            lucky: "Purple, Travel Bag"
        }
    },
    capricorn: {
        id: 'capricorn',
        icon: "♑",
        date: "12.25 - 01.19",
        rulingPlanet: "Saturn",
        ko: {
            name: "염소자리",
            catchphrase: "\"그래서, 결론이 뭡니까? (야망가)\"",
            desc: "성실하고 책임감 강한 야망가입니다. 목표를 향해 꾸준히 노력하며, 결국에는 정상에 오르는 대기만성형 리더입니다. 시간을 낭비하는 것을 싫어합니다.",
            shadow: "일 중독자(Workaholic)입니다. 너무 진지해서 농담을 다큐로 받아들여 분위기를 싸하게 만듭니다.",
            love: "조건과 현실을 고려하는 신중한 연애. 하지만 책임감은 최고입니다.",
            match: "황소자리, 처녀자리",
            lucky: "검정색, 시계"
        },
        en: {
            name: "Capricorn",
            catchphrase: "\"So, what's the bottom line? (Ambitious)\"",
            desc: "Diligent and responsible. You climb the mountain of success slowly but surely. You hate wasting time.",
            shadow: "Workaholic. You take jokes too seriously and kill the vibe.",
            love: "Cautious love considering reality. But incredibly responsible.",
            match: "Taurus, Virgo",
            lucky: "Black, Watch"
        }
    },
    aquarius: {
        id: 'aquarius',
        icon: "♒",
        date: "01.20 - 02.18",
        rulingPlanet: "Uranus",
        ko: {
            name: "물병자리",
            catchphrase: "\"난 남들과 달라 (4차원 천재)\"",
            desc: "독창적이고 혁신적인 아이디어 뱅크입니다. 편견이 없고 논리적이며, 인류애가 넘치는 박애주의자입니다. 남들이 '예'라고 할 때 '아니오'라고 할 수 있는 용기가 있습니다.",
            shadow: "너무 쿨해서 냉동인간 같습니다. 가끔 외계인어(혼자만의 논리)를 사용해서 소통이 안 됩니다.",
            love: "지적 호기심을 자극하는 사람에게 끌립니다. 집착하면 도망갑니다.",
            match: "쌍둥이자리, 천칭자리",
            lucky: "하늘색, 최신 기기"
        },
        en: {
            name: "Aquarius",
            catchphrase: "\"I am different (Eccentric Genius)\"",
            desc: "Original and innovative idea bank. Unbiased, logical, and humanitarian. You have the courage to say 'No' when everyone says 'Yes'.",
            shadow: "So cool you seem like a frozen statue. Sometimes you speak 'Alien' (your own logic) and no one understands.",
            love: "Attracted to intelligence. If someone clings, you run away.",
            match: "Gemini, Libra",
            lucky: "Sky Blue, Latest Gadget"
        }
    },
    pisces: {
        id: 'pisces',
        icon: "♓",
        date: "02.19 - 03.20",
        rulingPlanet: "Neptune",
        ko: {
            name: "물고기자리",
            catchphrase: "\"꿈속에서 만나요 (로맨틱 몽상가)\"",
            desc: "풍부한 감수성과 예술적 영감을 지닌 몽상가입니다. 마음이 여리고 동정심이 많아 힘든 사람을 그냥 지나치지 못합니다. 상상력이 우주 최강입니다.",
            shadow: "현실 감각이 제로에 가깝습니다. 분위기에 잘 휩쓸려서 거절을 못 하고 이용당하기 쉽습니다.",
            love: "동화 같은 사랑을 꿈꿉니다. 낭만 없이는 못 살아!",
            match: "게자리, 전갈자리",
            lucky: "민트색, 음악"
        },
        en: {
            name: "Pisces",
            catchphrase: "\"See you in my dreams (Romantic Dreamer)\"",
            desc: "A dreamer with artistic inspiration. Gentle and compassionate, you can't ignore those in need. Your imagination is boundless.",
            shadow: "Zero reality sense. You get swept away by atmosphere and can't say 'No'.",
            love: "Dreams of a fairytale romance. Can't live without romance!",
            match: "Cancer, Scorpio",
            lucky: "Mint, Music"
        }
    }
};

const zodiacElements = {
    aries: 'fire', leo: 'fire', sagittarius: 'fire',
    taurus: 'earth', virgo: 'earth', capricorn: 'earth',
    gemini: 'air', libra: 'air', aquarius: 'air',
    cancer: 'water', scorpio: 'water', pisces: 'water'
};

const compatibilityData = {
    // Fire Combinations
    "fire-fire": {
        score: 95,
        ko: {
            title: "폭발하는 에너지! 열정의 도가니",
            desc: "두 분이 만나면 핵폭발급 에너지가 발생합니다! 서로의 열정을 누구보다 잘 이해하고, 함께하면 두려울 게 없는 천하무적 파트너가 됩니다. 지루할 틈이 없는 스펙터클한 관계입니다.",
            tip: "싸울 때도 불같이 싸우니 조심하세요. 자존심 대결만 피하면 완벽합니다."
        },
        en: {
            title: "Explosive Energy! Passionate Powerhouse",
            desc: "When you two meet, it's like a nuclear explosion of energy! You understand each other's passion perfectly and become an invincible duo. Never a boring moment.",
            tip: "You fight like fire too. Avoid ego battles, and you're perfect."
        }
    },
    "fire-air": {
        score: 90,
        ko: {
            title: "불길을 더 키워주는 바람",
            desc: "환상의 짝꿍입니다! 공기(바람)가 불을 더 크게 타오르게 하듯, 상대방은 당신의 열정에 영감을 불어넣어 줍니다. 대화가 끊이지 않고 항상 새로운 아이디어가 넘쳐납니다.",
            tip: "너무 들떠서 현실적인 문제를 놓칠 수 있습니다. 가끔은 차분하게 계획을 세워보세요."
        },
        en: {
            title: "Wind Fanning the Flames",
            desc: "A fantastic match! Just as wind fuels fire, your partner inspires your passion. Conversations never end, and new ideas are always flowing.",
            tip: "Don't get too carried away. Sometimes you need to sit down and plan realistically."
        }
    },
    "fire-earth": {
        score: 50,
        ko: {
            title: "달리는 스포츠카와 과속방지턱",
            desc: "불은 앞만 보고 달리려 하고, 흙은 멈춰서 다지려 합니다. 처음엔 답답할 수 있지만, 흙의 안정감이 불의 무모함을 막아주는 상호보완적인 관계가 될 수 있습니다.",
            tip: "상대방의 신중함을 '느리다'고 비난하지 마세요. 그게 당신을 살리는 길입니다."
        },
        en: {
            title: "Sports Car vs Speed Bump",
            desc: "Fire wants to run, Earth wants to stay and build. It might feel frustrating at first, but Earth's stability can save Fire from recklessness.",
            tip: "Don't blame their caution as 'slow'. It's what keeps you safe."
        }
    },
    "fire-water": {
        score: 30,
        ko: {
            title: "앗, 뜨거! 물과 기름의 만남",
            desc: "서로 너무 다릅니다. 불의 직설적인 화법이 물의 감성을 증발시켜 상처를 줄 수 있고, 물의 감정 기복이 불을 꺼뜨릴 수 있습니다. 하지만 그 '다름'이 강렬한 끌림을 만들기도 합니다.",
            tip: "논리적으로 따지기보다 감정을 먼저 읽어주세요. '그랬구나' 공법이 필요합니다."
        },
        en: {
            title: "Ouch, Hot! Steam and Hiss",
            desc: "Very different. Fire's bluntness can hurt Water's feelings, and Water's moods can dampen Fire's spirit. But that difference can create intense attraction.",
            tip: "Don't argue with logic; validate feelings first. Empathy is key."
        }
    },

    // Earth Combinations
    "earth-earth": {
        score: 95,
        ko: {
            title: "흔들리지 않는 편안함",
            desc: "말하지 않아도 통하는 사이입니다. 두 분 모두 현실적이고 안정을 추구해서, 갈등 없이 신뢰를 쌓아갑니다. 함께 미래를 계획하고 자산을 늘려가는 데 최고의 파트너입니다.",
            tip: "너무 안정적이라 지루해질 수 있습니다. 가끔은 계획 없는 여행을 떠나보세요."
        },
        en: {
            title: "Unshakable Comfort",
            desc: "You understand each other without words. Both realistic and stability-seeking, you build deep trust with little conflict. Great for building a future (and wealth) together.",
            tip: "Can get a bit boring. Try a spontaneous trip once in a while."
        }
    },
    "earth-water": {
        score: 90,
        ko: {
            title: "비 온 뒤 굳어지는 단단한 땅",
            desc: "흙은 물을 담아주고, 물은 흙을 촉촉하게 해줍니다. 흙의 든든함이 물의 불안함을 잠재워주고, 물의 감수성이 흙의 딱딱함을 녹여주는 힐링 관계입니다.",
            tip: "너무 의존적인 관계가 되지 않도록 서로의 독립성을 존중해주세요."
        },
        en: {
            title: "Nourishing Rain on Dry Land",
            desc: "Earth holds Water, and Water nourishes Earth. Earth calms Water's anxiety, and Water softens Earth's rigidity. A healing relationship.",
            tip: "Respect each other's independence to avoid becoming too dependent."
        }
    },
    "earth-fire": {
        score: 50,
        ko: {
            title: "화산 폭발 직전의 땅",
            desc: "현실적인 당신에게 불 같은 상대방은 너무 무모해 보일 수 있습니다. 하지만 상대방의 추진력이 당신을 더 높은 곳으로 이끌어 줄 수 있습니다. 자극이 되는 관계입니다.",
            tip: "잔소리는 조금만 줄이세요. 상대방의 기를 살려주는 것이 결국 이득입니다."
        },
        en: {
            title: "Volcanic Ground",
            desc: "To realistic you, the fiery partner seems reckless. But their drive can lead you to new heights. A stimulating relationship.",
            tip: "Nag less. Boosting their morale will benefit you in the end."
        }
    },
    "earth-air": {
        score: 50,
        ko: {
            title: "모래바람 날리는 사막",
            desc: "흙은 자리를 지키고 싶은데, 공기는 자꾸 떠돌아다닙니다. 서로의 라이프스타일이 달라서 이해하기 힘들 수 있습니다. 하지만 서로의 부족한 점(현실감각 vs 융통성)을 배울 수 있습니다.",
            tip: "상대방을 가두려 하지 마세요. 자유를 줄수록 돌아옵니다."
        },
        en: {
            title: "Dust in the Wind",
            desc: "Earth wants to stay, Air wants to roam. Different lifestyles make understanding hard. But you can learn from each other (Reality vs Flexibility).",
            tip: "Don't try to cage them. Freedom brings them back."
        }
    },

    // Air Combinations
    "air-air": {
        score: 95,
        ko: {
            title: "밤새도록 수다 떠는 소울메이트",
            desc: "만나면 접시가 깨질 정도로 할 말이 많습니다! 지적 호기심과 코드가 완벽하게 맞아서, 연인이자 가장 친한 친구가 될 수 있습니다. 구속 없는 자유로운 사랑을 합니다.",
            tip: "말만 하다가 끝날 수 있습니다. 실천하는 힘을 기르는 것이 중요합니다."
        },
        en: {
            title: "Chatty Soulmates",
            desc: "You can talk forever! Intellectual curiosity and vibes match perfectly. Lovers and best friends. A free love without restrictions.",
            tip: "Don't just talk; action matters. Build the habit of doing things together."
        }
    },
    "air-fire": {
        score: 90,
        ko: {
            title: "열기구 타고 날아가는 모험",
            desc: "당신의 아이디어에 상대방이 불을 붙여 실행에 옮깁니다. 함께 있으면 긍정적인 에너지가 넘치고, 매일매일이 시트콤처럼 즐거운 커플이 됩니다.",
            tip: "둘 다 참을성이 좀 부족합니다. 화가 날 땐 10분만 떨어져 있으세요."
        },
        en: {
            title: "Hot Air Balloon Adventure",
            desc: "Your ideas meet their action. Together, positive energy overflows, and every day is like a fun sitcom.",
            tip: "Both lack patience. Take a 10-minute break when angry."
        }
    },
    "air-water": {
        score: 60,
        ko: {
            title: "호수 위의 안개",
            desc: "신비롭고 몽환적인 분위기가 있지만, 잡힐 듯 잡히지 않는 관계입니다. 당신의 이성적인 면이 상대방의 감성적인 면을 이해하지 못해 '차갑다'는 오해를 받을 수 있습니다.",
            tip: "논리로 이기려 들지 마세요. 상대방에게 필요한 건 '해결책'이 아니라 '공감'입니다."
        },
        en: {
            title: "Mist on the Lake",
            desc: "Mysterious and dreamy, but elusive. Your logic might clash with their emotions, making you seem 'cold'.",
            tip: "Don't win with logic. They need 'empathy', not a 'solution'."
        }
    },
    "air-earth": {
        score: 50,
        ko: {
            title: "땅에 묶인 연",
            desc: "당신은 자유롭게 날고 싶은데, 상대방은 줄을 잡고 현실로 끌어당깁니다. 답답할 수 있지만, 당신이 날아가버리지 않게 잡아주는 고마운 존재이기도 합니다.",
            tip: "상대방의 현실적인 조언을 무시하지 마세요. 뼈가 되고 살이 됩니다."
        },
        en: {
            title: "Kite on a String",
            desc: "You want to fly, they pull you back to reality. Frustrating, but they keep you grounded and safe.",
            tip: "Don't ignore their realistic advice. It's truly helpful."
        }
    },

    // Water Combinations
    "water-water": {
        score: 95,
        ko: {
            title: "말없이 흐르는 깊은 강물",
            desc: "눈빛만 봐도 기분을 아는 텔레파시 커플입니다. 감정적 교류가 깊고 서로를 끔찍이 아끼지만, 둘 다 기분이 다운되면 끝도 없이 우울해질 수 있습니다.",
            tip: "서로의 감정 쓰레기통이 되지 않도록 주의하세요. 밝은 데이트가 필요합니다."
        },
        en: {
            title: "Deep Silent River",
            desc: "Telepathic couple who knows each other's moods by a glance. Deep emotional bond. But if both get down, it's a deep dive into gloom.",
            tip: "Don't become emotional dumpsters for each other. Go on bright, fun dates."
        }
    },
    "water-earth": {
        score: 90,
        ko: {
            title: "꽃을 피우는 단비와 옥토",
            desc: "당신의 사랑과 배려가 상대방을 성장시키고, 상대방의 든든함이 당신에게 안식처가 되어줍니다. 결혼 상대로 가장 이상적인 안정적인 조합입니다.",
            tip: "상대방이 표현이 좀 서툴러도 마음은 진국이니 재촉하지 마세요."
        },
        en: {
            title: "Rain and Soil Blooming Flowers",
            desc: "Your love helps them grow, and their strength gives you a home. An ideal, stable match for marriage.",
            tip: "They might be bad at expressing feelings, but their heart is true. Be patient."
        }
    },
    "water-fire": {
        score: 30,
        ko: {
            title: "끓어 넘치는 냄비",
            desc: "상대방의 열정이 매력적이지만, 가끔은 당신을 지치게 만듭니다. 당신의 섬세함을 상대방은 '예민하다'고 받아들일 수 있습니다. 서로의 온도 차이를 인정해야 합니다.",
            tip: "직설적인 말에 상처받지 마세요. 악의는 없습니다. 쿨하게 넘기는 연습이 필요합니다."
        },
        en: {
            title: "Boiling Pot",
            desc: "Their passion is attractive but exhausting. They might see your sensitivity as being 'touchy'. Acknowledge the temperature difference.",
            tip: "Don't get hurt by blunt words. No malice intended. Practice letting it go."
        }
    },
    "water-air": {
        score: 60,
        ko: {
            title: "파도를 일으키는 바람",
            desc: "바람이 불면 파도가 치듯, 상대방의 말 한마디에 당신의 마음이 요동칩니다. 지적으로는 즐겁지만, 감정적으로는 채워지지 않는 공허함을 느낄 수도 있습니다.",
            tip: "상대방에게 깊은 감정적 공감을 기대하지 마세요. 가벼운 대화 친구로서는 최고입니다."
        },
        en: {
            title: "Wind Causing Waves",
            desc: "Like wind on water, their words stir your emotions. Intellectually fun, but you might feel emotionally empty.",
            tip: "Don't expect deep emotional empathy. They are great for lighthearted talks."
        }
    }
};

// Zodiac Logic Module
const ZodiacManager = {
    init() {
        this.grid = document.getElementById('zodiac-grid');
        this.modal = document.getElementById('zodiac-modal');
        this.modalBody = document.getElementById('modal-body');
        this.closeBtn = document.querySelector('.close-modal');
        this.currentSignId = null; 

        if (!this.grid || !this.modal) return;

        this.renderGrid();
        this.bindEvents();
    },

    renderGrid() {
        this.grid.innerHTML = ''; 
        const lang = localStorage.getItem('lang') || 'ko';

        Object.values(zodiacData).forEach(sign => {
            const card = document.createElement('div');
            card.className = 'zodiac-card';
            card.dataset.id = sign.id;
            
            const name = sign[lang].name;

            card.innerHTML = `
                <div class="zodiac-icon">${sign.icon}</div>
                <div class="zodiac-name">${name}</div>
                <div class="zodiac-date">${sign.date}</div>
            `;
            
            card.addEventListener('click', () => this.openModal(sign.id));
            this.grid.appendChild(card);
        });
    },

    openModal(signId) {
        this.currentSignId = signId;
        this.updateModalContent();
        this.modal.classList.add('active');
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    },

    closeModal() {
        this.modal.classList.remove('active');
        this.currentSignId = null;
        setTimeout(() => {
            this.modal.classList.add('hidden');
            document.body.style.overflow = ''; 
        }, 300); 
    },

    updateModalContent() {
        if (!this.currentSignId) return;

        const lang = localStorage.getItem('lang') || 'ko';
        const data = zodiacData[this.currentSignId];
        const content = data[lang];

        const labels = {
            en: { personality: "Cosmic Personality", shadow: "Shadow Side", love: "Love Style", match: "Best Match", lucky: "Lucky Item" },
            ko: { personality: "기본 성격", shadow: "숨겨진 단점 (팩폭)", love: "연애 스타일", match: "베스트 궁합", lucky: "행운 아이템" }
        };
        const label = labels[lang];

        this.modalBody.innerHTML = `
            <div class="zodiac-detail-header">
                <div class="zodiac-detail-icon">${data.icon}</div>
                <div class="zodiac-detail-title">
                    <h3>${content.name}</h3>
                    <div class="zodiac-detail-date">${data.date}</div>
                </div>
            </div>
            <div class="zodiac-detail-catchphrase">${content.catchphrase}</div>
            
            <div class="zodiac-info-block">
                <div class="zodiac-info-label">✨ ${label.personality}</div>
                <div class="zodiac-info-text">${content.desc}</div>
            </div>

            <div class="zodiac-info-block">
                <div class="zodiac-info-label">🌑 ${label.shadow}</div>
                <div class="zodiac-info-text">${content.shadow}</div>
            </div>

            <div class="zodiac-info-block">
                <div class="zodiac-info-label">💘 ${label.love}</div>
                <div class="zodiac-info-text">${content.love}</div>
            </div>

             <div class="zodiac-info-block">
                <div class="zodiac-info-label">💞 ${label.match}</div>
                <div class="zodiac-info-text">${content.match}</div>
            </div>

             <div class="zodiac-info-block">
                <div class="zodiac-info-label">🍀 ${label.lucky}</div>
                <div class="zodiac-info-text">${content.lucky}</div>
            </div>
        `;
    },

    bindEvents() {
        this.closeBtn.addEventListener('click', () => this.closeModal());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    },
    
    updateUI() {
        this.renderGrid();
        if (this.modal.classList.contains('active')) {
            this.updateModalContent();
        }
    }
};

// Chemistry Logic Module
const ChemistryManager = {
    init() {
        this.select1 = document.getElementById('sign-1');
        this.select2 = document.getElementById('sign-2');
        this.btnCalc = document.getElementById('btn-check-chemistry');
        this.resultDiv = document.getElementById('chemistry-result');
        
        if (!this.select1 || !this.select2) return;

        this.populateSelects();
        this.btnCalc.addEventListener('click', () => this.calculate());
    },

    populateSelects() {
        const lang = localStorage.getItem('lang') || 'ko';
        const placeholder = lang === 'en' ? "Select Sign" : "별자리 선택";
        
        // Save current selection if re-populating (e.g. language switch)
        const val1 = this.select1.value;
        const val2 = this.select2.value;

        let optionsHtml = `<option value="" disabled selected>${placeholder}</option>`;
        
        Object.values(zodiacData).forEach(sign => {
            optionsHtml += `<option value="${sign.id}">${sign.icon} ${sign[lang].name}</option>`;
        });

        this.select1.innerHTML = optionsHtml;
        this.select2.innerHTML = optionsHtml;

        // Restore selection if valid
        if (val1) this.select1.value = val1;
        if (val2) this.select2.value = val2;
    },

    calculate() {
        const sign1 = this.select1.value;
        const sign2 = this.select2.value;

        if (!sign1 || !sign2) {
            const lang = localStorage.getItem('lang') || 'ko';
            alert(lang === 'en' ? "Please select both signs!" : "두 별자리를 모두 선택해주세요!");
            return;
        }

        const lang = localStorage.getItem('lang') || 'ko';
        const s1Data = zodiacData[sign1];
        const s2Data = zodiacData[sign2];
        const el1 = zodiacElements[sign1];
        const el2 = zodiacElements[sign2];

        // Key for compatibility data: e.g., "fire-water"
        const key = `${el1}-${el2}`;
        const data = compatibilityData[key];
        
        // Random variance (+/- 5) for score
        const variance = Math.floor(Math.random() * 11) - 5; 
        const finalScore = Math.min(100, Math.max(0, data.score + variance));

        const content = data[lang];

        this.resultDiv.innerHTML = `
            <div class="score-display">${finalScore}%</div>
            <h3 class="comp-title">"${content.title}"</h3>
            
            <div class="comp-detail-box">
                <p class="comp-desc">${content.desc}</p>
                <div class="comp-tip">
                    <strong>💡 Cosmic Tip:</strong> ${content.tip}
                </div>
            </div>

            <div class="score-detail">
                ${s1Data.icon} ${s1Data[lang].name} (${el1}) <span style="margin:0 10px">❤️</span> ${s2Data.icon} ${s2Data[lang].name} (${el2})
            </div>
        `;
        this.resultDiv.classList.remove('hidden');
        
        // Scroll to result
        this.resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    updateText() {
        this.populateSelects();
        // Clear result on language change to avoid mixed language text
        this.resultDiv.innerHTML = ''; 
        this.resultDiv.classList.add('hidden');
    }
};

// Dog Face Logic Module
const DogFaceManager = {
    URL: "https://teachablemachine.withgoogle.com/models/1pr_o9L33/",
    model: null,
    
    // Result Data (Cosmic Interpretation)
    dogData: {
        retriever: {
            ko: { name: "태양의 수호자 골든 리트리버", desc: "당신은 따뜻하고 긍정적인 에너지로 주변을 밝히는 '인간 태양'입니다. 친화력이 좋고 멍뭉미가 넘쳐서 어디서나 사랑받는 인기쟁이시군요!" },
            en: { name: "Guardian of the Sun: Golden Retriever", desc: "You are a 'Human Sun' brightening the world with warmth and positivity. Friendly and full of puppy-like charm, you are loved everywhere!" }
        },
        chihuahua: {
            ko: { name: "작은 거인 치와와", desc: "작지만 강한 존재감! 눈치가 빠르고 야무진 당신은 은하계의 똑쟁이입니다. 내 사람에게는 애교가 넘치지만, 선을 넘는 사람에겐 참지 않죠." },
            en: { name: "Little Giant: Chihuahua", desc: "Small but mighty! Sharp and smart, you are the galaxy's cleverest. Sweet to your own people, but you don't tolerate nonsense." }
        },
        husky: {
            ko: { name: "얼음 행성의 늑대 시베리안 허스키", desc: "차가운 도시의 늑대 같지만 알고 보면 엉뚱한 매력이 있는 당신! 카리스마 넘치는 외모 뒤에 숨겨진 반전 매력(허당기)이 치명적입니다." },
            en: { name: "Wolf of the Ice Planet: Siberian Husky", desc: "Cool on the outside, goofy on the inside! Your fatal charm lies in the contrast between your charismatic look and your silly side." }
        },
        maltese: { // Also covers Bichon
            ko: { name: "구름 위의 천사 말티즈", desc: "하얗고 소중한 솜뭉치! 사랑스러움 그 자체인 당신은 보기만 해도 힐링이 되는 존재입니다. 하지만 참지 않는 성격도 숨겨져 있죠." },
            en: { name: "Angel on Clouds: Maltese", desc: "A precious ball of fluff! Pure loveliness, you are a healing presence. But you also have a sassy side that won't hold back." }
        },
        bulldog: { // Also covers Pug
            ko: { name: "지구 방위대장 불독", desc: "묵직하고 듬직한 매력! 겉모습은 강해 보이지만 속마음은 누구보다 여리고 따뜻한 '겉바속촉'의 정석입니다. 억울한 표정이 포인트!" },
            en: { name: "Earth Defender: Bulldog", desc: "Solid and reliable! Tough on the outside, soft on the inside. Your slightly 'unjust' expression is your charm point." }
        },
        shiba: { // Also covers Jindo
            ko: { name: "행운의 여우 시바견", desc: "볼살이 매력적인 당신! 독립적이고 마이웨이 성향이 강하지만, 한 번 마음을 주면 충성하는 츤데레 매력의 소유자입니다." },
            en: { name: "Lucky Fox: Shiba Inu", desc: "Charming cheeks! Independent and doing things your way, but a loyal 'Tsundere' once you open your heart." }
        }
    },

    init() {
        this.uploadArea = document.getElementById('dog-upload-area');
        this.fileInput = document.getElementById('dog-image-upload');
        this.previewImg = document.getElementById('dog-preview-image');
        this.placeholder = document.getElementById('upload-placeholder');
        this.loading = document.getElementById('dog-loading');
        this.btnAnalyze = document.getElementById('btn-analyze-dog');
        this.resultDiv = document.getElementById('dog-result');

        if (!this.uploadArea) return;

        // Load Model
        this.loadModel();

        // Event Listeners
        this.uploadArea.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleImageUpload(e));
        this.btnAnalyze.addEventListener('click', () => this.predict());
    },

    async loadModel() {
        try {
            const modelURL = this.URL + "model.json";
            const metadataURL = this.URL + "metadata.json";
            this.model = await tmImage.load(modelURL, metadataURL);
            console.log("Model Loaded");
        } catch (e) {
            console.error("Model Load Failed:", e);
        }
    },

    handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            this.previewImg.src = e.target.result;
            this.previewImg.classList.remove('hidden');
            this.placeholder.classList.add('hidden');
            this.btnAnalyze.classList.remove('hidden');
            this.resultDiv.classList.add('hidden'); // Hide previous result
        };
        reader.readAsDataURL(file);
    },

    async predict() {
        if (!this.model) {
            alert("AI is still waking up... Please wait a moment. / AI가 아직 로딩 중입니다. 잠시만 기다려주세요.");
            return;
        }

        // Show Loading
        this.loading.classList.remove('hidden');
        this.previewImg.classList.add('opacity-50'); // Dim image
        this.btnAnalyze.disabled = true;

        try {
            const prediction = await this.model.predict(this.previewImg);
            
            // Sort by probability
            prediction.sort((a, b) => b.probability - a.probability);
            
            // Get Top 1
            const topClass = prediction[0].className.toLowerCase();
            this.showResult(topClass, prediction);

        } catch (e) {
            console.error(e);
            alert("Analysis failed. / 분석에 실패했습니다.");
        } finally {
            // Hide Loading
            this.loading.classList.add('hidden');
            this.previewImg.classList.remove('opacity-50');
            this.btnAnalyze.disabled = false;
        }
    },

    showResult(className, allPredictions) {
        const lang = localStorage.getItem('lang') || 'ko';
        
        // Find matching key in dogData (simple keyword matching)
        let key = 'retriever'; // default
        if (className.includes('retriever')) key = 'retriever';
        else if (className.includes('chihuahua')) key = 'chihuahua';
        else if (className.includes('husky')) key = 'husky';
        else if (className.includes('maltese') || className.includes('bichon')) key = 'maltese';
        else if (className.includes('bulldog') || className.includes('pug')) key = 'bulldog';
        else if (className.includes('shiba') || className.includes('jindo')) key = 'shiba';

        const data = this.dogData[key];
        const content = data[lang];

        // Generate Probability Bars HTML
        let barsHtml = '';
        allPredictions.slice(0, 3).forEach(p => { // Top 3 only
            const percent = (p.probability * 100).toFixed(1);
            barsHtml += `
                <div class="bar-label">
                    <span>${p.className}</span>
                    <span>${percent}%</span>
                </div>
                <div class="bar-container">
                    <div class="bar-fill" style="width: ${percent}%"></div>
                </div>
            `;
        });

        this.resultDiv.innerHTML = `
            <h3 class="dog-name">${content.name}</h3>
            <p class="dog-desc">${content.desc}</p>
            <div class="dog-stats">
                ${barsHtml}
            </div>
        `;
        this.resultDiv.classList.remove('hidden');
        this.resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
};


// Global function to update contact form, zodiac section, and other texts
window.updateGlobalText = function(lang) {
    const t = translations[lang];

    const contactTitle = document.getElementById('contact-title');
    if (contactTitle) contactTitle.textContent = t.contactTitle;
    
    const labelName = document.getElementById('label-name');
    if (labelName) labelName.textContent = t.labelName;
    
    const labelEmail = document.getElementById('label-email');
    if (labelEmail) labelEmail.textContent = t.labelEmail;
    
    const labelMessage = document.getElementById('label-message');
    if (labelMessage) labelMessage.textContent = t.labelMessage;
    
    const btnSend = document.getElementById('form-submit-btn');
    if (btnSend) btnSend.textContent = t.btnSendSignal;
    
    const inst = document.getElementById('form-instructions-text');
    if (inst) inst.textContent = t.formInstructions;
    
    const disqusTitle = document.getElementById('disqus-title');
    if (disqusTitle) disqusTitle.textContent = t.disqusTitle;

    // Zodiac Section Titles
    const zodiacTitles = {
        en: { title: "Cosmic Constellations", subtitle: "Discover the secrets of the stars" },
        ko: { title: "우주의 별자리", subtitle: "당신의 별이 속삭이는 비밀을 들어보세요" }
    };
    
    const zTitle = document.getElementById('zodiac-title');
    const zSubtitle = document.getElementById('zodiac-subtitle');
    
    if (zTitle) zTitle.textContent = zodiacTitles[lang].title;
    if (zSubtitle) zSubtitle.textContent = zodiacTitles[lang].subtitle;

    // Chemistry Section Titles
    const chemTitles = {
        en: { title: "Cosmic Chemistry", subtitle: "Do your stars align?", me: "Me", partner: "Partner", btn: "Calculate Compatibility" },
        ko: { title: "우주 궁합", subtitle: "우리의 별들은 얼마나 잘 맞을까요?", me: "나", partner: "상대방", btn: "궁합 확인하기" }
    };

    const cTitle = document.getElementById('chemistry-title');
    const cSubtitle = document.getElementById('chemistry-subtitle');
    const lSign1 = document.getElementById('label-sign-1');
    const lSign2 = document.getElementById('label-sign-2');
    const btnCalc = document.getElementById('btn-check-chemistry');

    if (cTitle) cTitle.textContent = chemTitles[lang].title;
    if (cSubtitle) cSubtitle.textContent = chemTitles[lang].subtitle;
    if (lSign1) lSign1.textContent = chemTitles[lang].me;
    if (lSign2) lSign2.textContent = chemTitles[lang].partner;
    if (btnCalc) btnCalc.textContent = chemTitles[lang].btn;

    // Dog Face Section Titles
    const dogTitles = {
        en: { title: "Cosmic Dog Face", subtitle: "Which space puppy are you?", btn: "Analyze Face" },
        ko: { title: "우주 댕댕이 관상", subtitle: "나는 어떤 우주 강아지일까요?", btn: "얼굴 분석하기" }
    };
    
    const dTitle = document.getElementById('dog-title');
    const dSubtitle = document.getElementById('dog-subtitle');
    const btnDog = document.getElementById('btn-analyze-dog');
    
    if (dTitle) dTitle.textContent = dogTitles[lang].title;
    if (dSubtitle) dSubtitle.textContent = dogTitles[lang].subtitle;
    if (btnDog) btnDog.textContent = dogTitles[lang].btn;

    // Update Zodiac Cards & Modal
    ZodiacManager.updateUI();
    
    // Update Chemistry Selects
    ChemistryManager.updateText();
}

// Global function to update quote
window.updateQuote = function(lang) {
    const list = quotes[lang] || quotes['en'];
    const quoteElement = document.getElementById('quote-of-the-day');
    if (quoteElement) {
        const randomQuote = list[Math.floor(Math.random() * list.length)];
        quoteElement.textContent = randomQuote;
    }
}

// Initial Load Handler
document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('lang') || 'ko';
    
    // Initialize Zodiac Section
    ZodiacManager.init();
    
    // Initialize Chemistry Section
    ChemistryManager.init();
    
    // Initialize Dog Face Section
    DogFaceManager.init();

    // Initial Global Text Update (covers Contact Form & Zodiac Titles)
    updateGlobalText(lang);
    
    // Initial Quote
    updateQuote(lang);
});