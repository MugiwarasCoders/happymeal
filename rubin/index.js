document.addEventListener('DOMContentLoaded', function() {
    const ingredients = ['Poulet', 'Herbes fraîches', 'Sel et poivre', "Huile d'olive"];
    const container = document.getElementById('ingredient-container');
    ingredients.forEach(ingredient => {
        const item = document.createElement('div');
        item.className = 'item';
        const span = document.createElement('span');
        span.textContent = ingredient;
        span.className = 'ingredient';
        const addButton = document.createElement('button');
        addButton.textContent = 'Add';
        addButton.className = 'button';
        addButton.onclick = function() {
            addIngredient(ingredient);
        };
        item.appendChild(span);
        item.appendChild(addButton);
        container.appendChild(item);
    });
});

function addIngredient(ingredient) {
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    if (!shoppingList.includes(ingredient)) {
        shoppingList.push(ingredient);
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    }
}
