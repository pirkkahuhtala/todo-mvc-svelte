<script>
  const initTodo = () => ({ task: "" });

  export let onCancel;
  export let onRemove;
  export let onSave;
  export let todo = initTodo();

  const cancel = () => {
    onCancel();
  };

  const save = () => {
    if (todo.task) {
      onSave(todo);
    } else if (todo.id) {
      onRemove();
    }
    todo = initTodo();
  };

  const init = el => el.focus();
</script>

<style>
  input {
    border: 0;
    width: 100%;
  }
</style>

<input
  bind:value={todo.task}
  placeholder="What needs to be done?"
  on:keydown={e => {
    if (e.keyCode === 13) {
      save();
    }
    if (e.keyCode === 27) {
      cancel();
    }
  }}
  on:blur={save}
  type="text"
  use:init />
