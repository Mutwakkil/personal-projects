class Todo {
  constructor() {
    this.savedLists = JSON.parse(localStorage.getItem('savedList')) || [];
    this.form = document.querySelector('.js-form-list');
    this.form.addEventListener('submit', this.handleAddClicks.bind(this));
    this.renderValues();
    this.renderNumber();
    document.querySelector('.js-input-search').addEventListener('input', this.searchTodo.bind(this)); 
  }

  handleAddClicks(e){
    e.preventDefault();
    let todo = document.querySelector('.js-input-list');
    let todoValue = todo.value;

    let date = document.querySelector('.js-input-date');
    let dateValue = date.value;
    
    const id = this.savedLists.length ? this.savedLists[this.savedLists.length - 1].id + 1 : 1;
    const todoList = {id, todoValue, dateValue, checked: false};
    const newSavedList = [...this.savedLists, todoList];
    this.savedLists = newSavedList;
    this.saveToStorage();
    this.renderValues();
    this.renderNumber();
    todo.value = '';
    date.value = '';
  }

  renderValues(showSearch = this.savedLists.reverse()){
    let html = '';
    const display = document.querySelector('.js-no-list').classList;
    if (showSearch.length) {
      display.remove('show');
      showSearch.forEach((savedList) => {
      html += `
        <div class="todo">
          <input type="checkbox" ${savedList.checked ? 'checked' : ''} class="js-check" data-list-id="${savedList.id}">
          <div class="plus-todo js-plus-todo" style="${savedList.checked ? 'text-decoration: line-through': ''}" data-list-id="${savedList.id}">${savedList.todoValue}</div>
          <div>${savedList.dateValue}</div>
          <svg class="js-delete" data-list-id="${savedList.id}" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </div>
      `
    }) 
  } else {
    display.add('show');
  }
    document.querySelector('.js-todo-container').innerHTML = html;
    document.querySelectorAll('.js-delete').forEach((trash) => {
      trash.addEventListener('click', this.handleDeleteClicks.bind(this));
    });
    document.querySelectorAll('.js-check').forEach((check) => {
      check.addEventListener('click', this.handleCheckClicks.bind(this));
    });
    document.querySelectorAll('.js-plus-todo').forEach((todo) => {
      todo.addEventListener('dblclick', this.handleListClicks.bind(this));
    });
  }

  saveToStorage(){
    localStorage.setItem('savedList', JSON.stringify(this.savedLists));
  }

  handleDeleteClicks(e) {
    const trash = e.target.closest('.js-delete');
    const {listId} = trash.dataset;
    this.savedLists = this.savedLists.filter(savedList => savedList.id !== Number(listId));
    this.renderValues();
    this.saveToStorage();
    this.renderNumber();
  }

  handleListClicks(e) {
    const todo = e.target.closest('.js-plus-todo');
    const {listId} = todo.dataset;
    this.savedLists = this.savedLists.map(savedList => (savedList.id === Number(listId)) ? {...savedList, checked: !savedList.checked}: savedList);
    this.saveToStorage();
    this.renderValues();
  }

  handleCheckClicks(e) {
    const check = e.target.closest('.js-check');
    const {listId} = check.dataset;
    this.savedLists = this.savedLists.map(savedList => (savedList.id === Number(listId)) ? {...savedList, checked: !savedList.checked}: savedList);
    this.saveToStorage();
    this.renderValues();
  }

  renderNumber() {
    const number = this.savedLists.length;
    const items = number === 1 ? 'item' : 'items';
    document.querySelector('.js-display-number').innerHTML = `${number} ${items}`;
  }

  searchTodo(e) {
    const searched = e.target.value;
    const showSearch = this.savedLists.filter(savedList => (savedList.todoValue.toLowerCase()).includes(searched.toLowerCase()));
    this.renderValues(showSearch); 
  }
}

const todo = new Todo();

document.addEventListener('DOMContentLoaded', () => {
  todo
});