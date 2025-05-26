import { query } from "./services"
import { v4 as uuidv4 } from 'uuid';

export interface AnimalTypesDto {
    id: string
    jenis: string
}

export const getAllAnimalTypes = async (): Promise<AnimalTypesDto[]> => {
    try {
        const sql = `
            SELECT id, nama_jenis as jenis
            FROM public.jenis_hewan;
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to fetch animal types: " + error.message);
        throw error;
    }
}

export const updateAnimalTypes = async (id: string, jenis: string) => {
    try {
        const sql = `
            UPDATE public.jenis_hewan
            SET nama_jenis = '${jenis}'
            WHERE id = '${id}';
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to update Animal types: " + error.message);
        throw error;
    }
}

export const createAnimalTypes = async (jenis: string) => {
    try {
        const uuid = uuidv4();
        const sql = `
            INSERT INTO public.jenis_hewan(id, nama_jenis)
            VALUES ('${uuid}', '${jenis}')
            RETURNING *;
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to create new Animal types: " + error.message);
        throw error;
    }
}

export const deleteAnimalTypes = async (id: string) => {
    try {
        const sql = `
            DELETE FROM public.jenis_hewan
            WHERE id = '${id}';
        `
        const result = await query(sql)
        return result.data;
    } catch (error: any) {
        console.error("Failed to delete Animal Types: " + error.message);
        throw error;
    }
}