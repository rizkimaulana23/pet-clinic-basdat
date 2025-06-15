import { query } from "./services";

export interface TreatmentTypesDto {
    kodePerawatan: string,
    namaPerawatan: string,
    biayaPerawatan: number
}

export const getAllTreatmentsType = async () => {
    try {
        const sql = `
            SELECT
                kode_perawatan AS "kodePerawatan",
                namaPerawatan AS "namaPerawatan",
                biayaPerawatan AS "biayaPerawatan"
            FROM public.perawatan;
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to fetch Treatments Type data. " + error.message);
        return [];
    }
}