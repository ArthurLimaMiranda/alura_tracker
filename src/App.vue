<template>
  <main class="columns is-gapless is-multiline" :class="{'modo-escuro': modoEscuro}">

    <div class="column is-one-quarter">
      <BarraLateral @mudar-modo="mudarModo"/>
    </div>

    <div class="column is-three-quarter conteudo">
      <FormularioTarefa @salvar-tarefa="salvarTarefa"/>
      <div class="lista">
        <TarefaComp v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <BoxComp v-if="tarefas.length==0">
          Nada a exibir
        </BoxComp>
    </div>

      </div>

  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue'
import FormularioTarefa from './components/FormularioTarefa.vue'
import TarefaComp from './components/TarefaComp.vue';
import ITarefa from './interfaces/ITarefa';
import BoxComp from './components/BoxComp.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    FormularioTarefa, 
    TarefaComp,
    BoxComp
  },
  data(){
    return {
      tarefas: [] as ITarefa[],
      modoEscuro: false,
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa){
      this.tarefas.push(tarefa)
    },
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
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: gray;

}
.conteudo{
  background-color: var(--bg-primario);
}
</style>
