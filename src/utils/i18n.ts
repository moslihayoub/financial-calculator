import type { Language } from '../store'

type Translations = {
  [key in Language]: {
    // Global Settings
    globalSettings: string
    clientName: string
    documentDate: string
    documentRef: string
    partnerAgency: string
    currency: string
    language: string
    theme: string
    themeLight: string
    themeDark: string
    themeSystem: string
    
    // Services
    services: string
    active: string
    serviceName: string
    rateType: string
    rateHT: string
    rateHTFull: string
    quantity: string
    quantityFull: string
    dueDate: string
    tva: string
    tvaFull: string
    commission: string
    commissionFull: string
    day: string
    hour: string
    
    // Financial Summary
    financialSummary: string
    totalHT: string
    totalHTShort: string
    totalTVA: string
    totalTVAShort: string
    totalTTC: string
    totalTTCShort: string
    totalCommission: string
    totalCommissionShort: string
    netProfit: string
    netProfitShort: string
    
    // Exports
    exportProforma: string
    exportPO: string
    exportEmail: string
    exportWhatsapp: string
    copyToClipboard: string
    copied: string

    // Document Generation templates
    proformaTitle: string
    poTitle: string
    poText: string
    poSignature: string
    emailSubject: string
    emailBody: string
    whatsappText: string
    // New actions
    addService: string
    description: string
    close: string
    share: string
    sendEmail: string
    selectAll: string
    generateDocuments: string
    // Profile
    settingsTitle: string
    profile: string
    name: string
    title: string
    phone: string
    email: string
  }
}

