import { query } from "./services"
import { v4 as uuidv4 } from 'uuid';

export interface RegistrasiIndividuDto {
    email: string
    namaDepan: string
    namaTengah?: string
    namaBelakang: string
    password: string
    nomorTelepon: string 
    alamat: string
}

export interface RegistrasiPerusahaanDto {
    email: string
    namaPerusahaan: string
    password: string
    nomorTelepon: string 
    alamat: string
}

export interface RegistrasiDokterDto {
    noIzinPraktik: string
    email: string
    password: string
    nomorTelepon: string
    tanggalDiterima: Date
    alamat: string
    kompetensi: KompetensiDto[]
    jadwalPraktik: JadwalPraktikDto[]
}

export interface RegistrasiPerawatDto {
    noIzinPraktik: string
    email: string
    password: string
    nomorTelepon: string
    tanggalDiterima: Date
    alamat: string
    kompetensi: KompetensiDto[]
}

export interface RegistrasiFrontDesk {
    email: string
    password: string
    nomorTelepon: string
    tanggalDiterima: Date
    alamat: string
}

export interface KompetensiDto {
    nomorSertifikat: string
    namaSertifikat: string
}

export interface JadwalPraktikDto {
    hari: string
    jam: string
}

export const registerIndividu = async (dto: RegistrasiIndividuDto) => {
    try {
        const uuid = uuidv4(); 
        const tanggalRegistrasi = new Date().toISOString().split('T')[0];
        const sql = `
            INSERT INTO public.user(email, password, alamat, nomor_telepon)
            VALUES ('${dto.email}', '${dto.password}', '${dto.alamat}', '${dto.nomorTelepon}');

            INSERT INTO public.klien(no_identitas, tanggal_registrasi, email)
            VALUES ('${uuid}', '${tanggalRegistrasi}', '${dto.email}');

            INSERT INTO public.individu (no_identitas_klien, nama_depan, nama_tengah, nama_belakang)
            VALUES ('${uuid}', '${dto.namaDepan}', '${dto.namaTengah}', '${dto.namaBelakang}');
        `
        const response = await query(sql);
        return response.data;
    } catch (error: any) {
        console.error("Failed to register Individu", error.message);
        throw error;
    }
}

export const registerPerusahaan = async (dto: RegistrasiPerusahaanDto) => {
    try {
        const uuid = uuidv4(); 
        const tanggalRegistrasi = new Date().toISOString().split('T')[0];
        const sql = `
            INSERT INTO public.user(email, password, alamat, nomor_telepon)
            VALUES ('${dto.email}', '${dto.password}', '${dto.alamat}', '${dto.nomorTelepon}');

            INSERT INTO public.klien(no_identitas, tanggal_registrasi, email)
            VALUES ('${uuid}', '${tanggalRegistrasi}', '${dto.email}');

            INSERT INTO public.perusahaan(no_identitas_klien, nama_perusahaan)
            VALUES ('${uuid}', '${dto.namaPerusahaan}');
        `
        const response = await query(sql);
        return response.data;
    } catch (error: any) {
        console.error("Failed to register Individu", error.message);
        throw error;
    }
}

export const registerFrontDesk = async (dto: RegistrasiFrontDesk) => {
    try {
        const uuid = uuidv4(); 
        const sql = `
            INSERT INTO public.user(email, password, alamat, nomor_telepon)
            VALUES ('${dto.email}', '${dto.password}', '${dto.alamat}', '${dto.nomorTelepon}');

            INSERT INTO public.pegawai(no_pegawai, tanggal_mulai_kerja, tanggal_akhir_kerja, email_user)
            VALUES ('${uuid}', '${dto.tanggalDiterima}', null, '${dto.email}');

            INSERT INTO public.front_desk(no_front_desk)
            VALUES('${uuid}');
        `
        const response = await query(sql);
        return response.data;
    } catch (error: any) {
        console.error("Failed to register Individu", error.message);
        throw error;
    }
}

export const registerPerawat = async (dto: RegistrasiPerawatDto) => {
    try {
        const uuid = uuidv4(); 
        let sql = `
            INSERT INTO public.user(email, password, alamat, nomor_telepon)
            VALUES ('${dto.email}', '${dto.password}', '${dto.alamat}', '${dto.nomorTelepon}');

            INSERT INTO public.pegawai(no_pegawai, tanggal_mulai_kerja, tanggal_akhir_kerja, email_user)
            VALUES ('${uuid}', '${dto.tanggalDiterima.toISOString().split('T')[0]}', null, '${dto.email}');

            INSERT INTO public.tenaga_medis(no_tenaga_medis, no_izin_praktik)
            VALUES('${uuid}', '${dto.noIzinPraktik}');

            INSERT INTO public.perawat_hewan(no_perawat_hewan)
            VALUES('${uuid}');
        `
        for (const sert of dto.kompetensi) {
            sql += `
                INSERT INTO public.sertifikat_kompetensi(no_sertifikat_kompetensi, no_tenaga_medis, nama_sertifikat)
                VALUES ('${sert.nomorSertifikat}', '${uuid}', '${sert.namaSertifikat}');   
            `
        }
        const response = await query(sql);
        return response.data;
    } catch (error: any) {
        console.error("Failed to register Individu", error.message);
        throw error;
    }
}

export const RegisterDokter = async (dto: RegistrasiDokterDto) => {
    try {
        console.log("register dokter")
        console.log(dto);
        const uuid = uuidv4(); 
        let sql = `
            INSERT INTO public.user(email, password, alamat, nomor_telepon)
            VALUES ('${dto.email}', '${dto.password}', '${dto.alamat}', '${dto.nomorTelepon}');

            INSERT INTO public.pegawai(no_pegawai, tanggal_mulai_kerja, tanggal_akhir_kerja, email_user)
            VALUES ('${uuid}', '${dto.tanggalDiterima.toISOString().split('T')[0]}', null, '${dto.email}');

            INSERT INTO public.tenaga_medis(no_tenaga_medis, no_izin_praktik)
            VALUES('${uuid}', '${dto.noIzinPraktik}');

            INSERT INTO public.dokter_hewan(no_dokter_hewan)
            VALUES('${uuid}');
        `
        for (const sert of dto.kompetensi) {
            sql += `
                INSERT INTO public.sertifikat_kompetensi(no_sertifikat_kompetensi, no_tenaga_medis, nama_sertifikat)
                VALUES ('${sert.nomorSertifikat}', '${uuid}', '${sert.namaSertifikat}');   
            `
        }

        for (const jadwal of dto.jadwalPraktik) {
            sql += `
                INSERT INTO public.jadwal_praktik(no_dokter_hewan, hari, jam)
                VALUES ('${uuid}', '${jadwal.hari}', '${jadwal.jam}');   
            `
        }
        const response = await query(sql);
        return response.data;
    } catch (error: any) {
        console.error("Failed to register Individu", error.message);
        throw error;
    }
}