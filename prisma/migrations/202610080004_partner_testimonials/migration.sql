ALTER TABLE `Testimoni`
  ADD COLUMN `instansi` VARCHAR(191) NULL,
  ADD COLUMN `status` ENUM('MENUNGGU', 'DISETUJUI', 'DITOLAK') NOT NULL DEFAULT 'MENUNGGU';

-- Testimonials already managed by an administrator remain visible.
UPDATE `Testimoni` SET `status` = 'DISETUJUI';
