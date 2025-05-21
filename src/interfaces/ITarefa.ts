import IProjeto from "./IProjeto";

export default interface ITarefa {
    duracao: number,
    descricao: string,
    projeto: IProjeto
}