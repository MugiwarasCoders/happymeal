document.addEventListener('DOMContentLoaded', function() {
    displayList();
});

function displayList() {
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    const container = document.getElementById('list-container');
    container.innerHTML = ''; // Clear previous list
    shoppingList.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'item';
        const span = document.createElement('span');
        span.textContent = item;
        span.className = 'ingredient';
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'button';
        deleteButton.onclick = function() {
            deleteItem(index);
        };
        div.appendChild(span);
        div.appendChild(deleteButton);
        container.appendChild(div);
    });
}

function deleteItem(index) {
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
    shoppingList.splice(index, 1);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    displayList(); // Refresh the list display
}

function generateList() {
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    if (shoppingList.length === 0) {
        alert('No ingredients in the list.');
        return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(shoppingList));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "liste des courses.json");
    dlAnchorElem.click();
    localStorage.removeItem('shoppingList'); // Clear the list after generating
    displayList(); // Refresh the list display
}
