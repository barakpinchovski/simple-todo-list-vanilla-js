// Initialize commonly used variables
const newTodoInput = document.todoForm[0];
const completedCount = document.getElementsByClassName('completed-count')[0];
const tooltip = document.getElementsByClassName('tooltip')[0];
const todosList = document.getElementsByClassName('todos-list')[0];
const legend = document.getElementById('legend');
const removeAllCompletedButton = document.getElementsByClassName('shrink')[0];
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
        newTodoInput.focus();
    }
    return false; // Return false so the form won't be submitted automatically
}

/**
 * Creates a new item structure for the DOM and returns the element
 * @param value
 * @returns {Element}
 */
function createNewItem(value) {
    var newTodo = document.createElement('li');

    var checkbox = document.createElement('input');
    checkbox.id = id;
    checkbox.setAttribute('type', 'checkbox');
    checkbox.onclick = function() {
        newTodo.classList.toggle('done');
        updateCompleted();
    };

    var checkboxWrapper = document.createElement('div');
    checkboxWrapper.appendChild(checkbox);

    var label = document.createElement('label');
    label.setAttribute('for', id.toString());
    label.appendChild( document.createTextNode(value) );

    var removeItem = document.createElement('img');
    removeItem.classList.add('remove-item');
    removeItem.setAttribute('src', 'img/remove-item.svg');
    removeItem.setAttribute('alt', 'Remove item');
    removeItem.onmouseenter = function() { toggleLegend('Remove this single item'); };
    removeItem.onmouseleave = function() { toggleLegend(); };
    removeItem.onclick = function() {
        if (checkbox.checked || !checkbox.checked && confirmRemoval('Remove incomplete item?')) {
            newTodo.remove();
            updateCompleted();
        }
    };

    newTodo.appendChild(checkboxWrapper);
    newTodo.appendChild(label);
    newTodo.appendChild(removeItem);

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
        count = count + ' of ' + checkboxes.length;
    }
    else {
        count = 'no';
    }
    completedCount.innerHTML = count;
    toggleRemoveAllCompleted(count);
}

/**
 * Prompt removal form the user
 */
function confirmRemoval(value) {
    return confirm(value);
}

/**
 * If toCheckAll is true - checks all items, else un-checks all items
 * @param toCheckAll
 */
function toggleAllChecked(toCheckAll) {
    var i;
    var items;
    if (toCheckAll) {
        items = document.querySelectorAll('li:not(.done) input[type="checkbox"]');
    }
    else {
        items = document.querySelectorAll('li.done input[type="checkbox"]');
    }
    for (i = 0; i < items.length; i++) {
        items[i].checked = Boolean(toCheckAll);
        items[i].onclick();
    }
    updateCompleted();
}

/**
 * Toggles the remove-all-completed img (button)
 * @param completedCount
 */
function toggleRemoveAllCompleted(completedCount) {
    if (completedCount !== 'no' && completedCount.indexOf('0 of ') === -1) {
        removeAllCompletedButton.classList.remove('shrink');
    }
    else {
        removeAllCompletedButton.classList.add('shrink');
    }
}

function removeAllCompleted() {
    if (confirmRemoval('Remove all completed items?')) {
        var completedItems = document.querySelectorAll('li.done');
        for (var i = 0; i < completedItems.length; i++) {
            completedItems[i].remove();
        }
        updateCompleted();
    }
}

/**
 * Shows the given value inside the legend, if it has a value
 * @param value
 */
function toggleLegend(value) {
    legend.innerHTML = value ? value : '';
}

/**
 * Clears the new to-do input value and calls toggleTooltip
 */
function clearInput() {
    newTodoInput.value = null;
    toggleTooltip(newTodoInput.value);
}