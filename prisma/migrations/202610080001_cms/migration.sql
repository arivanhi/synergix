-- AlterTable
ALTER TABLE `Keanggotaan` ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `hakCipta` JSON NULL,
    ADD COLUMN `konsultasiUrl` VARCHAR(191) NULL,
    ADD COLUMN `linkedin` VARCHAR(191) NULL,
    ADD COLUMN `pengabdian` JSON NULL,
    ADD COLUMN `sintaUrl` VARCHAR(191) NULL,
    MODIFY `peran` ENUM('PIMPINAN', 'KETUA', 'ANGGOTA_PERISET', 'WAKIL', 'PENELITI_UTAMA', 'DOSEN_PEMBIMBING', 'ANGGOTA', 'PENELITI_ALUMNI') NOT NULL;

-- CreateTable
CREATE TABLE `KontenWebsite` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `data` JSON NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Konsultasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `perusahaan` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `layanan` VARCHAR(191) NOT NULL,
    `detail` TEXT NOT NULL,
    `diproses` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

