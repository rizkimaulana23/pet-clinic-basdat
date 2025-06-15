import { query } from "./services";

export interface DokterResponseDto {
    id: string;
    email: string;
}

export interface PerawatResponseDto {
    id: string;
    email: string
}

export interface KlienResponseDto {
    name: string;
    email: string;
    noIdentitas: string
}

export interface HewanResponseDto {
    nama: string;
}

export interface CreateNewVisitsDto {
    namaHewan: string;
    idKlien: string;
    idFrontDesk: string;
    idPerawat: string;
    idDokter: string;
    tipeKunjungan: string;
    timestampAwal: string;
    timestampAkhir: string;
}

export interface UpdateVisitsDto {
    idKunjungan: string;
    namaHewan: string;
    idKlien: string;
    idFrontDesk: string;
    idPerawat: string;
    idDokter: string;
    tipeKunjungan: string;
    timestampAwal: string;
    timestampAkhir: string;
}

export interface VisitsDto {
    idKunjungan: string;
    namaHewan: string;
    idKlien: string;
    idFrontDesk: string;
    idPerawat: string;
    idDokter: string;
    tipeKunjungan: string;
    timestampAwal: string;
    timestampAkhir: string;
    suhu: number | null;
    beratBedan: number | null;

}

export const fetchDokter = async () => {
    try {
        const sql = `
            SELECT no_dokter_hewan AS id, email FROM public.dokter_hewan dh
            JOIN public.tenaga_medis tm ON dh.no_dokter_hewan = tm.no_tenaga_medis
            JOIN public.pegawai p ON p.no_pegawai = tm.no_tenaga_medis
            JOIN public.user u ON u.email = p.email_user;
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to fetch Dokter. " + error.message)
    }
}

export const fetchPerawat = async () => {
    try {
        const sql = `
            SELECT no_perawat_hewan AS id, email FROM public.perawat_hewan ph
            JOIN public.tenaga_medis tm ON ph.no_perawat_hewan = tm.no_tenaga_medis
            JOIN public.pegawai p ON p.no_pegawai = tm.no_tenaga_medis
            JOIN public.user u ON u.email = p.email_user;
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to fetch Perawat. " + error.message)
    }
}

export const fetchKlienAndHewan = async () => {
    try {
        const sql = `
            SELECT 
                k.no_identitas as "noIdentitas", k.email,
                CASE
                    WHEN i.no_identitas_klien IS NOT NULL THEN 
                        CONCAT(i.nama_depan, ' ', COALESCE(i.nama_tengah || ' ', ''), i.nama_belakang)
                    WHEN p.no_identitas_klien IS NOT NULL THEN p.nama_perusahaan
                    ELSE 'Unknown Owner'
                END AS "pemilik"
            FROM public.klien k
            LEFT JOIN 
                individu i ON k.no_identitas = i.no_identitas_klien
            LEFT JOIN 
                perusahaan p ON k.no_identitas = p.no_identitas_klien
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Error while fetching klien data. " + error.message);
    }
}

export const fetchHewan = async (idKlien: string) => {
    try {
        const sql = `
            SELECT nama FROM public.hewan
            WHERE no_identitas_klien = '${idKlien}';
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Error while fetching klien's pet data. " + error.message);
    }
}

export const createNewVisits = async (dto: CreateNewVisitsDto) => {
    try {
        const sql = `
            INSERT INTO public.kunjungan(nama_hewan, no_identitas_klien, no_front_desk, no_perawat_hewan, no_dokter_hewan, tipe_kunjungan, timestamp_awal, timestamp_akhir)
            VALUES ('${dto.namaHewan}', '${dto.idKlien}', '${dto.idFrontDesk}', '${dto.idPerawat}', '${dto.idDokter}', '${dto.tipeKunjungan}', '${dto.timestampAwal}', '${dto.timestampAkhir}')
            RETURNING *;
        `
        const result = await query(sql);
        return result.data[0];
    } catch (error: any) {
        console.error("Error while creating a new Visits. " + error.message);
    }
}

export const getAllVisits = async () => {
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
            FROM public.kunjungan;
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to Fetch Visits");
    }
}

export const updateVisits = async (data: UpdateVisitsDto) => {
    try {
        const sql = `
            UPDATE public.kunjungan
            SET 
                nama_hewan = '${data.namaHewan}',
                no_identitas_klien = '${data.idKlien}',
                no_front_desk = '${data.idFrontDesk}',
                no_perawat_hewan = '${data.idPerawat}',
                no_dokter_hewan = '${data.idDokter}',
                tipe_kunjungan = '${data.tipeKunjungan}',
                timestamp_awal = '${data.timestampAwal}',
                timestamp_akhir = '${data.timestampAkhir}'
            WHERE id_kunjungan = '${data.idKunjungan}';
         `
         const result = await query(sql);
         return result.data;
    } catch (error: any) {
        console.error(error.message);
    }
}

export const deleteVisits = async (idKunjungan: string) => {
    try {
        const sql = `
            DELETE FROM public.kunjungan
            WHERE id_kunjungan = '${idKunjungan}';
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to delete visits. " + error.message);
    }

}