"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator, CheckCircle, XCircle, ArrowRight, RotateCcw,
  AlertTriangle, Languages, ChevronRight, BookOpen
} from "lucide-react";
import Link from "next/link";

// ===========================
// NCLC CONVERSION TABLES
// ===========================

type TestType = "tcf" | "tef" | "delf-dalf" | "tcf-quebec" | "tefaq" | "none";
type EnglishTestType = "ielts" | "celpip" | "pte-core" | "none";

interface NclcLevels {
  co: number; // Compréhension orale
  ce: number; // Compréhension écrite
  eo: number; // Expression orale
  ee: number; // Expression écrite
}

// TCF Canada: CO & CE sur 699, EO & EE sur 20
function tcfToNclc(co: number, ce: number, eo: number, ee: number): NclcLevels {
  function coToNclc(score: number): number {
    if (score >= 549) return 10;
    if (score >= 523) return 9;
    if (score >= 503) return 8;
    if (score >= 458) return 7;
    if (score >= 398) return 6;
    if (score >= 369) return 5;
    if (score >= 331) return 4;
    return 0;
  }
  function ceToNclc(score: number): number {
    if (score >= 549) return 10;
    if (score >= 524) return 9;
    if (score >= 499) return 8;
    if (score >= 453) return 7;
    if (score >= 406) return 6;
    if (score >= 375) return 5;
    if (score >= 342) return 4;
    return 0;
  }
  function eoEeToNclc(score: number): number {
    if (score >= 16) return 10;
    if (score >= 14) return 9;
    if (score >= 12) return 8;
    if (score >= 10) return 7;
    if (score >= 7) return 6;
    if (score >= 6) return 5;
    if (score >= 4) return 4;
    return 0;
  }
  return { co: coToNclc(co), ce: ceToNclc(ce), eo: eoEeToNclc(eo), ee: eoEeToNclc(ee) };
}

// TCF Quebec: seulement CO et CE, sur 699 (meme bareme que TCF Canada)
function tcfQuebecToNclc(co: number, ce: number): NclcLevels {
  function coToNclc(score: number): number {
    if (score >= 549) return 10;
    if (score >= 523) return 9;
    if (score >= 503) return 8;
    if (score >= 458) return 7;
    if (score >= 398) return 6;
    if (score >= 369) return 5;
    if (score >= 331) return 4;
    return 0;
  }
  function ceToNclc(score: number): number {
    if (score >= 549) return 10;
    if (score >= 524) return 9;
    if (score >= 499) return 8;
    if (score >= 453) return 7;
    if (score >= 406) return 6;
    if (score >= 375) return 5;
    if (score >= 342) return 4;
    return 0;
  }
  // TCF Quebec n'a que CO et CE, EO et EE sont marqués -1 (non évalué)
  return { co: coToNclc(co), ce: ceToNclc(ce), eo: -1, ee: -1 };
}

// TEFAQ (TEF adapte au Quebec): seulement CO (sur 360) et EO (sur 450)
function tefaqToNclc(co: number, eo: number): NclcLevels {
  function coToNclc(score: number): number {
    if (score >= 316) return 10;
    if (score >= 298) return 9;
    if (score >= 280) return 8;
    if (score >= 249) return 7;
    if (score >= 217) return 6;
    if (score >= 181) return 5;
    if (score >= 145) return 4;
    return 0;
  }
  function eoToNclc(score: number): number {
    if (score >= 393) return 10;
    if (score >= 371) return 9;
    if (score >= 349) return 8;
    if (score >= 310) return 7;
    if (score >= 271) return 6;
    if (score >= 226) return 5;
    if (score >= 181) return 4;
    return 0;
  }
  return { co: coToNclc(co), ce: -1, eo: eoToNclc(eo), ee: -1 };
}

// TEF Canada: CO sur 360, CE sur 300, EO & EE sur 450
function tefToNclc(co: number, ce: number, eo: number, ee: number): NclcLevels {
  function coToNclc(score: number): number {
    if (score >= 316) return 10;
    if (score >= 298) return 9;
    if (score >= 280) return 8;
    if (score >= 249) return 7;
    if (score >= 217) return 6;
    if (score >= 181) return 5;
    if (score >= 145) return 4;
    return 0;
  }
  function ceToNclc(score: number): number {
    if (score >= 263) return 10;
    if (score >= 248) return 9;
    if (score >= 233) return 8;
    if (score >= 207) return 7;
    if (score >= 181) return 6;
    if (score >= 151) return 5;
    if (score >= 121) return 4;
    return 0;
  }
  function eoEeToNclc(score: number): number {
    if (score >= 393) return 10;
    if (score >= 371) return 9;
    if (score >= 349) return 8;
    if (score >= 310) return 7;
    if (score >= 271) return 6;
    if (score >= 226) return 5;
    if (score >= 181) return 4;
    return 0;
  }
  return { co: coToNclc(co), ce: ceToNclc(ce), eo: eoEeToNclc(eo), ee: eoEeToNclc(ee) };
}

// DELF/DALF: chaque section sur 25
function delfDalfToNclc(level: string, co: number, ce: number, eo: number, ee: number): NclcLevels {
  // Base NCLC par niveau de diplôme
  const baseNclc: Record<string, number> = {
    "delf-b1": 5, "delf-b2": 7, "dalf-c1": 9, "dalf-c2": 11,
  };
  const base = baseNclc[level] || 0;
  // Ajuster +1 si la note de la section est >= 20/25
  function adjust(score: number): number {
    if (score >= 20) return Math.min(base + 1, 12);
    if (score >= 10) return base;
    return Math.max(base - 2, 0);
  }
  return { co: adjust(co), ce: adjust(ce), eo: adjust(eo), ee: adjust(ee) };
}

// IELTS General Training → CLB
function ieltsToClb(listening: number, reading: number, writing: number, speaking: number): NclcLevels {
  function lToClb(s: number): number {
    if (s >= 8.5) return 10;
    if (s >= 8.0) return 9;
    if (s >= 7.5) return 8;
    if (s >= 6.0) return 7;
    if (s >= 5.5) return 6;
    if (s >= 5.0) return 5;
    if (s >= 4.5) return 4;
    return 0;
  }
  function rToClb(s: number): number {
    if (s >= 8.0) return 10;
    if (s >= 7.0) return 9;
    if (s >= 6.5) return 8;
    if (s >= 6.0) return 7;
    if (s >= 5.0) return 6;
    if (s >= 4.0) return 5;
    if (s >= 3.5) return 4;
    return 0;
  }
  function wToClb(s: number): number {
    if (s >= 7.5) return 10;
    if (s >= 7.0) return 9;
    if (s >= 6.5) return 8;
    if (s >= 6.0) return 7;
    if (s >= 5.5) return 6;
    if (s >= 5.0) return 5;
    if (s >= 4.0) return 4;
    return 0;
  }
  function sToClb(s: number): number {
    if (s >= 7.5) return 10;
    if (s >= 7.0) return 9;
    if (s >= 6.5) return 8;
    if (s >= 6.0) return 7;
    if (s >= 5.5) return 6;
    if (s >= 5.0) return 5;
    if (s >= 4.0) return 4;
    return 0;
  }
  return { co: lToClb(listening), ce: rToClb(reading), eo: sToClb(speaking), ee: wToClb(writing) };
}

// CELPIP General → CLB (score = CLB directement)
function celpipToClb(listening: number, reading: number, writing: number, speaking: number): NclcLevels {
  return { co: listening, ce: reading, eo: speaking, ee: writing };
}

