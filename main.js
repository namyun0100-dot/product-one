
class FortuneTeller extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'fortune-card');

    const themeToggleContainer = document.createElement('div');
    themeToggleContainer.setAttribute('class', 'theme-toggle-container');
    this.themeToggle = document.createElement('input');
    this.themeToggle.setAttribute('type', 'checkbox');
    this.themeToggle.setAttribute('id', 'theme-toggle');
    this.themeToggle.addEventListener('change', () => this._toggleTheme());
    const themeToggleLabel = document.createElement('label');
    themeToggleLabel.setAttribute('for', 'theme-toggle');
    themeToggleLabel.textContent = 'Toggle Theme';
    themeToggleContainer.appendChild(this.themeToggle);
    themeToggleContainer.appendChild(themeToggleLabel);

    const title = document.createElement('h1');
    title.textContent = "Today's Fortune";

    const scoresContainer = document.createElement('div');
    scoresContainer.setAttribute('class', 'scores-container');

    const financialLuckSection = document.createElement('div');
    financialLuckSection.setAttribute('class', 'score-section');
    const financialLuckTitle = document.createElement('h2');
    financialLuckTitle.textContent = '금전운';
    this.financialScoreDisplay = document.createElement('p');
    this.financialScoreDisplay.setAttribute('class', 'score-value');
    this.financialScoreDisplay.textContent = '--';
    this.financialMessageDisplay = document.createElement('p');
    this.financialMessageDisplay.setAttribute('class', 'score-message');
    this.financialMessageDisplay.textContent = '버튼을 눌러 금전운을 확인하세요.';
    financialLuckSection.appendChild(financialLuckTitle);
    financialLuckSection.appendChild(this.financialScoreDisplay);
    financialLuckSection.appendChild(this.financialMessageDisplay);

    const relationshipLuckSection = document.createElement('div');
    relationshipLuckSection.setAttribute('class', 'score-section');
    const relationshipLuckTitle = document.createElement('h2');
    relationshipLuckTitle.textContent = '인간관계운';
    this.relationshipScoreDisplay = document.createElement('p');
    this.relationshipScoreDisplay.setAttribute('class', 'score-value');
    this.relationshipScoreDisplay.textContent = '--';
    this.relationshipMessageDisplay = document.createElement('p');
    this.relationshipMessageDisplay.setAttribute('class', 'score-message');
    this.relationshipMessageDisplay.textContent = '버튼을 눌러 인간관계운을 확인하세요.';
    relationshipLuckSection.appendChild(relationshipLuckTitle);
    relationshipLuckSection.appendChild(this.relationshipScoreDisplay);
    relationshipLuckSection.appendChild(this.relationshipMessageDisplay);

    scoresContainer.appendChild(financialLuckSection);
    scoresContainer.appendChild(relationshipLuckSection);

    this.fortuneButton = document.createElement('button');
    this.fortuneButton.textContent = '운세 보기';
    this.fortuneButton.addEventListener('click', () => this.getFortune());

    const style = document.createElement('style');
    style.textContent = `
      :host {
        --card-bg: #ffffff;
        --card-shadow: rgba(180, 160, 140, 0.2);
        --text-color-h1: #000000;
        --text-color-h2: #34495e;
        --text-color-score: #4a4a4a;
        --text-color-message: #7f8c8d;
        --section-bg: #fdfdfd;
        --section-border: #eee;
        --button-bg: #8bc34a;
        --button-hover-bg: #7cb342;
        --button-text: white;
        --button-disabled-bg: #dcdcdc;
        --button-disabled-text: #a0a0a0;
        --toggle-bg: #ccc;
        --toggle-knob: white;
        transition: background-color 0.3s ease;
      }

      :host([data-theme='dark']) {
        --card-bg: #2c3e50;
        --card-shadow: rgba(0, 0, 0, 0.4);
        --text-color-h1: #ecf0f1;
        --text-color-h2: #95a5a6;
        --text-color-score: #ecf0f1;
        --text-color-message: #bdc3c7;
        --section-bg: #34495e;
        --section-border: #2c3e50;
        --button-bg: #16a085;
        --button-hover-bg: #1abc9c;
        --button-disabled-bg: #7f8c8d;
        --button-disabled-text: #bdc3c7;
        --toggle-bg: #16a085;
        --toggle-knob: #ecf0f1;
      }

      .fortune-card {
        position: relative;
        background-color: var(--card-bg);
        color: var(--text-color);
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 10px 20px var(--card-shadow);
        text-align: center;
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      h1 {
        color: var(--text-color-h1);
      }

      .scores-container {
        display: flex;
        justify-content: space-around;
        gap: 1.5rem;
        margin: 1.5rem 0;
        flex-wrap: wrap;
      }

      .score-section {
        flex: 1;
        min-width: 150px;
        padding: 1rem;
        border: 1px solid var(--section-border);
        border-radius: 0.75rem;
        background-color: var(--section-bg);
        transition: background-color 0.3s ease;
      }

      .score-section h2 {
        font-size: 1.5rem;
        color: var(--text-color-h2);
        margin-bottom: 0.5rem;
      }

      .score-value {
        font-size: 2.5rem;
        font-weight: bold;
        margin: 0.5rem 0;
        color: var(--text-color-score);
      }

      .score-message {
        font-style: italic;
        color: var(--text-color-message);
        font-weight: bold;
        min-height: 3em;
      }

      button {
        background-color: var(--button-bg);
        color: var(--button-text);
        padding: 1rem 2rem;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s;
        margin-top: 1.5rem;
      }

      button:hover {
        background-color: var(--button-hover-bg);
      }

      button:disabled {
        background-color: var(--button-disabled-bg);
        cursor: not-allowed;
        color: var(--button-disabled-text);
      }
      
      .theme-toggle-container {
        position: absolute;
        top: 1rem;
        right: 1rem;
      }

      .theme-toggle-container label {
        display: none; /* Hide text label */
      }

      #theme-toggle {
        appearance: none;
        width: 40px;
        height: 20px;
        background-color: var(--toggle-bg);
        border-radius: 10px;
        position: relative;
        cursor: pointer;
        outline: none;
        transition: background-color 0.3s ease;
      }

      #theme-toggle::before {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: var(--toggle-knob);
        top: 2px;
        left: 2px;
        transition: transform 0.3s ease;
      }

      #theme-toggle:checked::before {
        transform: translateX(20px);
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(themeToggleContainer);
    wrapper.appendChild(title);
    wrapper.appendChild(scoresContainer);
    wrapper.appendChild(this.fortuneButton);

    this._applyInitialTheme();
    this.checkFortuneAvailability();
  }

  _applyInitialTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.dataset.theme = savedTheme;
    this.themeToggle.checked = savedTheme === 'dark';
  }

  _toggleTheme() {
    const newTheme = this.themeToggle.checked ? 'dark' : 'light';
    this.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
  }

  getFortune() {
    if (!this.checkFortuneAvailability()) {
      return; // Already checked fortune today
    }

    const financialScore = Math.floor(Math.random() * 100) + 1;
    const relationshipScore = Math.floor(Math.random() * 100) + 1;

    this.financialScoreDisplay.textContent = financialScore;
    this.relationshipScoreDisplay.textContent = relationshipScore;

    this.financialMessageDisplay.innerHTML = this.getFortuneMessage(financialScore);
    this.relationshipMessageDisplay.innerHTML = this.getFortuneMessage(relationshipScore);

    localStorage.setItem('lastFortuneDate', new Date().toDateString());
    this.checkFortuneAvailability(); // Update button state after checking
  }

  getFortuneMessage(score) {
    if (score >= 81) {
      return '🌈 **환상적인 하루가 기다리고 있습니다! 당신의 행운이 빛나고 있습니다!** 🌟';
    } else if (score >= 61) {
      return '✨ **모든 것이 밝아 보입니다! 기회를 잡으세요!** 🍀';
    } else if (score >= 41) {
      return '☀️ **안정적인 하루입니다. 당신이 직접 태양을 만드세요!** 😊';
    } else if (score >= 21) {
      return '☁️ **조금 흐립니다. 오늘은 작은 즐거움에 집중하세요.** ☕';
    } else {
      return '🌧️ **비 오는 날처럼 보입니다. 긍정적인 전망을 유지하세요!** 💪';
    }
  }

  checkFortuneAvailability() {
    const today = new Date().toDateString();
    const lastFortuneDate = localStorage.getItem('lastFortuneDate');

    if (lastFortuneDate === today) {
      this.fortuneButton.disabled = true;
      this.fortuneButton.textContent = '운세 확인 완료';
      this.financialMessageDisplay.textContent = '오늘의 운세를 이미 확인했습니다. 내일 다시 확인해주세요!';
      this.relationshipMessageDisplay.textContent = '오늘의 운세를 이미 확인했습니다. 내일 다시 확인해주세요!';
      return false;
    } else {
      this.fortuneButton.disabled = false;
      this.fortuneButton.textContent = '운세 보기';
      this.financialMessageDisplay.textContent = '버튼을 눌러 금전운을 확인하세요.';
      this.relationshipMessageDisplay.textContent = '버튼을 눌러 인간관계운을 확인하세요.';
      this.financialScoreDisplay.textContent = '--'; // Reset score display
      this.relationshipScoreDisplay.textContent = '--'; // Reset score display
      return true;
    }
  }
}

customElements.define('fortune-teller', FortuneTeller);
