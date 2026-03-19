'use client'

import { useParams } from "next/navigation"
import { Heart, AlertTriangle, Stethoscope } from "lucide-react"
import { useTranslation } from "@/lib/i18n/client"

export default function BreastAwarenessPage() {

const params = useParams() as { lng: string }
const { t } = useTranslation(params.lng, "common")
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-rose-700">
            {t("breast_awareness_title")} 🎀
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("breast_awareness_subtitle")}
          </p>
        </div>

        {/* What is Breast Cancer */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-3">
          <div className="flex items-center gap-2 text-rose-600">
            <Heart className="w-5 h-5" />
            <h2 className="text-xl font-semibold">
              {t("breast_cancer_what")}
            </h2>
          </div>

          <p className="text-gray-600">
            {t("breast_cancer_desc")}
          </p>
        </div>

        {/* Warning Signs */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-3">
          <div className="flex items-center gap-2 text-red-500">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="text-xl font-semibold">
              {t("warning_signs")}
            </h2>
          </div>

          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>{t("warning_1")}</li>
            <li>{t("warning_2")}</li>
            <li>{t("warning_3")}</li>
            <li>{t("warning_4")}</li>
            <li>{t("warning_5")}</li>
          </ul>
        </div>

        {/* Self Examination */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-3">
          <div className="flex items-center gap-2 text-green-600">
            <Stethoscope className="w-5 h-5" />
            <h2 className="text-xl font-semibold">
              {t("self_exam_title")}
            </h2>
          </div>

          <ol className="list-decimal list-inside text-gray-600 space-y-1">
            <li>{t("exam_1")}</li>
            <li>{t("exam_2")}</li>
            <li>{t("exam_3")}</li>
            <li>{t("exam_4")}</li>
            <li>{t("exam_5")}</li>
            <li>{t("exam_6")}</li>
          </ol>
        </div>

        {/* Doctor */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-rose-700">
            {t("consult_doctor")}
          </h2>

          <p className="text-gray-600 mt-2">
            {t("consult_desc")}
          </p>
        </div>

      </div>
    </div>
  )
}
