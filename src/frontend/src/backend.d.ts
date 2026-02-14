import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Invitation {
    id: string;
    title: string;
    date: string;
    time: string;
    description: string;
    location: string;
}
export interface backendInterface {
    createInvitation(id: string, title: string, description: string, location: string, date: string, time: string): Promise<void>;
    getAllInvitations(): Promise<Array<Invitation>>;
    getInvitation(id: string): Promise<Invitation>;
}
