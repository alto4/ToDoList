// Cache DOM elements
let form = document.getElementById('addForm');
let itemList = document.getElementById('items');
let filter = document.getElementById('filter');

// EVENT LISTENERS
// Event listener for submit event
form.addEventListener('submit', addItem);

// Event listener for deleting a completed/scrapped item
itemList.addEventListener('click', removeItem);

// Event listener for filter
filter.addEventListener('keyup', filterItems);

// FUNCTIONS
// addItem function
function addItem(e) {
    e.preventDefault();

    // Get input value
    let newItem = document.getElementById('item').value;

    // Create new li element
    let li = document.createElement('li');

    // Add a class to the newly generated li
    li.className = 'list-group-item';

    // Add text node with input field value
    li.appendChild(document.createTextNode(newItem));

    // Create delete button element
    let deleteButton = document.createElement('button')

    // Add classes to delete button
    deleteButton.className = "btn btn-danger btn-sm float-right delete";
    itemList.appendChild(li);

    // Append delete buton to li
    deleteButton.appendChild(document.createTextNode('x'));
    li.appendChild(deleteButton);
}

// removeItem Function 
function removeItem(e) {
    // Use the contains method so delete only occurs if button with the delete class is clicked on, rather than anywhere on this list item
    if (e.target.classList.contains('delete')) {
        // Confirm that user wants to delete the item
        if (confirm('Are you sure you want to delete this item?')) {
            // If the button is clicked, will need to target the parent (li) element for removal
            let li = e.target.parentElement;
            // Remove the corresponding list item that was clicked on from the list
            itemList.removeChild(li);
        }
    }
}

// filterItems Function
function filterItems(e) {
    // Grab filter input text and convert to lowercase
    let text = e.target.value.toLowerCase()
    // Get all items from item list
    let items = itemList.getElementsByTagName('li');

    // Convert collection of nodes into array using Array.from
    Array.from(items).forEach(function (item) {
        let itemName = item.firstChild.textContent;
        // check if the content of the filter text does not return a mismatch code(-1);
        if (itemName.toLowerCase().indexOf(text) != -1) {
            // Display list items that match if they exist
            item.style.display = 'block';
        } else {
            // Set display of non-matching list items to none to make them disappear
            item.style.display = 'none';
        }
    });
}