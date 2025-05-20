<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <section>
            <CronometroComp :tempo-em-segundos="tempoEmSegundos"/>
        </section>
        
        <button class="button" @click="iniciar" :disabled="rodando">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            
            <span>play</span>
        </button>

        <button class="button" @click="finalizar" :disabled="!rodando">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import CronometroComp from './CronometroComp.vue'
export default defineComponent({
    name: 'TemporizadorComp',
    emits: ['TemporizadorFinalizado'],
    components: {
        CronometroComp
    },
    data() {
        return {
            tempoEmSegundos: 0,
            cronometroID: 0,
            rodando:false
        }
    },

    methods:{
        iniciar(){
            this.cronometroID = setInterval(() => {
                this.tempoEmSegundos+=1
                this.rodando = true
            }, 1000);
        },
        finalizar(){
            clearInterval(this.cronometroID)
            this.rodando = false
            this.$emit('TemporizadorFinalizado', this.tempoEmSegundos)
            this.tempoEmSegundos = 0
        },
    }
})
</script>
