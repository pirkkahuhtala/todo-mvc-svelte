<script>
  import TodosList from "./TodosList.svelte";

  export let appTitle;
</script>

<style>
  h1 {
		margin-bottom: 1rem;
    text-align: center;
	}
	
  main {
    margin: 0 auto;
    padding: 1rem;
    width: 500px;
  }
</style>

<main>
  <h1>{appTitle}</h1>
  <TodosList />
</main>
