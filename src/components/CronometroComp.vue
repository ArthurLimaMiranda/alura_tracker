<template>
    <section>
        <strong class="display">
            <i class="far fa-clock"></i>
            {{ tempoDecorrido }}
        </strong>
    </section>
</template>


<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: 'CronometroComp',
    props: {
        tempoEmSegundos: {
            type: Number,
            default: 0,
            required: true
            
        }
    },
    computed: {
        tempoDecorrido () : string {
            return new Date(this.tempoEmSegundos*1000).toISOString().substr(11, 8)
        }
    },
})
</script>

<style scoped>
.display{
    color: var(--texto-primario);
}
</style>

