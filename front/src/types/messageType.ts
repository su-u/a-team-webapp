type messageType = {
    id: number;
    body: string;
    post_id: number;
    parent_id: number | null;
    created_at: Date;
    updated_at: Date;
}
export default messageType;