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
import { ALTERA_PROJETO, NOVO_PROJETO } from '@/store/tipo-mutacoes';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormularioProjetosView',
  props: {
    id: {
      type: String,
    }
  },
  mixins: [notificarMixin],
  mounted() {
    if(this.id){
      const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
      this.nomeProjeto = projeto?.nome || ''
      console.log(this.id)
    }
  },
  data() {
    return{
      nomeProjeto: '',
    }
  },
  methods: {
    salvar(){
      if(this.id){
        console.log('oiiiiiiii')
        this.store.commit(ALTERA_PROJETO,{
          id:this.id, 
          nome: this.nomeProjeto       
        })
      }
      else{
        this.store.commit(NOVO_PROJETO, this.nomeProjeto)
      }
      this.nomeProjeto = ''
      this.notificar(TipoNotificacao.SUCESSO, 'Excelente! B)', 'O projeto foi salvo')
      this.$router.push('/projetos')
    },
  },
  setup(){
    const store = useStore()
    return {
      store
    }
  }
})
</script>

