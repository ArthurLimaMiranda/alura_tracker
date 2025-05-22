<template>

    <FormularioTarefa @salvar-tarefa="salvarTarefa"/>
    <div class="lista">

        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input type="text" class="input" placeholder="Digite para filtrar" v-model="filtro">
            <span class="icon is-small is-left">
              <i class="fas fa-search"></i>
            </span>
          </p>
        </div>

        <TarefaComp v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @tarefa-selecionada="selecionarTarefa"/>
        <BoxComp v-if="tarefas.length==0">
            Nada a exibir
        </BoxComp>

        <ModalComp :mostrar="tarefaEdit!=null" v-if="tarefaEdit">

          <template v-slot:cabecalho>
            <p class="modal-card-title">Nova Tarefa</p>
            <button class="delete" aria-label="close" @click="fecharModal"></button>
          </template>

          <template v-slot:corpo>
            <div class="field">
              <label for="descricaoTarefa" class="label">
                Descrição da Tarefa
              </label>
              <input type="text" class="input" v-model="tarefaEdit.descricao" id="descricaoTarefa">
            </div>
          </template>
          
          <template v-slot:rodape>
            <button class="button is-success" @click="alterarTarefa">Salvar</button>
            <button @click="fecharModal" class="button">Cancelar</button>
          </template>

        </ModalComp>
    </div>

</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue'
import TarefaComp from '../components/TarefaComp.vue';
import ITarefa from '../interfaces/ITarefa';
import BoxComp from '../components/BoxComp.vue';
import { useStore } from '@/store';
import { GET_PROJETOS, GET_TAREFAS, POST_TAREFA, PUT_TAREFA } from '@/store/tipo-acoes';
import ModalComp from '@/components/ModalComp.vue';

export default defineComponent({
  name: 'TarefasView',
  components: {
    FormularioTarefa, 
    TarefaComp,
    BoxComp,
    ModalComp
  },
  data(){
    return{
      tarefaEdit: null as  ITarefa | null,
    }
  },
  setup(){
    const store = useStore()
    store.dispatch(GET_TAREFAS)
    store.dispatch(GET_PROJETOS)

    const filtro = ref("")

    watchEffect(()=>{
      store.dispatch(GET_TAREFAS, filtro.value)
    })

    return {
        tarefas: computed(()=>store.state.tarefa.tarefas),
        store,
        filtro
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) : void{
      this.store.dispatch(POST_TAREFA, tarefa)
    },
    selecionarTarefa(tarefa:ITarefa){
      this.tarefaEdit = tarefa
    },
    fecharModal(){
      this.tarefaEdit = null
    },
    alterarTarefa(){
      this.store.dispatch(PUT_TAREFA, this.tarefaEdit)
      .then(()=>this.fecharModal())
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
