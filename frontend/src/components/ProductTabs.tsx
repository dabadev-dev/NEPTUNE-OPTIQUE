import { useState } from "react";

interface ProductTabsProps {
  description: string;
  additionalInfo?: {
    label: string;
    value: string;
  }[];
  reviewsCount?: number;
}

export default function ProductTabs({
  description,
  additionalInfo = [],
  reviewsCount = 0,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "description" | "information" | "reviews"
  >("description");

  return (
    <section className="mx-auto max-w-300 px-4 py-12 md:px-6">
      {/* =========================
          LES ONGLETS
      ========================== */}
      <div className="flex flex-wrap gap-8 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab("description")}
          className={`
            relative pb-4 font-serif text-base uppercase
            transition md:text-lg
            ${
              activeTab === "description"
                ? "text-[#263f87]"
                : "text-[#171717] hover:text-[#263f87]"
            }
          `}
        >
          Description

          {activeTab === "description" && (
            <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#263f87]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("information")}
          className={`
            relative pb-4 font-serif text-base uppercase
            transition md:text-lg
            ${
              activeTab === "information"
                ? "text-[#263f87]"
                : "text-[#171717] hover:text-[#263f87]"
            }
          `}
        >
          Informations complémentaires

          {activeTab === "information" && (
            <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#263f87]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={`
            relative pb-4 font-serif text-base uppercase
            transition md:text-lg
            ${
              activeTab === "reviews"
                ? "text-[#263f87]"
                : "text-[#171717] hover:text-[#263f87]"
            }
          `}
        >
          Avis ({reviewsCount})

          {activeTab === "reviews" && (
            <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#263f87]" />
          )}
        </button>
      </div>

      {/* =========================
          CONTENU
      ========================== */}
      <div className="pt-8">
        {/* DESCRIPTION */}
        {activeTab === "description" && (
          <div>
            <p className="max-w-4xl text-base leading-8 text-gray-700">
              {description}
            </p>
          </div>
        )}

        {/* INFORMATIONS */}
        {activeTab === "information" && (
          <div className="max-w-3xl">
            {additionalInfo.length > 0 ? (
              <div className="divide-y divide-gray-200 border border-gray-200">
                {additionalInfo.map((info) => (
                  <div
                    key={info.label}
                    className="grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-2"
                  >
                    <span className="font-medium text-gray-800">
                      {info.label}
                    </span>

                    <span className="text-gray-600">
                      {info.value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-base text-gray-600">
                Aucune information complémentaire disponible.
              </p>
            )}
          </div>
        )}

        {/* AVIS */}
        {activeTab === "reviews" && (
          <div>
            {reviewsCount > 0 ? (
              <div>
                <h3 className="font-serif text-xl">
                  Avis clients
                </h3>

                <p className="mt-3 text-gray-600">
                  Les avis des clients seront affichés ici.
                </p>
              </div>
            ) : (
              <p className="text-base text-gray-600">
                Aucun avis pour le moment.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}