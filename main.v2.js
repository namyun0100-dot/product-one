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
      DISQUS.reset({
        reload: true,
        config: function () {
          this.page.url = window.location.href;  // Re-set URL
          this.page.identifier = 'cosmic-fortune-page'; // Re-set identifier
        }
      });
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
window.updateGlobalText = function(lang) {
    const t = translations[lang];

    document.getElementById('contact-title').textContent = t.contactTitle;
    document.getElementById('label-name').textContent = t.labelName;
    document.getElementById('label-email').textContent = t.labelEmail;
    document.getElementById('label-message').textContent = t.labelMessage;
    document.getElementById('form-submit-btn').textContent = t.btnSendSignal;
    document.getElementById('form-instructions-text').textContent = t.formInstructions;
    document.getElementById('disqus-title').textContent = t.disqusTitle;
}

// Global function to update quote
window.updateQuote = function(lang) {
    const t = translations[lang]; // This was an error, should use quotes not translations
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
    // Ensure _updateText in CosmicOracle is called once for initial setup
    // This happens implicitly when CosmicOracle constructor runs
    updateQuote(lang);
    updateGlobalText(lang); // Update global text (contact form) on load
});