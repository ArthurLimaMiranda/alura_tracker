<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao"/>
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <TemporizadorComp @temporizador-finalizado="finalizarTarefa"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue'
import TemporizadorComp from './TemporizadorComp.vue';
import { useStore } from 'vuex';
import { key } from '@/store';
export default defineComponent({
    name: 'FormularioTarefa',
    components: {
        TemporizadorComp
    },

    setup(props, {emit}){
      const store = useStore(key)

      const descricao = ref("")
      const idProjeto = ref("")

      const projetos =  computed(()=>store.state.projeto.projetos)

      const finalizarTarefa = (tempoDecorrido: number) : void => {
        emit('SalvarTarefa', {descricao: descricao.value, duracao: tempoDecorrido, projeto: projetos.value.find(proj => proj.id == idProjeto.value)})
        descricao.value = ''
      }

      return{
        projetos,
        descricao,
        idProjeto,
        finalizarTarefa
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
