class CosmicOracle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this._setupUI();
    
    this.themeToggle.addEventListener('change', () => this._toggleTheme());
    this.fortuneButton.addEventListener('click', () => this.getFortune());

    this._applyInitialTheme();
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
        width: clamp(300px, 90vw, 500px);
        margin: 1rem;
      }
      h1 {
        font-family: var(--font-main);
        font-size: 2.2rem;
        font-weight: 700;
        text-shadow: 0 0 5px var(--glow-color), 0 0 10px var(--glow-color);
        margin-bottom: 1.5rem;
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
        min-width: 180px;
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
      .theme-switch-container {
        position: absolute;
        top: 20px;
        right: 20px;
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
      <div class="theme-switch-container">
        <label class="theme-switch">
          <input type="checkbox" id="theme-toggle">
          <span class="slider"></span>
        </label>
      </div>
      <h1>Today's Cosmic Fortune</h1>
      <div class="scores-container">
        <div class="score-section">
          <h2><span role="img" aria-label="money">💰</span> Wealth</h2>
          <p class="score-value" id="financial-score">--</p>
          <p class="score-message" id="financial-message">Press the button to see your financial forecast.</p>
        </div>
        <div class="score-section">
          <h2><span role="img" aria-label="people">🤝</span> Bonds</h2>
          <p class="score-value" id="relationship-score">--</p>
          <p class="score-message" id="relationship-message">Press the button to see your relationship forecast.</p>
        </div>
      </div>
      <button id="fortune-button">Reveal Fortune</button>
    `;

    this.shadowRoot.append(style, wrapper);

    this.themeToggle = this.shadowRoot.getElementById('theme-toggle');
    this.fortuneButton = this.shadowRoot.getElementById('fortune-button');
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
  }

  getFortune() {
    if (!this.checkFortuneAvailability(false)) return;

    const financialScore = Math.floor(Math.random() * 100) + 1;
    const relationshipScore = Math.floor(Math.random() * 100) + 1;
    
    const fortuneData = {
        financialScore,
        relationshipScore,
        financialMessage: this.getFortuneMessage(financialScore),
        relationshipMessage: this.getFortuneMessage(relationshipScore)
    };

    localStorage.setItem('fortuneData', JSON.stringify(fortuneData));
    localStorage.setItem('lastFortuneDate', new Date().toDateString());

    this._animateScore(this.financialScoreDisplay, financialScore);
    this._animateScore(this.relationshipScoreDisplay, relationshipScore);

    setTimeout(() => {
        this.financialMessageDisplay.innerHTML = fortuneData.financialMessage;
        this.relationshipMessageDisplay.innerHTML = fortuneData.relationshipMessage;
    }, 1500);

    this.checkFortuneAvailability(true);
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
    if (score >= 81) return '🌟 <strong>Cosmic alignment!</strong> A universe of opportunities awaits!';
    if (score >= 61) return '✨ <strong>Starlight favor!</strong> Good vibes are flowing your way.';
    if (score >= 41) return '☀️ <strong>Neutral space.</strong> Your path is your own to forge.';
    if (score >= 21) return '☁️ <strong>Minor nebula.</strong> Navigate with care and intention.';
    return '☄️ <strong>Asteroid field!</strong> Keep your head up and stay positive.';
  }

  checkFortuneAvailability(isAfterClick = false) {
    const today = new Date().toDateString();
    const lastFortuneDate = localStorage.getItem('lastFortuneDate');

    if (lastFortuneDate === today) {
      this.fortuneButton.disabled = true;
      this.fortuneButton.textContent = 'Fortune Revealed';
      
      if (!isAfterClick) {
        const savedFortune = localStorage.getItem('fortuneData');
        if (savedFortune) {
            const data = JSON.parse(savedFortune);
            this.financialScoreDisplay.textContent = data.financialScore;
            this.relationshipScoreDisplay.textContent = data.relationshipScore;
            this.financialMessageDisplay.innerHTML = data.financialMessage;
            this.relationshipMessageDisplay.innerHTML = data.relationshipMessage;
        }
      }
      return false;
    } else {
      this.fortuneButton.disabled = false;
      this.fortuneButton.textContent = 'Reveal Fortune';
      this.financialScoreDisplay.textContent = '--';
      this.relationshipScoreDisplay.textContent = '--';
      this.financialMessageDisplay.textContent = 'Press the button to see your financial forecast.';
      this.relationshipMessageDisplay.textContent = 'Press the button to see your relationship forecast.';
      return true;
    }
  }
}

customElements.define('cosmic-oracle', CosmicOracle);

// New Feature: Quote of the Day
document.addEventListener('DOMContentLoaded', () => {
    const quotes = [
        "\"The universe is under no obligation to make sense to you.\" - Neil deGrasse Tyson",
        "\"Somewhere, something incredible is waiting to be known.\" - Carl Sagan",
        "\"We are all in the gutter, but some of us are looking at the stars.\" - Oscar Wilde",
        "\"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.\" - Albert Einstein",
        "\"Look up at the stars and not down at your feet. Try to make sense of what you see, and wonder about what makes the universe exist. Be curious.\" - Stephen Hawking"
    ];

    const quoteElement = document.getElementById('quote-of-the-day');
    if (quoteElement) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteElement.textContent = randomQuote;
    }
});
