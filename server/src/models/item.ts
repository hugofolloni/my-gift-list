export type Gift = {
    name: string;
    price: number;
    description: string;
    url: string;
    checked: boolean;
    image: string;
    event: number;
}

export type Event = {
    name: string;
    date: string;
    owner: string;
    id: number;
}

export type User = {
    name: string;
    username: string;
    email: string;
    password: string;
}

