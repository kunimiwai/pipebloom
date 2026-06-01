import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function seed() {
  const hashedPassword = await bcrypt.hash("admin123", 12)

  const admin = await prisma.user.upsert({
    where: { email: "admin@pipebloom.com" },
    update: {},
    create: {
      name: "Admin PipeBloom",
      email: "admin@pipebloom.com",
      password: hashedPassword,
      role: "admin",
    },
  })

  const bouquet = await prisma.category.upsert({
    where: { slug: "bouquet" },
    update: {},
    create: { name: "Bouquet", slug: "bouquet" },
  })

  const bucket = await prisma.category.upsert({
    where: { slug: "bucket-flower" },
    update: {},
    create: { name: "Bucket Flower", slug: "bucket-flower" },
  })

  const vase = await prisma.category.upsert({
    where: { slug: "vase-flower" },
    update: {},
    create: { name: "Vase Flower", slug: "vase-flower" },
  })

  const keychain = await prisma.category.upsert({
    where: { slug: "keychain" },
    update: {},
    create: { name: "Keychain", slug: "keychain" },
  })

  const products = [
    {
      categoryId: bouquet.id,
      name: "Rose Bouquet Classic",
      slug: "rose-bouquet-classic",
      description: "Buket bunga mawar merah klasik yang elegan, cocok untuk hadiah spesial.",
      price: 85000,
      stock: 25,
      imageUrl: "https://picsum.photos/seed/rose-bouquet/400/400",
      material: "Pipe Cleaner",
      size: "30cm",
      colors: ["Red", "Pink", "White"],
    },
    {
      categoryId: bouquet.id,
      name: "Sunflower Bouquet",
      slug: "sunflower-bouquet",
      description: "Buket bunga matahari cerah yang akan mengharumkan hari Anda.",
      price: 75000,
      stock: 20,
      imageUrl: "https://picsum.photos/seed/sunflower-bouquet/400/400",
      material: "Pipe Cleaner",
      size: "35cm",
      colors: ["Yellow", "Orange"],
    },
    {
      categoryId: bucket.id,
      name: "Lavender Bucket",
      slug: "lavender-bucket",
      description: "Bucket bunga lavender ungu yang harum dan menenangkan.",
      price: 95000,
      stock: 15,
      imageUrl: "https://picsum.photos/seed/lavender-bucket/400/400",
      material: "Pipe Cleaner",
      size: "25cm",
      colors: ["Purple", "Lavender"],
    },
    {
      categoryId: vase.id,
      name: "Tulip Vase Set",
      slug: "tulip-vase-set",
      description: "Rangkaian bunga tulip warna-warni dalam vas cantik.",
      price: 120000,
      stock: 10,
      imageUrl: "https://picsum.photos/seed/tulip-vase/400/400",
      material: "Pipe Cleaner",
      size: "40cm",
      colors: ["Red", "Yellow", "Pink"],
    },
    {
      categoryId: keychain.id,
      name: "Mini Flower Keychain",
      slug: "mini-flower-keychain",
      description: "Gantungan kunci bunga mini yang lucu dan cantik.",
      price: 25000,
      stock: 50,
      imageUrl: "https://picsum.photos/seed/keychain/400/400",
      material: "Pipe Cleaner",
      size: "10cm",
      colors: ["Pink", "Blue", "White"],
    },
  ]

  for (const product of products) {
    const { colors, ...productData } = product

    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: {
        ...productData,
        colors: {
          create: colors.map((name) => ({ colorName: name })),
        },
      },
    })
  }

  console.log("Seed completed successfully!")
  console.log(`  - Admin: admin@pipebloom.com / admin123`)
  console.log(`  - ${await prisma.category.count()} categories`)
  console.log(`  - ${await prisma.product.count()} products`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
