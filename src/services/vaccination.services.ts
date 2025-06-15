import { query } from "./services"

export interface VaccinationDto {
    idKunjungan: string,
    tanggalKunjungan: string,
    kodeVaksin: string,
    namaVaksin: string
}

export interface CreateVaccinationDto {
    idKunjungan: string,
    idVaksin: string
}

export interface UpdateVaccinationDto {
    idKunjungan: string,
    idVaksin: string
}

export const getAllVaccinationEmptyKunjungan = async () => {
    try {
        const sql = `
            SELECT 
                id_kunjungan as "idKunjungan",
                nama_hewan as "namaHewan",
                no_identitas_klien as "idKlien",
                no_front_desk as "idFrontDesk",
                no_perawat_hewan as "idPerawat",
                no_dokter_hewan as "idDokter",
                tipe_kunjungan as "tipeKunjungan",
                timestamp_awal as "timestampAwal",
                timestamp_akhir as "timestampAkhir",
                suhu,
                berat_badan as "beratBadan"
            FROM public.kunjungan
            WHERE kode_vaksin IS NULL;
        `;
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to Fetch Kunjungan Data " + error.message);
    }
}

export const getAllVaccination = async () => {
    try {
        const sql = `
            SELECT 
                k.id_kunjungan AS "idKunjungan",
                k.timestamp_awal AS "tanggalKunjungan",
                k.kode_vaksin AS "kodeVaksin",
                v.nama AS "namaVaksin"
            FROM public.kunjungan k
            JOIN public.vaksin v ON k.kode_vaksin = v.kode
            WHERE kode_vaksin IS NOT NULL;
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to fetch Vaccinations data. " + error.message);
    }
}

export const createVaccination = async (data: CreateVaccinationDto) => {
    try {
        const sql = `
            UPDATE public.kunjungan
            SET kode_vaksin = '${data.idVaksin}'
            WHERE id_kunjungan = '${data.idKunjungan}'
            RETURNING *;
        `
        const result = await query(sql);
        return result.data[0];
    } catch (error: any) {
        console.error("Failed to create new Vaccination. " + error.message);
    }
}

export const updateVaccination = async (data: UpdateVaccinationDto) => {
    try {
        const sql = `
            UPDATE public.kunjungan
            SET kode_vaksin = '${data.idVaksin}'
            WHERE id_kunjungan = '${data.idKunjungan}'
            RETURNING *;
        `
        const result = await query(sql);
        return result.data[0];
    } catch (error: any) {
        console.error("Failed to update Vaccination " + error.message);
    }
}

export const deleteVaccination = async (idKunjungan: string) => {
    try {
        const sql = `
            UPDATE public.kunjungan
            SET kode_vaksin = NULL
            WHERE id_kunjungan = '${idKunjungan}';
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error()
    }
}