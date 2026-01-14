
class FortuneTeller extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'fortune-card');

    const title = document.createElement('h1');
    title.textContent = "Today's Fortune";

    const scoreDisplay = document.createElement('p');
    scoreDisplay.setAttribute('id', 'score');
    scoreDisplay.textContent = '--';

    const messageDisplay = document.createElement('p');
    messageDisplay.setAttribute('id', 'message');
    messageDisplay.textContent = 'Click the button to see your fortune.';

    const button = document.createElement('button');
    button.textContent = 'Get Fortune';
    button.addEventListener('click', () => this.getFortune());

    const style = document.createElement('style');
    style.textContent = `
      .fortune-card {
        background-color: white;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        text-align: center;
      }
      #score {
        font-size: 3rem;
        font-weight: bold;
        margin: 1rem 0;
        color: #333;
      }
      #message {
        font-style: italic;
        color: #666;
      }
      button {
        background-color: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s;
      }
      button:hover {
        background-color: #45a049;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(title);
    wrapper.appendChild(scoreDisplay);
    wrapper.appendChild(messageDisplay);
    wrapper.appendChild(button);
  }

  getFortune() {
    const score = Math.floor(Math.random() * 100) + 1;
    const scoreDisplay = this.shadowRoot.getElementById('score');
    const messageDisplay = this.shadowRoot.getElementById('message');

    scoreDisplay.textContent = score;

    if (score >= 80) {
      messageDisplay.textContent = "Wow! Today is your lucky day!";
    } else if (score >= 60) {
      messageDisplay.textContent = "Not bad! Good things are coming your way.";
    } else if (score >= 40) {
      messageDisplay.textContent = "A so-so day. Keep your head up!";
    } else {
      messageDisplay.textContent = "Don't worry, tomorrow is another day.";
    }
  }
}

customElements.define('fortune-teller', FortuneTeller);
