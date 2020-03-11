/**
 *	Todo app
 */
(function() {
	'use strict';
	function Todo() {
    var containerDiv = document.createElement('div');
		var input = document.querySelector("input.todo"),
			addButton = document.querySelector(".addButton"),
			list = document.querySelector(".todoList");

		function markDone(event) {
			var item = event.target;
			item.parentNode.classList.toggle('done');
		}	
		
		function removeItem(event) {
			var removeButton = event.target;
			removeButton.parentNode.remove();
		}
		
		function addRemoveButton(item) {
			var removeButton = document.createElement('div');
			
			removeButton.className = "removeButton";
      //removeButton.setAttribute('uk-icon', 'close');
			removeButton.addEventListener("click", removeItem);
			item.appendChild(removeButton);
		}
		
		function addCheckbox(item) {
			var checkbox = document.createElement('input');
			
			checkbox.setAttribute('type', 'checkbox');
			checkbox.addEventListener('click', markDone);
			item.insertBefore(checkbox, item.firstChild);
		}
		
		function createItem(text) {           
      var item = document.createElement('li');
         item.innerText = text;
         addRemoveButton(item);
         addCheckbox(item);
         return item
        }
                
        function addItem(event) {
            var text = input.value;
            let item = createItem(text);
            list.appendChild(item);
            input.value = '';
        }

		this.addListeners = function() {
			addButton.addEventListener('click', addItem);
		};
	}
	
	Todo.prototype.init = function() {
		this.addListeners();
	};

	var todo = new Todo();
	window.addEventListener('load', todo.init());
})();