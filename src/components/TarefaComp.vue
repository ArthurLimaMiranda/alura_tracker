<template>
    <BoxComp>
        <div class="columns clicavel" @click="tarefaClicada">
            <div class="column is-4">
                {{ tarefa.descricao || 'Secreto 🤫🤫🤫'}}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || '??' }}
            </div>
            <div class="column">
                <CronometroComp :tempo-em-segundos="tarefa.duracao"/>
            </div>
        </div>
    </BoxComp>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import CronometroComp from './CronometroComp.vue';
import ITarefa from '@/interfaces/ITarefa';
import BoxComp from './BoxComp.vue';

export default defineComponent({
    name: 'TarefaComp',
    components:{
        CronometroComp,
        BoxComp
    },
    emits: ['tarefaSelecionada'],
    props: {
        tarefa:{
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    methods: {
        tarefaClicada():void{
            this.$emit('tarefaSelecionada', this.tarefa)
        }
    }
})
</script>

<style scoped>
.clicavel{
    cursor: pointer;
}
</style>

