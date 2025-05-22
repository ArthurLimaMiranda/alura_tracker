<template>
  <section >

    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeProjeto" class="label">
          Nome do Projeto
        </label>
        <input type="text" class="input" v-model="nomeProjeto" id="nomeProjeto">
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>

  </section>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacoes';
import { notificarMixin } from '@/mixins/notificar';
import { useStore } from '@/store';
import { POST_PROJETO, PUT_PROJETO } from '@/store/tipo-acoes';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FormularioProjetosView',
  props: {
    id: {
      type: String,
    }
  },
  mixins: [notificarMixin],
  
  methods: {
    sucesso(){
      this.nomeProjeto = ''
      this.notificar(TipoNotificacao.SUCESSO, 'Excelente! B)', 'O projeto foi salvo')
      this.$router.push('/projetos')
    },
    salvar(){
      if(this.id){
        this.store.dispatch(PUT_PROJETO,{
          id:this.id, 
          nome: this.nomeProjeto       
        })
        .then(()=>this.sucesso())
      }
      else{
        this.store.dispatch(POST_PROJETO, this.nomeProjeto)
        .then(()=>this.sucesso())
      }
    },
  },
  setup(props){
    const store = useStore()

    const nomeProjeto = ref("")

    if(props.id){
      const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
      nomeProjeto.value = projeto?.nome || ''
    }
    return {
      store,
      nomeProjeto
    }
  }
})
</script>

