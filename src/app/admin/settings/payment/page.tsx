"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentSettingsPage() {
  const [wisePaymentUrl, setWisePaymentUrl] = useState("")
  const [wiseQrImageUrl, setWiseQrImageUrl] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  useEffect(() => {
    fetch("/api/admin/settings/payment")
      .then((r) => r.json())
      .then((data) => {
        setWisePaymentUrl(data.wise_payment_url ?? "")
        setWiseQrImageUrl(data.wise_qr_image_url ?? "")
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setResult(null)
    try {
      const res = await fetch("/api/admin/settings/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wisePaymentUrl: wisePaymentUrl || null,
          wiseQrImageUrl: wiseQrImageUrl || null,
        }),
      })
      if (res.ok) {
        setResult({ success: true, message: "保存しました" })
      } else {
        setResult({ success: false, message: "保存に失敗しました" })
      }
    } catch {
      setResult({ success: false, message: "ネットワークエラーが発生しました" })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/admin/settings" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-1" />
            設定に戻る
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Settings</h1>
          <p className="text-sm text-gray-500 mb-6">
            Wise決済のURLとQRコード画像を管理します。QR画像URLを設定すると、決済ページで自動生成QRの代わりに表示されます。
          </p>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wise Payment URL
                </label>
                <input
                  type="text"
                  value={wisePaymentUrl}
                  onChange={(e) => setWisePaymentUrl(e.target.value)}
                  placeholder="https://wise.com/pay/business/yourshop"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">
                  空の場合はコード内のデフォルトURLを使用します
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  QR Code Image URL
                </label>
                <input
                  type="text"
                  value={wiseQrImageUrl}
                  onChange={(e) => setWiseQrImageUrl(e.target.value)}
                  placeholder="https://res.cloudinary.com/... または https://..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Cloudinaryなどにアップロードした画像のURLを貼り付けてください。空の場合はQRコードを自動生成します
                </p>
              </div>

              {wiseQrImageUrl && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">QRプレビュー</p>
                  <img
                    src={wiseQrImageUrl}
                    alt="QR Code Preview"
                    className="w-[180px] h-[180px] object-contain border rounded"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).style.display = "none"
                    }}
                  />
                </div>
              )}

              {result && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-md text-sm ${
                    result.success
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {result.success ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  {result.message}
                </div>
              )}

              <Button onClick={handleSave} disabled={saving} className="w-full">
                {saving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                保存する
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
