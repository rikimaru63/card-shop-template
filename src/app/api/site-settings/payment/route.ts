import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Next.js のビルド時静的キャッシュを無効化（DBの最新値を毎回読むため）
export const dynamic = "force-dynamic"

const PAYMENT_SETTING_KEYS = ["wise_payment_url", "wise_qr_image_url"]

/** 公開エンドポイント: payment pageがフロントからfetchする */
export async function GET() {
  const rows = await prisma.siteSetting.findMany({
    where: { key: { in: PAYMENT_SETTING_KEYS } },
  })

  const settings: Record<string, string | null> = {}
  for (const key of PAYMENT_SETTING_KEYS) {
    settings[key] = rows.find((r) => r.key === key)?.value ?? null
  }

  return NextResponse.json(settings)
}
