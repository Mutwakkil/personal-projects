

let calcDisplay = JSON.parse(localStorage.getItem('calcDisplay')) || '';

const html = `
<div class="display js-display"></div>
    <section class="container first-container">
      <button class="js-button">1</button>
      <button class="js-button">2</button>
      <button class="js-button">3</button>
      <button class="js-button">+</button>  
    </section>
    <section class="container second-container">
      <button class="js-button">4</button>
      <button class="js-button">5</button>
      <button class="js-button">6</button>
      <button class="js-button">-</button>
    </section>
    <section class="container third-container">
      <button class="js-button">7</button>
      <button class="js-button">8</button>
      <button class="js-button">9</button>
      <button class="js-button">*</button>
    </section>
    <section class="container fourth-container">
      <button class="js-button">.</button>
      <button class="js-button">0</button>
      <button class="js-button">=</button>
      <button class="js-button">C</button>
      <button class="js-button">D</button>
    </section>
    
`;

document.querySelector('.js-contain-all').innerHTML = html;

totalClick(calcDisplay);

function totalClick (calcDisplay){
  document.querySelectorAll('.js-button').forEach(eachButton => {
  eachButton.addEventListener('click', handleClicks);
});

function handleClicks (event) {
  const  button = event.target;

  let savedText = button.textContent;

  if (savedText !== 'C' && savedText !== '=' && savedText !== 'D') {
    calcDisplay += savedText;
    document.querySelector('.js-display').innerHTML = calcDisplay;
    
  } 
  else if (savedText === 'D') {
   calcDisplay = calcDisplay.slice(0, -1);
   document.querySelector('.js-display').innerHTML = calcDisplay;
    
  } 

  else if (savedText === '=') {
    calcDisplay = eval(calcDisplay);
    document.querySelector('.js-display').innerHTML = calcDisplay;
    localStorage.setItem('calcDisplay', calcDisplay);
  }
  else if (savedText === 'C') {
    localStorage.removeItem('calcDisplay');
    location.reload()
;  }
} 

}
