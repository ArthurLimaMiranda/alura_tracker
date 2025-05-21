<template>
    <BoxComp>
        <div class="columns">
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
    props: {
        tarefa:{
            type: Object as PropType<ITarefa>,
            required: true
        }
    }
})
</script>

