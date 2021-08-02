export class Todo {

    static fromJson( { id, tarea, completado, creado } ){ // Recibe el string del LS y lo convierte a instancia

        const tempTodo = new Todo( tarea );

        tempTodo.id         = id;
        tempTodo.completado = completado;
        tempTodo.creado     = creado;

        return tempTodo;
    }

    constructor( tarea ) {
        this.tarea = tarea;

        this.id         = new Date().getTime(); // Formato de fecha y hora en secuencia de número (ex=>816813218)
        this.completado = false;
        this.creado     = new Date();
    }

}