// PTE Core → CLB
function pteToClb(listening: number, reading: number, writing: number, speaking: number): NclcLevels {
  function toClb(score: number): number {
    if (score >= 89) return 10;
    if (score >= 82) return 9;
    if (score >= 71) return 8;
    if (score >= 60) return 7;
    if (score >= 50) return 6;
    if (score >= 39) return 5;
    if (score >= 28) return 4;
    return 0;
  }
  return { co: toClb(listening), ce: toClb(reading), eo: toClb(speaking), ee: toClb(writing) };
}

// ===========================
// NCLC LEVEL BADGE COMPONENT
// ===========================
function NclcBadge({ label, level, minRequired }: { label: string; level: number; minRequired: number }) {
  const isOk = level >= minRequired;
  return (
    <div className={`flex items-center justify-between p-3 rounded-xl border ${isOk ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`text-lg font-bold ${isOk ? "text-green-600" : "text-red-600"}`}>NCLC {level}</span>
        {isOk ? <CheckCircle size={18} className="text-green-500" /> : <XCircle size={18} className="text-red-500" />}
      </div>
    </div>
  );
}

function ClbBadge({ label, level }: { label: string; level: number }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl border bg-blue-50 border-blue-200">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="text-lg font-bold text-blue-600">CLB {level}</span>
    </div>
  );
}

// ===========================
// LANGUAGE TEST STEP COMPONENT
// ===========================
function FrenchTestStep({
  onComplete,
  onNoTest,
  minNclc,
  color,
  forQuebec = false,
}: {
  onComplete: (nclc: NclcLevels) => void;
  onNoTest: () => void;
  minNclc: number;
  color: "red" | "blue";
  forQuebec?: boolean;
}) {
  const [hasTest, setHasTest] = useState<"" | "oui" | "non">("");
  const [testType, setTestType] = useState<TestType>(forQuebec ? "tcf-quebec" : "tcf");
  const [delfLevel, setDelfLevel] = useState("delf-b2");
  // TCF scores
  const [tcfCO, setTcfCO] = useState("");
  const [tcfCE, setTcfCE] = useState("");
  const [tcfEO, setTcfEO] = useState("");
  const [tcfEE, setTcfEE] = useState("");
  // TEF scores
  const [tefCO, setTefCO] = useState("");
  const [tefCE, setTefCE] = useState("");
  const [tefEO, setTefEO] = useState("");
  const [tefEE, setTefEE] = useState("");
  // TCF Quebec scores (only CO and CE)
  const [tcfQcCO, setTcfQcCO] = useState("");
  const [tcfQcCE, setTcfQcCE] = useState("");
  // TEFAQ scores (only CO and EO)
  const [tefaqCO, setTefaqCO] = useState("");
  const [tefaqEO, setTefaqEO] = useState("");
  // DELF/DALF scores
  const [delfCO, setDelfCO] = useState("");
  const [delfCE, setDelfCE] = useState("");
  const [delfEO, setDelfEO] = useState("");
  const [delfEE, setDelfEE] = useState("");

  const [showResult, setShowResult] = useState(false);
  const [nclcResult, setNclcResult] = useState<NclcLevels | null>(null);

  const selectClass = color === "red"
    ? "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition bg-white text-sm"
    : "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition bg-white text-sm";
  const inputClass = color === "red"
    ? "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition bg-white text-sm"
    : "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition bg-white text-sm";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  const calculateNclc = () => {
    let result: NclcLevels;
    if (testType === "tcf") {
      result = tcfToNclc(
        parseInt(tcfCO) || 0, parseInt(tcfCE) || 0,
        parseInt(tcfEO) || 0, parseInt(tcfEE) || 0
      );
    } else if (testType === "tcf-quebec") {
      result = tcfQuebecToNclc(
        parseInt(tcfQcCO) || 0, parseInt(tcfQcCE) || 0
      );
    } else if (testType === "tefaq") {
      result = tefaqToNclc(
        parseInt(tefaqCO) || 0, parseInt(tefaqEO) || 0
      );
    } else if (testType === "tef") {
      result = tefToNclc(
        parseInt(tefCO) || 0, parseInt(tefCE) || 0,
        parseInt(tefEO) || 0, parseInt(tefEE) || 0
      );
    } else {
      result = delfDalfToNclc(
        delfLevel,
        parseInt(delfCO) || 0, parseInt(delfCE) || 0,
        parseInt(delfEO) || 0, parseInt(delfEE) || 0
      );
    }
    setNclcResult(result);
    setShowResult(true);
  };

  const allFieldsFilled = useMemo(() => {
    if (testType === "tcf") return tcfCO && tcfCE && tcfEO && tcfEE;
    if (testType === "tcf-quebec") return tcfQcCO && tcfQcCE;
    if (testType === "tefaq") return tefaqCO && tefaqEO;
    if (testType === "tef") return tefCO && tefCE && tefEO && tefEE;
    return delfCO && delfCE && delfEO && delfEE;
  }, [testType, tcfCO, tcfCE, tcfEO, tcfEE, tcfQcCO, tcfQcCE, tefaqCO, tefaqEO, tefCO, tefCE, tefEO, tefEE, delfCO, delfCE, delfEO, delfEE]);

  const isPartialTest = testType === "tcf-quebec" || testType === "tefaq";
  const isAdmissible = nclcResult
    ? isPartialTest
      ? (nclcResult.co < 0 || nclcResult.co >= minNclc) &&
        (nclcResult.ce < 0 || nclcResult.ce >= minNclc) &&
        (nclcResult.eo < 0 || nclcResult.eo >= minNclc) &&
        (nclcResult.ee < 0 || nclcResult.ee >= minNclc)
      : nclcResult.co >= minNclc && nclcResult.ce >= minNclc && nclcResult.eo >= minNclc && nclcResult.ee >= minNclc
    : false;

  if (hasTest === "") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${color === "red" ? "bg-red-50" : "bg-blue-50"}`}>
          <Languages size={40} className={color === "red" ? "text-red-600" : "text-blue-800"} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Test de langue francaise</h3>
        <p className="text-gray-500 mb-8">Avez-vous deja passe un test de langue francaise officiel ?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <button
            onClick={() => setHasTest("oui")}
            className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 border-2 ${
              color === "red"
                ? "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                : "border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white"
            }`}
          >
            Oui, j&apos;ai un test
          </button>
          <button
            onClick={() => { setHasTest("non"); onNoTest(); }}
            className="flex-1 py-4 px-6 rounded-xl font-bold text-lg border-2 border-gray-300 text-gray-500 hover:bg-gray-100 transition-all duration-300"
          >
            Non, pas encore
          </button>
        </div>
      </motion.div>
    );
  }

  if (showResult && nclcResult) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen size={22} className={color === "red" ? "text-red-600" : "text-blue-800"} />
          Vos niveaux NCLC
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <NclcBadge label="Comprehension orale" level={nclcResult.co} minRequired={minNclc} />
          <NclcBadge label="Comprehension ecrite" level={nclcResult.ce} minRequired={minNclc} />
          {nclcResult.eo >= 0 && <NclcBadge label="Expression orale" level={nclcResult.eo} minRequired={minNclc} />}
          {nclcResult.ee >= 0 && <NclcBadge label="Expression ecrite" level={nclcResult.ee} minRequired={minNclc} />}
        </div>
        {isPartialTest && (
          <p className="text-xs text-blue-600 mb-4 italic">
            {testType === "tcf-quebec"
              ? "Le TCF Quebec ne comporte que 2 epreuves : Comprehension orale et Comprehension ecrite."
              : "Le TEFAQ ne comporte que 2 epreuves : Comprehension orale et Expression orale."}
          </p>
        )}

        {isAdmissible ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-green-700">
                  {isPartialTest
                    ? `Vos 2 competences sont au minimum NCLC ${minNclc}`
                    : `Tous vos niveaux sont au minimum NCLC ${minNclc}`}
                </h4>
                <p className="text-sm text-green-600 mt-1">
                  Votre test de langue est admissible. Continuons avec le reste du formulaire.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <XCircle size={24} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-700">
                  Dossier non admissible - Niveau NCLC insuffisant
                </h4>
                <p className="text-sm text-red-600 mt-1">
                  Le niveau minimum requis est NCLC {minNclc} dans {isPartialTest ? "les 2 competences" : "les 4 competences"}.
                  Au moins une de vos notes est en dessous du seuil.
                  Vous devez ameliorer votre niveau de francais avant de soumettre votre dossier.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          {isAdmissible ? (
            <button
              onClick={() => onComplete(nclcResult)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white transition-all ${
                color === "red" ? "bg-red-600 hover:bg-red-700" : "bg-blue-800 hover:bg-blue-900"
              }`}
            >
              Continuer le simulateur <ChevronRight size={18} />
            </button>
          ) : (
            <Link
              href="/contact"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-all"
            >
              Contactez-nous pour un accompagnement <ArrowRight size={18} />
            </Link>
          )}
          <button
            onClick={() => { setShowResult(false); setNclcResult(null); }}
            className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold border-2 border-gray-300 text-gray-600 hover:bg-gray-50 transition-all"
          >
            <RotateCcw size={16} /> Modifier mes notes
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <label className={labelClass}>Type de test de francais *</label>
        <select
          value={testType}
          onChange={(e) => setTestType(e.target.value as TestType)}
          className={selectClass}
        >
          {forQuebec && <option value="tcf-quebec">TCF Quebec (2 epreuves : CO + CE)</option>}
          {forQuebec && <option value="tefaq">TEFAQ (2 epreuves : CO + EO)</option>}
          <option value="tcf">TCF Canada (4 epreuves)</option>
          <option value="tef">TEF Canada (4 epreuves)</option>
          <option value="delf-dalf">DELF / DALF</option>
        </select>
      </div>

      {testType === "delf-dalf" && (
        <div>
          <label className={labelClass}>Niveau du diplome *</label>
          <select value={delfLevel} onChange={(e) => setDelfLevel(e.target.value)} className={selectClass}>
            <option value="delf-b1">DELF B1</option>
            <option value="delf-b2">DELF B2</option>
            <option value="dalf-c1">DALF C1</option>
            <option value="dalf-c2">DALF C2</option>
          </select>
        </div>
      )}

      <div className={`p-4 rounded-xl text-sm ${color === "red" ? "bg-red-50 border border-red-200 text-red-700" : "bg-blue-50 border border-blue-200 text-blue-700"}`}>
        <p className="font-semibold mb-1">
          {testType === "tcf" && "TCF Canada - Entrez vos notes pour chaque competence"}
          {testType === "tcf-quebec" && "TCF Quebec - Entrez vos notes (2 epreuves uniquement)"}
          {testType === "tefaq" && "TEFAQ - Entrez vos notes (2 epreuves uniquement)"}
          {testType === "tef" && "TEF Canada - Entrez vos notes pour chaque competence"}
          {testType === "delf-dalf" && "DELF/DALF - Entrez vos notes pour chaque competence (sur 25)"}
        </p>
        <p className="text-xs opacity-80">
          {testType === "tcf" && "Comprehension orale & ecrite : sur 699 | Expression orale & ecrite : sur 20"}
          {testType === "tcf-quebec" && "Comprehension orale : sur 699 | Comprehension ecrite : sur 699"}
          {testType === "tefaq" && "Comprehension orale : sur 360 | Expression orale : sur 450"}
          {testType === "tef" && "Comprehension orale : sur 360 | Comprehension ecrite : sur 300 | Expression orale & ecrite : sur 450"}
          {testType === "delf-dalf" && "Chaque section est notee sur 25 points"}
        </p>
      </div>

      {testType === "tcf" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Comprehension orale (sur 699) *</label>
            <input type="number" min="0" max="699" placeholder="ex: 458" value={tcfCO} onChange={(e) => setTcfCO(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Comprehension ecrite (sur 699) *</label>
            <input type="number" min="0" max="699" placeholder="ex: 453" value={tcfCE} onChange={(e) => setTcfCE(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Expression orale (sur 20) *</label>
            <input type="number" min="0" max="20" placeholder="ex: 12" value={tcfEO} onChange={(e) => setTcfEO(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Expression ecrite (sur 20) *</label>
            <input type="number" min="0" max="20" placeholder="ex: 10" value={tcfEE} onChange={(e) => setTcfEE(e.target.value)} className={inputClass} />
          </div>
        </div>
      )}

      {testType === "tcf-quebec" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Comprehension orale (sur 699) *</label>
            <input type="number" min="0" max="699" placeholder="ex: 458" value={tcfQcCO} onChange={(e) => setTcfQcCO(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Comprehension ecrite (sur 699) *</label>
            <input type="number" min="0" max="699" placeholder="ex: 453" value={tcfQcCE} onChange={(e) => setTcfQcCE(e.target.value)} className={inputClass} />
          </div>
        </div>
      )}

      {testType === "tefaq" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Comprehension orale (sur 360) *</label>
            <input type="number" min="0" max="360" placeholder="ex: 249" value={tefaqCO} onChange={(e) => setTefaqCO(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Expression orale (sur 450) *</label>
            <input type="number" min="0" max="450" placeholder="ex: 310" value={tefaqEO} onChange={(e) => setTefaqEO(e.target.value)} className={inputClass} />
          </div>
        </div>
      )}

      {testType === "tef" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Comprehension orale (sur 360) *</label>
            <input type="number" min="0" max="360" placeholder="ex: 249" value={tefCO} onChange={(e) => setTefCO(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Comprehension ecrite (sur 300) *</label>
            <input type="number" min="0" max="300" placeholder="ex: 207" value={tefCE} onChange={(e) => setTefCE(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Expression orale (sur 450) *</label>
            <input type="number" min="0" max="450" placeholder="ex: 310" value={tefEO} onChange={(e) => setTefEO(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Expression ecrite (sur 450) *</label>
            <input type="number" min="0" max="450" placeholder="ex: 310" value={tefEE} onChange={(e) => setTefEE(e.target.value)} className={inputClass} />
          </div>
        </div>
      )}

      {testType === "delf-dalf" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Comprehension orale (sur 25) *</label>
            <input type="number" min="0" max="25" placeholder="ex: 18" value={delfCO} onChange={(e) => setDelfCO(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Comprehension ecrite (sur 25) *</label>
            <input type="number" min="0" max="25" placeholder="ex: 15" value={delfCE} onChange={(e) => setDelfCE(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Expression orale (sur 25) *</label>
            <input type="number" min="0" max="25" placeholder="ex: 17" value={delfEO} onChange={(e) => setDelfEO(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Expression ecrite (sur 25) *</label>
            <input type="number" min="0" max="25" placeholder="ex: 14" value={delfEE} onChange={(e) => setDelfEE(e.target.value)} className={inputClass} />
          </div>
        </div>
      )}

      <button
        onClick={calculateNclc}
        disabled={!allFieldsFilled}
        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg ${
          allFieldsFilled
            ? color === "red"
              ? "bg-gradient-to-r from-red-600 to-red-500 text-white hover:shadow-xl"
              : "bg-gradient-to-r from-blue-900 to-blue-700 text-white hover:shadow-xl"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        <Calculator size={22} /> Voir mon niveau NCLC
      </button>
    </motion.div>
  );
}

// ===========================
// ENGLISH TEST STEP (for Express Entry)
// ===========================
function EnglishTestStep({
  onComplete,
}: {
  onComplete: (clb: NclcLevels | null) => void;
}) {
  const [hasTest, setHasTest] = useState<"" | "oui" | "non">("");
  const [testType, setTestType] = useState<EnglishTestType>("ielts");
  const [ieltsL, setIeltsL] = useState("");
  const [ieltsR, setIeltsR] = useState("");
  const [ieltsW, setIeltsW] = useState("");
  const [ieltsS, setIeltsS] = useState("");
  const [celpipL, setCelpipL] = useState("");
  const [celpipR, setCelpipR] = useState("");
  const [celpipW, setCelpipW] = useState("");
  const [celpipS, setCelpipS] = useState("");
  const [pteL, setPteL] = useState("");
  const [pteR, setPteR] = useState("");
  const [pteW, setPteW] = useState("");
  const [pteS, setPteS] = useState("");
  const [clbResult, setClbResult] = useState<NclcLevels | null>(null);
  const [showResult, setShowResult] = useState(false);

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition bg-white text-sm";
  const selectClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition bg-white text-sm";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  const allFieldsFilled = useMemo(() => {
    if (testType === "ielts") return ieltsL && ieltsR && ieltsW && ieltsS;
    if (testType === "pte-core") return pteL && pteR && pteW && pteS;
    return celpipL && celpipR && celpipW && celpipS;
  }, [testType, ieltsL, ieltsR, ieltsW, ieltsS, celpipL, celpipR, celpipW, celpipS, pteL, pteR, pteW, pteS]);

  const calculate = () => {
    let result: NclcLevels;
    if (testType === "ielts") {
      result = ieltsToClb(
        parseFloat(ieltsL) || 0, parseFloat(ieltsR) || 0,
        parseFloat(ieltsW) || 0, parseFloat(ieltsS) || 0
      );
    } else if (testType === "pte-core") {
      result = pteToClb(
        parseInt(pteL) || 0, parseInt(pteR) || 0,
        parseInt(pteW) || 0, parseInt(pteS) || 0
      );
    } else {
      result = celpipToClb(
        parseInt(celpipL) || 0, parseInt(celpipR) || 0,
        parseInt(celpipW) || 0, parseInt(celpipS) || 0
      );
    }
    setClbResult(result);
    setShowResult(true);
  };

  if (hasTest === "") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Test d&apos;anglais (optionnel)</h3>
        <p className="text-gray-500 mb-6 text-sm">Avez-vous un test d&apos;anglais (IELTS, CELPIP ou PTE Core) ?</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <button onClick={() => setHasTest("oui")} className="flex-1 py-3 px-6 rounded-xl font-bold border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all">
            Oui
          </button>
          <button onClick={() => { setHasTest("non"); onComplete(null); }} className="flex-1 py-3 px-6 rounded-xl font-bold border-2 border-gray-300 text-gray-500 hover:bg-gray-100 transition-all">
            Non
          </button>
        </div>
      </motion.div>
    );
  }

  if (showResult && clbResult) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-4">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Vos niveaux CLB (anglais)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <ClbBadge label="Listening" level={clbResult.co} />
          <ClbBadge label="Reading" level={clbResult.ce} />
          <ClbBadge label="Speaking" level={clbResult.eo} />
          <ClbBadge label="Writing" level={clbResult.ee} />
        </div>
        <button
          onClick={() => onComplete(clbResult)}
          className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-all"
        >
          Continuer <ChevronRight size={18} />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div>
        <label className={labelClass}>Type de test d&apos;anglais</label>
        <select value={testType} onChange={(e) => setTestType(e.target.value as EnglishTestType)} className={selectClass}>
          <option value="ielts">IELTS General Training</option>
          <option value="celpip">CELPIP General</option>
          <option value="pte-core">PTE Core (Pearson)</option>
        </select>
      </div>

      {testType === "ielts" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Listening (0-9)</label>
            <input type="number" min="0" max="9" step="0.5" placeholder="ex: 6.5" value={ieltsL} onChange={(e) => setIeltsL(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Reading (0-9)</label>
            <input type="number" min="0" max="9" step="0.5" placeholder="ex: 6.0" value={ieltsR} onChange={(e) => setIeltsR(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Writing (0-9)</label>
            <input type="number" min="0" max="9" step="0.5" placeholder="ex: 6.0" value={ieltsW} onChange={(e) => setIeltsW(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Speaking (0-9)</label>
            <input type="number" min="0" max="9" step="0.5" placeholder="ex: 6.0" value={ieltsS} onChange={(e) => setIeltsS(e.target.value)} className={inputClass} />
          </div>
        </div>
      )}

      {testType === "celpip" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Listening (1-12)</label>
            <input type="number" min="1" max="12" placeholder="ex: 7" value={celpipL} onChange={(e) => setCelpipL(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Reading (1-12)</label>
            <input type="number" min="1" max="12" placeholder="ex: 7" value={celpipR} onChange={(e) => setCelpipR(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Writing (1-12)</label>
            <input type="number" min="1" max="12" placeholder="ex: 7" value={celpipW} onChange={(e) => setCelpipW(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Speaking (1-12)</label>
            <input type="number" min="1" max="12" placeholder="ex: 7" value={celpipS} onChange={(e) => setCelpipS(e.target.value)} className={inputClass} />
          </div>
        </div>
      )}

      {testType === "pte-core" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Listening (10-90)</label>
            <input type="number" min="10" max="90" placeholder="ex: 60" value={pteL} onChange={(e) => setPteL(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Reading (10-90)</label>
            <input type="number" min="10" max="90" placeholder="ex: 60" value={pteR} onChange={(e) => setPteR(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Writing (10-90)</label>
            <input type="number" min="10" max="90" placeholder="ex: 60" value={pteW} onChange={(e) => setPteW(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Speaking (10-90)</label>
            <input type="number" min="10" max="90" placeholder="ex: 60" value={pteS} onChange={(e) => setPteS(e.target.value)} className={inputClass} />
          </div>
        </div>
      )}

      <button
        onClick={calculate}
        disabled={!allFieldsFilled}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
          allFieldsFilled ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Voir mon niveau CLB
      </button>
    </motion.div>
  );
}

// ===========================
// CRS CALCULATION (uses NCLC levels now)
// ===========================
interface CRSResult {
  score: number;
  frenchBonus: number;
  bilingualBonus: number;
}

function calculateCRS(data: Record<string, string>, frenchNclc: NclcLevels, englishClb: NclcLevels | null): CRSResult {
  let score = 0;
  let frenchBonus = 0;
  let bilingualBonus = 0;

  // Age
  const age = parseInt(data.age) || 0;
  const isSingle = data.married === "non";
  const agePointsSingle: Record<number, number> = {
    17: 0, 18: 99, 19: 105, 20: 110, 21: 110, 22: 110, 23: 110, 24: 110,
    25: 110, 26: 110, 27: 110, 28: 110, 29: 110, 30: 105, 31: 99, 32: 94,
    33: 88, 34: 83, 35: 77, 36: 72, 37: 66, 38: 61, 39: 55, 40: 50,
    41: 39, 42: 28, 43: 17, 44: 6, 45: 0,
  };
  const agePointsMarried: Record<number, number> = {
    17: 0, 18: 90, 19: 95, 20: 100, 21: 100, 22: 100, 23: 100, 24: 100,
    25: 100, 26: 100, 27: 100, 28: 100, 29: 100, 30: 95, 31: 90, 32: 85,
    33: 80, 34: 75, 35: 70, 36: 65, 37: 60, 38: 55, 39: 50, 40: 45,
    41: 35, 42: 25, 43: 15, 44: 5, 45: 0,
  };
  score += (isSingle ? agePointsSingle : agePointsMarried)[age] || 0;

  // Education
  const eduPoints: Record<string, number[]> = {
    secondaire: [30, 28], "post-secondaire-1an": [90, 84],
    "post-secondaire-2ans": [98, 91], licence: [120, 112],
    "master-pro": [128, 119], master: [135, 126], doctorat: [150, 140],
  };
  const eduIdx = isSingle ? 0 : 1;
  score += (eduPoints[data.education] || [0, 0])[eduIdx];

  // First language (French) - use minimum NCLC across 4 competencies for per-competency points
  const frenchLevels = [frenchNclc.co, frenchNclc.ce, frenchNclc.eo, frenchNclc.ee];
  const langPointsSingle: Record<number, number> = { 0: 0, 4: 6, 5: 6, 6: 9, 7: 17, 8: 23, 9: 31, 10: 34 };
  const langPointsMarried: Record<number, number> = { 0: 0, 4: 6, 5: 6, 6: 8, 7: 16, 8: 22, 9: 29, 10: 32 };
  for (const level of frenchLevels) {
    const capped = Math.min(level, 10);
    score += (isSingle ? langPointsSingle : langPointsMarried)[capped] || 0;
  }

  // Second language (English) if available
  if (englishClb) {
    const engLevels = [englishClb.co, englishClb.ce, englishClb.eo, englishClb.ee];
    const lang2Points: Record<number, number> = { 0: 0, 4: 0, 5: 1, 6: 1, 7: 3, 8: 3, 9: 6, 10: 6 };
    for (const level of engLevels) {
      score += lang2Points[Math.min(level, 10)] || 0;
    }
  }

  // Work experience in Canada
  const canadaExp = parseInt(data.canadaExperience) || 0;
  const canadaExpPoints: Record<number, number[]> = {
    0: [0, 0], 1: [40, 35], 2: [53, 46], 3: [64, 56], 4: [72, 63], 5: [80, 70],
  };
  score += (canadaExpPoints[Math.min(canadaExp, 5)] || [0, 0])[eduIdx];

  // Foreign work experience
  const foreignExp = parseInt(data.foreignExperience) || 0;
  const foreignExpPoints: Record<number, number> = { 0: 0, 1: 25, 2: 50, 3: 50 };
  score += foreignExpPoints[Math.min(foreignExp, 3)] || 50;

  // Additional factors
  if (data.jobOffer === "oui") score += 200;
  if (data.jobOffer === "teer0") score += 50;
  if (data.provincialNomination === "oui") score += 600;
  if (data.canadianEducation === "oui-1-2") score += 15;
  if (data.canadianEducation === "oui-3+") score += 30;
  if (data.siblingCanada === "oui") score += 15;

  // French language bonus (+25 if NCLC 7+ in all 4 French competencies)
  const minFrench = Math.min(...frenchLevels);
  if (minFrench >= 7) {
    frenchBonus = 25;
    score += 25;
  }

  // Bilingual bonus (+25 additional if French NCLC 7+ AND English CLB 5+)
  if (minFrench >= 7 && englishClb) {
    const minEng = Math.min(englishClb.co, englishClb.ce, englishClb.eo, englishClb.ee);
    if (minEng >= 5) {
      bilingualBonus = 25;
      score += 25;
    }
  }

  return { score: Math.min(score, 1200), frenchBonus, bilingualBonus };
}

// ===========================
// EXPRESS ENTRY SIMULATOR
// ===========================
function ExpressEntrySimulator() {
  const [step, setStep] = useState<"french" | "english" | "form" | "result" | "no-test">("french");
  const [frenchNclc, setFrenchNclc] = useState<NclcLevels | null>(null);
  const [englishClb, setEnglishClb] = useState<NclcLevels | null>(null);
  const [data, setData] = useState<Record<string, string>>({
    age: "", married: "non", education: "",
    canadaExperience: "0", foreignExperience: "0", jobOffer: "non",
    provincialNomination: "non", canadianEducation: "non", siblingCanada: "non",
  });
  const [result, setResult] = useState<{ score: number; eligible: boolean; frenchBonus: number; bilingualBonus: number } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!frenchNclc) return;
    const crs = calculateCRS(data, frenchNclc, englishClb);
    setResult({ score: crs.score, eligible: crs.score >= 450, frenchBonus: crs.frenchBonus, bilingualBonus: crs.bilingualBonus });
    setStep("result");
  };

  const resetAll = () => {
    setStep("french");
    setFrenchNclc(null);
    setEnglishClb(null);
    setResult(null);
    setData({
      age: "", married: "non", education: "",
      canadaExperience: "0", foreignExperience: "0", jobOffer: "non",
      provincialNomination: "non", canadianEducation: "non", siblingCanada: "non",
    });
  };

  const selectClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition bg-white text-sm";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  // Step: No test
  if (step === "no-test") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
        <div className="w-24 h-24 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-6">
          <AlertTriangle size={48} className="text-orange-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Test de langue requis</h3>
        <p className="text-gray-600 mb-2">
          Pour soumettre une demande d&apos;Entree Express, vous devez obligatoirement avoir passe
          un test de langue francaise officiel (TCF Canada, TEF Canada ou DELF/DALF).
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Le niveau minimum requis est NCLC 7 dans les 4 competences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/services#cours-tcf-tef" className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-all">
            Nos cours de preparation TCF/TEF <ArrowRight size={18} />
          </Link>
          <button onClick={resetAll} className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all">
            <RotateCcw size={18} /> Recommencer
          </button>
        </div>
      </motion.div>
    );
  }

  // Step: French test
  if (step === "french") {
    return (
      <FrenchTestStep
        minNclc={7}
        color="red"
        onNoTest={() => setStep("no-test")}
        onComplete={(nclc) => {
          setFrenchNclc(nclc);
          setStep("english");
        }}
      />
    );
  }

  // Step: English test
  if (step === "english") {
    return (
      <EnglishTestStep
        onComplete={(clb) => {
          setEnglishClb(clb);
          setStep("form");
        }}
      />
    );
  }

  // Step: Result
  if (step === "result" && result) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
        <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6 ${result.eligible ? "bg-green-100" : "bg-red-100"}`}>
          {result.eligible ? <CheckCircle size={64} className="text-green-600" /> : <XCircle size={64} className="text-red-600" />}
        </div>
        <h3 className="text-5xl font-extrabold mb-2">
          <span className={result.eligible ? "text-green-600" : "text-red-600"}>{result.score}</span>
          <span className="text-gray-400 text-2xl"> / 1200</span>
        </h3>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-4 max-w-md mx-auto overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${(result.score / 1200) * 100}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className={`h-full rounded-full ${result.eligible ? "bg-gradient-to-r from-green-500 to-green-400" : "bg-gradient-to-r from-red-500 to-red-400"}`} />
        </div>
        <p className="text-gray-500 text-sm mt-2">Seuil approximatif d&apos;invitation : ~450 points</p>

        {/* NCLC recap */}
        {frenchNclc && (
          <div className="mt-6 text-left max-w-md mx-auto">
            <p className="text-sm font-semibold text-gray-700 mb-2">Vos niveaux NCLC (francais) :</p>
            <div className="grid grid-cols-2 gap-2">
              <NclcBadge label="CO" level={frenchNclc.co} minRequired={7} />
              <NclcBadge label="CE" level={frenchNclc.ce} minRequired={7} />
              <NclcBadge label="EO" level={frenchNclc.eo} minRequired={7} />
              <NclcBadge label="EE" level={frenchNclc.ee} minRequired={7} />
            </div>
          </div>
        )}

        {/* Language bonus display */}
        {(result.frenchBonus > 0 || result.bilingualBonus > 0) && (
          <div className="mt-6 max-w-md mx-auto">
            <p className="text-sm font-semibold text-gray-700 mb-2 text-left">Bonus langue :</p>
            <div className="space-y-2">
              {result.frenchBonus > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-blue-600" />
                    <span className="text-sm text-blue-800">Bonus francais (NCLC 7+ dans les 4 competences)</span>
                  </div>
                  <span className="font-bold text-blue-700">+25 pts</span>
                </motion.div>
              )}
              {result.bilingualBonus > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-between bg-purple-50 border border-purple-200 rounded-xl px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-purple-600" />
                    <span className="text-sm text-purple-800">Bonus bilingue (francais NCLC 7+ et anglais CLB 5+)</span>
                  </div>
                  <span className="font-bold text-purple-700">+25 pts</span>
                </motion.div>
              )}
              <p className="text-xs text-gray-500 text-right">
                Total bonus : +{result.frenchBonus + result.bilingualBonus} points inclus dans votre score
              </p>
            </div>
          </div>
        )}

        <div className={`mt-6 p-6 rounded-2xl ${result.eligible ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
          <h4 className={`text-xl font-bold ${result.eligible ? "text-green-700" : "text-red-700"}`}>
            {result.eligible ? "Felicitations ! Votre profil est potentiellement admissible" : "Votre score est en dessous du seuil typique"}
          </h4>
          <p className={`mt-2 text-sm ${result.eligible ? "text-green-600" : "text-red-600"}`}>
            {result.eligible
              ? "Avec ce score, vous avez de bonnes chances de recevoir une invitation a presenter une demande de residence permanente."
              : "Ne vous decouragez pas ! Il existe des strategies pour ameliorer votre score. Contactez-nous pour un accompagnement personnalise."}
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-all">
            Consultation gratuite <ArrowRight size={18} />
          </Link>
          <button onClick={resetAll} className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all">
            <RotateCcw size={18} /> Recommencer
          </button>
        </div>
      </motion.div>
    );
  }

  // Step: Rest of the form
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Recap badges */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
        <p className="text-sm font-semibold text-green-700 flex items-center gap-2">
          <CheckCircle size={16} /> Test de langue valide - NCLC {frenchNclc ? Math.min(frenchNclc.co, frenchNclc.ce, frenchNclc.eo, frenchNclc.ee) : 0}+ dans toutes les competences
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Age *</label>
            <select name="age" value={data.age} onChange={handleChange} required className={selectClass}>
              <option value="">Selectionnez votre age</option>
              {Array.from({ length: 30 }, (_, i) => i + 17).map((a) => (
                <option key={a} value={a}>{a} ans</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Situation matrimoniale *</label>
            <select name="married" value={data.married} onChange={handleChange} className={selectClass}>
              <option value="non">Celibataire</option>
              <option value="oui">Marie(e) / Conjoint(e)</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Niveau d&apos;etudes *</label>
          <select name="education" value={data.education} onChange={handleChange} required className={selectClass}>
            <option value="">Selectionnez votre niveau</option>
            <option value="secondaire">Diplome secondaire</option>
            <option value="post-secondaire-1an">Post-secondaire (1 an)</option>
            <option value="post-secondaire-2ans">Post-secondaire (2 ans)</option>
            <option value="licence">Licence (Bac+3)</option>
            <option value="master-pro">Master professionnel / MBA</option>
            <option value="master">Master recherche</option>
            <option value="doctorat">Doctorat (PhD)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Experience au Canada (annees)</label>
            <select name="canadaExperience" value={data.canadaExperience} onChange={handleChange} className={selectClass}>
              <option value="0">Aucune</option>
              <option value="1">1 an</option>
              <option value="2">2 ans</option>
              <option value="3">3 ans</option>
              <option value="4">4 ans</option>
              <option value="5">5 ans ou plus</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Experience a l&apos;etranger (annees)</label>
            <select name="foreignExperience" value={data.foreignExperience} onChange={handleChange} className={selectClass}>
              <option value="0">Aucune</option>
              <option value="1">1-2 ans</option>
              <option value="2">3-4 ans</option>
              <option value="3">5 ans ou plus</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Offre d&apos;emploi au Canada</label>
            <select name="jobOffer" value={data.jobOffer} onChange={handleChange} className={selectClass}>
              <option value="non">Non</option>
              <option value="teer0">Oui - Poste qualifie (TEER 1/2/3)</option>
              <option value="oui">Oui - Poste de direction (TEER 0)</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Nomination provinciale (PNP)</label>
            <select name="provincialNomination" value={data.provincialNomination} onChange={handleChange} className={selectClass}>
              <option value="non">Non</option>
              <option value="oui">Oui (+600 points)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Etudes au Canada</label>
            <select name="canadianEducation" value={data.canadianEducation} onChange={handleChange} className={selectClass}>
              <option value="non">Non</option>
              <option value="oui-1-2">Oui - 1 ou 2 ans</option>
              <option value="oui-3+">Oui - 3 ans ou plus</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Frere/soeur citoyen ou RP au Canada</label>
            <select name="siblingCanada" value={data.siblingCanada} onChange={handleChange} className={selectClass}>
              <option value="non">Non</option>
              <option value="oui">Oui</option>
            </select>
          </div>
        </div>

        <button type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 shadow-lg">
          <Calculator size={22} /> Calculer mon score CRS
        </button>
      </form>
    </motion.div>
  );
}

// ===========================
// ARRIMA (QUEBEC) CALCULATOR
// ===========================
function calculateArrima(data: Record<string, string>, frenchNclc: NclcLevels) {
  let score = 0;

  // Age (max 110)
  const age = parseInt(data.age) || 0;
  if (age >= 18 && age <= 35) score += 110;
  else if (age === 36) score += 99;
  else if (age === 37) score += 88;
  else if (age === 38) score += 77;
  else if (age === 39) score += 66;
  else if (age === 40) score += 55;
  else if (age === 41) score += 44;
  else if (age === 42) score += 33;
  else if (age === 43) score += 22;

  // Education (max 140)
  const eduPoints: Record<string, number> = {
    secondaire: 28, "post-secondaire-1an": 70, "post-secondaire-2ans": 84,
    licence: 112, master: 126, doctorat: 140,
  };
  score += eduPoints[data.education] || 0;
  if (data.studyDomain === "demande") score += 12;

  // French (from NCLC levels - oral and written averages)
  // Si TCF Quebec (EO/EE = -1), utiliser seulement CO et CE
  const frenchOralAvg = frenchNclc.eo >= 0 ? Math.floor((frenchNclc.co + frenchNclc.eo) / 2) : frenchNclc.co;
  const frenchWrittenAvg = frenchNclc.ee >= 0 ? Math.floor((frenchNclc.ce + frenchNclc.ee) / 2) : frenchNclc.ce;
  const frenchOralPoints: Record<number, number> = { 0: 0, 4: 10, 5: 25, 6: 34, 7: 52, 8: 68, 9: 84, 10: 100 };
  const frenchWrittenPoints: Record<number, number> = { 0: 0, 4: 5, 5: 10, 6: 15, 7: 24, 8: 30, 9: 36, 10: 48 };
  score += (frenchOralPoints[Math.min(frenchOralAvg, 10)] || 0);
  score += (frenchWrittenPoints[Math.min(frenchWrittenAvg, 10)] || 0);

  // English
  const englishLevel = parseInt(data.englishLevel) || 0;
  const englishPoints: Record<number, number> = { 0: 0, 5: 10, 6: 15, 7: 22, 8: 28, 9: 34 };
  score += englishPoints[englishLevel] || 0;

  // Work experience
  const expYears = parseInt(data.experience) || 0;
  if (expYears >= 4) score += 80;
  else if (expYears === 3) score += 64;
  else if (expYears === 2) score += 48;
  else if (expYears === 1) score += 32;

  // Quebec work experience
  const qcExp = parseInt(data.quebecExperience) || 0;
  if (qcExp >= 2) score += 80;
  else if (qcExp === 1) score += 40;

  if (data.jobOffer === "oui-mtl") score += 160;
  if (data.jobOffer === "oui-hors-mtl") score += 200;
  if (data.quebecDiploma === "oui") score += 50;
  if (data.spouseEducation === "licence") score += 6;
  if (data.spouseEducation === "master") score += 8;
  if (data.spouseFrench === "oui") score += 10;
  if ((parseInt(data.children) || 0) >= 1) score += 8;
  if (data.financialProof === "oui") score += 1;

  return score;
}

function ArrimaSimulator() {
  const [step, setStep] = useState<"french" | "form" | "result" | "no-test">("french");
  const [frenchNclc, setFrenchNclc] = useState<NclcLevels | null>(null);
  const [data, setData] = useState<Record<string, string>>({
    age: "", education: "", studyDomain: "autre",
    englishLevel: "0", experience: "0", quebecExperience: "0", jobOffer: "non",
    quebecDiploma: "non", spouseEducation: "non", spouseFrench: "non",
    children: "0", financialProof: "oui",
  });
  const [result, setResult] = useState<{ score: number; eligible: boolean } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!frenchNclc) return;
    const score = calculateArrima(data, frenchNclc);
    setResult({ score, eligible: score >= 500 });
    setStep("result");
  };

  const resetAll = () => {
    setStep("french");
    setFrenchNclc(null);
    setResult(null);
    setData({
      age: "", education: "", studyDomain: "autre",
      englishLevel: "0", experience: "0", quebecExperience: "0", jobOffer: "non",
      quebecDiploma: "non", spouseEducation: "non", spouseFrench: "non",
      children: "0", financialProof: "oui",
    });
  };

  const selectClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition bg-white text-sm";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  if (step === "no-test") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
        <div className="w-24 h-24 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-6">
          <AlertTriangle size={48} className="text-orange-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Test de langue requis</h3>
        <p className="text-gray-600 mb-2">
          Pour soumettre une demande via Arrima (Quebec), vous devez avoir passe
          un test de langue francaise officiel.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Le Quebec exige un minimum de NCLC 5 dans les 4 competences pour le PSTQ.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/services#cours-tcf-tef" className="inline-flex items-center justify-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-900 transition-all">
            Nos cours de preparation TCF/TEF <ArrowRight size={18} />
          </Link>
          <button onClick={resetAll} className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all">
            <RotateCcw size={18} /> Recommencer
          </button>
        </div>
      </motion.div>
    );
  }

  if (step === "french") {
    return (
      <FrenchTestStep
        minNclc={5}
        color="blue"
        forQuebec={true}
        onNoTest={() => setStep("no-test")}
        onComplete={(nclc) => {
          setFrenchNclc(nclc);
          setStep("form");
        }}
      />
    );
  }

  if (step === "result" && result) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
        <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6 ${result.eligible ? "bg-green-100" : "bg-orange-100"}`}>
          {result.eligible ? <CheckCircle size={64} className="text-green-600" /> : <XCircle size={64} className="text-orange-600" />}
        </div>
        <h3 className="text-5xl font-extrabold mb-2">
          <span className={result.eligible ? "text-green-600" : "text-orange-600"}>{result.score}</span>
          <span className="text-gray-400 text-2xl"> points</span>
        </h3>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-4 max-w-md mx-auto overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((result.score / 1000) * 100, 100)}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className={`h-full rounded-full ${result.eligible ? "bg-gradient-to-r from-green-500 to-green-400" : "bg-gradient-to-r from-orange-500 to-orange-400"}`} />
        </div>
        <p className="text-gray-500 text-sm mt-2">Seuil approximatif d&apos;invitation Arrima : ~500 points</p>

        {frenchNclc && (
          <div className="mt-6 text-left max-w-md mx-auto">
            <p className="text-sm font-semibold text-gray-700 mb-2">Vos niveaux NCLC (francais) :</p>
            <div className="grid grid-cols-2 gap-2">
              <NclcBadge label="CO" level={frenchNclc.co} minRequired={5} />
              <NclcBadge label="CE" level={frenchNclc.ce} minRequired={5} />
              {frenchNclc.eo >= 0 && <NclcBadge label="EO" level={frenchNclc.eo} minRequired={5} />}
              {frenchNclc.ee >= 0 && <NclcBadge label="EE" level={frenchNclc.ee} minRequired={5} />}
            </div>
          </div>
        )}

        <div className={`mt-6 p-6 rounded-2xl ${result.eligible ? "bg-green-50 border border-green-200" : "bg-orange-50 border border-orange-200"}`}>
          <h4 className={`text-xl font-bold ${result.eligible ? "text-green-700" : "text-orange-700"}`}>
            {result.eligible ? "Excellent ! Votre profil est potentiellement admissible pour le Quebec" : "Votre score pourrait etre ameliore"}
          </h4>
          <p className={`mt-2 text-sm ${result.eligible ? "text-green-600" : "text-orange-600"}`}>
            {result.eligible
              ? "Avec ce score, vous avez de bonnes chances d'etre invite via le portail Arrima pour presenter une demande de selection permanente au Quebec."
              : "Le portail Arrima selectionne les profils avec les scores les plus eleves. Contactez-nous pour optimiser votre profil."}
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-800 transition-all">
            Consultation gratuite <ArrowRight size={18} />
          </Link>
          <button onClick={resetAll} className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all">
            <RotateCcw size={18} /> Recommencer
          </button>
        </div>
      </motion.div>
    );
  }

  // Form step
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
        <p className="text-sm font-semibold text-green-700 flex items-center gap-2">
          <CheckCircle size={16} /> Test de langue valide - NCLC {frenchNclc ? Math.min(frenchNclc.co, frenchNclc.ce, frenchNclc.eo, frenchNclc.ee) : 0}+ dans toutes les competences
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Age *</label>
            <select name="age" value={data.age} onChange={handleChange} required className={selectClass}>
              <option value="">Selectionnez votre age</option>
              {Array.from({ length: 33 }, (_, i) => i + 18).map((a) => (
                <option key={a} value={a}>{a} ans</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Niveau d&apos;etudes *</label>
            <select name="education" value={data.education} onChange={handleChange} required className={selectClass}>
              <option value="">Selectionnez</option>
              <option value="secondaire">Diplome secondaire</option>
              <option value="post-secondaire-1an">Post-secondaire (1 an)</option>
              <option value="post-secondaire-2ans">Post-secondaire (2 ans)</option>
              <option value="licence">Licence (Bac+3)</option>
              <option value="master">Master / Doctorat</option>
              <option value="doctorat">Doctorat (PhD)</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Domaine d&apos;etudes</label>
          <select name="studyDomain" value={data.studyDomain} onChange={handleChange} className={selectClass}>
            <option value="autre">Autre domaine</option>
            <option value="demande">Domaine en demande au Quebec</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Niveau d&apos;anglais</label>
          <select name="englishLevel" value={data.englishLevel} onChange={handleChange} className={selectClass}>
            <option value="0">Aucun</option>
            <option value="5">CLB 5 (Base)</option>
            <option value="6">CLB 6 (Intermediaire)</option>
            <option value="7">CLB 7 (Bon)</option>
            <option value="8">CLB 8 (Tres bon)</option>
            <option value="9">CLB 9+ (Excellent)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Experience de travail (annees)</label>
            <select name="experience" value={data.experience} onChange={handleChange} className={selectClass}>
              <option value="0">Aucune</option>
              <option value="1">1 an</option>
              <option value="2">2 ans</option>
              <option value="3">3 ans</option>
              <option value="4">4 ans ou plus</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Experience au Quebec</label>
            <select name="quebecExperience" value={data.quebecExperience} onChange={handleChange} className={selectClass}>
              <option value="0">Aucune</option>
              <option value="1">6 mois - 1 an</option>
              <option value="2">2 ans ou plus</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Offre d&apos;emploi validee au Quebec</label>
            <select name="jobOffer" value={data.jobOffer} onChange={handleChange} className={selectClass}>
              <option value="non">Non</option>
              <option value="oui-mtl">Oui - Region de Montreal</option>
              <option value="oui-hors-mtl">Oui - Hors Montreal</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Diplome obtenu au Quebec</label>
            <select name="quebecDiploma" value={data.quebecDiploma} onChange={handleChange} className={selectClass}>
              <option value="non">Non</option>
              <option value="oui">Oui</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>Etudes du conjoint(e)</label>
            <select name="spouseEducation" value={data.spouseEducation} onChange={handleChange} className={selectClass}>
              <option value="non">Pas de conjoint / Secondaire</option>
              <option value="licence">Licence ou plus</option>
              <option value="master">Master / Doctorat</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Conjoint(e) parle francais</label>
            <select name="spouseFrench" value={data.spouseFrench} onChange={handleChange} className={selectClass}>
              <option value="non">Non</option>
              <option value="oui">Oui (NCLC 7+)</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Enfants</label>
            <select name="children" value={data.children} onChange={handleChange} className={selectClass}>
              <option value="0">Aucun</option>
              <option value="1">1 ou plus</option>
            </select>
          </div>
        </div>

        <button type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 shadow-lg">
          <Calculator size={22} /> Calculer mon score Arrima
        </button>
      </form>
    </motion.div>
  );
}

// ===========================
// MAIN PAGE
// ===========================
export default function SimulateurPage() {
  const [activeTab, setActiveTab] = useState<"express" | "arrima">("express");

  return (
    <>
      <section className="bg-gradient-to-br from-red-600 to-blue-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        {/* SVG decorative drawings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Calculator / chart icon */}
          <g transform="translate(10%, 35%)" opacity="0.06">
            <rect x="-20" y="-25" width="40" height="50" rx="3" fill="none" stroke="white" strokeWidth="1.5" />
            <line x1="-12" y1="-10" x2="12" y2="-10" stroke="white" strokeWidth="1" />
            <rect x="-12" y="-2" width="8" height="12" fill="none" stroke="white" strokeWidth="1" />
            <rect x="4" y="4" width="8" height="6" fill="none" stroke="white" strokeWidth="1" />
          </g>

          {/* Bar chart rising */}
          <g transform="translate(88%, 45%)" opacity="0.05">
            <rect x="-24" y="5" width="8" height="15" fill="none" stroke="white" strokeWidth="1" />
            <rect x="-12" y="-5" width="8" height="25" fill="none" stroke="white" strokeWidth="1" />
            <rect x="0" y="-15" width="8" height="35" fill="none" stroke="white" strokeWidth="1" />
            <rect x="12" y="-25" width="8" height="45" fill="none" stroke="white" strokeWidth="1" />
          </g>

          {/* Geographic curves */}
          <path d="M0,60% Q25%,40% 50%,55% T100%,45%" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" className="geo-line" />
          <path d="M15%,85% Q50%,50% 85%,20%" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeLinecap="round" className="flight-path" />

          {/* Waypoints */}
          <circle cx="15%" cy="85%" r="2.5" fill="rgba(255,255,255,0.12)" />
          <circle cx="85%" cy="20%" r="2.5" fill="rgba(255,255,255,0.12)" />
          <circle cx="50%" cy="55%" r="1.5" fill="rgba(255,255,255,0.08)" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Calculator className="mx-auto text-white/80 mb-4" size={48} />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Simulateur d&apos;Immigration</h1>
            <p className="mt-4 text-white/80 text-lg max-w-2xl mx-auto">
              Entrez vos notes de test de langue, calculez votre score et decouvrez si votre profil est admissible
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-2xl p-1.5 mb-10">
            <button
              onClick={() => setActiveTab("express")}
              className={`flex-1 py-4 px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${activeTab === "express" ? "bg-white text-red-600 shadow-lg" : "text-gray-500 hover:text-gray-700"}`}
            >
              <span className="block text-lg sm:text-xl">{"\u{1F1E8}\u{1F1E6}"}</span>
              Entree Express (CRS)
            </button>
            <button
              onClick={() => setActiveTab("arrima")}
              className={`flex-1 py-4 px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${activeTab === "arrima" ? "bg-white text-blue-900 shadow-lg" : "text-gray-500 hover:text-gray-700"}`}
            >
              <span className="block mb-1">
                <svg viewBox="0 0 30 20" className="inline-block w-7 h-5 rounded-sm shadow-sm" xmlns="http://www.w3.org/2000/svg">
                  <rect width="30" height="20" fill="#003DA5" />
                  {/* White cross */}
                  <rect x="12.5" y="0" width="5" height="20" fill="white" />
                  <rect x="0" y="7.5" width="30" height="5" fill="white" />
                  {/* Fleur-de-lis in 4 quadrants */}
                  <text x="6.25" y="6" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="5" fontFamily="serif">&#x269C;</text>
                  <text x="23.75" y="6" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="5" fontFamily="serif">&#x269C;</text>
                  <text x="6.25" y="14.5" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="5" fontFamily="serif">&#x269C;</text>
                  <text x="23.75" y="14.5" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="5" fontFamily="serif">&#x269C;</text>
                </svg>
              </span>
              Arrima (Quebec)
            </button>
          </div>

          {/* Info banner */}
          <div className={`mb-8 p-4 rounded-xl text-sm ${activeTab === "express" ? "bg-red-50 text-red-700 border border-red-200" : "bg-blue-50 text-blue-800 border border-blue-200"}`}>
            {activeTab === "express"
              ? "Le Systeme de classement global (CRS) classe les candidats de l'Entree express. Score maximum: 1200 points. Le seuil d'invitation varie (generalement ~450-500 points). Niveau minimum requis : NCLC 7 dans les 4 competences."
              : "Arrima est le portail d'immigration du Quebec. Il selectionne les candidats les mieux classes pour le Programme regulier des travailleurs qualifies (PSTQ). Niveau minimum requis : NCLC 5 dans les 4 competences."}
          </div>

          {/* Calculator */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === "express" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-100"
          >
            <AnimatePresence mode="wait">
              {activeTab === "express" ? <ExpressEntrySimulator /> : <ArrimaSimulator />}
            </AnimatePresence>
          </motion.div>

          {/* Disclaimer */}
          <p className="mt-6 text-center text-gray-400 text-xs">
            * Ce simulateur fournit une estimation approximative. Les resultats reels peuvent varier selon les criteres exacts d&apos;IRCC et du MIFI.
            Pour une evaluation precise, contactez JT TRADE AND SERVICES.
          </p>
        </div>
      </section>
    </>
  );
}
