import IProjeto from "./IProjeto";

export default interface ITarefa {
    id: string,
    duracao: number,
    descricao: string,
    projeto: IProjeto
}