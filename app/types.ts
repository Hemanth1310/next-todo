export type UserFormatted = {
    name: string;
    id: number;
    email: string;
}

export type initialStateType={
    error: string|null,
    success:boolean
}

export type TodoPayload = {
    task: string
    description: string|null
}