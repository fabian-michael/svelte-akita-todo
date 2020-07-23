import { produce, Draft } from 'immer';
import {v4 as uuid} from 'uuid';
import { EntityState, createEntityStore, createEntityQuery, akitaDevtools } from '@datorama/akita';

akitaDevtools({

});

// 1️⃣ Declare types 
// --------------------------------------------------------

export type Todo = {
    id: string,
    title: string;
    done: boolean;
}
export interface TodoState extends EntityState<Todo, string> {}

// 2️⃣ Create store 
// --------------------------------------------------------

const initalState: TodoState = {};
const store = createEntityStore(initalState, {
    name: 'Todos', 
    resettable: true,
    producerFn: produce
})

// 3️⃣ Create Query
// --------------------------------------------------------

const query = createEntityQuery(store);

export const todos = query.selectAll();
export const openTodos = query.selectAll({
    filterBy: ({done}) => !done
});
export const doneTodos = query.selectAll({
    filterBy: ({done}) => done
});

// 4️⃣ Create API
// --------------------------------------------------------

/** Creates and adds a new todo item */
export const addTodo = (title: string) => {
    store.add({
        id: uuid(),
        title,
        done: false
    })
}

export const removeTodo = (id: string) => {
    store.remove(id);
}

/** Toggles the done status by id */
export const toggleDone = (id: string) => {
    store.update(id, todo => {
        todo.done = !todo.done;
    })
}

/** resets the store */
export const reset = () => store.reset();

export const todosApi = {
    addTodo,
    removeTodo,
    toggleDone,
    reset
}