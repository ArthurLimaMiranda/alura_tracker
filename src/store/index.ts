import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUsestore } from "vuex";
import { ALTERA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR, NOVO_PROJETO } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacoes";

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state:{
        projetos:[],
        notificacoes:[],
    },
    mutations:{
        [NOVO_PROJETO](state, nomeProjeto:string){
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeProjeto                
            } as IProjeto

            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto){
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id:string){
            state.projetos = state.projetos.filter(proj=>proj.id != id)
        },
        [NOTIFICAR](state, notificacao: INotificacao){
            notificacao.id = new Date().getTime()
            state.notificacoes.push(notificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(not => not.id != notificacao.id)
            }, 2000)
        }
    }
})

export function useStore(): Store<Estado>{
    return vuexUsestore(key)
}