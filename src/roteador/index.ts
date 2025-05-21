import FormularioProjetoView from "@/views/Projetos/FormularioProjetoView.vue"
import ListaView from "@/views/Projetos/ListaView.vue"
import ProjetosView from "@/views/ProjetosView.vue"
import TarefasView from "@/views/TarefasView.vue"
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: TarefasView
    },
    {
        path: '/projetos',
        component: ProjetosView,
        children:[
                {
                    path: '',
                    name: 'Projetos',
                    component: ListaView
                },
                {
                    path: 'novo',
                    name: 'Novo Projeto',
                    component: FormularioProjetoView
                },
                {
                    path: ':id',
                    name: 'Editar Projeto',
                    component: FormularioProjetoView,
                    props:true
                },
        ]
    }

]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador