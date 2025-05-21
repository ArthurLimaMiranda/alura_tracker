<template>
<header>
    <h1>
        <img src="../assets//logo.png" alt="">
    </h1>
    <div class="has-text-centered">
      <button class="button" @click="alterarModo">{{textoBotao}}</button>
    </div>

    <nav class="panel mt-5">
      <ul>
        <li>
          <RouterLink to="/" class="link">
            <i class="fas fa-tasks"></i>
            Tarefas
          </RouterLink>
        </li>
        <li>
          <RouterLink to="projetos" class="link">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </RouterLink>
        </li>
      </ul>
    </nav>
</header>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
    name: 'BarraLateral',
    data(){
      return{
        modoEscuro: false
      }
    },
    methods: {
      alterarModo(){
        this.modoEscuro = !this.modoEscuro
        this.$emit('mudarModo', this.modoEscuro)
      },
    },
    computed: {
      textoBotao(){
        if(this.modoEscuro){
          return 'Desativar modo escuro'
        }
        return 'Ativar modo escuro'
      }
    },
    emits: ['mudarModo']
})
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
.panel li {
    margin: 8px 0;
    padding: 8px 0;
}
.link {
    color: #fff;
}
.link:hover {
    color: #FAF0CA;
}
.link.router-link-active {
    color: #FAF0CA;
}
</style>