<script lang="ts">
    import TodoItem from "./TodoItem.svelte";
    import {Todo} from '../state/todos.store';

    export let todos: Todo[];

</script>

<ul class="px-4 bg-white rounded-lg shadow-xl">
    {#each todos as todo (todo.id)}
        <li>
            <TodoItem {todo} />
        </li>
    {/each}
</ul>