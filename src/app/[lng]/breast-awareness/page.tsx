'use client'

import { Heart, AlertTriangle, Stethoscope } from "lucide-react"

export default function BreastAwarenessPage({
  params,
}: {
  params: { lng: string }
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-rose-700">
            Breast Cancer Awareness 🎀
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Early detection can save lives. Learn the warning signs and practice
            regular self-examination.
          </p>
        </div>

        {/* What is Breast Cancer */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-3">
          <div className="flex items-center gap-2 text-rose-600">
            <Heart className="w-5 h-5" />
            <h2 className="text-xl font-semibold">What is Breast Cancer?</h2>
          </div>
          <p className="text-gray-600">
            Breast cancer occurs when abnormal cells grow uncontrollably in
            breast tissue. It is one of the most common cancers in women,
            but early detection greatly increases the chances of successful treatment.
          </p>
        </div>

        {/* Warning Signs */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-3">
          <div className="flex items-center gap-2 text-red-500">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Warning Signs</h2>
          </div>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Lump in the breast or underarm</li>
            <li>Change in breast size or shape</li>
            <li>Skin dimpling or redness</li>
            <li>Nipple discharge</li>
            <li>Pain in a specific area of the breast</li>
          </ul>
        </div>

        {/* Self Examination */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-3">
          <div className="flex items-center gap-2 text-green-600">
            <Stethoscope className="w-5 h-5" />
            <h2 className="text-xl font-semibold">
              Monthly Self-Examination Steps
            </h2>
          </div>
          <ol className="list-decimal list-inside text-gray-600 space-y-1">
            <li>Stand in front of a mirror with shoulders straight.</li>
            <li>Check for shape, swelling, or skin changes.</li>
            <li>Raise arms and look again.</li>
            <li>Feel breasts using circular motion.</li>
            <li>Check underarm area.</li>
            <li>Repeat once every month after your period cycle.</li>
          </ol>
        </div>

        {/* When to Consult */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-rose-700">
            When to Consult a Doctor
          </h2>
          <p className="text-gray-600 mt-2">
            If you notice any unusual changes, lumps, or persistent pain,
            consult a healthcare professional immediately. Early consultation
            prevents complications and improves recovery chances.
          </p>
        </div>

      </div>
    </div>
  )
}