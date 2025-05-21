<template>
  <main class="columns is-gapless is-multiline" :class="{'modo-escuro': modoEscuro}">

    <div class="column is-one-quarter">
      <BarraLateral @mudar-modo="mudarModo"/>
    </div>

    <div class="column is-three-quarter conteudo">
      <NotificacoesComp/>
      <RouterView/>
    </div>

  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue'
import NotificacoesComp from './components/NotificacoesComp.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    NotificacoesComp,
  },
  data(){
    return {
      modoEscuro: false,
    }
  },
  methods: {
    mudarModo(modo:boolean){
      this.modoEscuro = modo
    }
  },
});
</script>

<style scoped>
.lista{
  padding: 1.25rem;
}

main {
  --bg-primario: #fff;
  --texto-primario: #000;
  --bg-texto: white;
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: gray;
  --bg-texto: black;

}
.conteudo{
  background-color: var(--bg-primario);
}
</style>
