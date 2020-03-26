<script>
  import TodoForm from "./TodoForm.svelte";
  import TodoItem from "./TodoItem.svelte";

  const all = () => true;
  const active = todo => !todo.completed;
  const completed = todo => !active(todo);

  let filter = all;
  let id = 1;
  let todos = [{ id: id++, task: "Wash dishes" }];

  const add = todo => {
    todos = [...todos, { id: id++, ...todo }];
  };

  const clearCompleted = () => (todos = todos.filter(todo => !todo.completed));

  const remove = todoToBeRemoved =>
    (todos = todos.filter(todo => todo.id !== todoToBeRemoved.id));

  const toggleAll = e =>
    (todos = todos.map(todo => ({
      ...todo,
      completed: e.target.checked
    })));

  const update = todoToBeUpdated =>
    (todos = todos.map(todo =>
      todo.id === todoToBeUpdated.id ? todoToBeUpdated : todo
    ));

  $: hasCompletedItems = todos.some(todo => todo.completed);
  $: filteredTodos = todos.filter(filter);
  $: itemsLeft = todos.filter(active).length;
</script>

<style>
  .filter {
    background: transparent;
    color: #000000;
  }

  footer {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: -0.5rem;
    padding: 1rem;
  }

  footer > * {
    margin: 0.5rem;
  }

  header {
    border-bottom: 1px solid #cfcfcf;
    display: flex;
    padding: 1rem;
  }

  .selected {
    border: 1px solid red;
  }

  .toggle-all {
    margin-right: 1rem;
  }

  li {
    border-bottom: 1px solid #cfcfcf;
    padding: 1rem;
  }

  ul {
    list-style: none;
  }
</style>

<header>
  {#if todos.length > 0}
    <input
      class="toggle-all"
      on:change={toggleAll}
      type="checkbox"
      checked={todos.length === todos.filter(completed).length} />
  {/if}
  <TodoForm onSave={add} />
</header>
<section>
  <ul>
    {#each filteredTodos as todo}
      <li>
        <TodoItem bind:todo onRemove={remove} />
      </li>
    {/each}
    {#if filteredTodos.length === 0}
      <li>
        <span>No items</span>
      </li>
    {/if}
  </ul>
</section>
<footer>
  <div>
    {#if itemsLeft === 1}Item{:else}Items{/if}
    left: {itemsLeft}
  </div>
  <div>
    <button
      class:selected={filter === all}
      class="filter"
      on:click={() => (filter = all)}>
      All
    </button>
    <button
      class:selected={filter === active}
      class="filter"
      on:click={() => (filter = active)}>
      Active
    </button>
    <button
      class:selected={filter === completed}
      class="filter"
      on:click={() => (filter = completed)}>
      Completed
    </button>
  </div>
  <div>
    <button disabled={!hasCompletedItems} on:click={clearCompleted}>
      Clear completed
    </button>
  </div>
</footer>
