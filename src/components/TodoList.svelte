<script lang="ts">
    import TodoItem from "./TodoItem.svelte";
    import {Todo} from '../state/todos.store';

    export let todos: Todo[];
</script>

<ul>
    {#each todos as todo}
        <TodoItem {todo} />
    {/each}
</ul>