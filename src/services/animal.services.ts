import { query } from "./services"

export interface KlienDto {
    no_identitas: string, 
    pemilik: string
}
export interface AnimalKlienDto {
    pemilik: string
    idPemilik: string
    jenis: string
    nama: string
    tanggalLahir: string
    foto: string
}

export interface AnimalFrontDeskDto {
    pemilik: string
    idPemilik: string
    jenis: string
    nama: string
    tanggalLahir: string
    foto: string
}

export const getAllAnimalKlien = async (email: string) => {
    try {
        const sql = `
            SELECT 
                CASE
                    WHEN i.no_identitas_klien IS NOT NULL THEN 
                        CONCAT(i.nama_depan, ' ', COALESCE(i.nama_tengah || ' ', ''), i.nama_belakang)
                    WHEN p.no_identitas_klien IS NOT NULL THEN p.nama_perusahaan
                    ELSE 'Unknown Owner'
                END AS "pemilik",
                k.no_identitas AS "idPemilik",
                jh.nama_jenis AS "jenis",
                h.nama AS "nama",
                h.tanggal_lahir AS "tanggalLahir",
                h.url_foto AS "foto"
            FROM 
                hewan h
            JOIN 
                jenis_hewan jh ON h.id_jenis = jh.id
            JOIN 
                klien k ON h.no_identitas_klien = k.no_identitas
            LEFT JOIN 
                individu i ON k.no_identitas = i.no_identitas_klien
            LEFT JOIN 
                perusahaan p ON k.no_identitas = p.no_identitas_klien
            WHERE 
                k.email ='${email}'
            ORDER BY 
                h.nama;
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to fetch Animal: " + error.message);
        throw error;
    }
}

export const getAllAnimalFrontDesk = async (): Promise<AnimalFrontDeskDto[]> => {
    try {
        const sql = `
            SELECT 
                CASE
                    WHEN i.no_identitas_klien IS NOT NULL THEN 
                        CONCAT(i.nama_depan, ' ', COALESCE(i.nama_tengah || ' ', ''), i.nama_belakang)
                    WHEN p.no_identitas_klien IS NOT NULL THEN p.nama_perusahaan
                    ELSE 'Unknown Owner'
                END AS "pemilik",
                k.no_identitas AS "idPemilik",
                jh.nama_jenis AS "jenis",
                h.nama AS "nama",
                h.tanggal_lahir AS "tanggalLahir",
                h.url_foto AS "foto"
            FROM 
                hewan h
            JOIN 
                jenis_hewan jh ON h.id_jenis = jh.id
            JOIN 
                klien k ON h.no_identitas_klien = k.no_identitas
            LEFT JOIN 
                individu i ON k.no_identitas = i.no_identitas_klien
            LEFT JOIN 
                perusahaan p ON k.no_identitas = p.no_identitas_klien
            ORDER BY 
                h.nama;
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to fetch Animal: " + error.message);
        throw error;
    }
}

export const getAllKlien = async (): Promise<KlienDto[]> => {
    try {
        const sql = `
            SELECT 
                k.no_identitas,
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
        console.error("Failed to fetch All Klien: " + error.message);
        throw error;
    }
}

export const createAnimal = async (
    nama: string, noIdentitasKlien: string,
    tanggalLahir: Date, idJenis: string,
    urlFoto: string
) => {
    try {
        const sql = `
            INSERT INTO public.hewan(nama, no_identitas_klien, tanggal_lahir, id_jenis, url_foto)
            VALUES ('${nama}', '${noIdentitasKlien}', '${tanggalLahir.toISOString().split('T')[0]}', '${idJenis}', '${urlFoto}')
            RETURNING *;
        `
        const result = await query(sql);
        return result.data;
    }  catch (error: any) {
        console.error("Failed to delete Animal: " + error.message);
        throw error;
    }
}

export const updateAnimal = async (
    noIdentitasKlien: string, idJenis: string,
    nama: string, tanggalLahir: Date, urlFoto: string,
    currentNamaHewan: string
) => {
    try {
        const sql = `
            UPDATE hewan
            SET 
                nama = '${nama}',
                no_identitas_klien = '${noIdentitasKlien}',
                id_jenis = '${idJenis}',
                tanggal_lahir = '${tanggalLahir.toISOString().split('T')[0]}',
                url_foto = '${urlFoto}'
            WHERE 
                nama = '${currentNamaHewan}'
                AND no_identitas_klien = '${noIdentitasKlien}'
            RETURNING *;
        `;
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to delete Animal: " + error.message);
        throw error;
    }
}

export const deleteAnimal = async (idPemilik: string, namaHewan: string) => {
    try {
        const sql = `
            DELETE FROM public.hewan
            WHERE nama = '${namaHewan}' AND no_identitas_klien = '${idPemilik}';
        `
        const result = await query(sql);
        return result.data;
    } catch (error: any) {
        console.error("Failed to delete Animal: " + error.message);
        throw error;
    }
}