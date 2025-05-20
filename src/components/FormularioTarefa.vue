<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao"/>
      </div>
      <div class="column">
        <TemporizadorComp @temporizador-finalizado="finalizarTarefa"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import TemporizadorComp from './TemporizadorComp.vue';
export default defineComponent({
    name: 'FormularioTarefa',
    components: {
        TemporizadorComp
    },
    data() {
      return{
        descricao: '',
      }
    },
    methods: {
      finalizarTarefa(tempoDecorrido: number) : void{
        this.$emit('SalvarTarefa', {descricao: this.descricao, duracao: tempoDecorrido})
        this.descricao = ''
      }
    },
    emits: ['SalvarTarefa']
})
</script>

<style>
.formulario{
  color: var(--texto-primario);
  background: var(--bg-primario);
  box-shadow: none;
}
</style>
