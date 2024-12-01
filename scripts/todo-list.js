let html = '', innerValue, date, resetUpdate = 0, uniqueKey, innerValue1, todaysDate;

window.addEventListener('DOMContentLoaded', forLocalStorage(handleDeleteClick));

document.querySelector('.js-add-button').addEventListener('click', handleAddClick);

  function handleAddClick() {
  
    innerValue = document.querySelector('.js-inputed');
    innerValue1 = innerValue.value;

    if (!innerValue1) {
      return;
    } else {
      resetUpdate++

      if (resetUpdate > 0) {
        document.querySelector('.js-reset').style.visibility = 'visible';
      }

    date = document.querySelector('.js-date');
    todaysDate = date.value;

    uniqueKey = `todo-${Date.now()}`;

  html += `
    <div class="saved-list js-saved-list" data-key="${uniqueKey}">
      <div class="entered-list js-entered-list">${innerValue1}</div>
      <div class="date date1">${todaysDate}</div>
      <button class="delete-button js-delete-button">Delete</button>
    </div> 
  `;
    innerValue.value = '';  
    document.querySelector('.js-imprompt').innerHTML = html;

     let values = {innerValue1,todaysDate, timeStamp: Date.now()};

    localStorage.setItem(uniqueKey, JSON.stringify(values));

    document.querySelectorAll('.js-delete-button').forEach((deleteButton) => {
      deleteButton.addEventListener('click', handleDeleteClick);
    });
  
    }
  }

  function handleDeleteClick(event) {
    resetUpdate--;

    if (resetUpdate === 0) {
      document.querySelector('.js-reset').style.visibility = 'hidden';
    }
    const deleteButton = event.target;
    deleteButton.closest('.js-saved-list').remove();
    localStorageRemove(deleteButton);
    html = document.querySelector('.js-imprompt').innerHTML; 
    console.log(localStorage.length); 
  }

  document.querySelector('.js-reset').addEventListener('click', () => {
    location.reload();
    localStorage.clear();
  });

  function forLocalStorage (handleDeleteClick) {
  html = '';
    let todoItems = [];
    Object.keys(localStorage).forEach((key) => {
      const savedItem = JSON.parse(localStorage.getItem(key));
      savedItem.key = key;
      todoItems.push(savedItem);
    });
      todoItems.sort((a,b) => a.timeStamp - b.timeStamp);

      todoItems.forEach((todoItem) => {
        html += `
    <div class="saved-list js-saved-list" data-key="${todoItem.key}">
      <div class="entered-list js-entered-list">${todoItem.innerValue1}</div>
      <div class="date date1">${todoItem.todaysDate}</div>
      <button class="delete-button js-delete-button">Delete</button>
    </div> 
  `;
      });
      
 
  document.querySelector('.js-imprompt').innerHTML = html;

  document.querySelectorAll('.js-delete-button').forEach((deleteButton) => {
    deleteButton.addEventListener('click', handleDeleteClick);
  });

  if (html !== '') {
    document.querySelector('.js-reset').style.visibility = 'visible';
  }
}

function localStorageRemove(deleteButton) {
  const itemRemoved = deleteButton.closest('.js-saved-list').getAttribute('data-key');
  localStorage.removeItem(itemRemoved);
  if (localStorage.length === 0) {
    document.querySelector('.js-reset').style.visibility = 'hidden';
  }
  
}


 