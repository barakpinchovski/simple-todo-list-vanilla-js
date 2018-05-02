// Initialize common used variables
const newTodoInput = document.todoForm[0];
const completedCount = document.getElementsByClassName('completed-count')[0];
const tooltip = document.getElementsByClassName('tooltip')[0];
var todosList = document.getElementsByClassName('todos-list')[0];
var id = 0;

/**
 * Shows the tooltip if the input field is not empty, else it hides it
 * @param value
 */
function toggleTooltip(value) {
    if (!value) {
        tooltip.classList.add('hide');
    }
    else {
        tooltip.classList.remove('hide');
    }
}

/**
 * Creates a element with a new text node that is derived from the input value
 * and appends it to the toods list
 * @returns {boolean}
 */
function addItem() {
    if (newTodoInput.value) {
        var newItem = createNewItem(newTodoInput.value);
        todosList.appendChild(newItem);

        clearInput();
        updateCompleted();
    }
    return false; // Return false so the form won't be submitted automatically
}

/**
 * Creates a new item structure for the DOM and returns the element
 * @param value
 * @returns {Element}
 */
function createNewItem(value) {
    var newTodo = document.createElement('section');
    newTodo.classList.add('clearfix');

    var checkbox = document.createElement('input');
    checkbox.id = id;
    checkbox.setAttribute('type', 'checkbox');
    checkbox.onclick = function() {
        newTodo.classList.toggle('done');
        updateCompleted();
    };
    newTodo.appendChild(checkbox);

    var label = document.createElement('label');
    label.setAttribute('for', id.toString());
    label.appendChild( document.createTextNode(value) );
    newTodo.appendChild(label);

    id++; // Increment id for next item
    return newTodo;
}

/**
 * Marks an item on the list as completed
 */
function updateCompleted() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var count = 0;
    if (checkboxes.length) {
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                count++;
            }
        }
    }
    else {
        count = 'no';
    }
    completedCount.innerHTML = count;
}

/**
 * Clears the new to-do input value and calls toggleTooltip
 */
function clearInput() {
    newTodoInput.value = null;
    toggleTooltip(newTodoInput.value);
}