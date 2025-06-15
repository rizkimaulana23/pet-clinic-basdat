import { query } from "./services"

export interface TreatmentsDto {
    idKunjungan: string,
    namaHewan: string,
    idKlien: string,
    idFrontDesk: string,
    idPerawatHewan: string,
    idDokterHewan: string,
    namaPerawatan: string,
    kodePerawatan: string,
    catatan: string
}

export interface CreateTreatmentsDto {
    idKunjungan: string,
    namaHewan: string,
    idKlien: string,
    idFrontDesk: string,
    idPerawatHewan: string,
    idDokterHewan: string,
    kodePerawatan: string,
    catatan: string
}

export interface UpdateTreatmentsDto {
    idKunjungan: string,
    namaHewan: string,
    idKlien: string,
    idFrontDesk: string,
    idPerawatHewan: string,
    idDokterHewan: string,
    kodePerawatan: string,
    catatan: string
}

export interface DeleteTreatmentsDto {
    idKunjungan: string,
    namaHewan: string,
    idKlien: string,
    idFrontDesk: string,
    idPerawatHewan: string,
    idDokterHewan: string,
    kodePerawatan: string
}

export const getAllTreatments = async (): Promise<TreatmentsDto[]> => {
    try {
        const sql = `
            SELECT 
                kp.id_kunjungan AS "idKunjungan",
                kp.nama_hewan AS "namaHewan",
                kp.no_identitas_klien AS "idKlien",
                kp.no_front_desk As "idFrontDesk",
                kp.no_perawat_hewan AS "idPerawatHewan",
                kp.no_dokter_hewan AS "idDokterHewan",
                p.nama_perawatan AS "namaPerawatan",
                kp.kode_perawatan AS "kodePerawatan",
                kp.catatan AS "catatan"
            FROM public.kunjungan_keperawatan kp
            JOIN public.perawatan p ON kp.kode_perawatan = p.kode_perawatan; 
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to fetch treatments data " + error.message);
        return [];
    }
}

export const createTreatments = async (data: CreateTreatmentsDto) => {
    try {
        const sql = `
            INSERT INTO public.kunjungan_keperawatan(id_kunjungan, nama_hewan, no_identitas_klien, no_front_desk, no_perawat_hewan, no_dokter_hewan, kode_perawatan, catatan)
            VALUES('${data.idKunjungan}', '${data.namaHewan}', '${data.idKlien}', '${data.idFrontDesk}', '${data.idPerawatHewan}', '${data.idDokterHewan}', '${data.kodePerawatan}', '${data.catatan}')
            RETURNING *;
        `
        const result = await query(sql);
        return result.data[0];
    } catch (error: any) {
        console.error("Failed to fetch treatments");
        return [];
    }
}

export const updateTreatments = async (data: UpdateTreatmentsDto) => {
    try {
        const sql = `
            UPDATE public.kunjungan_keperawatan
            SET
                kode_perawatan = '${data.kodePerawatan}',
                catatan = '${data.catatan}'
            WHERE
                id_kunjungan = '${data.idKunjungan}',
                nama_hewan = '${data.namaHewan}',
                no_identitas_klien = '${data.idKlien}',
                no_front_desk = '${data.idFrontDesk}',
                no_perawat_hewan = ''${data.idPerawatHewan},
                no_dokter_hewan = '${data.idDokterHewan}'
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to update Treatments");
        return [];
    }
}

export const deleteTreatments = async () => {
    try {
        const sql = `
            DELETE FROM public.kunjungan_keperawatan
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {

    }
}