export const translations: Translations = {
  FR: {
    globalSettings: 'Configuration Globale',
    clientName: 'Nom du Client',
    documentDate: 'Date du Document',
    documentRef: 'Référence Document',
    partnerAgency: "Nom de l'Agence Partenaire",
    currency: 'Choix de la Devise',
    language: 'Sélecteur de Langue',
    theme: 'Gestion du Thème',
    themeLight: 'Clair',
    themeDark: 'Sombre',
    themeSystem: 'Système',
    
    services: 'Services',
    active: 'Actif',
    serviceName: 'Nom du Service',
    rateType: 'Type',
    rateHT: 'Tarif Unit. (HT)',
    rateHTFull: 'Tarif Unitaire (HT)',
    quantity: 'Qté/Vol',
    quantityFull: 'Quantité / Volume',
    dueDate: "Date d'échéance",
    tva: 'TVA%',
    tvaFull: 'TVA (%)',
    commission: 'Comm.%',
    commissionFull: 'Commission Agence (%)',
    day: 'Jour',
    hour: 'Heure',

    financialSummary: 'Résumé Financier',
    totalHT: 'Total Général HT',
    totalHTShort: 'Total HT',
    totalTVA: 'Total Général TVA',
    totalTVAShort: 'Total TVA',
    totalTTC: 'Total Général TTC',
    totalTTCShort: 'Total TTC',
    totalCommission: 'Total Commissions Agence',
    totalCommissionShort: 'Commissions',
    netProfit: 'Bénéfice Net Réel Encaissé',
    netProfitShort: 'Bénéfice Net',

    exportProforma: 'Générer Facture Proforma',
    exportPO: 'Générer Bon de Commande',
    exportEmail: 'Générer Email',
    exportWhatsapp: 'Générer Message WhatsApp',
    copyToClipboard: 'Copier',
    copied: 'Copié !',

    proformaTitle: 'FACTURE PROFORMA',
    poTitle: 'BON DE COMMANDE',
    poText: 'Par la présente, nous confirmons la commande pour les services décrits ci-dessous, selon les termes et tarifs convenus.',
    poSignature: 'Bon pour accord, précédé de la date et signature',
    emailSubject: 'Proposition de Services et Partenariat',
    emailBody: "Bonjour,\n\nSuite à nos échanges, vous trouverez ci-dessous le détail de notre proposition d'accompagnement.\n\nDans le cadre de notre structuration et pour garantir une conformité totale, notre agence partenaire {partnerAgency} assurera le portage de ce contrat.\n\nRestant à votre disposition pour toute question,\nCordialement.",
    whatsappText: "Bonjour ! Voici le récapitulatif de notre proposition :\n\n",

    addService: 'Ajouter un service',
    description: 'Description',
    close: 'Fermer',
    share: 'Partager',
    sendEmail: 'Envoyer',
    selectAll: 'Tout sélectionner',
    generateDocuments: 'Générer les documents',

    settingsTitle: 'Paramètres',
    profile: 'Mon Profil',
    name: 'Nom complet',
    title: 'Titre / Expertise',
    phone: 'Téléphone',
    email: 'Email',
  },
  ENG: {
    globalSettings: 'Global Configuration',
    clientName: 'Client Name',
    documentDate: 'Document Date',
    documentRef: 'Document Ref',
    partnerAgency: 'Partner Agency',
    currency: 'Currency',
    language: 'Language',
    theme: 'Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System',
    
    services: 'Services',
    active: 'Active',
    serviceName: 'Service Name',
    rateType: 'Type',
    rateHT: 'Unit Rate (HT)',
    rateHTFull: 'Unit Price (HT)',
    quantity: 'Qty/Vol',
    quantityFull: 'Quantity / Volume',
    dueDate: 'Due Date',
    tva: 'TVA%',
    tvaFull: 'TVA (%)',
    commission: 'Comm.%',
    commissionFull: 'Agency Commission (%)',
    day: 'Day',
    hour: 'Hour',

    financialSummary: 'Financial Summary',
    totalHT: 'Grand Total HT',
    totalHTShort: 'Total HT',
    totalTVA: 'Grand Total TVA',
    totalTVAShort: 'Total TVA',
    totalTTC: 'Grand Total TTC',
    totalTTCShort: 'Total TTC',
    totalCommission: 'Total Agency Commissions',
    totalCommissionShort: 'Commissions',
    netProfit: 'Real Net Profit',
    netProfitShort: 'Net Profit',

    exportProforma: 'Generate Proforma Invoice',
    exportPO: 'Generate Purchase Order',
    exportEmail: 'Generate Email',
    exportWhatsapp: 'Generate WhatsApp Message',
    copyToClipboard: 'Copy',
    copied: 'Copied!',

    proformaTitle: 'PROFORMA INVOICE',
    poTitle: 'PURCHASE ORDER',
    poText: 'This document confirms the order for the services described below, under the agreed terms and rates.',
    poSignature: 'Approved and accepted (Date & Signature)',
    emailSubject: 'Service Proposal & Partnership',
    emailBody: "Hello,\n\nFollowing our discussions, please find below the details of our service proposal.\n\nAs part of our structure and to ensure full compliance, our partner agency {partnerAgency} will handle the administration of this contract.\n\nPlease let me know if you have any questions.\nBest regards.",
    whatsappText: "Hello! Here is the summary of our proposal:\n\n",

    addService: 'Add Service',
    description: 'Description',
    close: 'Close',
    share: 'Share',
    sendEmail: 'Send Email',
    selectAll: 'Select All',
    generateDocuments: 'Generate Documents',

    settingsTitle: 'Settings',
    profile: 'My Profile',
    name: 'Full Name',
    title: 'Title / Expertise',
    phone: 'Phone',
    email: 'Email',
  },
  AR: {
    globalSettings: 'الإعدادات العامة',
    clientName: 'اسم العميل',
    documentDate: 'تاريخ الوثيقة',
    documentRef: 'مرجع الوثيقة',
    partnerAgency: 'الوكالة الشريكة',
    currency: 'العملة',
    language: 'اللغة',
    theme: 'المظهر',
    themeLight: 'فاتح',
    themeDark: 'داكن',
    themeSystem: 'النظام',
    
    services: 'الخدمات',
    active: 'نشط',
    serviceName: 'اسم الخدمة',
    rateType: 'النوع',
    rateHT: 'السعر',
    rateHTFull: 'السعر الفردي (بدون ضريبة)',
    quantity: 'الكمية',
    quantityFull: 'الكمية / الحجم',
    dueDate: 'تاريخ الاستحقاق',
    tva: 'الضريبة%',
    tvaFull: 'الضريبة (%)',
    commission: 'عمولة%',
    commissionFull: 'عمولة الوكالة (%)',
    day: 'يوم',
    hour: 'ساعة',

    financialSummary: 'الملخص المالي',
    totalHT: 'الإجمالي (بدون ضريبة)',
    totalHTShort: 'الإجمالي',
    totalTVA: 'إجمالي الضريبة',
    totalTVAShort: 'الضريبة',
    totalTTC: 'الإجمالي (شامل الضريبة)',
    totalTTCShort: 'الإجمالي',
    totalCommission: 'إجمالي عمولة الوكالة',
    totalCommissionShort: 'العمولة',
    netProfit: 'صافي الربح الفعلي',
    netProfitShort: 'الربح الصافي',

    exportProforma: 'إنشاء فاتورة أولية',
    exportPO: 'إنشاء أمر شراء',
    exportEmail: 'إنشاء بريد إلكتروني',
    exportWhatsapp: 'إنشاء رسالة واتساب',
    copyToClipboard: 'نسخ',
    copied: 'تم النسخ!',

    proformaTitle: 'فاتورة أولية',
    poTitle: 'أمر شراء',
    poText: 'نؤكد بموجب هذه الوثيقة طلب الخدمات الموضحة أدناه، وفقاً للشروط والأسعار المتفق عليها.',
    poSignature: 'موافق عليه وموقع (التاريخ والتوقيع)',
    emailSubject: 'اقتراح الخدمات والشراكة',
    emailBody: "مرحباً،\n\nبناءً على مناقشاتنا، تجدون أدناه تفاصيل مقترح الخدمات الخاص بنا.\n\nكجزء من هيكلتنا ولضمان الامتثال التام، ستتولى الوكالة الشريكة {partnerAgency} إدارة هذا العقد.\n\nنحن تحت تصرفكم لأي استفسار.\nمع خالص التحيات.",
    whatsappText: "مرحباً! إليكم ملخص مقترحنا:\n\n",

    addService: 'إضافة خدمة',
    description: 'وصف',
    close: 'إغلاق',
    share: 'مشاركة',
    sendEmail: 'إرسال بريد',
    selectAll: 'تحديد الكل',
    generateDocuments: 'توليد المستندات',

    settingsTitle: 'الإعدادات',
    profile: 'ملفي الشخصي',
    name: 'الاسم الكامل',
    title: 'المسمى الوظيفي / الخبرة',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
  }
}

export const useTranslation = (lang: Language) => {
  return translations[lang]
}
