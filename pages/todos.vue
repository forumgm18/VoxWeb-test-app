<template>
  <article class="article">
    <h1>Список задач</h1>
    <div class="content">
      <loading v-if="loading"/>
      <div v-else class="todo-table">
      <div class="todo-line todo-line-header">
        <div class="todo-item">Задача</div>
        <div class="todo-item">Статус</div>
      </div>
      <div v-for="todo of todos" :key="todo.id" class="todo-line">
        <div class="todo-item">{{todo.id +'. '+ todo.title}}</div>
        <div class="todo-item">
          <label class="checkbox">
            <input type="checkbox" v-model="todo.completed" v-bind:id="todo.id" >
            <span class="checkbox-item"><svg class="icon icon-arrow-check"><use xlink:href="#icon-arrow-check"></use></svg></span>
            <span class="checkbox-text">Выполнено</span>
          </label>
        </div>
      </div>
    </div>
    </div>
  </article>
</template>

<script>
  import loading from "../components/loading";
  export default {
    name: "todo",
    middleware: ['auth'],
    components: {loading},
    data: () => ({
      loading: true,
      todos: []
    }),
    async mounted() {
      const todos = await this.$axios.$get('https://jsonplaceholder.typicode.com/todos')
      this.todos = todos.slice(0, Math.floor(Math.random() * todos.length))
      this.loading = false
    }
  }
</script>

<style scoped>
 .article {
   max-height: 100vh;
   overflow-y: auto;
 }
</style>
