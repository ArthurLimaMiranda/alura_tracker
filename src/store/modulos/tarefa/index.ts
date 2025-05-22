import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { GET_TAREFAS, POST_TAREFA, PUT_TAREFA } from "@/store/tipo-acoes";
import { DEFINIR_TAREFA, NOVO_TAREFA, ALTERA_TAREFA } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    state: {
        tarefas: [],
    },
    mutations:{
        [DEFINIR_TAREFA](state, tarefas:ITarefa[]){
            state.tarefas = tarefas
        },
        [NOVO_TAREFA](state, tarefa: ITarefa){
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa){
            const index = state.tarefas.findIndex(tar => tar.id == tarefa.id)
            state.tarefas[index] = tarefa
        },

    },
    actions:{
        [GET_TAREFAS]({commit}, filtro: string){
            let url = 'tarefas'

            if(filtro){
                url+='?descricao=' + filtro
                console.log(url)
            }

            http.get(url).then(resposta => commit(DEFINIR_TAREFA, resposta.data))
        },
        [POST_TAREFA]({commit}, tarefa: ITarefa){
            return http.post('/tarefas', tarefa)
                .then(resposta => commit(NOVO_TAREFA, resposta.data))
        },
        [PUT_TAREFA]({commit}, tarefa: ITarefa){
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa))
        },
    }
}