<svelte:options immutable={true} />

<script lang="ts">
    import {todosApi, Todo} from '../state/todos.store';
    import {CheckIcon, TrashIcon} from 'svelte-feather-icons';


    export let todo: Todo;
    let showDelete = false;

    function handleToggle() {
        todosApi.toggleDone(todo.id);
    }

    function handleDelete() {
        todosApi.removeTodo(todo.id);
    }
</script> 

<style>
    button {
        transition: all 100ms;
    }
</style>

<li class="flex items-center py-2 my-2 leading-none todo-item" on:mouseover={() => showDelete = true} on:mouseout={() => showDelete = false}>
    <button 
        on:click={handleToggle} 
        class="p-1 mr-4 text-center bg-gray-300 rounded-full" 
        class:text-transparent={!todo.done}
        class:text-white={todo.done}
        class:bg-green-500={todo.done}
        role="checkbox"
        aria-checked="{todo.done}"
    >
    <CheckIcon size="1x" />
    </button> 
    <span class="flex-1" class:line-through={todo.done} class:text-gray-500={todo.done}>{todo.title}</span> 
    <button on:click={handleDelete} class="p-1 ml-2 text-white bg-red-500 rounded-full delete" class:opacity-0={!showDelete}><TrashIcon size="1x" /></button>
</li>