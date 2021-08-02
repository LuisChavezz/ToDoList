import { todoList } from "..";
import { Todo } from "../classes";

// Referencias HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput    = document.querySelector('.new-todo');
const btnBorrar   = document.querySelector('.clear-completed');
const ulFiltros   = document.querySelector('.filters');
const aFiltros    = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {
    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    const div = document.createElement('div'); // Creación del div que contendra el elemento <li>
    div.innerHTML = htmlTodo; // Agrega el elemento <li>

    divTodoList.append( div.firstElementChild ); // Añadimos el elemento HTML al elemento real del documento

    return div;
}


//Eventos
txtInput.addEventListener('keyup', ( event ) => {
    
    if ( (event.keyCode == 13) && (txtInput.value.length > 0) ) {
        const nuevoTodo = new Todo( txtInput.value );

        todoList.newTodo(nuevoTodo);

        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', ( event ) => {
    
    const nombreElemento = event.target.localName; // input, label or button
    const todoElement    = event.target.parentElement.parentElement;
    const todoId         = todoElement.getAttribute('data-id');
    
    if ( nombreElemento.includes('input') ) { //click en el checkbox
        todoList.marcarTodo( todoId );
        todoElement.classList.toggle('completed'); // Añade y elimina la clase indicada
    
    } else if ( nombreElemento.includes('button') ) { //click en el botón
        todoList.deleteTodo( todoId );
        divTodoList.removeChild( todoElement );
    }
    
});

btnBorrar.addEventListener('click', () => {

    todoList.deleteCompletedTodos();

    for ( let i = divTodoList.children.length-1; i >= 0; i-- ) {
        const elemento = divTodoList.children[i];
        
        if ( elemento.classList.contains('completed') ) {
            divTodoList.removeChild(elemento);
        }

        
    }

    console.log(todoList);
});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;

    if ( !filtro ) {
        return;        
    }

    aFiltros.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for ( const elemento of divTodoList.children ) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ) {

            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
            break;
        }
    }

});