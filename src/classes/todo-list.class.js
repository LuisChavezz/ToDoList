import { Todo } from "./todo.class";


export class TodoList {
    constructor() {
        //this.todos = [];
        this.cargarLocalStorage(); // Creará el arreglo de objetos
    }

    newTodo( todo ) {
        this.todos.push( todo );

        this.saveLocalStorage(); // Guarda los cambios en el LS
    }

    deleteTodo( id ) {
            // .filter() recorre el array parecido al 'for of'
        this.todos = this.todos.filter( todo => todo.id != id ); // guardará un nuevo array sin aquel elemento que coincida (el objeto con el mismo id a eliminar)

        this.saveLocalStorage(); // Guarda los cambios en el LS
    }

    deleteCompletedTodos() {
        this.todos = this.todos.filter( todo => !todo.completado );

        this.saveLocalStorage(); // Guarda los cambios en el LS
    }

    marcarTodo( id ) {
        
        for( const todo of this.todos) {

            if ( todo.id == id ) {
                todo.completado = !todo.completado;
                break;
            }
        }

        this.saveLocalStorage(); // Guarda los cambios en el LS
    }

    saveLocalStorage(){
        localStorage.setItem('todo', JSON.stringify( this.todos ) );
    }

    cargarLocalStorage(){
        this.todos = ( localStorage.getItem('todo') ) 
            ? JSON.parse( localStorage.getItem('todo') )
            : [];

        this.todos = this.todos.map( obj => Todo.fromJson( obj ) );
    }

    
}