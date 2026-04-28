import { PrismaClient } from '@prisma/client'
import { siteConfig } from '../src/lib/config/site'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // カテゴリを先に作成
  for (const cat of siteConfig.dbCategories) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      },
    })
    console.log('Created category:', category.name)
  }

  // テスト商品用のデフォルトカテゴリを取得（siteConfigの先頭カテゴリを使用）
  const defaultCategorySlug = siteConfig.dbCategories[0]?.slug ?? 'pokemon-cards'
  const defaultCategory = await prisma.category.upsert({
    where: { slug: defaultCategorySlug },
    update: {},
    create: {
      name: 'Pokemon Cards',
      slug: defaultCategorySlug,
      description: 'Default category',
    },
  })

  // テスト商品（購入フロー動作確認用）
  // 既に存在する場合はスキップ（upsert）
  const testProducts = [
    { name: 'テスト商品 A', price: 100, stock: 10 },
    { name: 'テスト商品 B', price: 300, stock: 10 },
    { name: 'テスト商品 C', price: 500, stock: 10 },
    { name: 'テスト商品 D', price: 800, stock: 10 },
    { name: 'テスト商品 E', price: 1000, stock: 10 },
  ]

  for (let i = 0; i < testProducts.length; i++) {
    const p = testProducts[i]
    const slug = `test-product-${i + 1}`
    const sku = `TEST-${String(i + 1).padStart(3, '0')}`

    await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        sku,
        name: p.name,
        slug,
        description: `購入フロー動作確認用のテスト商品です。`,
        price: p.price,
        stock: p.stock,
        productType: 'SINGLE',
        categoryId: defaultCategory.id,
        published: true,
      },
    })
    console.log('Created test product:', p.name)
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
