export interface Documento{
    TituloSeccion:string,
    ContenidoCuerpo:ContenidoCuerpo

}

export interface ContenidoCuerpo{
    SubtituloSeccion:string,
    ContenidoSeccion:string[];
}


export interface BodyDocumento{
    Documento:Documento[]

}
