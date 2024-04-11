const input = document.getElementById("autocomplete-input");
const resultsList = document.getElementById("autocomplete-results");

const suggestions = ["Apple", "Banana", "Cherry", "Grapes", "Orange", "Pineapple"];

input.addEventListener("input", () => {
    const inputValue = input.value.toLowerCase();
    const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(inputValue)
    );

    resultsList.innerHTML = "";
    filteredSuggestions.forEach(suggestion => {
        const li = document.createElement("li");
        li.textContent = suggestion;
        resultsList.appendChild(li);
    });
});

// Optional: Handle click on suggestion to populate input
resultsList.addEventListener("click", event => {
    if (event.target.tagName === "LI") {
        input.value = event.target.textContent;
        resultsList.innerHTML = "";
    }
})