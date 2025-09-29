// Translation system for multi-language support
export const translations = {
  en: {
    title: "Smart Shiksha Scan",
    subtitle: "Automated Attendance System for Rural Schools"
  },
  hi: {
    title: "स्मार्ट शिक्षा स्कैन",
    subtitle: "ग्रामीण स्कूलों के लिए स्वचालित उपस्थिति प्रणाली"
  },
  pa: {
    title: "ਸਮਾਰਟ ਸਿੱਖਿਆ ਸਕੈਨ",
    subtitle: "ਪੇਂਡੂ ਸਕੂਲਾਂ ਲਈ ਸਵੈਚਲਿਤ ਹਾਜ਼ਰੀ ਪ੍ਰਣਾਲੀ"
  }
};

export const getTranslation = (language: string) => {
  return translations[language as keyof typeof translations] || translations.en;
};