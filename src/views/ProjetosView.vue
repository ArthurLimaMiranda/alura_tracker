<template>
  <div class="projetos">
    <h1 class="title">Projetos</h1>
    <RouterView></RouterView>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProjetosView',
})
</script>

<style>
.title, .label{
  color: var(--texto-primario);
  background: var(--bg-primario);
  box-shadow: none;
}

.projetos{
padding: 1.25rem;
}

.ponto{
  margin-top: 16px;
}
</style>