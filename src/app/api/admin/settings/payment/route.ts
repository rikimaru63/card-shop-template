import { NextRequest, NextResponse } from "next/server"
import { isAdminAuthorized } from "@/lib/admin-auth"
import { prisma } from "@/lib/prisma"

const PAYMENT_SETTING_KEYS = ["wise_payment_url", "wise_qr_image_url"]

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const rows = await prisma.siteSetting.findMany({
    where: { key: { in: PAYMENT_SETTING_KEYS } },
  })

  const settings: Record<string, string | null> = {}
  for (const key of PAYMENT_SETTING_KEYS) {
    settings[key] = rows.find((r) => r.key === key)?.value ?? null
  }

  return NextResponse.json(settings)
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { wisePaymentUrl, wiseQrImageUrl } = body as {
    wisePaymentUrl?: string
    wiseQrImageUrl?: string
  }

  await Promise.all([
    prisma.siteSetting.upsert({
      where: { key: "wise_payment_url" },
      update: { value: wisePaymentUrl ?? null },
      create: { key: "wise_payment_url", value: wisePaymentUrl ?? null },
    }),
    prisma.siteSetting.upsert({
      where: { key: "wise_qr_image_url" },
      update: { value: wiseQrImageUrl ?? null },
      create: { key: "wise_qr_image_url", value: wiseQrImageUrl ?? null },
    }),
  ])

  return NextResponse.json({ success: true })
}
