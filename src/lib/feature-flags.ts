/**
 * 機能フラグ（Feature Flags）
 *
 * テンプレ展開先ごとに「扱う商品タイプ」「グレーディング機能の有無」を env で切り替える。
 * デフォルトは ON。env に `"false"` を明示設定したときだけ OFF になる。
 * → 設定しなければ従来挙動なので、本家 SamuraiCardHub や他のテンプレ展開先には影響なし。
 *
 * OFF 時は、UI から該当項目を完全に非表示にし、API 側でも値を拒否する（保険）。
 *
 * env 例:
 *   NEXT_PUBLIC_ENABLE_BOX="false"      // BOX商品（未開封パック・ボックス）非表示
 *   NEXT_PUBLIC_ENABLE_OTHER="false"    // OTHER カテゴリ非表示
 *   NEXT_PUBLIC_ENABLE_GRADING="false"  // PSA / グレーディング関連 全非表示
 */

const isFalse = (v: string | undefined) => v === "false"

export const features = {
  /** BOX商品（未開封パック・ボックス）の取扱 */
  enableBox: !isFalse(process.env.NEXT_PUBLIC_ENABLE_BOX),
  /** OTHER カテゴリ商品の取扱 */
  enableOther: !isFalse(process.env.NEXT_PUBLIC_ENABLE_OTHER),
  /** グレーディング関連（PSA condition + graded/gradingCompany/grade フィールド + 鑑定品導線）*/
  enableGrading: !isFalse(process.env.NEXT_PUBLIC_ENABLE_GRADING),
}

/**
 * productType 配列から、無効化されているものを除外する
 * @example filterEnabledProductTypes([{code:"SINGLE"},{code:"BOX"}])
 *   → enableBox=false なら [{code:"SINGLE"}]
 */
export function filterEnabledProductTypes<T extends { code: string }>(items: T[]): T[] {
  return items.filter((t) => {
    if (t.code === "BOX" && !features.enableBox) return false
    if (t.code === "OTHER" && !features.enableOther) return false
    return true
  })
}

/**
 * condition 配列から、無効化されているものを除外する
 * PSA は enableGrading フラグで制御
 */
export function filterEnabledConditions<T extends { code: string }>(items: T[]): T[] {
  return items.filter((c) => {
    if (c.code === "PSA" && !features.enableGrading) return false
    return true
  })
}

/**
 * サーバ側ガード：受け取った productType が現在の env で許可されているかをチェック
 * 不正値ならエラーメッセージを返す（null なら OK）
 */
export function validateProductType(productType: string | null | undefined): string | null {
  if (!productType) return null
  if (productType === "BOX" && !features.enableBox) {
    return "BOX商品の登録は現在無効化されています"
  }
  if (productType === "OTHER" && !features.enableOther) {
    return "その他カテゴリの登録は現在無効化されています"
  }
  return null
}

/**
 * サーバ側ガード：受け取った condition と graded 関連が現在の env で許可されているかをチェック
 */
export function validateGradingFields(input: {
  condition?: string | null
  graded?: boolean
  gradingCompany?: string | null
  grade?: string | null
}): string | null {
  if (!features.enableGrading) {
    if (input.condition === "PSA") {
      return "PSA グレーディング商品の登録は現在無効化されています"
    }
    if (input.graded === true) {
      return "グレーディング情報の登録は現在無効化されています"
    }
    if (input.gradingCompany || input.grade) {
      return "グレーディング情報の登録は現在無効化されています"
    }
  }
  return null
}
