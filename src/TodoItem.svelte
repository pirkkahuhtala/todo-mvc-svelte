<script>
  import TodoForm from "./TodoForm.svelte";

  export let onRemove;
  export let todo;
  let isEditing = false;
</script>

<style>
  .completed {
    text-decoration: line-through;
  }

  div {
    align-items: center;
    display: flex;
    margin: -0.5rem;
  }

  div > * {
    margin: 0.5rem;
  }

  .hidden {
    visibility: hidden;
  }

  span {
    flex: 1;
  }
</style>

<div>
  <input
    bind:checked={todo.completed}
    class:hidden={isEditing}
    type="checkbox" />
  {#if isEditing}
    <TodoForm
      todo={{ ...todo }}
      onCancel={() => (isEditing = false)}
      onRemove={() => {
        isEditing = false;
        onRemove(todo);
      }}
      onSave={todoUpdated => {
        todo = todoUpdated;
        isEditing = false;
      }} />
  {:else}
    <span
      class:completed={todo.completed}
      on:dblclick={e => {
        isEditing = true;
      }}>
      {todo.task}
    </span>
  {/if}
  <button on:click={() => onRemove(todo)}>Delete</button>
</div>
