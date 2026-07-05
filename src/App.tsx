/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  Sparkles,
  Edit3,
  Eye,
  Printer,
  RotateCcw,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Check,
  Plus,
  Trash2,
  HelpCircle,
  FileText,
  Sliders,
  X,
  MapPin,
  Mail,
  Phone,
  Link as LinkIcon,
  BookOpen,
  Briefcase,
  Wrench,
  Globe,
  Info,
  ArrowUp,
  ArrowDown,
  Sparkle,
  Instagram,
  Twitter,
  Github,
  Palette
} from "lucide-react";

// Types corresponding to Offline Premium CV
interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  status: string;
  description: string;
}

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  bullets: string[];
}

interface SkillItem {
  id: string;
  name: string;
  level: number;
}

interface LanguageItem {
  id: string;
  name: string;
  level: string;
}

interface CourseItem {
  id: string;
  name: string;
  year?: string;
}

interface CVData {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  skype?: string;
  twitter?: string;
  instagram?: string;
  github?: string;
  behance?: string;
  website?: string;
  objective: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  references: string;
  courses: CourseItem[];
  picture?: string;
}

interface AdvancedTextareaProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  id?: string;
  suggestions?: string[];
}

const AdvancedTextarea: React.FC<AdvancedTextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  id,
  suggestions
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);

    const replacement = before + selected + after;
    const newValue = text.substring(0, start) + replacement + text.substring(end);
    
    onChange(newValue);
    
    // Restore selection/focus after state update on next tick
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 0);
  };

  const handleBold = () => insertText("**", "**");
  const handleItalic = () => insertText("*", "*");
  const handleBullet = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    
    if (selected.includes("\n")) {
      const updated = selected.split("\n").map(line => line.startsWith("• ") ? line : "• " + line).join("\n");
      insertText("", updated);
    } else {
      insertText("• ");
    }
  };

  const handleCaps = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    if (selected) {
      insertText(selected.toUpperCase());
    }
  };

  return (
    <div className="space-y-1.5" id={id}>
      <div className="flex items-center justify-between">
        <label className="block text-[10px] font-bold uppercase text-slate-400">{label}</label>
        
        {/* Editor Toolbar with non-technical, user-friendly tags */}
        <div className="flex items-center gap-1 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900/80">
          <button
            type="button"
            onClick={handleBold}
            className="text-[10px] font-bold text-slate-400 hover:text-white hover:bg-slate-900/60 transition-colors px-1.5 py-0.5 rounded"
            title="Negrito (**)"
          >
            N
          </button>
          <button
            type="button"
            onClick={handleItalic}
            className="text-[10px] font-serif italic text-slate-400 hover:text-white hover:bg-slate-900/60 transition-colors px-1.5 py-0.5 rounded"
            title="Itálico (*)"
          >
            I
          </button>
          <button
            type="button"
            onClick={handleBullet}
            className="text-[10px] text-slate-400 hover:text-white hover:bg-slate-900/60 transition-colors px-1.5 py-0.5 rounded font-mono"
            title="Marcador (•)"
          >
            • Marcador
          </button>
          <button
            type="button"
            onClick={handleCaps}
            className="text-[9px] text-slate-400 hover:text-white hover:bg-slate-900/60 transition-colors px-1 py-0.5 rounded"
            title="Texto em MAIÚSCULO"
          >
            aA
          </button>
        </div>
      </div>

      <div className="relative group">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded p-2 text-xs text-slate-200 outline-none resize-none leading-relaxed focus:ring-1 focus:ring-blue-500/20"
        />
        
        {/* Helper Badge */}
        <div className="absolute right-2 bottom-1.5 text-[8px] text-slate-500 select-none pointer-events-none group-focus-within:opacity-0 transition-opacity">
          Editor Avançado ✨
        </div>
      </div>

      {suggestions && suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          <span className="text-[8px] text-slate-500 self-center uppercase mr-0.5">Sugestões:</span>
          {suggestions.map((sug, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(sug)}
              className="text-[9px] bg-slate-900 hover:bg-slate-850 text-slate-350 hover:text-white border border-slate-850 px-1.5 py-0.5 rounded transition-all max-w-[200px] truncate"
              title={sug}
            >
              {sug}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const DEFAULT_CV: CVData = {
  name: "Alexandre Silva Santos",
  title: "Desenvolvedor Front-End & UI/UX Designer",
  phone: "(11) 98765-4321",
  email: "alexandre.silva@email.com",
  location: "São Paulo – SP",
  linkedin: "linkedin.com/in/alexandre-silva",
  github: "github.com/alexandre-silva",
  behance: "behance.net/alexandre-silva",
  website: "alexandre-silva.dev",
  skype: "skype.alexandre",
  twitter: "@alex_silvadesign",
  instagram: "@alexandre.design",
  objective: "Profissional criativo e focado em resultados, com sólida formação prática na criação de interfaces digitais responsivas e identidades visuais modernas. Busco uma oportunidade para agregar valor aos projetos da empresa por meio de soluções de desenvolvimento front-end elegantes, design centrado no usuário e metodologias de trabalho organizadas.",
  picture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250&h=250",
  education: [
    {
      id: "edu_1",
      degree: "Superior em Design e Tecnologia (Bacharelado)",
      institution: "Universidade Paulista de Tecnologia",
      period: "2020 – 2024",
      location: "São Paulo – SP",
      status: "Concluído",
      description: "Foco principal em engenharia de usabilidade, prototipagem de alta fidelidade e design de sistemas digitais modernos."
    },
    {
      id: "edu_2",
      degree: "Técnico em Desenvolvimento para Internet",
      institution: "Escola Técnica Estadual de TI",
      period: "2018 – 2020",
      location: "São Paulo – SP",
      status: "Concluído",
      description: "Sólida base em linguagens de marcação, lógica de programação, banco de dados e arquitetura web cliente-servidor."
    }
  ],
  experience: [
    {
      id: "exp_1",
      role: "Designer Visual & Desenvolvedor Front-End",
      company: "Estúdio de Soluções Digitais",
      period: "2021 – presente",
      location: "São Paulo – SP",
      description: "Atuação direta em projetos de concepção e implementação de interfaces interativas, landing pages de alta conversão e materiais institucionais digitais.",
      bullets: [
        "Codificação de layouts responsivos sob medida com excelente compatibilidade móvel usando React e Tailwind CSS.",
        "Desenvolvimento de protótipos navegáveis detalhados no Figma, otimizando o fluxo de navegação do usuário final.",
        "Planejamento de marcas e aplicação consistente de design systems corporativos escaláveis."
      ]
    }
  ],
  skills: [
    { id: "sk_1", name: "Desenvolvimento Front-End (React, JS, HTML/CSS)", level: 90 },
    { id: "sk_2", name: "Figma, UI/UX Design & Prototipagem", level: 95 },
    { id: "sk_3", name: "Versionamento com Git & Fluxos GitHub", level: 85 },
    { id: "sk_4", name: "Identidade Visual & Direção de Arte", level: 80 },
    { id: "sk_5", name: "Comunicação Eficiente & Trabalho em Equipe", level: 90 }
  ],
  languages: [
    { id: "lang_1", name: "Português", level: "Nativo" },
    { id: "lang_2", name: "Inglês", level: "Avançado (Comunicação Fluente)" }
  ],
  references: "Informações adicionais de contato e referências docentes disponíveis mediante solicitação.",
  courses: [
    {
      id: "course_1",
      name: "Especialização Avançada em Acessibilidade Web e Diretrizes WCAG",
      year: "2023"
    },
    {
      id: "course_2",
      name: "Curso Intensivo de Design de Interfaces e Componentização no Figma",
      year: "2022"
    },
    {
      id: "course_3",
      name: "Workshop Prático de Frameworks CSS Modernos e Layout Responsivo",
      year: "2021"
    }
  ]
};

const PRESET_COLORS = [
  { hex: "#0d0f25", name: "Noite Imperial (Susan)" },
  { hex: "#0d1b2a", name: "Azul Marinho" },
  { hex: "#1e3a8a", name: "Azul Royal" },
  { hex: "#064e3b", name: "Verde Esmeralda" },
  { hex: "#4c1d95", name: "Roxo Imperial" },
  { hex: "#581c1c", name: "Vinho Burgundy" },
  { hex: "#1e293b", name: "Slate Escuro" },
  { hex: "#000000", name: "Clássico Preto" }
];

function hexToRgb(hex: string) {
  const normalized = hex.replace(/^#/, "");
  const r = parseInt(normalized.substring(0, 2), 16);
  const g = parseInt(normalized.substring(2, 4), 16);
  const b = parseInt(normalized.substring(4, 6), 16);
  return { r, g, b };
}

function getContrastColor(hex: string): "#ffffff" | "#000000" {
  try {
    const { r, g, b } = hexToRgb(hex);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 150 ? "#000000" : "#ffffff";
  } catch {
    return "#ffffff";
  }
}

function getRgbContrastColor(r: number, g: number, b: number): "#ffffff" | "#000000" {
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 150 ? "#000000" : "#ffffff";
}

function getSecondaryColor(hex: string, mixAmount: number = 0.12): string {
  try {
    const { r, g, b } = hexToRgb(hex);
    const mixedR = Math.round(r * mixAmount + 255 * (1 - mixAmount));
    const mixedG = Math.round(g * mixAmount + 255 * (1 - mixAmount));
    const mixedB = Math.round(b * mixAmount + 255 * (1 - mixAmount));
    return `rgb(${mixedR}, ${mixedG}, ${mixedB})`;
  } catch {
    return "rgba(241, 245, 249, 0.9)";
  }
}

function getAccentColor(hex: string): string {
  try {
    const { r, g, b } = hexToRgb(hex);
    const mixedR = Math.min(255, Math.round(r * 1.3));
    const mixedG = Math.min(255, Math.round(g * 1.3));
    const mixedB = Math.min(255, Math.round(b * 1.3));
    return `rgb(${mixedR}, ${mixedG}, ${mixedB})`;
  } catch {
    return "#3b82f6";
  }
}

// Tutorial Steps Definition (Module-level constant for easy access across hooks)
const tutorialSteps = [
  {
    title: "1. Escolher o Visual do seu Currículo 🎨",
    text: "Olá! Aqui em cima você escolhe o seu modelo favorito com um toque. Você pode alternar entre o 'Modo Colorido' (com lindos tons e layouts dinâmicos) e o clássico 'P&B Editorial' (visual refinado em preto e branco tradicional de revistas). Sinta-se livre para testar as duas versões!",
    anchorId: "style-tab-trigger",
  },
  {
    title: "2. Escrever seus Dados e Histórias 📝",
    text: "Estas abas numéricas são as pastas de conteúdo. Preencha seus contatos, resumos, formação acadêmica e experiências práticas. Para facilitar, os campos de texto longo agora incluem o **Editor Avançado ✨** para você formatar com facilidade, além de campos em listas estruturadas!",
    anchorId: "panel-tabs",
  },
  {
    title: "3. Ajustar Fontes e Margens ⚙️",
    text: "Caso precise ajustar os espaçamentos ou tamanho das fontes para alinhar os dados, utilize a pasta 6 '⚙️ Aparência'. Os controles de escala simples permitem reconfigurar a visualização inteira num piscar de olhos!",
    anchorId: "tab-personalizacao",
  },
  {
    title: "4. Alerta de Folha Única 🟢🔴",
    text: "Este indicador monitora o espaço restante na folha A4. Se estiver verde, indica que o texto está perfeito e vai caber na folha! Se ficar vermelho, basta ajustar o tamanho das fontes na aba 6 ou condensar os textos para garantir o melhor design editorial.",
    anchorId: "overflow-badge",
  },
  {
    title: "5. Baixar o PDF Oficial 📥",
    text: "Quando o seu currículo estiver do jeito que você quer, basta clicar em 'Baixar PDF'. Geraremos uma cópia vetorizada e profissional, perfeita para enviar por WhatsApp ou imprimir!",
    anchorId: "print-pdf-trigger",
  }
];

export default function App() {
  const [cvData, setCvData] = useState<CVData>(() => {
    const saved = localStorage.getItem("offline_cv_data_v2");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_CV;
      }
    }
    return DEFAULT_CV;
  });

  const [primaryColor, setPrimaryColor] = useState<string>(() => {
    return localStorage.getItem("offline_cv_primary_color") || "#0d0f25";
  });
  const [colorIntensity, setColorIntensity] = useState<number>(() => {
    return Number(localStorage.getItem("offline_cv_color_intensity") || "100");
  });
  const [showPrintHelper, setShowPrintHelper] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Editor states
  const [designStyle, setDesignStyle] = useState<"colorido" | "serious_editorial_bw">("colorido");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"contato" | "dados" | "formacao" | "experiencia" | "habilidades" | "personalizacao">("contato");

  // Fine-grained font sizes
  const [fontSizeName, setFontSizeName] = useState<number>(() => {
    return Number(localStorage.getItem("offline_cv_fs_name") || "26");
  });
  const [fontSizeTitle, setFontSizeTitle] = useState<number>(() => {
    return Number(localStorage.getItem("offline_cv_fs_title") || "10");
  });
  const [fontSizeSection, setFontSizeSection] = useState<number>(() => {
    return Number(localStorage.getItem("offline_cv_fs_section") || "10");
  });
  const [fontSizeBody, setFontSizeBody] = useState<number>(() => {
    return Number(localStorage.getItem("offline_cv_fs_body") || "9");
  });
  const [fontSizeSidebar, setFontSizeSidebar] = useState<number>(() => {
    return Number(localStorage.getItem("offline_cv_fs_sidebar") || "9");
  });

  // Fine-grained spacings
  const [customSectionSpacing, setCustomSectionSpacing] = useState<number>(() => {
    return Number(localStorage.getItem("offline_cv_spacing_section") || "14");
  });
  const [customLineHeight, setCustomLineHeight] = useState<number>(() => {
    return Number(localStorage.getItem("offline_cv_spacing_line") || "140"); // in percent (140% = 1.4)
  });

  // Black & White specific custom states
  const [bwBorderStyle, setBwBorderStyle] = useState<"solid" | "dashed" | "double">(() => {
    return (localStorage.getItem("offline_cv_bw_border") as any) || "solid";
  });
  const [bwPhotoGrayscale, setBwPhotoGrayscale] = useState<boolean>(() => {
    return localStorage.getItem("offline_cv_bw_photo_gray") !== "false";
  });

  // Format states
  const [fontSizeScale, setFontSizeScale] = useState<"xs" | "sm" | "md" | "lg">("sm");
  const [lineHeightScale, setLineHeightScale] = useState<"tight" | "normal" | "relaxed">("normal");
  const [sectionMargin, setSectionMargin] = useState<"tight" | "normal" | "relaxed">("normal");
  
  // Section visibility states (Simple language toggles)
  const [hidePicture, setHidePicture] = useState<boolean>(false);
  const [hideObjective, setHideObjective] = useState<boolean>(false);
  const [hideEducation, setHideEducation] = useState<boolean>(false);
  const [hideExperience, setHideExperience] = useState<boolean>(false);
  const [hideSkills, setHideSkills] = useState<boolean>(false);
  const [hideLanguages, setHideLanguages] = useState<boolean>(false);
  const [hideReferences, setHideReferences] = useState<boolean>(false);
  const [hideAdditional, setHideAdditional] = useState<boolean>(false);

  // Font family selector scale
  const [fontFamily, setFontFamily] = useState<"inter" | "georgia" | "space_grotesk" | "jetbrains_mono" | "playfair">("inter");

  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  // Tutorial state
  const [tourStep, setTourStep] = useState<number | null>(null);
  const [mobileSubView, setMobileSubView] = useState<"edit" | "preview">("edit");
  const [tourCoords, setTourCoords] = useState<{ top: number; left: number; placement: string }>({ top: 120, left: 120, placement: "center" });
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);

  // Dynamic list of tutorial steps depending on editing visibility mode
  const currentSteps = useMemo(() => {
    if (!isEditing) {
      return [
        {
          title: "1. Escolher o Modelo do seu Currículo 🎨",
          text: "Seja bem-vinto(a) ao seu moderno ateliê de currículos! Aqui em cima, com apenas um toque simples, você consegue escolher a aparência geral do seu documento. Utilize o 'Modo Colorido' se desejar tons modernos e dinâmicos, ou o clássico 'P&B Editorial' para um visual super elegante em preto e branco tradicional de altíssima qualidade. Toque sempre que quiser experimentar novas combinações!",
          anchorId: "style-tab-trigger",
        },
        {
          title: "2. Habilitar o Modo Edição ✨",
          text: "Neste momento, os painéis de personalização estão recolhidos para manter a visualização limpa e focada. Para abrir suas abas de escrita e começar a mudar os contatos e histórias, basta clicar no botão 'Customizar' bem aqui. Toque em 'Avançar' que eu ativo a edição para você agora mesmo!",
          anchorId: "customizar-trigger",
        },
        {
          title: "3. O Indicador de Página Única 🟢",
          text: "Para que o seu currículo fique impecável, o ideal é que ele caiba inteirinho em uma única folha física. Este indicador é o seu assistente inteligente: ele fica verdinho se tudo couber sob medida, ou avisa em vermelho se passar do espaço ideal de papel para que possa fazer pequenos ajustes!",
          anchorId: "overflow-badge",
        },
        {
          title: "4. Baixar o seu PDF Oficial 📥",
          text: "Prontinho! Quando os seus dados estiverem perfeitos, basta tocar em 'Baixar PDF' para salvá-lo com altíssima qualidade editorial, prontinho para mandar pelo WhatsApp ou imprimir quando quiser!",
          anchorId: "print-pdf-trigger",
        }
      ];
    } else {
      return [
        {
          title: "1. Escolher o Modelo do seu Currículo 🎨",
          text: "Seja bem-vindo(a) ao seu moderno ateliê de currículos! Aqui em cima, com apenas um toque simples, você escolhe se prefere o elegante 'Modo Colorido' ou o clássico 'P&B Editorial' de revista. Sinta-se à vontade para testar!",
          anchorId: "style-tab-trigger",
        },
        {
          title: "2. Pasta 1: Detalhes de Contato 📞",
          text: "Aqui você preenche telefone, e-mail, links de portfólio (como GitHub, Behance e seu site pessoal), redes extras e foto com todo o cuidado. Fica super fácil para as empresas encontrarem você rapidamente!",
          anchorId: "tab-contato",
        },
        {
          title: "3. Pasta 2: Perfil e Resumo 📝",
          text: "Nesta aba, escreva sobre seus objetivos e qualidades profissionais. Repare que todos os campos longos agora contam com o inovador **Editor Avançado ✨** no topo! Você pode selecionar trechos com o mouse e destacar palavras em negrito (N), itálico (I), converter tudo em maiúsculas (aA) ou fazer uma listinha numerada ou com bolinhas (• Marcador).",
          anchorId: "tab-perfil",
        },
        {
          title: "4. Pasta 3: Formação Acadêmica 🎓",
          text: "O local ideal para registrar sua escolaridade, faculdade ou cursos técnicos. Você pode tocar em 'Adicionar' para abrir novos campos organizados, reordenar as linhas ou excluir registros num piscar de olhos.",
          anchorId: "tab-estudos",
        },
        {
          title: "5. Pasta 4: Experiências e Trabalhos 💼",
          text: "Aqui, relate seus trabalhos anteriores e funções com bastante clareza. Use as opções do Editor Avançado para organizar suas conquistas e responsabilidades usando marcadores limpos de fácil leitura.",
          anchorId: "tab-carreiras",
        },
        {
          title: "6. Pasta 5: Competências & Cursos Cadastrados 🏅",
          text: "Exiba suas principais habilidades e selecione o nível ideal de cada uma. É nesta pasta também que você gerencia a **Lista de Cursos e Atividades Complementares**! Adicione seus certificados como itens separados e nós cuidaremos para que fiquem alinhados com absoluto requinte e perfeição no design do seu currículo físico.",
          anchorId: "tab-habilidades",
        },
        {
          title: "7. Pasta 6: Customização de Aparência ⚙️",
          text: "Esta pasta contém ferramentas de ajuste precisas! Se as letras ficarem um pouquinho grandes para caber em uma folha, ou se quiser aumentar ou diminuir as margens, basta arrastar as linhas de regulagem simples. Tudo muda na tela ao mesmo tempo, de forma bem descomplicada para você ajustar no tamanho perfeito.",
          anchorId: "tab-personalizacao",
        },
        {
          title: "8. O Indicador de Página Única 🟢",
          text: "Este indicador monitora o tamanho do papel físico para você! Se tudo couber perfeitamente em uma única página, ele ficará verdinho. Se passar um pouco, basta reduzir as fontes ou margens na Pasta 6!",
          anchorId: "overflow-badge",
        },
        {
          title: "9. Baixar o seu PDF Oficial 📥",
          text: "Quando terminar de preencher as informações e o seu currículo estiver pronto, basta clicar neste botão verde. Nós geraremos o seu PDF oficial com excelente qualidade!",
          anchorId: "print-pdf-trigger",
        }
      ];
    }
  }, [isEditing]);

  // Synchronize dynamic tour coordinates, highlighted element bounds, and auto sidebar active tabs
  useEffect(() => {
    if (tourStep === null) {
      setHighlightRect(null);
      return;
    }

    // Auto navigate sidebar tab and view on mobile/desktop for a highly responsive experience
    if (!isEditing) {
      setMobileSubView("preview");
    } else {
      // isEditing is true
      if (tourStep === 0) {
        setMobileSubView("edit");
      } else if (tourStep === 1) {
        setMobileSubView("edit");
        setActiveTab("contato");
      } else if (tourStep === 2) {
        setMobileSubView("edit");
        setActiveTab("dados");
      } else if (tourStep === 3) {
        setMobileSubView("edit");
        setActiveTab("formacao");
      } else if (tourStep === 4) {
        setMobileSubView("edit");
        setActiveTab("experiencia");
      } else if (tourStep === 5) {
        setMobileSubView("edit");
        setActiveTab("habilidades");
      } else if (tourStep === 6) {
        setMobileSubView("edit");
        setActiveTab("personalizacao");
      } else if (tourStep === 7 || tourStep === 8) {
        setMobileSubView("preview");
      }
    }

    const updateTourGeometry = () => {
      const step = currentSteps[tourStep];
      if (!step) return;
      const element = document.getElementById(step.anchorId);
      
      if (element) {
        // Scroll target element gently into view if needed
        element.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
        
        const rect = element.getBoundingClientRect();
        setHighlightRect(rect);

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let top = rect.bottom + window.scrollY + 12;
        let left = rect.left + window.scrollX + (rect.width / 2) - 180;
        let placement = "bottom";

        // Desktop layout target positioning
        if (viewportWidth >= 1024) {
          if (step.anchorId === "style-tab-trigger") {
            top = rect.bottom + window.scrollY + 12;
            left = rect.left + window.scrollX + (rect.width / 2) - 180;
            placement = "bottom";
          } else if (step.anchorId === "customizar-trigger") {
            top = rect.bottom + window.scrollY + 12;
            left = rect.left + window.scrollX + (rect.width / 2) - 180;
            placement = "bottom";
          } else if (step.anchorId === "panel-tabs") {
            top = rect.top + window.scrollY;
            left = rect.right + window.scrollX + 20;
            placement = "right";
          } else if (
            step.anchorId === "tab-contato" || 
            step.anchorId === "tab-perfil" || 
            step.anchorId === "tab-estudos" || 
            step.anchorId === "tab-carreiras" || 
            step.anchorId === "tab-habilidades" || 
            step.anchorId === "tab-personalizacao"
          ) {
            top = rect.top + window.scrollY - 10;
            left = rect.right + window.scrollX + 20;
            placement = "right";
          } else if (step.anchorId === "overflow-badge") {
            top = rect.bottom + window.scrollY + 12;
            left = rect.left + window.scrollX + (rect.width / 2) - 180;
            placement = "bottom";
          } else if (step.anchorId === "print-pdf-trigger") {
            top = rect.bottom + window.scrollY + 12;
            left = rect.right + window.scrollX - 360;
            placement = "bottom";
          }
        } else {
          // Mobile responsive layout
          top = rect.top > viewportHeight / 2 
            ? rect.top + window.scrollY - 220 
            : rect.bottom + window.scrollY + 12;
          left = rect.left + window.scrollX + (rect.width / 2) - 170;
          placement = rect.top > viewportHeight / 2 ? "top" : "bottom";
        }

        const cardWidth = 360;
        if (left < 12) left = 12;
        if (left + cardWidth > viewportWidth - 12) {
          left = viewportWidth - cardWidth - 12;
        }
        if (top < 12) top = 12;

        setTourCoords({ top, left, placement });
      } else {
        setHighlightRect(null);
        setTourCoords({
          top: window.scrollY + window.innerHeight / 2 - 100,
          left: window.innerWidth / 2 - 180,
          placement: "center"
        });
      }
    };

    updateTourGeometry();
    const t1 = setTimeout(updateTourGeometry, 100);
    const t2 = setTimeout(updateTourGeometry, 300);

    window.addEventListener("resize", updateTourGeometry);
    window.addEventListener("scroll", updateTourGeometry, { passive: true });
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", updateTourGeometry);
      window.removeEventListener("scroll", updateTourGeometry);
    };
  }, [tourStep, isEditing, currentSteps]);

  // Live height analyzer ref for printing fit checks
  const cvSheetRef = useRef<HTMLDivElement>(null);
  const [hasOverflowWarning, setHasOverflowWarning] = useState<boolean>(false);

  // Persistent storage
  useEffect(() => {
    localStorage.setItem("beatriz_cv_premium_v2", JSON.stringify(cvData));
  }, [cvData]);

  useEffect(() => {
    localStorage.setItem("beatriz_cv_primary_color", primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    localStorage.setItem("beatriz_cv_color_intensity", String(colorIntensity));
  }, [colorIntensity]);

  useEffect(() => {
    localStorage.setItem("beatriz_cv_fs_name", String(fontSizeName));
    localStorage.setItem("beatriz_cv_fs_title", String(fontSizeTitle));
    localStorage.setItem("beatriz_cv_fs_section", String(fontSizeSection));
    localStorage.setItem("beatriz_cv_fs_body", String(fontSizeBody));
    localStorage.setItem("beatriz_cv_fs_sidebar", String(fontSizeSidebar));
    localStorage.setItem("beatriz_cv_spacing_section", String(customSectionSpacing));
    localStorage.setItem("beatriz_cv_spacing_line", String(customLineHeight));
    localStorage.setItem("beatriz_cv_bw_border", bwBorderStyle);
    localStorage.setItem("beatriz_cv_bw_photo_gray", String(bwPhotoGrayscale));
  }, [
    fontSizeName,
    fontSizeTitle,
    fontSizeSection,
    fontSizeBody,
    fontSizeSidebar,
    customSectionSpacing,
    customLineHeight,
    bwBorderStyle,
    bwPhotoGrayscale
  ]);

  // Check element sizing for potential overflows relative to typical A4 page proportions
  useEffect(() => {
    const checkHeight = () => {
      if (cvSheetRef.current) {
        // High fidelity ratio simulation for A4. Height in standard display should not exceed ~1130px 
        // to avoid spilling onto page 2 unexpectedly.
        const height = cvSheetRef.current.scrollHeight;
        if (height > 1150) {
          setHasOverflowWarning(true);
        } else {
          setHasOverflowWarning(false);
        }
      }
    };
    checkHeight();
    
    // Add brief timing trigger to check after state updates
    const timer = setTimeout(checkHeight, 300);
    return () => clearTimeout(timer);
  }, [
    cvData,
    fontSizeScale,
    lineHeightScale,
    sectionMargin,
    hideReferences,
    hideAdditional,
    designStyle,
    fontSizeName,
    fontSizeTitle,
    fontSizeSection,
    fontSizeBody,
    fontSizeSidebar,
    customSectionSpacing,
    customLineHeight
  ]);

  const startTour = () => {
    setTourStep(0);
  };

  const handleReset = () => {
    if (window.confirm("Você tem certeza de que deseja restaurar as informações reais de Beatriz? Suas customizações atuais serão limpas.")) {
      setCvData(DEFAULT_CV);
      setPrimaryColor("#0d1b2a");
    }
  };

  const handlePrint = async () => {
    if (!cvSheetRef.current || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      const element = cvSheetRef.current;
      
      // Give the browser a brief moment to update any visual details
      await new Promise((resolve) => setTimeout(resolve, 150));

      const canvas = await html2canvas(element, {
        scale: 2.5, // Ultra sharp text and vector graphics for professional printing
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        onclone: (clonedDoc) => {
          const clonedContainer = clonedDoc.querySelector(".a4-container") as HTMLElement;
          if (clonedContainer) {
            clonedContainer.style.boxShadow = "none";
            clonedContainer.style.border = "none";
            clonedContainer.style.margin = "0";
            clonedContainer.style.borderRadius = "0";
          }
        }
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4" // 595.28 x 841.89 pt
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgHeightInPdf = (canvasHeight * pdfWidth) / canvasWidth;

      if (imgHeightInPdf <= pdfHeight + 15) {
        // Fits perfectly on single page
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeightInPdf, undefined, "FAST");
      } else {
        // Multi-page automatic scaling or splitting
        let heightLeft = imgHeightInPdf;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeightInPdf, undefined, "FAST");
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeightInPdf;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeightInPdf, undefined, "FAST");
          heightLeft -= pdfHeight;
        }
      }

      const safeName = cvData.name
        ? cvData.name.trim().replace(/[^a-zA-Z0-9]/g, "_")
        : "Currículo";
      pdf.save(`${safeName}_Curriculo.pdf`);
    } catch (e) {
      console.error("PDF download failed, attempting window.print() fallback:", e);
      try {
        window.focus();
        window.print();
      } catch (printErr) {
        console.warn("Blocked print execution due to iframe sandbox:", printErr);
      }
      setShowPrintHelper(true);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Helper utilities for editing lists easily
  const updateField = (field: keyof CVData, value: string) => {
    setCvData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setCvData(prev => ({ ...prev, picture: event.target!.result as string }));
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setCvData(prev => ({ ...prev, picture: event.target!.result as string }));
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleUpdateEdu = (id: string, field: keyof EducationItem, value: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const handleAddEdu = () => {
    const newItem: EducationItem = {
      id: "edu_" + Date.now(),
      degree: "Nova Qualificação Acadêmica",
      institution: "Nome da Instituição ou Faculdade",
      period: "2024 – Atual",
      location: "Cidade - UF",
      status: "Em andamento",
      description: "Detalhamento breve das disciplinas ou foco principal."
    };
    setCvData((prev) => ({ ...prev, education: [...prev.education, newItem] }));
  };

  const handleDeleteEdu = (id: string) => {
    setCvData((prev) => ({ ...prev, education: prev.education.filter((item) => item.id !== id) }));
  };

  const handleUpdateExp = (id: string, field: keyof ExperienceItem, value: any) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const handleAddExp = () => {
    const newItem: ExperienceItem = {
      id: "exp_" + Date.now(),
      role: "Nova Atribuição ou Cargo",
      company: "Nome da Empresa ou Instituição",
      period: "Mês/Ano – Mês/Ano",
      location: "Cidade - UF",
      description: "Definição sintética das principais atribuições efetuadas.",
      bullets: ["Escreva aqui uma obrigação ou conquista relevante.", "Outra realização marcante neste cargo."]
    };
    setCvData((prev) => ({ ...prev, experience: [...prev.experience, newItem] }));
  };

  const handleDeleteExp = (id: string) => {
    setCvData((prev) => ({ ...prev, experience: prev.experience.filter((item) => item.id !== id) }));
  };

  const handleAddBulletToExp = (expId: string) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((ex) => {
        if (ex.id === expId) {
          return { ...ex, bullets: [...ex.bullets, "Nova conquista ou atividade."] };
        }
        return ex;
      }),
    }));
  };

  const handleUpdateBulletInExp = (expId: string, bIndex: number, val: string) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((ex) => {
        if (ex.id === expId) {
          const updated = [...ex.bullets];
          updated[bIndex] = val;
          return { ...ex, bullets: updated };
        }
        return ex;
      }),
    }));
  };

  const handleDeleteBulletFromExp = (expId: string, bIndex: number) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((ex) => {
        if (ex.id === expId) {
          return { ...ex, bullets: ex.bullets.filter((_, idx) => idx !== bIndex) };
        }
        return ex;
      }),
    }));
  };

  const handleUpdateSkill = (id: string, name: string, level: number) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.map((item) => (item.id === id ? { ...item, name, level } : item)),
    }));
  };

  const handleAddSkill = () => {
    const newItem: SkillItem = { id: "sk_" + Date.now(), name: "Nova Habilidade Prática", level: 85 };
    setCvData((prev) => ({ ...prev, skills: [...prev.skills, newItem] }));
  };

  const handleDeleteSkill = (id: string) => {
    setCvData((prev) => ({ ...prev, skills: prev.skills.filter((item) => item.id !== id) }));
  };

  const handleUpdateLang = (id: string, field: keyof LanguageItem, value: string) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const handleAddLang = () => {
    const newItem: LanguageItem = { id: "lang_" + Date.now(), name: "Novo Idioma", level: "Básico" };
    setCvData((prev) => ({ ...prev, languages: [...prev.languages, newItem] }));
  };

  const handleDeleteLang = (id: string) => {
    setCvData((prev) => ({ ...prev, languages: prev.languages.filter((item) => item.id !== id) }));
  };

  // Reorder lists up or down helpers (increases control directly for Beatriz)
  const moveItemInList = <T,>(list: T[], index: number, direction: "up" | "down"): T[] => {
    const result = [...list];
    if (direction === "up" && index > 0) {
      [result[index], result[index - 1]] = [result[index - 1], result[index]];
    } else if (direction === "down" && index < list.length - 1) {
      [result[index], result[index + 1]] = [result[index + 1], result[index]];
    }
    return result;
  };

  const moveEducation = (index: number, direction: "up" | "down") => {
    setCvData((prev) => ({ ...prev, education: moveItemInList(prev.education, index, direction) }));
  };

  const moveExperience = (index: number, direction: "up" | "down") => {
    setCvData((prev) => ({ ...prev, experience: moveItemInList(prev.experience, index, direction) }));
  };

  const moveSkill = (index: number, direction: "up" | "down") => {
    setCvData((prev) => ({ ...prev, skills: moveItemInList(prev.skills, index, direction) }));
  };

  const moveLanguage = (index: number, direction: "up" | "down") => {
    setCvData((prev) => ({ ...prev, languages: moveItemInList(prev.languages, index, direction) }));
  };

  const handleAddCourse = () => {
    const newItem: CourseItem = { id: "course_" + Date.now(), name: "Novo Curso ou Atividade Extra", year: "2024" };
    setCvData((prev) => ({ ...prev, courses: [...(prev.courses || []), newItem] }));
  };

  const handleDeleteCourse = (id: string) => {
    setCvData((prev) => ({ ...prev, courses: (prev.courses || []).filter((item) => item.id !== id) }));
  };

  const handleUpdateCourse = (id: string, field: keyof CourseItem, value: string) => {
    setCvData((prev) => ({
      ...prev,
      courses: (prev.courses || []).map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const moveCourse = (index: number, direction: "up" | "down") => {
    setCvData((prev) => ({ ...prev, courses: moveItemInList(prev.courses || [], index, direction) }));
  };

  const getFontFamilyStyle = (font: "inter" | "georgia" | "space_grotesk" | "jetbrains_mono" | "playfair") => {
    let fontValue = "";
    switch (font) {
      case "georgia":
        fontValue = "Georgia, STIXGeneral, serif";
        break;
      case "space_grotesk":
        fontValue = "'Space Grotesk', sans-serif";
        break;
      case "jetbrains_mono":
        fontValue = "'JetBrains Mono', monospace";
        break;
      case "playfair":
        fontValue = "'Playfair Display', serif";
        break;
      case "inter":
      default:
        fontValue = "'Inter', sans-serif";
        break;
    }
    return {
      fontFamily: fontValue,
      "--font-sans": fontValue,
      "--font-serif": fontValue,
      "--font-display": fontValue,
    } as React.CSSProperties;
  };

  // Layout Dynamic Classes
  const getFontSizeClass = () => {
    switch (fontSizeScale) {
      case "xs":
        return "text-[10px] leading-tight";
      case "sm":
        return "text-[11.5px] leading-normal";
      case "md":
        return "text-[12.5px] leading-relaxed";
      case "lg":
        return "text-[14px] leading-relaxed";
      default:
        return "text-[11.5px]";
    }
  };

  const getLineHeightClass = () => {
    switch (lineHeightScale) {
      case "tight":
        return "space-y-1";
      case "relaxed":
        return "space-y-3";
      case "normal":
      default:
        return "space-y-2";
    }
  };

  const getMarginClass = () => {
    switch (sectionMargin) {
      case "tight":
        return "mt-2 pt-2";
      case "relaxed":
        return "mt-5.5 pt-5.5";
      case "normal":
      default:
        return "mt-3.5 pt-3.5";
    }
  };

  const colContrastColor = getContrastColor(primaryColor);
  const getSidebarSecondaryColor = (bgHex: string, colContrast: "#ffffff" | "#000000") => {
    try {
      const { r, g, b } = hexToRgb(bgHex);
      const targetValue = colContrast === "#ffffff" ? 255 : 0;
      const rMix = Math.round(r * 0.6 + targetValue * 0.4);
      const gMix = Math.round(g * 0.6 + targetValue * 0.4);
      const bMix = Math.round(b * 0.6 + targetValue * 0.4);
      return `rgb(${rMix}, ${gMix}, ${bMix})`;
    } catch {
      return colContrast === "#ffffff" ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)";
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors duration-300 print:bg-white print:text-black antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Dynamic Native Styling Block strictly for A4 physical outputs */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Space+Grotesk:wght@400;500;700&display=swap');

        @media print {
          @page {
            size: A4 portrait;
            margin: 0 !important;
          }
          html, body {
            background-color: #ffffff !important;
            color: #000000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print:hidden, .print\\:hidden {
            display: none !important;
          }
          .a4-container {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
            color: black !important;
          }
          .print-header-gradient {
            background: #0d2a4a !important; /* solid color mapping for clean crisp prints */
            color: white !important;
          }
          .print:text-black, .print\\:text-black {
            color: #000000 !important;
          }
          .print:border-black, .print\\:border-black {
            border-color: #000000 !important;
          }
          .print:bg-black, .print\\:bg-black {
            background-color: #000000 !important;
          }
          .print-break-avoid {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
        }
        
        .a4-container {
          width: 210mm;
          min-height: 297mm;
          box-sizing: border-box;
        }

        /* Auto scale the A4 page preview on mobile with exact height adjustment so no empty gaps appear below */
        @media (max-w: 1023px) {
          .a4-container {
            transform: scale(calc((100vw - 24px) / 800)) !important;
            transform-origin: top center !important;
            margin-bottom: calc(-297mm * (1 - ((100vw - 24px) / 800))) !important;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4) !important;
            border-radius: 8px !important;
          }
        }

        /* Customize scrollbars on control interface */
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #020617;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>

      {/* 🚀 BEAUTIFUL INTERACTIVE HIGHLIGHT GLOW OVERLAY (No background blocking, fully clickable) */}
      {tourStep !== null && highlightRect && (
        <div
          className="fixed z-[90] pointer-events-none transition-all duration-300 rounded-xl"
          style={{
            top: highlightRect.top - 6,
            left: highlightRect.left - 6,
            width: highlightRect.width + 12,
            height: highlightRect.height + 12,
            boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.45), 0 0 25px 8px rgba(59, 130, 246, 0.35)",
            border: "2px solid rgba(59, 130, 246, 0.9)",
          }}
        >
          <div className="absolute inset-0 rounded-lg animate-pulse bg-blue-500/10 pointer-events-none" />
          <div className="absolute -inset-1.5 rounded-xl animate-ping border border-blue-400/40 opacity-40 pointer-events-none" />
        </div>
      )}

      {/* 🚀 DYNAMIC FLOATING ONBOARDING POP-TIP CARD (No blurred backdrop) */}
      <AnimatePresence>
        {tourStep !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="z-[100] bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl relative select-none print:hidden"
            style={{
              position: "fixed",
              bottom: "16px",
              left: "12px",
              right: "12px",
              width: "auto",
              maxWidth: "calc(100vw - 24px)",
              transform: "none",
              // Desktop layout (override fixed position with calculated absolute offsets)
              ...(typeof window !== "undefined" && window.innerWidth >= 1024 ? {
                position: "absolute",
                top: tourCoords.top,
                left: tourCoords.left,
                bottom: "auto",
                right: "auto",
                width: "360px"
              } : {})
            }}
          >
            {/* Little indicator arrow (only visible on desktop layout >= 1024px) */}
            {typeof window !== "undefined" && window.innerWidth >= 1024 && tourCoords.placement === "bottom" && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-slate-900" />
            )}
            {typeof window !== "undefined" && window.innerWidth >= 1024 && tourCoords.placement === "top" && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-slate-900" />
            )}
            {typeof window !== "undefined" && window.innerWidth >= 1024 && tourCoords.placement === "right" && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-slate-900" />
            )}
            {typeof window !== "undefined" && window.innerWidth >= 1024 && tourCoords.placement === "left" && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-slate-900" />
            )}

            <div className="absolute top-0 right-0 p-3">
              <button
                onClick={() => setTourStep(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                title="Fechar tutorial"
              >
                <X size={16} />
              </button>
            </div>

            {/* Step indicator dots */}
            <div className="flex items-center gap-1.5 mb-3.5">
              {currentSteps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setTourStep(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === tourStep ? "bg-blue-500 w-5" : "bg-slate-700 w-1.5 hover:bg-slate-600"
                  }`}
                  aria-label={`Ir para etapa ${idx + 1}`}
                />
              ))}
            </div>

            <h4 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
              <Sparkle className="text-blue-400 fill-blue-400 animate-pulse shrink-0" size={16} />
              <span className="truncate">{currentSteps[tourStep].title}</span>
            </h4>
            
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {currentSteps[tourStep].text}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
              <button
                onClick={() => setTourStep(tourStep > 0 ? tourStep - 1 : null)}
                className={`text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-1 ${
                  tourStep === 0 ? "invisible" : ""
                }`}
              >
                <ChevronLeft size={14} />
                <span>Anterior</span>
              </button>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTourStep(null)}
                  className="text-xs font-medium text-slate-500 hover:text-slate-400 min-w-[50px] text-center"
                >
                  Pular
                </button>
                <button
                  onClick={() => {
                    const isAtivarModoEdicaoStep = !isEditing && tourStep === 1;
                    if (isAtivarModoEdicaoStep) {
                      setIsEditing(true);
                    } else if (tourStep < currentSteps.length - 1) {
                      setTourStep(tourStep + 1);
                    } else {
                      setTourStep(null);
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-lg shadow-blue-900/20 flex items-center gap-1 transition-all"
                >
                  <span>{tourStep === currentSteps.length - 1 ? "Pronto!" : "Avançar"}</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔮 MAIN FULL-DENSITY APPLICATION BAR (PRINT-HIDDEN) */}
      <header className="sticky top-0 z-40 bg-slate-950 border-b border-slate-900 p-3 shadow-2xl print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white font-extrabold shadow-lg text-sm">
                CV
              </div>
              <span className="absolute -bottom-1 -right-1 bg-sky-500 text-slate-950 font-bold px-0.5 py-px rounded text-[8px] border border-slate-950 leading-none">
                PRO
              </span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-none">
                  Ateliê de Currículo Profissional
                </h1>
                <span className="bg-blue-500/10 text-blue-400 text-[9px] font-semibold px-2 py-0.5 rounded-full border border-blue-500/20 leading-none shrink-0">
                  Modo Editor Ativo
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-1 line-clamp-1 sm:line-clamp-none max-w-[620px]">
                Suíte de design editorial integrada com controle físico milimétrico de A4. Otimizado para celular e impressão.
              </p>
            </div>
          </div>

          <div 
            id="style-tab-trigger" 
            className={`flex flex-wrap items-center justify-center lg:justify-end gap-2.5 transition-all duration-300 w-full lg:w-auto ${
              tourStep === 0
                ? "ring-4 ring-sky-500 ring-offset-4 ring-offset-slate-950 rounded-2xl scale-[1.01] bg-sky-950/30 p-0.5"
                : ""
            }`}
          >
            {/* Design Presets Switching block */}
            <div className="bg-slate-900/60 p-0.5 rounded-xl border border-slate-800/80 flex items-center h-9 flex-1 md:flex-none">
              <button
                onClick={() => setDesignStyle("colorido")}
                className={`flex-1 md:flex-none px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 h-8 ${
                  designStyle === "colorido"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md font-extrabold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span>Modo Colorido</span>
              </button>
              <button
                onClick={() => setDesignStyle("serious_editorial_bw")}
                className={`flex-1 md:flex-none px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 h-8 ${
                  designStyle === "serious_editorial_bw"
                    ? "bg-slate-700 text-white shadow-md font-extrabold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-slate-400" />
                <span>P&B Editorial</span>
              </button>
            </div>

            {/* Restore Initial Real Data */}
            <button
              onClick={handleReset}
              className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-red-400 transition-colors shrink-0"
              title="Restaurar dados padrões de Beatriz"
            >
              <RotateCcw size={14} />
            </button>

            {/* Quick Tour Launcher */}
            <button
              onClick={startTour}
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 text-slate-300 hover:text-white text-xs font-semibold px-3 h-9 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900 transition-all select-none"
            >
              <HelpCircle size={14} className="text-sky-400" />
              <span>Como usar?</span>
            </button>

            {/* Master Toggle Edit view vs Pure Preview */}
            <button
              id="customizar-trigger"
              onClick={() => setIsEditing(!isEditing)}
              className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3.5 h-9 rounded-xl text-xs font-bold transition-all border ${
                isEditing
                  ? "bg-amber-500 hover:bg-amber-400 border-amber-600 text-slate-950 shadow-md font-extrabold"
                  : "bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-850"
              } ${
                tourStep !== null && currentSteps[tourStep]?.anchorId === "customizar-trigger"
                  ? "ring-4 ring-offset-2 ring-offset-slate-950 ring-blue-500 rounded-xl scale-[1.03] animate-pulse"
                  : ""
              }`}
            >
              {isEditing ? <Check size={14} /> : <Edit3 size={14} />}
              <span>{isEditing ? "Pronto" : "Customizar"}</span>
            </button>

            {/* Dynamic PDF Trigger */}
            <button
              id="print-pdf-trigger"
              onClick={handlePrint}
              disabled={isGeneratingPdf}
              className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3.5 h-9 rounded-xl text-xs font-extrabold transition-all border bg-gradient-to-r border-emerald-500/30 ${
                isGeneratingPdf
                  ? "from-slate-700 to-slate-800 text-slate-400 border-slate-750 cursor-not-allowed"
                  : "from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 border-emerald-400 shadow-xl cursor-pointer"
              } ${
                tourStep !== null && currentSteps[tourStep]?.anchorId === "print-pdf-trigger"
                  ? "ring-4 ring-offset-4 ring-offset-slate-950 ring-emerald-400 scale-[1.03] animate-pulse text-white"
                  : ""
              }`}
            >
              <Printer size={14} className={isGeneratingPdf ? "animate-spin" : ""} />
              <span>{isGeneratingPdf ? "Gerando..." : "Baixar PDF"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ⚠️ LIVE COMPACTNESS BAR / A4 PROPORTION ANALYZER (PRINT-HIDDEN) */}
      <div className="bg-slate-900 border-b border-slate-900 px-4 py-1.5 flex justify-center items-center gap-4 text-xs print:hidden">
        <div 
          id="overflow-badge" 
          className={`flex items-center gap-2 p-1 rounded-lg transition-all duration-300 ${
            tourStep !== null && currentSteps[tourStep]?.anchorId === "overflow-badge"
              ? "ring-4 ring-offset-2 ring-offset-slate-900 ring-rose-500 scale-105 bg-rose-950/20"
              : ""
          }`}
        >
          {hasOverflowWarning ? (
            <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full font-bold flex items-center gap-1 animate-pulse">
              <AlertTriangle size={12} />
              <span>Atenção: Passando da folha única (Folha 180% cheia)!</span>
            </span>
          ) : (
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Check size={12} />
              <span>Perfeito: O volume de texto cabe perfeitamente em 1 página A4 física.</span>
            </span>
          )}
        </div>
        <p className="text-slate-400 text-[11px] hidden md:block">
          Dica: Se exceder, vá na aba <strong>Personalização</strong> e compacte a escala de fonte e margens!
        </p>
      </div>

      {/* 📦 CONTENT DIVISION: CONTROLS & RENDER HOUSINGS */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden print:overflow-visible">
        
        {/* 🛠️ EDIT PANEL (LEFT SIDEBAR, COLLAPSED IF NOT EDITING) */}
        {isEditing && (
          <aside className={`w-full lg:w-[460px] bg-slate-950 border-r border-slate-900 flex flex-col overflow-hidden leading-relaxed shrink-0 print:hidden ${mobileSubView === "edit" ? "flex" : "hidden lg:flex"}`}>
            
            {/* Tabs for Sidebar items control */}
            <div 
              id="panel-tabs" 
              className="border-b border-slate-900 bg-slate-950 p-2.5 grid grid-cols-3 gap-1.5 transition-all duration-300"
            >
              <button
                id="tab-contato"
                onClick={() => setActiveTab("contato")}
                className={`py-1.5 px-0.5 text-[10px] font-bold rounded-lg transition-all text-center truncate ${
                  activeTab === "contato" ? "bg-blue-600 text-white" : "text-slate-400 bg-slate-900 hover:text-white"
                } ${
                  tourStep !== null && currentSteps[tourStep]?.anchorId === "tab-contato"
                    ? "ring-4 ring-offset-1 ring-offset-slate-950 ring-amber-500 scale-[1.03] font-black z-10 bg-amber-600/20 text-white"
                    : ""
                }`}
                title="1. Meus Contatos"
              >
                📞 1. Contatos
              </button>
              <button
                id="tab-perfil"
                onClick={() => setActiveTab("dados")}
                className={`py-1.5 px-0.5 text-[10px] font-bold rounded-lg transition-all text-center truncate ${
                  activeTab === "dados" ? "bg-blue-600 text-white" : "text-slate-400 bg-slate-900 hover:text-white"
                } ${
                  tourStep !== null && currentSteps[tourStep]?.anchorId === "tab-perfil"
                    ? "ring-4 ring-offset-1 ring-offset-slate-950 ring-amber-500 scale-[1.03] font-black z-10 bg-amber-600/20 text-white"
                    : ""
                }`}
                title="2. Meu Perfil"
              >
                🌸 2. Perfil
              </button>
              <button
                id="tab-estudos"
                onClick={() => setActiveTab("formacao")}
                className={`py-1.5 px-0.5 text-[10px] font-bold rounded-lg transition-all text-center truncate ${
                  activeTab === "formacao" ? "bg-blue-600 text-white" : "text-slate-400 bg-slate-900 hover:text-white"
                } ${
                  tourStep !== null && currentSteps[tourStep]?.anchorId === "tab-estudos"
                    ? "ring-4 ring-offset-1 ring-offset-slate-950 ring-amber-500 scale-[1.03] font-black z-10 bg-amber-600/20 text-white"
                    : ""
                }`}
                title="3. Meus Estudos"
              >
                🎓 3. Estudos
              </button>
              <button
                id="tab-carreiras"
                onClick={() => setActiveTab("experiencia")}
                className={`py-1.5 px-0.5 text-[10px] font-bold rounded-lg transition-all text-center truncate ${
                  activeTab === "experiencia" ? "bg-blue-600 text-white" : "text-slate-400 bg-slate-900 hover:text-white"
                } ${
                  tourStep !== null && currentSteps[tourStep]?.anchorId === "tab-carreiras"
                    ? "ring-4 ring-offset-1 ring-offset-slate-950 ring-amber-500 scale-[1.03] font-black z-10 bg-amber-600/20 text-white"
                    : ""
                }`}
                title="4. Minhas Carreiras"
              >
                💼 4. Carreiras
              </button>
              <button
                id="tab-habilidades"
                onClick={() => setActiveTab("habilidades")}
                className={`py-1.5 px-0.5 text-[10px] font-bold rounded-lg transition-all text-center truncate ${
                  activeTab === "habilidades" ? "bg-blue-600 text-white" : "text-slate-400 bg-slate-900 hover:text-white"
                } ${
                  tourStep !== null && currentSteps[tourStep]?.anchorId === "tab-habilidades"
                    ? "ring-4 ring-offset-1 ring-offset-slate-950 ring-amber-500 scale-[1.03] font-black z-10 bg-amber-600/20 text-white"
                    : ""
                }`}
                title="5. Minhas Competências"
              >
                🏅 5. Habilidades
              </button>
              <button
                id="tab-personalizacao"
                onClick={() => setActiveTab("personalizacao")}
                className={`py-1.5 px-0.5 text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 truncate ${
                  activeTab === "personalizacao" ? "bg-blue-600 text-white" : "text-slate-400 bg-slate-900 hover:text-white"
                } ${
                  tourStep !== null && currentSteps[tourStep]?.anchorId === "tab-personalizacao"
                    ? "ring-4 ring-offset-1 ring-offset-slate-950 ring-amber-500 scale-[1.03] font-black z-10 bg-amber-600/20 text-white"
                    : ""
                }`}
                title="6. Aparência e Folha A4"
              >
                <Sliders size={10} className="shrink-0" />
                <span>⚙️ 6. Aparência</span>
              </button>
            </div>

            {/* Sidebar Scroll Area */}
            <div className="flex-1 overflow-y-auto custom-scroll p-4 space-y-4">
              
              {/* TAB 1: CONTATO */}
              {activeTab === "contato" && (
                <div className="space-y-3.5">
                  <div className="border-b border-slate-900 pb-2">
                    <h3 className="text-xs font-extrabold uppercase text-slate-300">Informações de Contato</h3>
                    <p className="text-[10px] text-slate-500">Insira suas informações pessoais de forma que os recrutadores te achem facilmente.</p>
                  </div>

                  {/* DRAG & DROP PHOTO UPLOADER */}
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-900 space-y-2">
                    <label className="block text-[10px] font-bold uppercase text-slate-400">Minha Foto de Perfil</label>
                    
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-xl p-3 flex flex-col items-center justify-center transition-all ${
                        dragActive
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-slate-800 bg-slate-950 hover:border-slate-700"
                      }`}
                    >
                      {cvData.picture ? (
                        <div className="flex flex-col items-center space-y-2">
                          <img
                            src={cvData.picture}
                            alt="Foto do perfil"
                            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow-md"
                            referrerPolicy="no-referrer"
                          />
                          <button
                            type="button"
                            onClick={() => setCvData(prev => ({ ...prev, picture: "" }))}
                            className="text-red-400 hover:text-red-300 text-[10px] font-bold flex items-center gap-1 bg-red-950/20 px-2.5 py-1 rounded"
                          >
                            <Trash2 size={10} /> Remover Minha Foto
                          </button>
                        </div>
                      ) : (
                        <div className="text-center space-y-1">
                          <div className="text-slate-500 text-[11px]">Arraste sua foto para cá ou</div>
                          <label className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] px-2.5 py-1 rounded cursor-pointer transition-colors shadow">
                            Escolher Imagem
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                    <p className="text-[9px] text-slate-500 text-center">
                      Dica: Use uma foto bem iluminada de rosto (estilo Susan McFly).
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Meu Nome Completo</label>
                    <input
                      type="text"
                      value={cvData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Minha Profissão ou Título</label>
                    <input
                      type="text"
                      placeholder="Ex: Estudante de Direito / Assistente Administrativa"
                      value={cvData.title}
                      onChange={(e) => updateField("title", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Meu Telefone</label>
                      <input
                        type="text"
                        value={cvData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">E-mail de Contato</label>
                      <input
                        type="text"
                        value={cvData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Onde Moro (Cidade - Estado)</label>
                    <input
                      type="text"
                      placeholder="Ex: São Paulo - SP"
                      value={cvData.location}
                      onChange={(e) => updateField("location", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">LinkedIn</label>
                    <input
                      type="text"
                      placeholder="Ex: linkedin.com/in/seu-perfil"
                      value={cvData.linkedin}
                      onChange={(e) => updateField("linkedin", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">GitHub</label>
                      <input
                        type="text"
                        placeholder="Ex: github.com/seu-usuario"
                        value={cvData.github || ""}
                        onChange={(e) => updateField("github", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Behance (Portfólio)</label>
                      <input
                        type="text"
                        placeholder="Ex: behance.net/seu-perfil"
                        value={cvData.behance || ""}
                        onChange={(e) => updateField("behance", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Portfólio / Site Pessoal</label>
                    <input
                      type="text"
                      placeholder="Ex: meudominio.com"
                      value={cvData.website || ""}
                      onChange={(e) => updateField("website", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>

                  <div className="border-t border-slate-900 pt-3 mt-1 space-y-3">
                    <label className="block text-[10px] font-bold uppercase text-slate-300">Minhas Redes Sociais extras</label>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[9px] font-medium text-slate-400 uppercase mb-1">Instagram</label>
                        <input
                          type="text"
                          placeholder="@seuinst"
                          value={cvData.instagram || ""}
                          onChange={(e) => updateField("instagram", e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded px-2 py-1 text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-400 uppercase mb-1">Skype</label>
                        <input
                          type="text"
                          placeholder="perfil.skype"
                          value={cvData.skype || ""}
                          onChange={(e) => updateField("skype", e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded px-2 py-1 text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-400 uppercase mb-1">Twitter / X</label>
                        <input
                          type="text"
                          placeholder="seutwitter"
                          value={cvData.twitter || ""}
                          onChange={(e) => updateField("twitter", e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded px-2 py-1 text-xs text-white outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PERFIL */}
              {activeTab === "dados" && (
                <div className="space-y-3.5">
                  <div className="border-b border-slate-900 pb-2">
                    <h3 className="text-xs font-extrabold uppercase text-slate-300">Objetivo Profissional</h3>
                    <p className="text-[10px] text-slate-500">Parágrafo essencial para captar a atenção do recrutador em 5 segundos.</p>
                  </div>

                  <div>
                    <AdvancedTextarea
                      label="Seu Objetivo (Síntese)"
                      value={cvData.objective}
                      onChange={(val) => updateField("objective", val)}
                      rows={7}
                      suggestions={[
                        "Profissional proativa com ótima comunicação verbal, buscando ingressar na área de suporte jurídico ou rotinas administrativas.",
                        "Estudante de Direito em busca de estágio acadêmico ou cargo administrativo focado em atendimento qualificado.",
                        "Busco oportunidade inicial para recepção e auxílio burocrático, agregando organização e foco em resultados."
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: FORMACAO */}
              {activeTab === "formacao" && (
                <div className="space-y-4">
                  <div className="border-b border-slate-900 pb-2 flex justify-between items-center">
                    <div>
                      <h3 className="text-xs font-extrabold uppercase text-slate-300">Formação Acadêmica</h3>
                      <p className="text-[10px] text-slate-500">Adicione ou reordene seus diplomas acadêmicos.</p>
                    </div>
                    <button
                      onClick={handleAddEdu}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] px-2 py-1 rounded flex items-center gap-0.5"
                    >
                      <Plus size={10} />
                      <span>Adicionar</span>
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    {cvData.education.map((item, index) => (
                      <div key={item.id} className="bg-slate-900/60 rounded-xl p-3 border border-slate-900 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] bg-blue-900/40 text-blue-400 font-bold px-2 py-0.5 rounded border border-blue-800/25">
                            Formação #{index + 1}
                          </span>
                          
                          <div className="flex items-center gap-1.5">
                            {/* Reordering Controls */}
                            <button
                              onClick={() => moveEducation(index, "up")}
                              disabled={index === 0}
                              className="p-1 rounded bg-slate-850 hover:bg-slate-800 text-slate-400 disabled:opacity-30"
                              title="Subir"
                            >
                              <ArrowUp size={11} />
                            </button>
                            <button
                              onClick={() => moveEducation(index, "down")}
                              disabled={index === cvData.education.length - 1}
                              className="p-1 rounded bg-slate-850 hover:bg-slate-800 text-slate-400 disabled:opacity-30"
                              title="Descer"
                            >
                              <ArrowDown size={11} />
                            </button>
                            
                            <button
                              onClick={() => handleDeleteEdu(item.id)}
                              className="text-red-400 hover:bg-red-950/40 p-1 rounded"
                              title="Excluir formação"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="Graduação ou Nível de Instrução"
                            value={item.degree}
                            onChange={(e) => handleUpdateEdu(item.id, "degree", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                          />
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="Nome da Instituição"
                            value={item.institution}
                            onChange={(e) => handleUpdateEdu(item.id, "institution", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Período (Ex: 2022 - Atual)"
                            value={item.period}
                            onChange={(e) => handleUpdateEdu(item.id, "period", e.target.value)}
                            className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300"
                          />
                          <input
                            type="text"
                            placeholder="Localidade (Ex: Arapiraca - AL)"
                            value={item.location}
                            onChange={(e) => handleUpdateEdu(item.id, "location", e.target.value)}
                            className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Status (Ex: Em andamento)"
                            value={item.status}
                            onChange={(e) => handleUpdateEdu(item.id, "status", e.target.value)}
                            className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300"
                          />
                        </div>

                        <div>
                          <AdvancedTextarea
                            label="Comentário ou Diferencial Curricular"
                            placeholder="Breve comentário ou diferencial curricular"
                            rows={3}
                            value={item.description}
                            onChange={(val) => handleUpdateEdu(item.id, "description", val)}
                            suggestions={[
                              "Destaque em oratória acadêmica, redação de artigos e debates interdisciplinares.",
                              "Foco na disciplina de direito civil, mediação de conflitos e informática aplicada.",
                              "Participação ativa em projetos de extensão voluntária e organização de comissões estudantis."
                            ]}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: EXPERIENCIA */}
              {activeTab === "experiencia" && (
                <div className="space-y-4">
                  <div className="border-b border-slate-900 pb-2 flex justify-between items-center">
                    <div>
                      <h3 className="text-xs font-extrabold uppercase text-slate-300">Experiência Real</h3>
                      <p className="text-[10px] text-slate-500">Destaque conquistas tangíveis e atuações profissionais.</p>
                    </div>
                    <button
                      onClick={handleAddExp}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] px-2 py-1 rounded flex items-center gap-0.5"
                    >
                      <Plus size={10} />
                      <span>Adicionar</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {cvData.experience.map((item, index) => (
                      <div key={item.id} className="bg-slate-900/60 rounded-xl p-3 border border-slate-900 space-y-2">
                        <div className="flex items-center justify-between font-bold">
                          <span className="text-[10px] bg-indigo-900/30 text-indigo-400 px-2 py-0.5 rounded border border-indigo-800/35">
                            Cargo #{index + 1}
                          </span>
                          
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => moveExperience(index, "up")}
                              disabled={index === 0}
                              className="p-1 rounded bg-slate-850 hover:bg-slate-800 text-slate-400 disabled:opacity-30"
                            >
                              <ArrowUp size={11} />
                            </button>
                            <button
                              onClick={() => moveExperience(index, "down")}
                              disabled={index === cvData.experience.length - 1}
                              className="p-1 rounded bg-slate-850 hover:bg-slate-800 text-slate-400 disabled:opacity-30"
                            >
                              <ArrowDown size={11} />
                            </button>
                            
                            <button
                              onClick={() => handleDeleteExp(item.id)}
                              className="text-red-400 hover:bg-red-950/40 p-1 rounded"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="Função (Ex: Auxiliar de Cartório)"
                            value={item.role}
                            onChange={(e) => handleUpdateExp(item.id, "role", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                          />
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="Organização / Empresa"
                            value={item.company}
                            onChange={(e) => handleUpdateExp(item.id, "company", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Período (Ex: Fev 2022 - Atual)"
                            value={item.period}
                            onChange={(e) => handleUpdateExp(item.id, "period", e.target.value)}
                            className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300"
                          />
                          <input
                            type="text"
                            placeholder="Local (Ex: Maceió - AL)"
                            value={item.location}
                            onChange={(e) => handleUpdateExp(item.id, "location", e.target.value)}
                            className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300"
                          />
                        </div>

                        <div>
                          <AdvancedTextarea
                            label="Resumo Sintético"
                            placeholder="Breve descrição da sua atuação principal neste cargo..."
                            rows={3}
                            value={item.description}
                            onChange={(val) => handleUpdateExp(item.id, "description", val)}
                            suggestions={[
                              "Atuação direta no acolhimento ao público externo, triagem de correspondências e suporte burocrático de secretaria.",
                              "Responsável pela elaboração de ofícios simples, digitalização de petições e apoio geral em rotinas judiciais.",
                              "Organização e indexação de dados em sistemas digitais, atendimento telefônico cordial e agendamento de reuniões."
                            ]}
                          />
                        </div>

                        {/* Bullets lists directly in experience to increase design complexity */}
                        <div className="space-y-1.5 pt-2 border-t border-slate-900">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Atividades Principais (Tópicos)</span>
                            <button
                              onClick={() => handleAddBulletToExp(item.id)}
                              className="text-blue-400 hover:text-blue-300 text-[10px] font-bold flex items-center gap-0.5"
                            >
                              <Plus size={10} /> Adicionar Tópico
                            </button>
                          </div>
                          
                          {item.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-1">
                              <input
                                type="text"
                                value={bullet}
                                onChange={(e) => handleUpdateBulletInExp(item.id, bIdx, e.target.value)}
                                className="flex-1 bg-slate-900 text-slate-200 text-[11px] rounded px-2 py-0.5 border border-slate-850"
                              />
                              <button
                                onClick={() => handleDeleteBulletFromExp(item.id, bIdx)}
                                className="text-red-400 hover:bg-slate-850 p-1 rounded"
                                title="Remover tópico"
                              >
                                <Trash2 size={11} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: HABILIDADES */}
              {activeTab === "habilidades" && (
                <div className="space-y-4">
                  
                  {/* Skills lists section */}
                  <div className="space-y-3">
                    <div className="border-b border-slate-900 pb-2 flex justify-between items-center">
                      <div>
                        <h3 className="text-xs font-extrabold uppercase text-slate-300">Habilidades</h3>
                        <p className="text-[10px] text-slate-500">Defina suas qualificações e ajuste os níveis práticos.</p>
                      </div>
                      <button
                        onClick={handleAddSkill}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] px-2 py-1 rounded flex items-center gap-0.5"
                      >
                        <Plus size={10} /> Adicionar
                      </button>
                    </div>

                    <div className="space-y-2">
                      {cvData.skills.map((sk, index) => (
                        <div key={sk.id} className="bg-slate-900/40 p-2.5 rounded-lg border border-slate-900 space-y-2">
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={sk.name}
                              onChange={(e) => handleUpdateSkill(sk.id, e.target.value, sk.level)}
                              className="bg-slate-950 font-semibold text-white text-xs px-2 py-1 rounded w-3/4 border border-slate-900Focus"
                            />
                            
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => moveSkill(index, "up")}
                                disabled={index === 0}
                                className="p-0.5 rounded bg-slate-850 hover:bg-slate-800 text-slate-400 disabled:opacity-35"
                              >
                                <ArrowUp size={10} />
                              </button>
                              <button
                                onClick={() => moveSkill(index, "down")}
                                disabled={index === cvData.skills.length - 1}
                                className="p-0.5 rounded bg-slate-850 hover:bg-slate-800 text-slate-400 disabled:opacity-35"
                              >
                                <ArrowDown size={10} />
                              </button>
                              
                              <button
                                onClick={() => handleDeleteSkill(sk.id)}
                                className="text-red-400 p-1 hover:bg-red-950/20 rounded"
                              >
                                <Trash2 size={11} />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <input
                              type="range"
                              min="10"
                              max="100"
                              step="5"
                              value={sk.level}
                              onChange={(e) => handleUpdateSkill(sk.id, sk.name, Number(e.target.value))}
                              className="flex-1 accent-blue-500 h-1"
                            />
                            <span className="text-[10px] font-mono font-bold text-blue-400 w-8 text-right">
                              {sk.level}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Languages lists section */}
                  <div className="space-y-3 pt-3 border-t border-slate-900">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xs font-extrabold uppercase text-slate-300">Idiomas</h4>
                      </div>
                      <button
                        onClick={handleAddLang}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] px-2 py-1 rounded flex items-center gap-0.5"
                      >
                        <Plus size={10} /> Adicionar
                      </button>
                    </div>

                    <div className="space-y-2">
                      {cvData.languages.map((lg, index) => (
                        <div key={lg.id} className="bg-slate-900/40 p-2 rounded border border-slate-900 flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Idioma"
                            value={lg.name}
                            onChange={(e) => handleUpdateLang(lg.id, "name", e.target.value)}
                            className="bg-slate-950 text-white text-xs rounded px-2 py-0.5 w-1/2 border border-slate-900"
                          />
                          <input
                            type="text"
                            placeholder="Fluência (Ex: Nativo)"
                            value={lg.level}
                            onChange={(e) => handleUpdateLang(lg.id, "level", e.target.value)}
                            className="bg-slate-950 text-slate-300 text-xs rounded px-2 py-0.5 w-5/12 border border-slate-900"
                          />
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => moveLanguage(index, "up")}
                              disabled={index === 0}
                              className="p-0.5 rounded bg-slate-850 hover:bg-slate-800 text-slate-400 disabled:opacity-35"
                            >
                              <ArrowUp size={9} />
                            </button>
                            <button
                              onClick={() => handleDeleteLang(lg.id)}
                              className="text-red-400 p-1 rounded hover:bg-red-950/20"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* References & Atividades complementares */}
                  <div className="space-y-4 pt-3 border-t border-slate-900">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-[10px] font-bold uppercase text-slate-400">
                          Cursos &amp; Atividades Complementares
                        </label>
                        <button
                          type="button"
                          onClick={handleAddCourse}
                          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-[9px] px-2 py-0.5 rounded flex items-center gap-0.5 transition-colors"
                        >
                          <Plus size={10} /> Adicionar Curso
                        </button>
                      </div>

                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                        {!cvData.courses || cvData.courses.length === 0 ? (
                          <p className="text-[10px] text-slate-500 italic">Nenhum curso na lista. Clique em Adicionar.</p>
                        ) : (
                          cvData.courses.map((item, index) => (
                            <div key={item.id} className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-900 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] text-blue-400 font-bold uppercase font-mono">Curso #{index + 1}</span>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => moveCourse(index, "up")}
                                    disabled={index === 0}
                                    className="p-0.5 rounded bg-slate-900 hover:bg-slate-850 text-slate-400 disabled:opacity-30"
                                    title="Subir"
                                  >
                                    <ArrowUp size={10} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => moveCourse(index, "down")}
                                    disabled={index === cvData.courses.length - 1}
                                    className="p-0.5 rounded bg-slate-900 hover:bg-slate-850 text-slate-400 disabled:opacity-30"
                                    title="Descer"
                                  >
                                    <ArrowDown size={10} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteCourse(item.id)}
                                    className="text-red-400 hover:bg-red-950/40 p-0.5 rounded"
                                    title="Remover"
                                  >
                                    <Trash2 size={11} />
                                  </button>
                                </div>
                              </div>

                              <input
                                type="text"
                                placeholder="Nome do Curso, Atividade ou Certificado"
                                value={item.name}
                                onChange={(e) => handleUpdateCourse(item.id, "name", e.target.value)}
                                className="w-full bg-slate-900 border border-slate-850 rounded px-2 py-1 text-xs text-white outline-none focus:border-blue-500"
                              />

                              <input
                                type="text"
                                placeholder="Ano ou Período (Ex: 2023)"
                                value={item.year || ""}
                                onChange={(e) => handleUpdateCourse(item.id, "year", e.target.value)}
                                className="w-full bg-slate-900 border border-slate-850 rounded px-2 py-0.5 text-[10px] text-slate-300 outline-none focus:border-blue-500"
                              />
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div>
                      <AdvancedTextarea
                        label="Referências"
                        placeholder="Ex: Referências profissionais disponíveis sob consulta."
                        value={cvData.references}
                        onChange={(val) => updateField("references", val)}
                        rows={2}
                        suggestions={[
                          "Informações de contato e referências docentes/profissionais disponíveis mediante solicitação.",
                          "Contatos de antigos coordenadores e referências acadêmicas à disposição.",
                          "Referências robustas de conduta e desempenho acadêmico fornecidas caso solicitado."
                        ]}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: PERSONALIZACAO & A4 CONTROL */}
              {activeTab === "personalizacao" && (
                <div className="space-y-4">
                  <div className="border-b border-slate-900 pb-2">
                    <h3 className="text-xs font-extrabold uppercase text-slate-300">Aparência &amp; Ajustes do Papel</h3>
                    <p className="text-[10px] text-slate-500">Deixe seu currículo com a sua cara e garanta que caiba em uma única folha A4.</p>
                  </div>

                  {/* 1. SEÇÃO DINÂMICA CONFORME O MODO (COLORIDO vs PRETO E BRANCO) */}
                  {designStyle === "colorido" ? (
                    <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-900 space-y-3">
                      <div>
                        <h4 className="text-xs font-bold uppercase text-slate-300 flex items-center gap-1.5">
                          <span>🎨 Controles do Modelo Colorido</span>
                        </h4>
                        <p className="text-[10px] text-slate-500">O sistema organiza as cores e contrastes para manter a leitura legível automaticamente.</p>
                      </div>

                      {/* Sugestões de Cores */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase">Sugestões Especiais</label>
                        <div className="grid grid-cols-4 gap-1.5">
                          {PRESET_COLORS.map((preset) => (
                            <button
                              key={preset.hex}
                              onClick={() => setPrimaryColor(preset.hex)}
                              className={`flex flex-col items-center gap-1 p-1 rounded-lg border transition-all ${
                                primaryColor.toLowerCase() === preset.hex.toLowerCase()
                                  ? "border-blue-500 bg-slate-900 shadow-sm"
                                  : "border-slate-800 bg-slate-950 hover:border-slate-700"
                              }`}
                              title={preset.name}
                            >
                              <span
                                className="w-5 h-5 rounded-full shadow border border-white/10"
                                style={{ backgroundColor: preset.hex }}
                              />
                              <span className="text-[8px] text-slate-400 font-bold truncate max-w-full">
                                {preset.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Custom Picker */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-900 bg-slate-950/40 p-2 rounded-lg border border-slate-900">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-300 uppercase">Seletor de Cor Livre</span>
                          <span className="text-[9px] font-mono text-slate-500">{primaryColor.toUpperCase()}</span>
                        </div>
                        <input
                          type="color"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent"
                        />
                      </div>

                      {/* Intensity Slider */}
                      <div className="pt-2 border-t border-slate-900 bg-slate-950/40 p-2.5 rounded-lg border border-slate-900 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-300 uppercase">Intensidade da Cor da Barra</span>
                          <span className="text-[10px] font-mono font-bold text-blue-400">{colorIntensity}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          step="5"
                          value={colorIntensity}
                          onChange={(e) => setColorIntensity(Number(e.target.value))}
                          className="w-full cursor-pointer accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none"
                        />
                        <p className="text-[8.5px] text-slate-400 leading-snug">
                          Ajusta a tonalidade da barra esquerda no modelo colorido.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-900 space-y-3 animate-fade-in">
                      <div>
                        <h4 className="text-xs font-bold uppercase text-slate-300 flex items-center gap-1.5">
                          <span>👔 Controles do Modelo Preto e Branco</span>
                        </h4>
                        <p className="text-[10px] text-slate-500">Ajuste propriedades sofisticadas e clássicas de linhas e imagens para impressão tradicional.</p>
                      </div>

                      {/* Estilo da Linha */}
                      <div className="space-y-1.5 bg-slate-950/40 p-2.5 rounded-lg border border-slate-900">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold text-slate-300 uppercase">Estilo das Linhas Horizontais</span>
                          <span className="text-[9px] font-mono text-slate-400 uppercase">{bwBorderStyle === "solid" ? "Sólida" : bwBorderStyle === "dashed" ? "Tracejada" : "Dupla"}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1 rounded">
                          {[
                            { id: "solid", label: "Sólida" },
                            { id: "dashed", label: "Tracejada" },
                            { id: "double", label: "Dupla" }
                          ].map((borderOption) => (
                            <button
                              key={borderOption.id}
                              onClick={() => setBwBorderStyle(borderOption.id as any)}
                              className={`py-1 text-[9px] font-bold rounded uppercase transition-all ${
                                bwBorderStyle === borderOption.id ? "bg-slate-850 text-white border border-slate-700" : "text-slate-450 hover:text-white"
                              }`}
                            >
                              {borderOption.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Foto Preto e Branco */}
                      <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-900">
                        <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer hover:text-white">
                          <span className="font-bold text-[10px] uppercase">Retrato em Tons de Cinza</span>
                          <input
                            type="checkbox"
                            checked={bwPhotoGrayscale}
                            onChange={(e) => setBwPhotoGrayscale(e.target.checked)}
                            className="rounded border-slate-800 text-slate-600 bg-slate-950 h-4 w-4 accent-white"
                          />
                        </label>
                        <p className="text-[8.5px] text-slate-500 leading-snug mt-1">
                          Converte a foto para tons de cinza automaticamente para uma estética de publicação clássica de livro/jornal.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 2. CHOOSE FONT FAMILY */}
                  <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-900 space-y-2.5">
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-300">✍️ Estilo de Letra (Fonte)</h4>
                      <p className="text-[10px] text-slate-500">Mude a fonte de todo o documento para dar um tom diferente e melhorar a leitura.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-1.5 bg-slate-950 p-2 rounded-lg border border-slate-900">
                      {[
                        { id: "inter", name: "Moderna Prática (Fonte Inter)" },
                        { id: "georgia", name: "Clássico Sabor (Fonte Georgia)" },
                        { id: "playfair", name: "Editorial Elegante (Playfair Display)" },
                        { id: "space_grotesk", name: "Estilo Tecnológico (Space Grotesk)" },
                        { id: "jetbrains_mono", name: "Máquina Compacta (JetBrains Mono)" }
                      ].map((fontItem) => (
                        <button
                          key={fontItem.id}
                          onClick={() => setFontFamily(fontItem.id as any)}
                          className={`w-full text-left px-3 py-2 rounded text-xs font-bold flex items-center justify-between transition-colors ${
                            fontFamily === fontItem.id 
                              ? "bg-blue-600 text-white" 
                              : "text-slate-100 hover:bg-slate-900 hover:text-white"
                          }`}
                        >
                          <span>{fontItem.name}</span>
                          {fontFamily === fontItem.id && <Check size={11} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. FINE-TUNED FONT SIZES CONTROL */}
                  <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-900 space-y-3.5">
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-300">📐 Tamanho das Letras (Ajuste Fino por Elemento)</h4>
                      <p className="text-[10px] text-slate-500">Ajuste perfeitamente o tamanho exato de cada tipo de informação no currículo para caber na folha A4.</p>
                    </div>

                    {/* Nome do Candidato */}
                    <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-900 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-300 uppercase">Nome do Candidato</span>
                        <span className="text-[10.5px] font-mono font-bold text-blue-400">{fontSizeName}px</span>
                      </div>
                      <input
                        type="range"
                        min="16"
                        max="36"
                        step="1"
                        value={fontSizeName}
                        onChange={(e) => setFontSizeName(Number(e.target.value))}
                        className="w-full cursor-pointer accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none"
                      />
                    </div>

                    {/* Cargo / Título Superior */}
                    <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-900 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-300 uppercase">Cargo / Profissão</span>
                        <span className="text-[10.5px] font-mono font-bold text-blue-400">{fontSizeTitle}px</span>
                      </div>
                      <input
                        type="range"
                        min="8"
                        max="18"
                        step="0.5"
                        value={fontSizeTitle}
                        onChange={(e) => setFontSizeTitle(Number(e.target.value))}
                        className="w-full cursor-pointer accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none"
                      />
                    </div>

                    {/* Títulos das Seções */}
                    <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-900 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-300 uppercase">Títulos das Seções</span>
                        <span className="text-[10.5px] font-mono font-bold text-blue-400">{fontSizeSection}px</span>
                      </div>
                      <input
                        type="range"
                        min="8"
                        max="18"
                        step="0.5"
                        value={fontSizeSection}
                        onChange={(e) => setFontSizeSection(Number(e.target.value))}
                        className="w-full cursor-pointer accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none"
                      />
                    </div>

                    {/* Texto do Corpo */}
                    <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-900 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-300 uppercase">Texto do Corpo &amp; Bullet Points</span>
                        <span className="text-[10.5px] font-mono font-bold text-blue-400">{fontSizeBody}px</span>
                      </div>
                      <input
                        type="range"
                        min="7"
                        max="14"
                        step="0.5"
                        value={fontSizeBody}
                        onChange={(e) => setFontSizeBody(Number(e.target.value))}
                        className="w-full cursor-pointer accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none"
                      />
                    </div>

                    {/* Barra Lateral */}
                    <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-900 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-300 uppercase">Barra Lateral / Detalhes de Contato</span>
                        <span className="text-[10.5px] font-mono font-bold text-blue-400">{fontSizeSidebar}px</span>
                      </div>
                      <input
                        type="range"
                        min="7"
                        max="14"
                        step="0.5"
                        value={fontSizeSidebar}
                        onChange={(e) => setFontSizeSidebar(Number(e.target.value))}
                        className="w-full cursor-pointer accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none"
                      />
                    </div>
                  </div>

                  {/* 4. FINE-TUNED SPACINGS */}
                  <div className="space-y-3.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-900">
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-300">↕️ Controle Fino de Espaçamentos</h4>
                      <p className="text-[10px] text-slate-500">Esprema ou solte os espaços em branco para caber cirurgicamente em uma folha.</p>
                    </div>

                    {/* Espaço entre seções */}
                    <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-900 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-300 uppercase">Espaço entre Seções</span>
                        <span className="text-[10.5px] font-mono font-bold text-indigo-400">{customSectionSpacing}px</span>
                      </div>
                      <input
                        type="range"
                        min="4"
                        max="30"
                        step="1"
                        value={customSectionSpacing}
                        onChange={(e) => setCustomSectionSpacing(Number(e.target.value))}
                        className="w-full cursor-pointer accent-indigo-500 h-1.5 bg-slate-800 rounded-lg appearance-none"
                      />
                    </div>

                    {/* Altura de linha / Line Height */}
                    <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-900 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-300 uppercase">Altura das Linhas (Line Height)</span>
                        <span className="text-[10.5px] font-mono font-bold text-indigo-400">{(customLineHeight / 100).toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="110"
                        max="180"
                        step="5"
                        value={customLineHeight}
                        onChange={(e) => setCustomLineHeight(Number(e.target.value))}
                        className="w-full cursor-pointer accent-indigo-500 h-1.5 bg-slate-800 rounded-lg appearance-none"
                      />
                    </div>
                  </div>

                  {/* 5. TOGGLE CONTENT SECTIONS */}
                  <div className="space-y-2.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-900">
                    <h4 className="text-[10px] uppercase font-bold text-slate-300 mb-2">👁️ Mostrar ou Ocultar Seções</h4>
                    
                    <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        checked={!hidePicture}
                        onChange={(e) => setHidePicture(!e.target.checked)}
                        className="rounded border-slate-800 text-blue-600 bg-slate-950 accent-blue-500 h-3.5 w-3.5"
                      />
                      <span>Mostrar foto de perfil</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        checked={!hideObjective}
                        onChange={(e) => setHideObjective(!e.target.checked)}
                        className="rounded border-slate-800 text-blue-600 bg-slate-950 accent-blue-500 h-3.5 w-3.5"
                      />
                      <span>Mostrar Objetivo Profissional / Perfil</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        checked={!hideEducation}
                        onChange={(e) => setHideEducation(!e.target.checked)}
                        className="rounded border-slate-800 text-blue-600 bg-slate-950 accent-blue-500 h-3.5 w-3.5"
                      />
                      <span>Mostrar Meus Estudos</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        checked={!hideExperience}
                        onChange={(e) => setHideExperience(!e.target.checked)}
                        className="rounded border-slate-800 text-blue-600 bg-slate-950 accent-blue-500 h-3.5 w-3.5"
                      />
                      <span>Mostrar Experiências de Trabalho</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        checked={!hideSkills}
                        onChange={(e) => setHideSkills(!e.target.checked)}
                        className="rounded border-slate-800 text-blue-600 bg-slate-950 accent-blue-500 h-3.5 w-3.5"
                      />
                      <span>Mostrar Habilidades Técnicas</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        checked={!hideLanguages}
                        onChange={(e) => setHideLanguages(!e.target.checked)}
                        className="rounded border-slate-800 text-blue-600 bg-slate-950 accent-blue-500 h-3.5 w-3.5"
                      />
                      <span>Mostrar Idiomas</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        checked={!hideAdditional}
                        onChange={(e) => setHideAdditional(!e.target.checked)}
                        className="rounded border-slate-800 text-blue-600 bg-slate-950 accent-blue-500 h-3.5 w-3.5"
                      />
                      <span>Mostrar Atividades e Cursos Complementares</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        checked={!hideReferences}
                        onChange={(e) => setHideReferences(!e.target.checked)}
                        className="rounded border-slate-800 text-blue-600 bg-slate-950 accent-blue-500 h-3.5 w-3.5"
                      />
                      <span>Mostrar Seção de Referências</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar Sticky Footer info */}
            <div className="border-t border-slate-900 p-3.5 bg-slate-950 flex items-center justify-between text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <Info size={11} className="text-blue-400" />
                <span>Salva automaticamente na memória local.</span>
              </span>
            </div>
          </aside>
        )}

        {/* 📄 THE ACTUAL PREVIEW VIEWPORT AREA (CANVAS STAGE) */}
        <div className={`flex-1 p-3 md:p-8 bg-slate-900/40 flex justify-center items-start overflow-y-auto custom-scroll print:p-0 print:bg-white ${mobileSubView === "preview" || !isEditing ? "flex" : "hidden lg:flex"}`}>
          <div
            ref={cvSheetRef}
            style={getFontFamilyStyle(fontFamily)}
            className="a4-container bg-white text-slate-800 shadow-2xl overflow-hidden flex flex-col justify-between border border-slate-200 print:shadow-none print:border-none print:m-0 print:rounded-none select-text"
          >
            {designStyle === "colorido" ? (
              (() => {
                const hasPhone = cvData.phone && cvData.phone.trim() !== "";
                const hasEmail = cvData.email && cvData.email.trim() !== "";
                const hasLocation = cvData.location && cvData.location.trim() !== "";
                const hasLinkedin = cvData.linkedin && cvData.linkedin.trim() !== "";
                const hasGithub = cvData.github && cvData.github.trim() !== "";
                const hasBehance = cvData.behance && cvData.behance.trim() !== "";
                const hasWebsite = cvData.website && cvData.website.trim() !== "";
                const hasSkype = cvData.skype && cvData.skype.trim() !== "";
                const hasInstagram = cvData.instagram && cvData.instagram.trim() !== "";
                const hasTwitter = cvData.twitter && cvData.twitter.trim() !== "";
                const hasAnyContact = hasPhone || hasEmail || hasLocation || hasLinkedin || hasGithub || hasBehance || hasWebsite || hasSkype || hasInstagram || hasTwitter;

                const hasReferences = !hideReferences && cvData.references && cvData.references.trim() !== "";

                const validEducation = cvData.education ? cvData.education.filter(edu => (edu.degree && edu.degree.trim() !== "") || (edu.institution && edu.institution.trim() !== "")) : [];
                const hasEducation = !hideEducation && validEducation.length > 0;

                const validLanguages = cvData.languages ? cvData.languages.filter(lg => lg.name && lg.name.trim() !== "") : [];
                const hasLanguages = !hideLanguages && validLanguages.length > 0;

                const hasObjective = !hideObjective && cvData.objective && cvData.objective.trim() !== "";

                const validExperience = cvData.experience ? cvData.experience.filter(exp => (exp.role && exp.role.trim() !== "") || (exp.company && exp.company.trim() !== "")) : [];
                const hasExperience = !hideExperience && validExperience.length > 0;

                const validSkills = cvData.skills ? cvData.skills.filter(sk => sk.name && sk.name.trim() !== "") : [];
                const hasSkills = !hideSkills && validSkills.length > 0;

                const validCourses = cvData.courses ? cvData.courses.filter(c => c.name && c.name.trim() !== "") : [];
                const hasAdditional = !hideAdditional && validCourses.length > 0;

                // Color Mechanics
                const sidebarBg = (() => {
                  try {
                    const { r, g, b } = hexToRgb(primaryColor);
                    const factor = colorIntensity / 100;
                    const mixedR = Math.round(r * factor + 255 * (1 - factor));
                    const mixedG = Math.round(g * factor + 255 * (1 - factor));
                    const mixedB = Math.round(b * factor + 255 * (1 - factor));
                    return `rgb(${mixedR}, ${mixedG}, ${mixedB})`;
                  } catch {
                    return primaryColor;
                  }
                })();

                const sidebarContrastColor = (() => {
                  try {
                    const { r, g, b } = hexToRgb(primaryColor);
                    const factor = colorIntensity / 100;
                    const mixedR = Math.round(r * factor + 255 * (1 - factor));
                    const mixedG = Math.round(g * factor + 255 * (1 - factor));
                    const mixedB = Math.round(b * factor + 255 * (1 - factor));
                    return getRgbContrastColor(mixedR, mixedG, mixedB);
                  } catch {
                    return getContrastColor(primaryColor);
                  }
                })();

                const sidebarTextMain = sidebarContrastColor;
                const sidebarTextSecondary = sidebarContrastColor === "#ffffff" ? "rgba(255, 255, 255, 0.72)" : "rgba(15, 23, 42, 0.75)";
                const sidebarBorderColor = sidebarContrastColor === "#ffffff" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)";
                const sidebarIconColor = sidebarContrastColor === "#ffffff" ? "rgba(255, 255, 255, 0.95)" : primaryColor;
                const sidebarBulletColor = sidebarContrastColor === "#ffffff" ? "rgba(255, 255, 255, 0.85)" : primaryColor;
                const sidebarHeaderBackground = sidebarContrastColor === "#ffffff" ? "rgba(255, 255, 255, 0.12)" : "rgba(15, 23, 42, 0.05)";

                return (
                  <div className="flex-1 grid grid-cols-12 h-full print:bg-white select-text">
                    {/* Lateral Esquerda - Barra de Informações Dinâmica */}
                    <div
                      style={{ backgroundColor: sidebarBg }}
                      className="col-span-4 p-6 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        {/* Foto de Perfil Redonda */}
                        {!hidePicture && (
                          <div className="flex flex-col items-center text-center pb-4 mb-2 border-b" style={{ borderColor: sidebarBorderColor }}>
                            {cvData.picture ? (
                              <div className="relative shrink-0">
                                <img
                                  src={cvData.picture}
                                  alt={cvData.name}
                                  className="w-28 h-28 rounded-full border-2 shadow-xl object-cover object-center"
                                  style={{ borderColor: sidebarContrastColor }}
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            ) : (
                              <div
                                style={{
                                  backgroundColor: sidebarContrastColor === "#ffffff" ? "rgba(255, 255, 255, 0.15)" : "rgba(15, 23, 42, 0.1)",
                                  color: sidebarTextMain,
                                  borderColor: sidebarContrastColor === "#ffffff" ? "rgba(255, 255, 255, 0.2)" : "rgba(15, 23, 42, 0.2)"
                                }}
                                className="w-20 h-20 rounded-full border-2 shadow-md flex items-center justify-center font-extrabold text-2xl"
                              >
                                {cvData.name ? cvData.name.substring(0, 2).toUpperCase() : "CV"}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Contatos */}
                        {hasAnyContact && (
                          <div>
                            <div
                              style={{
                                backgroundColor: sidebarHeaderBackground,
                                color: sidebarTextMain,
                                fontSize: fontSizeSection + "px",
                                borderColor: sidebarBorderColor
                              }}
                              className="w-full py-1.5 px-2 text-center font-extrabold uppercase tracking-widest mb-3 rounded-sm border-y shadow-xs"
                            >
                              CONTATO
                            </div>
                            <div className="space-y-2" style={{ fontSize: fontSizeSidebar + "px" }}>
                              {hasPhone && (
                                <div style={{ color: sidebarTextMain }} className="flex flex-col mb-2 pl-1 text-left">
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <Phone size={11} className="shrink-0" style={{ color: sidebarIconColor }} />
                                    <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75">Telefone</span>
                                  </div>
                                  <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-medium">{cvData.phone}</span>
                                </div>
                              )}
                              {hasEmail && (
                                <div style={{ color: sidebarTextMain }} className="flex flex-col mb-2 pl-1 text-left truncate">
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <Mail size={11} className="shrink-0" style={{ color: sidebarIconColor }} />
                                    <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75">E-mail</span>
                                  </div>
                                  <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-medium truncate">{cvData.email}</span>
                                </div>
                              )}
                              {hasLocation && (
                                <div style={{ color: sidebarTextMain }} className="flex flex-col mb-2 pl-1 text-left">
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <MapPin size={11} className="shrink-0" style={{ color: sidebarIconColor }} />
                                    <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75">Endereço</span>
                                  </div>
                                  <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-medium">{cvData.location}</span>
                                </div>
                              )}
                              {hasLinkedin && (
                                <div style={{ color: sidebarTextMain }} className="flex flex-col mb-2 pl-1 text-left truncate">
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <LinkIcon size={11} className="shrink-0" style={{ color: sidebarIconColor }} />
                                    <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75">LinkedIn</span>
                                  </div>
                                  <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-medium truncate">{cvData.linkedin}</span>
                                </div>
                              )}
                              {hasGithub && (
                                <div style={{ color: sidebarTextMain }} className="flex flex-col mb-2 pl-1 text-left truncate">
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <Github size={11} className="shrink-0" style={{ color: sidebarIconColor }} />
                                    <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75">GitHub</span>
                                  </div>
                                  <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-medium truncate">{cvData.github}</span>
                                </div>
                              )}
                              {hasBehance && (
                                <div style={{ color: sidebarTextMain }} className="flex flex-col mb-2 pl-1 text-left truncate">
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <Palette size={11} className="shrink-0" style={{ color: sidebarIconColor }} />
                                    <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75">Behance</span>
                                  </div>
                                  <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-medium truncate">{cvData.behance}</span>
                                </div>
                              )}
                              {hasWebsite && (
                                <div style={{ color: sidebarTextMain }} className="flex flex-col mb-2 pl-1 text-left truncate">
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <Globe size={11} className="shrink-0" style={{ color: sidebarIconColor }} />
                                    <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75">Site / Portfólio</span>
                                  </div>
                                  <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-medium truncate">{cvData.website}</span>
                                </div>
                              )}
                              {(hasSkype || hasInstagram || hasTwitter) && (
                                <div className="pt-2 mt-2 border-t space-y-2 text-left" style={{ borderColor: sidebarBorderColor }}>
                                  {hasSkype && (
                                    <div style={{ color: sidebarTextMain }} className="flex flex-col pl-1">
                                      <div className="flex items-center gap-1.5 mb-0.5">
                                        <Globe size={11} style={{ color: sidebarIconColor }} />
                                        <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75">Skype</span>
                                      </div>
                                      <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-medium">{cvData.skype}</span>
                                    </div>
                                  )}
                                  {hasInstagram && (
                                    <div style={{ color: sidebarTextMain }} className="flex flex-col pl-1">
                                      <div className="flex items-center gap-1.5 mb-0.5">
                                        <Instagram size={11} style={{ color: sidebarIconColor }} />
                                        <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75">Instagram</span>
                                      </div>
                                      <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-medium">@{cvData.instagram}</span>
                                    </div>
                                  )}
                                  {hasTwitter && (
                                    <div style={{ color: sidebarTextMain }} className="flex flex-col pl-1">
                                      <div className="flex items-center gap-1.5 mb-0.5">
                                        <Twitter size={11} style={{ color: sidebarIconColor }} />
                                        <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75">Twitter (X)</span>
                                      </div>
                                      <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-medium">{cvData.twitter}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Habilidades / Competências */}
                        {hasSkills && (
                          <div>
                            <div
                              style={{
                                backgroundColor: sidebarHeaderBackground,
                                color: sidebarTextMain,
                                fontSize: fontSizeSection + "px",
                                borderColor: sidebarBorderColor
                              }}
                              className="w-full py-1.5 px-2 text-center font-extrabold uppercase tracking-widest mb-3 rounded-sm border-y shadow-xs"
                            >
                              HABILIDADES
                            </div>
                            <div className="space-y-1.5 pl-1.5 text-left" style={{ color: sidebarTextMain }}>
                              {validSkills.map((sk) => (
                                <div key={sk.id} style={{ fontSize: fontSizeSidebar + "px", lineHeight: (customLineHeight / 100) }} className="flex items-center gap-2 font-semibold">
                                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: sidebarBulletColor }} />
                                  <span>{sk.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Idiomas */}
                        {hasLanguages && (
                          <div>
                            <div
                              style={{
                                backgroundColor: sidebarHeaderBackground,
                                color: sidebarTextMain,
                                fontSize: fontSizeSection + "px",
                                borderColor: sidebarBorderColor
                              }}
                              className="w-full py-1.5 px-2 text-center font-extrabold uppercase tracking-widest mb-3 rounded-sm border-y shadow-xs"
                            >
                              IDIOMAS
                            </div>
                            <div className="space-y-1.5 pl-1.5 text-left" style={{ color: sidebarTextMain }}>
                              {validLanguages.map((lg) => (
                                <div key={lg.id} style={{ fontSize: fontSizeSidebar + "px", lineHeight: (customLineHeight / 100) }} className="flex justify-between items-center">
                                  <div className="flex items-center gap-2 font-semibold font-sans">
                                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: sidebarBulletColor }} />
                                    <span>{lg.name}</span>
                                  </div>
                                  {lg.level && (
                                    <span style={{ backgroundColor: sidebarContrastColor === "#ffffff" ? "rgba(255, 255, 255, 0.15)" : "rgba(15, 23, 42, 0.1)", color: sidebarTextMain, fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="px-1.5 py-0.5 rounded font-bold uppercase font-mono shrink-0">
                                      {lg.level}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Referências */}
                      {hasReferences && (
                        <div>
                          <div
                            style={{
                              backgroundColor: sidebarHeaderBackground,
                              color: sidebarTextMain,
                              fontSize: fontSizeSection + "px",
                              borderColor: sidebarBorderColor
                            }}
                            className="w-full py-1.5 px-2 text-center font-extrabold uppercase tracking-widest mb-2 rounded-sm border-y shadow-xs animate-fade-in"
                          >
                            REFERÊNCIAS
                          </div>
                          <div className="pl-1.5 font-sans text-left">
                            <p style={{ color: sidebarTextMain, fontSize: fontSizeSidebar + "px", lineHeight: (customLineHeight / 100) }} className="italic">
                              "{cvData.references}"
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Coluna Direta - Conteúdo em Papel Branco */}
                    <div className="col-span-8 p-6 flex flex-col justify-between bg-white text-slate-800">
                      <div className="flex flex-col h-full" style={{ gap: customSectionSpacing + "px" }}>
                        {/* Bloco Elegante de Destaque com o Nome (Elegante, Coeso com a cor primária) */}
                        <div className="flex flex-col justify-center items-center text-center pb-1">
                          <h1
                            style={{ color: primaryColor, fontSize: fontSizeName + "px" }}
                            className="font-black uppercase tracking-wide leading-none font-sans text-wrap break-words text-center"
                          >
                            {cvData.name}
                          </h1>
                          {cvData.title && (
                            <p style={{ fontSize: fontSizeTitle + "px" }} className="text-slate-600 uppercase tracking-widest font-extrabold mt-1.5 font-sans text-center">
                              {cvData.title}
                            </p>
                          )}
                        </div>

                        {/* Perfil Profissional / Resumo */}
                        {hasObjective && (
                          <div className="print-break-avoid">
                            <div
                              style={{
                                backgroundColor: "rgba(241, 245, 249, 0.75)",
                                borderLeft: `4px solid ${primaryColor}`,
                              }}
                              className="p-4 rounded-r-lg"
                            >
                              <p style={{ fontSize: fontSizeBody + "px", lineHeight: (customLineHeight / 100) }} className="text-slate-750 text-justify font-sans font-medium">
                                {cvData.objective}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Experiências Profissionais com Linha do Tempo e Conector */}
                        {hasExperience && (
                          <div className="col-span-12 font-sans">
                            <div
                              style={{
                                backgroundColor: primaryColor,
                                color: getContrastColor(primaryColor),
                                fontSize: fontSizeSection + "px"
                              }}
                              className="w-full py-1 px-4 text-center font-extrabold uppercase tracking-widest mb-4 shadow-sm rounded-sm"
                            >
                              EXPERIÊNCIA PROFISSIONAL
                            </div>
                            <div className="relative pl-5 ml-2 border-l-2 space-y-4 text-left" style={{ borderColor: getSecondaryColor(primaryColor, 0.25) }}>
                              {validExperience.map((exp) => (
                                <div key={exp.id} className="relative print-break-avoid font-sans">
                                  {/* Círculo do marcador temporal na linha */}
                                  <div
                                    className="absolute -left-[26px] top-[2.5px] w-[10px] h-[10px] rounded-full border-2 bg-white"
                                    style={{ borderColor: primaryColor }}
                                  />
                                  <div className="flex justify-between items-start">
                                    <strong style={{ color: primaryColor, fontSize: (fontSizeBody + 1.5) + "px" }} className="font-extrabold uppercase tracking-wide">
                                      {exp.role}
                                    </strong>
                                    <span style={{ fontSize: Math.max(7, fontSizeBody - 0.5) + "px" }} className="font-mono font-bold text-slate-500 whitespace-nowrap bg-slate-100 px-1.5 py-0.5 rounded">
                                      {exp.period}
                                    </span>
                                  </div>
                                  {(exp.company || exp.location) && (
                                    <p style={{ fontSize: (fontSizeBody - 0.5) + "px" }} className="text-slate-500 font-bold mt-0.5 uppercase tracking-wide">
                                      {exp.company} {exp.location && <span className="text-slate-400 font-normal">| {exp.location}</span>}
                                    </p>
                                  )}
                                  
                                  {exp.description && (
                                    <p style={{ fontSize: fontSizeBody + "px", lineHeight: (customLineHeight / 100) }} className="text-slate-650 text-justify mt-1.5 font-medium">
                                      {exp.description}
                                    </p>
                                  )}

                                  {exp.bullets && exp.bullets.filter(b => b && b.trim() !== "").length > 0 && (
                                    <ul className="list-disc pl-3.5 mt-1.5 space-y-0.5">
                                      {exp.bullets.filter(b => b && b.trim() !== "").map((bullet, idx) => (
                                        <li key={idx} style={{ fontSize: (fontSizeBody - 0.5) + "px", lineHeight: (customLineHeight / 100) }} className="leading-relaxed text-slate-500 font-medium">
                                          {bullet}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Educação com Linha do Tempo e Conector */}
                        {hasEducation && (
                          <div className="font-sans">
                            <div
                              style={{
                                backgroundColor: primaryColor,
                                color: getContrastColor(primaryColor),
                                fontSize: fontSizeSection + "px"
                              }}
                              className="w-full py-1 px-4 text-center font-extrabold uppercase tracking-widest mb-4 shadow-sm rounded-sm"
                            >
                              FORMAÇÃO ACADÊMICA
                            </div>
                            <div className="relative pl-5 ml-2 border-l-2 space-y-4 text-left" style={{ borderColor: getSecondaryColor(primaryColor, 0.25) }}>
                              {validEducation.map((edu) => (
                                <div key={edu.id} className="relative print-break-avoid" style={{ color: "rgb(30, 41, 59)" }}>
                                  {/* Círculo do marcador temporal na linha */}
                                  <div
                                    className="absolute -left-[26px] top-[2.5px] w-[10px] h-[10px] rounded-full border-2 bg-white"
                                    style={{ borderColor: primaryColor }}
                                  />
                                  <div className="flex justify-between items-start">
                                    <strong style={{ color: primaryColor, fontSize: (fontSizeBody + 1.5) + "px" }} className="font-extrabold uppercase tracking-wide">
                                      {edu.degree}
                                    </strong>
                                    <span style={{ fontSize: Math.max(7, fontSizeBody - 0.5) + "px" }} className="font-mono font-bold text-slate-500 whitespace-nowrap bg-slate-100 px-1.5 py-0.5 rounded">
                                      {edu.period}
                                    </span>
                                  </div>
                                  {(edu.institution || edu.location || edu.status) && (
                                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                      <span style={{ fontSize: (fontSizeBody - 0.5) + "px" }} className="text-slate-500 font-bold uppercase tracking-wide">
                                        {edu.institution} {edu.location && <span className="text-slate-400 font-normal">| {edu.location}</span>}
                                      </span>
                                      {edu.status && (
                                        <span className="uppercase font-bold tracking-wider px-1 py-0.2 rounded" style={{ backgroundColor: getSecondaryColor(primaryColor, 0.08), color: primaryColor, fontSize: Math.max(6.5, fontSizeBody - 2) + "px" }}>
                                          {edu.status}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                  {edu.description && (
                                    <p style={{ fontSize: fontSizeBody + "px", lineHeight: (customLineHeight / 100) }} className="text-slate-650 text-justify mt-1 font-medium">
                                      {edu.description}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Cursos e Atividades Complementares */}
                        {hasAdditional && (
                          <div className="font-sans print-break-avoid">
                            <div
                              style={{
                                backgroundColor: primaryColor,
                                color: getContrastColor(primaryColor),
                                fontSize: fontSizeSection + "px"
                              }}
                              className="w-full py-1 px-4 text-center font-extrabold uppercase tracking-widest mb-3 shadow-sm rounded-sm"
                            >
                              CURSOS &amp; ATIVIDADES COMPLEMENTARES
                            </div>
                            <div className="space-y-1.5 pl-1.5 font-medium">
                              {validCourses.map((c) => (
                                <div key={c.id} className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-1.5 flex-1">
                                    <span style={{ color: primaryColor, fontSize: fontSizeBody + "px" }} className="mt-0.5">•</span>
                                    <span style={{ fontSize: fontSizeBody + "px", lineHeight: (customLineHeight / 100) }} className="text-slate-650 text-justify">
                                      {c.name}
                                    </span>
                                  </div>
                                  {c.year && (
                                    <span style={{ fontSize: fontSizeBody + "px" }} className="text-slate-500 font-bold whitespace-nowrap">
                                      ({c.year})
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Assinatura de rodapé */}
                      <div className="pt-2 border-t border-slate-150 flex items-center justify-between text-[7px] text-slate-400 font-sans uppercase tracking-wider">
                        <span>Currículo de Alta Performance</span>
                        <span>{cvData.name} • {new Date().getFullYear()}</span>
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : (
              (() => {
                const hasPhone = cvData.phone && cvData.phone.trim() !== "";
                const hasEmail = cvData.email && cvData.email.trim() !== "";
                const hasLocation = cvData.location && cvData.location.trim() !== "";
                const hasLinkedin = cvData.linkedin && cvData.linkedin.trim() !== "";
                const hasGithub = cvData.github && cvData.github.trim() !== "";
                const hasBehance = cvData.behance && cvData.behance.trim() !== "";
                const hasWebsite = cvData.website && cvData.website.trim() !== "";
                const hasSkype = cvData.skype && cvData.skype.trim() !== "";
                const hasInstagram = cvData.instagram && cvData.instagram.trim() !== "";
                const hasTwitter = cvData.twitter && cvData.twitter.trim() !== "";
                const hasAnyContact = hasPhone || hasEmail || hasLocation || hasLinkedin || hasGithub || hasBehance || hasWebsite || hasSkype || hasInstagram || hasTwitter;

                const hasReferences = !hideReferences && cvData.references && cvData.references.trim() !== "";

                const validEducation = cvData.education ? cvData.education.filter(edu => (edu.degree && edu.degree.trim() !== "") || (edu.institution && edu.institution.trim() !== "")) : [];
                const hasEducation = !hideEducation && validEducation.length > 0;

                const validLanguages = cvData.languages ? cvData.languages.filter(lg => lg.name && lg.name.trim() !== "") : [];
                const hasLanguages = !hideLanguages && validLanguages.length > 0;

                const hasObjective = !hideObjective && cvData.objective && cvData.objective.trim() !== "";

                const validExperience = cvData.experience ? cvData.experience.filter(exp => (exp.role && exp.role.trim() !== "") || (exp.company && exp.company.trim() !== "")) : [];
                const hasExperience = !hideExperience && validExperience.length > 0;

                const validSkills = cvData.skills ? cvData.skills.filter(sk => sk.name && sk.name.trim() !== "") : [];
                const hasSkills = !hideSkills && validSkills.length > 0;

                const validCourses = cvData.courses ? cvData.courses.filter(c => c.name && c.name.trim() !== "") : [];
                const hasAdditional = !hideAdditional && validCourses.length > 0;

                return (
                  /* ==============================================================================
                     Preset B: MODERN BLACK & WHITE EDITORIAL (Classic Multi-Column Layout)
                     ============================================================================== */
                  <div className="flex-1 flex flex-col justify-between h-full print:bg-white select-text bg-white p-[18mm] pb-[15mm]">
                    {/* Linha Lateral & Conteúdo em Grid */}
                    <div className="grid grid-cols-12 flex-1">
                      {/* Lateral Esquerda - Barra de Informações Dinâmica P&B */}
                      <div
                        className="col-span-4 pr-6 flex flex-col justify-between text-slate-900 bg-white font-sans"
                      >
                      <div className="space-y-4">
                        {/* Foto de Perfil Redonda P&B (sem linha pontilhada abaixo) */}
                        {!hidePicture && (
                          <div className="flex flex-col items-center text-center pb-4 mb-2">
                            {cvData.picture ? (
                              <div className="relative shrink-0">
                                <img
                                  src={cvData.picture}
                                  alt={cvData.name}
                                  className={`w-28 h-28 rounded-full border-2 shadow-sm object-cover object-center ${bwPhotoGrayscale ? "filter grayscale contrast-115 brightness-105" : ""}`}
                                  style={{ borderColor: "#000000" }}
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            ) : (
                              <div
                                style={{
                                  backgroundColor: "rgba(15, 23, 42, 0.05)",
                                  color: "#000000",
                                  borderColor: "#000000"
                                }}
                                className="w-20 h-20 rounded-full border-2 shadow-sm flex items-center justify-center font-extrabold text-2xl"
                              >
                                {cvData.name ? cvData.name.substring(0, 2).toUpperCase() : "CV"}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Contatos P&B */}
                        {hasAnyContact && (
                          <div>
                            <div
                              style={{
                                borderBottomWidth: bwBorderStyle === "double" ? "3px" : "1px",
                                borderBottomStyle: bwBorderStyle,
                                borderColor: "#000000",
                                fontSize: fontSizeSection + "px"
                              }}
                              className="w-full pb-1 font-extrabold uppercase tracking-widest mb-3 text-black text-left"
                            >
                              CONTATO
                            </div>
                            <div className="space-y-2" style={{ fontSize: fontSizeSidebar + "px" }}>
                              {hasPhone && (
                                <div className="flex flex-col mb-2 pl-0.5 text-left text-slate-950">
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <Phone size={11} className="shrink-0 text-black" />
                                    <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75 text-black">Telefone</span>
                                  </div>
                                  <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-semibold">{cvData.phone}</span>
                                </div>
                              )}
                              {hasEmail && (
                                <div className="flex flex-col mb-2 pl-0.5 text-left truncate text-slate-950">
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <Mail size={11} className="shrink-0 text-black" />
                                    <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75 text-black">E-mail</span>
                                  </div>
                                  <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-semibold truncate">{cvData.email}</span>
                                </div>
                              )}
                              {hasLocation && (
                                <div className="flex flex-col mb-2 pl-0.5 text-left text-slate-950">
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <MapPin size={11} className="shrink-0 text-black" />
                                    <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75 text-black">Endereço</span>
                                  </div>
                                  <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-semibold">{cvData.location}</span>
                                </div>
                              )}
                              {hasLinkedin && (
                                <div className="flex flex-col mb-2 pl-0.5 text-left truncate text-slate-950">
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <LinkIcon size={11} className="shrink-0 text-black" />
                                    <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75 text-black">LinkedIn</span>
                                  </div>
                                  <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-semibold truncate">{cvData.linkedin}</span>
                                </div>
                              )}
                              {hasGithub && (
                                <div className="flex flex-col mb-2 pl-0.5 text-left truncate text-slate-950">
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <Github size={11} className="shrink-0 text-black" />
                                    <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75 text-black">GitHub</span>
                                  </div>
                                  <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-semibold truncate">{cvData.github}</span>
                                </div>
                              )}
                              {hasBehance && (
                                <div className="flex flex-col mb-2 pl-0.5 text-left truncate text-slate-950">
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <Palette size={11} className="shrink-0 text-black" />
                                    <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75 text-black">Behance</span>
                                  </div>
                                  <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-semibold truncate">{cvData.behance}</span>
                                </div>
                              )}
                              {hasWebsite && (
                                <div className="flex flex-col mb-2 pl-0.5 text-left truncate text-slate-950">
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <Globe size={11} className="shrink-0 text-black" />
                                    <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75 text-black">Site / Portfólio</span>
                                  </div>
                                  <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-semibold truncate">{cvData.website}</span>
                                </div>
                              )}
                              {(hasSkype || hasInstagram || hasTwitter) && (
                                <div className="pt-2 mt-2 border-t space-y-2 text-left" style={{ borderColor: "rgba(0, 0, 0, 0.15)" }}>
                                  {hasSkype && (
                                    <div className="flex flex-col pl-0.5 text-slate-900">
                                      <div className="flex items-center gap-1.5 mb-0.5">
                                        <Globe size={11} className="text-black" />
                                        <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75">Skype</span>
                                      </div>
                                      <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-semibold">{cvData.skype}</span>
                                    </div>
                                  )}
                                  {hasInstagram && (
                                    <div className="flex flex-col pl-0.5 text-slate-900">
                                      <div className="flex items-center gap-1.5 mb-0.5">
                                        <Instagram size={11} className="text-black" />
                                        <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75">Instagram</span>
                                      </div>
                                      <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-semibold">@{cvData.instagram}</span>
                                    </div>
                                  )}
                                  {hasTwitter && (
                                    <div className="flex flex-col pl-0.5 text-slate-900">
                                      <div className="flex items-center gap-1.5 mb-0.5">
                                        <Twitter size={11} className="text-black" />
                                        <span style={{ fontSize: Math.max(7, fontSizeSidebar - 1.5) + "px" }} className="font-extrabold uppercase tracking-wider opacity-75">Twitter (X)</span>
                                      </div>
                                      <span style={{ fontSize: fontSizeSidebar + "px" }} className="font-sans font-semibold">{cvData.twitter}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Habilidades P&B */}
                        {hasSkills && (
                          <div>
                            <div
                              style={{
                                borderBottomWidth: bwBorderStyle === "double" ? "3px" : "1px",
                                borderBottomStyle: bwBorderStyle,
                                borderColor: "#000000",
                                fontSize: fontSizeSection + "px"
                              }}
                              className="w-full pb-1 font-extrabold uppercase tracking-widest mb-3 text-black text-left"
                            >
                              HABILIDADES
                            </div>
                            <div className="space-y-1.5 pl-0.5 text-left text-slate-900">
                              {validSkills.map((sk) => (
                                <div key={sk.id} style={{ fontSize: fontSizeSidebar + "px", lineHeight: (customLineHeight / 100) }} className="flex items-center gap-2 font-bold text-slate-900">
                                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                                  <span>{sk.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Idiomas P&B (sem borda na fluência) */}
                        {hasLanguages && (
                          <div>
                            <div
                              style={{
                                borderBottomWidth: bwBorderStyle === "double" ? "3px" : "1px",
                                borderBottomStyle: bwBorderStyle,
                                borderColor: "#000000",
                                fontSize: fontSizeSection + "px"
                              }}
                              className="w-full pb-1 font-extrabold uppercase tracking-widest mb-3 text-black text-left"
                            >
                              IDIOMAS
                            </div>
                            <div className="space-y-1.5 pl-0.5 text-left text-slate-900">
                              {validLanguages.map((lg) => (
                                <div key={lg.id} style={{ fontSize: fontSizeSidebar + "px", lineHeight: (customLineHeight / 100) }} className="flex justify-between items-center text-slate-900 font-bold">
                                  <div className="flex items-center gap-2 font-sans">
                                    <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                                    <span>{lg.name}</span>
                                  </div>
                                  {lg.level && (
                                    <span style={{ fontSize: Math.max(7.5, fontSizeSidebar - 1) + "px" }} className="font-extrabold uppercase font-sans text-slate-800 shrink-0">
                                      {lg.level}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Referências P&B */}
                        {hasReferences && (
                          <div>
                            <div
                              style={{
                                borderBottomWidth: bwBorderStyle === "double" ? "3px" : "1px",
                                borderBottomStyle: bwBorderStyle,
                                borderColor: "#000000",
                                fontSize: fontSizeSection + "px"
                              }}
                              className="w-full pb-1 font-extrabold uppercase tracking-widest mb-2 text-black text-left"
                            >
                              REFERÊNCIAS
                            </div>
                            <div className="pl-0.5 font-sans text-left">
                              <p style={{ fontSize: fontSizeSidebar + "px", lineHeight: (customLineHeight / 100) }} className="text-slate-800 italic">
                                "{cvData.references}"
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                      {/* Coluna Direta - Conteúdo em Papel Branco P&B */}
                      <div className="col-span-8 pl-6 flex flex-col h-full justify-between bg-white text-slate-950">
                        <div className="flex flex-col h-full" style={{ gap: customSectionSpacing + "px" }}>
                        {/* Bloco de Nome e Título P&B */}
                        <div className="flex flex-col pb-1 text-left">
                          <h1
                            style={{ fontSize: fontSizeName + "px" }}
                            className="font-black uppercase tracking-wide leading-none font-sans text-black text-left"
                          >
                            {cvData.name}
                          </h1>
                          {cvData.title && (
                            <p style={{ fontSize: fontSizeTitle + "px" }} className="text-slate-800 uppercase tracking-widest font-extrabold mt-1.5 font-sans text-left">
                              {cvData.title}
                            </p>
                          )}
                        </div>

                        {/* Perfil Profissional / Resumo P&B */}
                        {hasObjective && (
                          <div className="print-break-avoid">
                            <div
                              style={{
                                borderLeftWidth: bwBorderStyle === "double" ? "4px" : "3px",
                                borderLeftStyle: bwBorderStyle,
                                borderColor: "#000000",
                                backgroundColor: "rgba(240, 244, 248, 0.45)",
                              }}
                              className="p-4 rounded-r-lg"
                            >
                              <p style={{ fontSize: fontSizeBody + "px", lineHeight: (customLineHeight / 100) }} className="text-slate-900 text-justify font-sans font-medium">
                                {cvData.objective}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Experiências Profissionais P&B (sem badge no período) */}
                        {hasExperience && (
                          <div className="col-span-12 font-sans">
                            <div
                              style={{
                                borderBottomWidth: bwBorderStyle === "double" ? "3px" : "1px",
                                borderBottomStyle: bwBorderStyle,
                                borderColor: "#000000",
                                fontSize: fontSizeSection + "px"
                              }}
                              className="w-full pb-1 font-extrabold uppercase tracking-widest mb-4 text-black text-left"
                            >
                              EXPERIÊNCIA PROFISSIONAL
                            </div>
                            <div className="relative pl-5 ml-2 border-l-2 space-y-4 text-left" style={{ borderColor: "rgba(0, 0, 0, 0.25)" }}>
                              {validExperience.map((exp) => (
                                <div key={exp.id} className="relative print-break-avoid font-sans">
                                  {/* Círculo do marcador temporal na linha */}
                                  <div
                                    className="absolute -left-[26px] top-[2.5px] w-[10px] h-[10px] rounded-full border bg-white"
                                    style={{ borderColor: "#000000", borderWidth: "2px" }}
                                  />
                                  <div className="flex justify-between items-start font-sans">
                                    <strong style={{ fontSize: (fontSizeBody + 1.5) + "px" }} className="font-extrabold uppercase tracking-wide text-black">
                                      {exp.role}
                                    </strong>
                                    <span style={{ fontSize: Math.max(7.5, fontSizeBody - 0.5) + "px" }} className="font-mono font-bold text-slate-800 whitespace-nowrap">
                                      {exp.period}
                                    </span>
                                  </div>
                                  {(exp.company || exp.location) && (
                                    <p style={{ fontSize: (fontSizeBody - 0.5) + "px" }} className="text-slate-800 font-bold mt-0.5 uppercase tracking-wide">
                                      {exp.company} {exp.location && <span className="text-slate-600 font-bold">| {exp.location}</span>}
                                    </p>
                                  )}
                                  
                                  {exp.description && (
                                    <p style={{ fontSize: fontSizeBody + "px", lineHeight: (customLineHeight / 100) }} className="text-slate-800 text-justify mt-1.5 font-semibold">
                                      {exp.description}
                                    </p>
                                  )}
                                  
                                  {exp.bullets && exp.bullets.filter(b => b && b.trim() !== "").length > 0 && (
                                    <ul className="list-disc pl-3.5 mt-1.5 space-y-0.5">
                                      {exp.bullets.filter(b => b && b.trim() !== "").map((bullet, idx) => (
                                        <li key={idx} style={{ fontSize: (fontSizeBody - 0.5) + "px", lineHeight: (customLineHeight / 100) }} className="leading-relaxed text-slate-800 font-medium">
                                          {bullet}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Educação P&B (sem badge no período e no status) */}
                        {hasEducation && (
                          <div className="font-sans">
                            <div
                              style={{
                                borderBottomWidth: bwBorderStyle === "double" ? "3px" : "1px",
                                borderBottomStyle: bwBorderStyle,
                                borderColor: "#000000",
                                fontSize: fontSizeSection + "px"
                              }}
                              className="w-full pb-1 font-extrabold uppercase tracking-widest mb-4 text-black text-left"
                            >
                              FORMAÇÃO ACADÊMICA
                            </div>
                            <div className="relative pl-5 ml-2 border-l-2 space-y-4 text-left" style={{ borderColor: "rgba(0, 0, 0, 0.25)" }}>
                              {validEducation.map((edu) => (
                                <div key={edu.id} className="relative print-break-avoid" style={{ color: "rgb(15, 23, 42)" }}>
                                  {/* Círculo do marcador temporal na linha */}
                                  <div
                                    className="absolute -left-[26px] top-[2.5px] w-[10px] h-[10px] rounded-full border bg-white"
                                    style={{ borderColor: "#000000", borderWidth: "2px" }}
                                  />
                                  <div className="flex justify-between items-start font-sans">
                                    <strong style={{ fontSize: (fontSizeBody + 1.5) + "px" }} className="font-extrabold uppercase tracking-wide text-black font-sans">
                                      {edu.degree}
                                    </strong>
                                    <span style={{ fontSize: Math.max(7.5, fontSizeBody - 0.5) + "px" }} className="font-mono font-bold text-slate-800 whitespace-nowrap">
                                      {edu.period}
                                    </span>
                                  </div>
                                  {(edu.institution || edu.location || edu.status) && (
                                    <div className="flex items-center gap-1.5 mt-0.5 flex-wrap font-sans">
                                      <span style={{ fontSize: (fontSizeBody - 0.5) + "px" }} className="text-slate-800 font-bold uppercase tracking-wide">
                                        {edu.institution} {edu.location && <span className="text-slate-600 font-bold">| {edu.location}</span>}
                                      </span>
                                      {edu.status && (
                                        <span className="uppercase font-extrabold tracking-wider text-slate-800" style={{ fontSize: Math.max(7, fontSizeBody - 1.5) + "px" }}>
                                          | {edu.status}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                  {edu.description && (
                                    <p style={{ fontSize: fontSizeBody + "px", lineHeight: (customLineHeight / 100) }} className="text-slate-800 text-justify mt-1 font-semibold font-sans">
                                      {edu.description}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Cursos e Atividades Complementares P&B */}
                        {hasAdditional && (
                          <div className="font-sans print-break-avoid">
                            <div
                              style={{
                                borderBottomWidth: bwBorderStyle === "double" ? "3px" : "1px",
                                borderBottomStyle: bwBorderStyle,
                                borderColor: "#000000",
                                fontSize: fontSizeSection + "px"
                              }}
                              className="w-full pb-1 font-extrabold uppercase tracking-widest mb-3 text-black text-left"
                            >
                              CURSOS &amp; ATIVIDADES COMPLEMENTARES
                            </div>
                            <div className="space-y-1.5 pl-1.5 font-semibold">
                              {validCourses.map((c) => (
                                <div key={c.id} className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-1.5 flex-1">
                                    <span className="text-black font-extrabold" style={{ fontSize: fontSizeBody + "px" }}>•</span>
                                    <span style={{ fontSize: fontSizeBody + "px", lineHeight: (customLineHeight / 100) }} className="text-slate-800 text-justify">
                                      {c.name}
                                    </span>
                                  </div>
                                  {c.year && (
                                    <span style={{ fontSize: fontSizeBody + "px" }} className="text-slate-800 font-bold whitespace-nowrap">
                                      ({c.year})
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      </div>
                    </div>

                    {/* Assinatura de rodapé P&B que pega o espaço completo */}
                    <div
                      style={{
                        borderTopStyle: bwBorderStyle,
                        borderTopWidth: bwBorderStyle === "double" ? "3px" : "1px",
                        borderColor: "#000000"
                      }}
                      className="pt-2 flex items-center justify-between text-[7.5px] text-slate-600 font-sans uppercase tracking-wider mt-4"
                    >
                      <span>Currículo de Alta Performance P&amp;B</span>
                      <span>{cvData.name} • {new Date().getFullYear()}</span>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </div>
      </div>

      {/* 📱 MOBILE NAVIGATION BAR SWITCHER (Printed-Hidden, only visible on mobile screen) */}
      {isEditing && tourStep === null && (
        <div className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-[80] bg-slate-900/95 backdrop-blur-md border border-slate-850 rounded-full py-2 px-2.5 flex items-center gap-2 shadow-2xl print:hidden">
          <button
            onClick={() => setMobileSubView("edit")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              mobileSubView === "edit"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Edit3 size={13} />
            <span>1. Escrever Informações</span>
          </button>
          
          <button
            onClick={() => setMobileSubView("preview")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all relative ${
              mobileSubView === "preview"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Eye size={13} />
            <span>2. Ver Meus Resultados</span>
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </button>
        </div>
      )}
      {showPrintHelper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 print:hidden">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100 font-sans">
            <button
              onClick={() => setShowPrintHelper(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              title="Fechar"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2.5 text-emerald-400 mb-4">
              <Printer size={20} />
              <h3 className="font-extrabold uppercase tracking-wider text-sm font-sans">Assistente de PDF</h3>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed mb-4">
              O navegador pode ter limitado a pré-visualização ou download direto do PDF dentro do iframe do AI Studio.
            </p>

            <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/40 space-y-2 mb-5">
              <div className="flex gap-2 items-start text-xs text-slate-400">
                <span className="bg-emerald-500/20 text-emerald-400 font-mono text-[10px] w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">1</span>
                <span>Tente no botão **Baixar PDF Direto** para gerar o documento localmente.</span>
              </div>
              <div className="flex gap-2 items-start text-xs text-slate-400">
                <span className="bg-emerald-500/20 text-emerald-400 font-mono text-[10px] w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">2</span>
                <span>Se persistir, clique em **Abrir em Nova Guia** para realizar o download livre de restrições do iframe!</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  handlePrint();
                  setShowPrintHelper(false);
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-2.5 rounded-xl text-xs flex justify-center items-center gap-1.5 shadow-lg shadow-emerald-500/10 transition-all border border-emerald-400"
              >
                <Check size={14} />
                <span>Baixar PDF Direto</span>
              </button>
              
              <button
                onClick={() => {
                  window.open(window.location.href, '_blank');
                  setShowPrintHelper(false);
                }}
                className="w-full bg-slate-800 hover:bg-slate-705 text-slate-300 font-bold py-2 rounded-xl text-xs transition-all border border-slate-700"
              >
                Abrir em Nova Guia e Baixar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
