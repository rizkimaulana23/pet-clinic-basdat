import { query } from "./services"

export interface MedicineResponseDto {
    kode: string
    nama: string
    harga: number
    stok: number
    dosis: string
}

export const countAllMedicines = async () => {
    try {
        const sql = `
            SELECT COUNT(*) from public.obat;
        `
        const result = await query(sql);
        return result.data[0].count;
    } catch (error: any) {
        console.error("Failed to add vaccine:", error.message);
        throw error;
    }
}

export const getAllMedicines = async (): Promise<MedicineResponseDto[]> => {
    try {
        const sql = `
            SELECT kode, nama, harga, stok, dosis
            FROM public.obat;
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to add vaccine:", error.message);
        throw error;
    }
}

export const getMedicine = async (kode: string): Promise<MedicineResponseDto> => {
    try {
            const sql = `
                SELECT kode, nama, harga, stok, dosis
                FROM public.obat
                WHERE kode = '${kode}';
            `
            const result = await query(sql);
            return result.data;
    } catch (error: any) {
        console.error("Failed to add vaccine:", error.message);
        throw error;
    }
}

export const addMedicine = async (nama: string, harga: number, dosis: string, stok: number) => {
    try {
        const jumlahObat = await countAllMedicines();

        const nextNumber = Number(jumlahObat) + 1;
        const paddedNumber = nextNumber.toString().padStart(3, '0');
        const vaccineCode = `MED${paddedNumber}`;

        const sql = `
            INSERT INTO public.obat(kode, nama, harga, dosis, stok)
            VALUES ('${vaccineCode}', '${nama}', ${harga}, '${dosis}', ${stok})
            RETURNING *;
        `
        const result = await query(sql);
        return result.data[0];
    } catch (error: any) {
        console.error("Failed to add vaccine:", error.message);
        throw error;
    }
}

export const updateStockMedicine = async(kode: string, stok: number) => {
    try {
        const sql = `
            UPDATE public.obat
            SET stok = ${stok}
            WHERE kode = '${kode}';
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to add vaccine:", error.message);
        throw error;
    }
}

export const updateMedicine = async (kode: string, nama: string, harga: number, dosis: string) => {
    try {
        const sql = `
            UPDATE public.obat
            SET nama = '${nama}', harga = ${harga}, dosis = '${dosis}'
            WHERE kode = '${kode}';
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to update vaccine:", error.message);
        throw error;
    }
}

export const deleteMedicine = async (kode: string) => {
    try {
        const sql = `
            DELETE FROM public.obat
            WHERE kode = '${kode}';
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to add vaccine:", error.message);
        throw error;
    }
}

export const searchMedicine = async (nama: string) => {
    try {
        const sql = `
            SELECT kode, nama, harga, stok, dosis
            FROM public.obat
            WHERE nama ILIKE '%${nama}%';
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to add vaccine:", error.message);
        throw error;
    }
}