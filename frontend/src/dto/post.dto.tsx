export type UserObject = {
    username: string
}

export type postObject = {
    id: number,
    title: string,
    content: string,
    createdAt: string,
    is_published: boolean
    user: UserObject
};

export type commentObject = {
    id: number,
    comment: string,
    createdAt: string,
    user: UserObject
}

