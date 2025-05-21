import { TipoNotificacao } from "@/interfaces/INotificacoes"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/tipo-mutacoes"

export const notificarMixin = {
    methods: {
        notificar(tipo: TipoNotificacao, titulo:string, texto:string) : void{
                store.commit(NOTIFICAR,{
                    titulo,
                    texto,
                    tipo
            })
        }
    }
}