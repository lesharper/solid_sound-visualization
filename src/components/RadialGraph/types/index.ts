export type Path = {
    path: string
    color: string
}

export interface IRadialGraph {
    color: (value: number) => string
    scale: number
}
