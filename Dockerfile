# Menggunakan image Node.js versi 20 (LTS) Alpine yang ringan
FROM node:20-alpine AS base

# Menentukan direktori kerja di dalam container
WORKDIR /app

# Menyalin file konfigurasi package (memanfaatkan cache Docker)
COPY package.json package-lock.json ./

# Menginstal semua dependensi
RUN npm install

# Menyalin seluruh source code ke dalam container
COPY . .

# Meng-generate Prisma Client (Wajib dilakukan sebelum build)
RUN npx prisma generate

# Melakukan build aplikasi Next.js untuk production
RUN npm run build

# Mengekspos port 4005 (sesuai request Anda untuk Web App)
EXPOSE 4005

# Menjalankan aplikasi Next.js di port 4005
CMD ["npm", "run", "start", "--", "-p", "4005"]