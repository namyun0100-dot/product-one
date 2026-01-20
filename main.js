
class FortuneTeller extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'fortune-card');

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
      .fortune-card {
        background-color: #ffffff; /* Warm white */
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 10px 20px rgba(180, 160, 140, 0.2); /* Softer shadow */
        text-align: center;
      }
      .scores-container {
        display: flex;
        justify-content: space-around;
        gap: 1.5rem;
        margin: 1.5rem 0;
        flex-wrap: wrap; /* Allow wrapping on smaller screens */
      }
      .score-section {
        flex: 1;
        min-width: 150px; /* Minimum width for each section */
        padding: 1rem;
        border: 1px solid #eee;
        border-radius: 0.75rem;
        background-color: #fdfdfd;
      }
      .score-section h2 {
        font-size: 1.5rem;
        color: #34495e; /* Darker blue-gray for titles */
        margin-bottom: 0.5rem;
      }
      .score-value {
        font-size: 2.5rem; /* Slightly smaller than previous single score */
        font-weight: bold;
        margin: 0.5rem 0;
        color: #4a4a4a; /* Darker, warm tone */
      }
      .score-message {
        font-style: italic;
        color: #7f8c8d; /* Soft gray-blue */
        font-weight: bold;
        min-height: 3em; /* Ensure consistent height for messages */
      }
      button {
        background-color: #8bc34a; /* Light green */
        color: white;
        padding: 1rem 2rem;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s;
        margin-top: 1.5rem; /* Add some space above the button */
      }
      button:hover {
        background-color: #7cb342; /* Slightly darker green */
      }
      button:disabled {
        background-color: #dcdcdc; /* Lighter gray for disabled */
        cursor: not-allowed;
        color: #a0a0a0; /* Disabled text color */
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(title);
    wrapper.appendChild(scoresContainer); // Append the new container
    wrapper.appendChild(this.fortuneButton);

    this.checkFortuneAvailability(); // Call after elements are appended
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
