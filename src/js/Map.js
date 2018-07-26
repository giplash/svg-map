export default class {
  constructor() {
    this.circles = Array.from(document.querySelectorAll('.circle'));
    this.lines = Array.from(document.querySelectorAll('.line'));
    const continentNodes = Array.from(document.querySelectorAll('svg g'));
    this.continents = continentNodes.sort(
      (a, b) => +a.getAttribute('position') - +b.getAttribute('position')
    );
    this.currentPoint = 0;
    this.currentPointValue = 0;
    this.spanInfo = document.querySelector('span.info-amount-number');
    this.isPlaying = true;
    this.setInterval();
  }
  getCurrentPointValue() {
    return this.currentPointValue;
  }
  stop() {
    this.isPlaying = false;
  }
  start() {
    this.isPlaying = true;
  }
  clearValues() {
    this.circles.forEach(
      item => item.classList.add('disabled')
    );
    this.lines.forEach(
      item => item.classList.add('disabled')
    );
    this.continents.forEach(
      item => item.classList.add('disabled')
    );
    this.currentPoint = 0;
    this.currentPointValue = 0;
    this.spanInfo.innerHTML = 0;
  }
  restart() {
    clearInterval(this.interval);
    this.clearValues();
    this.setInterval();
  }
  setInterval() {
    const bindedCb = callback.bind(this);
    setTimeout(
      () => {
	bindedCb();
	this.interval = setInterval(
	  bindedCb,
	  2500
	)
      },
      1000
    )
  }
}

function callback() {
  if (this.isPlaying) {
    const i = this.currentPoint;
    if (i === 8) {
      this.restart();
      return;
    }
    this.currentPointValue += 100;
    this.continents[i].classList.remove('disabled');
    this.circles[i].classList.remove('disabled');
    if (i !== 0) {
      document.querySelector(`.line[position="${i}"]`).classList.remove('disabled');
    }
    this.spanInfo.innerHTML = this.currentPointValue;
    this.currentPoint++;
  }
}
