import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUsestore } from "vuex";
import { NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacoes";
import { EstadoProjeto, projeto } from "./modulos/projeto";
import { EstadoTarefa, tarefa } from "./modulos/tarefa";

export interface Estado {
    notificacoes: INotificacao[],
    projeto: EstadoProjeto,
    tarefa: EstadoTarefa
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state:{
        notificacoes:[],
        tarefa:{
            tarefas: []
        },
        projeto:{
            projetos:[]
        }
    },
    mutations:{
        [NOTIFICAR](state, notificacao: INotificacao){
            notificacao.id = new Date().getTime()
            state.notificacoes.push(notificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(not => not.id != notificacao.id)
            }, 2000)
        },
    },
    actions:{},
    modules: {
        projeto,
        tarefa
    }
})

export function useStore(): Store<Estado>{
    return vuexUsestore(key)
}