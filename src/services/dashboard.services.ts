import { query } from "./services";

export interface BiodataDokter {
    no_pegawai: string
    no_izin_praktik: string
    email: string
    tanggal_mulai_kerja: Date
    tanggal_akhir_kerja: Date
    alamat: string
    nomor_telepon: string
}

export interface BiodataFrontDesk {
    no_pegawai: string
    email: string
    tanggal_mulai_kerja: Date
    tanggal_akhir_kerja: Date
    alamat: string
    nomor_telepon: string
}

export interface BiodataPerawat {
    no_pegawai: string
    no_izin_praktik: string
    email: string
    tanggal_mulai_kerja: Date
    tanggal_akhir_kerja: Date
    alamat: string
    nomor_telepon: string
}

export interface BiodataKlien {
    no_identitas: string
    email: string
    full_name: string
    tanggal_registrasi: Date
    alamat: string
    nomor_telepon: string
}

export interface SertifikatKompetensi {
    no_sertifikat: string
    nama_sertifikat: string
}

export interface JadwalPraktik {
    hari: string
    jam: string
}

export const getBiodataDokter = async (email: string): Promise<BiodataDokter> => {
    try {
        const sql = `
            SELECT no_pegawai, no_izin_praktik, email, tanggal_mulai_kerja, tanggal_akhir_kerja, alamat, nomor_telepon    
            FROM public.user u 
            JOIN public.pegawai p ON u.email = p.email_user
            JOIN public.tenaga_medis tm ON p.no_pegawai = tm.no_tenaga_medis
            WHERE u.email = '${email}';
        `
        const result = await query(sql);
        return result.data[0];
    } catch (error: any) {
        console.error("Failed to get data for Dokter :", error.message);
        throw error;
    }
}

export const getBiodataFrontDesk = async (email: string) => {
    try {
        const sql = `
            SELECT no_pegawai, email, tanggal_mulai_kerja, tanggal_akhir_kerja, alamat, nomor_telepon    
            FROM public.user u 
            JOIN public.pegawai p ON u.email = p.email_user
            JOIN public.front_desk fd ON p.no_pegawai = fd.no_front_desk
            WHERE u.email = '${email}';
        `
        const result = await query(sql);
        return result.data[0];
    } catch (error: any) {
        console.error("Failed to get data for Dokter :", error.message);
        throw error;
    }
}

export const getBiodataPerawat = async (email: string) => {
    try {
        const sql = `
            SELECT no_pegawai, no_izin_praktik, email, tanggal_mulai_kerja, tanggal_akhir_kerja, alamat, nomor_telepon    
            FROM public.user u 
            JOIN public.pegawai p ON u.email = p.email_user
            JOIN public.tenaga_medis tm ON p.no_pegawai = tm.no_tenaga_medis
            WHERE email = '${email}';
        `
        const result = await query(sql);
        return result.data[0];
    } catch (error: any) {
        console.error("Failed to get data for Dokter :", error.message);
        throw error;
    }
}

export const getBiodataKlien = async (email: string) => {
    try {

        const sqlCheckIsPerusahaan = `
        SELECT EXISTS (
                SELECT 1 
                FROM perusahaan p
                JOIN klien k ON p.no_identitas_klien = k.no_identitas
                WHERE k.email = '${email}'
            ) AS is_perusahaan;
        `
        const isPerusahaan = await query(sqlCheckIsPerusahaan);

        let sqlSearch;

        if (!isPerusahaan.data[0].is_perusahaan as boolean) {
            sqlSearch = `
                SELECT k.no_identitas, u.email, CONCAT(nama_depan, ' ', nama_tengah, ' ', nama_belakang) AS full_name, tanggal_registrasi, alamat, nomor_telepon
                FROM public.user u
                JOIN public.klien k ON k.email = u.email
                JOIN public.individu i ON i.no_identitas_klien = k.no_identitas
                WHERE u.email = '${email}';
            `
        } else {
            sqlSearch = `
                SELECT k.no_identitas, u.email, nama_perusahaan as full_name, tanggal_registrasi, alamat, nomor_telepon
                FROM public.user u
                JOIN public.klien k ON k.email = u.email
                JOIN public.perusahaan p ON p.no_identitas_klien = k.no_identitas
                WHERE u.email = '${email}';
            `
        }
        const result = await query(sqlSearch);
        return result.data[0];
    } catch (error: any) {
        console.error("Failed to get data for Dokter :", error.message);
        throw error;
    }
}

export const getDaftarSertifikat = async (email: string): Promise<SertifikatKompetensi[]> => {
    try {
        const sql = `
            SELECT sk.no_sertifikat_kompetensi as no_sertifikat, sk.nama_sertifikat 
            FROM public.user u 
            JOIN public.pegawai p ON u.email = p.email_user
            JOIN public.tenaga_medis tm ON p.no_pegawai = tm.no_tenaga_medis
            JOIN public.sertifikat_kompetensi sk ON sk.no_tenaga_medis = tm.no_tenaga_medis
            WHERE u.email = '${email}';
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to get data for Dokter :", error.message);
        throw error;
    }
}

export const getDaftarJadwalPraktik = async (email: string): Promise<JadwalPraktik[]> => {
    try {
        const sql = `
            SELECT jp.hari, jp.jam
            FROM public.user u 
            JOIN public.pegawai p ON u.email = p.email_user
            JOIN public.tenaga_medis tm ON p.no_pegawai = tm.no_tenaga_medis
            JOIN public.dokter_hewan dh ON dh.no_dokter_hewan = tm.no_tenaga_medis
            JOIN public.jadwal_praktik jp ON jp.no_dokter_hewan = dh.no_dokter_hewan
            WHERE u.email = '${email}'
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to get data for Dokter :", error.message);
        throw error;
    }
} 

export const changePassword = async (email: string, oldPassword: string, newPassword: string) => {
    try {
        const sqlCheckPassword = `
            SELECT COUNT(*) AS password_match
            FROM public.user
            WHERE email = '${email}'
            AND password = '${oldPassword}';
        `
        const resultCheckPassword = await query(sqlCheckPassword);
        console.log(resultCheckPassword);

        let sql = '';
        if (resultCheckPassword.data[0].password_match === '1') {
            sql = `
                UPDATE public.user
                SET password = '${newPassword}'
                WHERE email = '${email}'; 
            `
        } else {
           throw new Error("Your old password is wrong.");
        }

        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to change the password :", error.message);
        throw error;
    }
}