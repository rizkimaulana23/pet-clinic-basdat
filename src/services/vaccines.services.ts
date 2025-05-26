import { query } from "./services"

export interface AddVaccineDto {
    kode: string
    nama: string
    harga: number
    stok: number
}

export interface VaccineResponseDto {
    kode: string
    nama: string
    harga: number
    stok: number
}

export const addVaccines = async (dto: AddVaccineDto) => {
    try {
        const sql = `
            INSERT INTO public.vaksin(kode, nama, harga, stok)
            VALUES ('${dto.kode}', '${dto.nama}', ${dto.harga}, ${dto.stok})
            RETURNING *;
        `;
        
        const result = await query(sql);
        return result.data[0];
    } catch (error: any) {
        console.error("Failed to add vaccine:", error.message);
        throw error;
    }
}

export const getVaccine = async (kode: string): Promise<VaccineResponseDto> => {
    try {
        const sql = `
            SELECT kode, harga, nama, stok
            FROM public.vaksin
            WHERE kode = '${kode}';
        `;
        
        const result = await query(sql);
        return result.data[0];
    } catch (error: any) {
        console.error("Failed to add vaccine:", error.message);
        throw error;
    }
}

export const getAllVaccines = async () => {
    try {
        const sql = `
            SELECT kode, nama, harga, stok FROM public.vaksin;
        `;
        
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to fetch vaccines:", error.message);
        throw error;
    }
}

export const countAllVaccines = async (): Promise<number> => {
    try {
        const sql = `
            SELECT COUNT(*) from public.vaksin;
        `
        const result  = await query(sql);
        return Number(result.data[0].count);
    } catch (error: any) {
        console.error("Failed to count vaccines:", error.message);
        throw error;
    }
}

export const deleteVaccine = async (kode: string) => {
    try {
        const sql = `DELETE FROM public.vaksin WHERE kode = '${kode}';`;
        await query(sql);
    } catch (error: any) {
        console.error("Failed to count vaccines:", error.message);
        throw error;
    }
}

export const searchVaccines = async (search: string) => {
    try {
        const sql = `SELECT kode, nama, harga, stok FROM public.vaksin WHERE nama ILIKE '%${search}%';`;
        const result = await query(sql);
        return result.data;

    } catch (error: any) {
        console.error("Failed to count vaccines:", error.message);
        throw error;
    }
}

export const updateStockVaccines = async (kode: string, stok: number) => {
    try {
        const sql = `UPDATE public.vaksin SET stok = ${stok} WHERE kode = '${kode}';`
        const result = await query(sql);
        return result.data;

    } catch(error: any) {
        console.error("Failed to count vaccines:", error.message);
        throw error;
    }
}

export const updateVaccines = async (kode: string, nama: string, harga: number) => {
    try {
        const sql = 
            `
                UPDATE public.vaksin 
                SET nama = '${nama}', harga = ${harga}
                WHERE kode = '${kode}';
            `
        const result = await query(sql);
        console.log("Update Vaccine")
        console.log(result);
        return result.data;
    } catch(error: any) {
        console.error("Failed to count vaccines:", error.message);
        throw error;
    }
}