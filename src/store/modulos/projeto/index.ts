import http from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { GET_PROJETOS, POST_PROJETO, PUT_PROJETO, DELETE_PROJETO } from "@/store/tipo-acoes";
import { NOVO_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETO } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoProjeto {
    projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
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
        [DEFINIR_PROJETO](state, projetos:IProjeto[]){
            state.projetos = projetos
        },

    },
    actions:{
        [GET_PROJETOS]({commit}){
            http.get('projetos').then(resposta => commit(DEFINIR_PROJETO, resposta.data))
        },
        [POST_PROJETO](contexto, nomeProjeto: string){
            return http.post('/projetos', {
                nome: nomeProjeto
            })
        },
        [PUT_PROJETO](contexto, projeto: IProjeto){
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [DELETE_PROJETO]({commit}, id: string){
            return http.delete(`/projetos/${id}`)
                .then(()=>commit(EXCLUIR_PROJETO, id))
        },
    }
}