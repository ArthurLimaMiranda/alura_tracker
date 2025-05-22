<template>
  <section>

    <RouterLink to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo projeto</span>
    </RouterLink>

    <table class="table is-fullwidth ponto">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <RouterLink :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </RouterLink>

            <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
                <span class="icon is-small">
                <i class="fas fa-trash"></i>
                </span>
            </button>

          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacoes';
import { notificarMixin } from '@/mixins/notificar';
import { useStore } from '@/store';
import { DELETE_PROJETO, GET_PROJETOS } from '@/store/tipo-acoes';
import { computed, defineComponent } from 'vue';
export default defineComponent({
    name: 'ListaView',
    mixins:[notificarMixin],
    methods: {
        excluir(id:string){
            this.store.dispatch(DELETE_PROJETO, id)
            this.notificar(TipoNotificacao.SUCESSO, 'Excelente! B)', 'O projeto foi removido')
        }
    },
    setup(){
        const store = useStore()
        store.dispatch(GET_PROJETOS)
        return {
            projetos: computed(()=>store.state.projeto.projetos),
            store
        }
    }
})
</script>

