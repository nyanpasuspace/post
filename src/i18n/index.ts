import en from './en-us';
import zhCN from './zh-cn';
import jaJP from './ja-jp';
import { createI18n } from 'vue-i18n'

var defalutLanguage = localStorage.getItem('lang') || 'zh-cn';
if(defalutLanguage !== 'en' && defalutLanguage !== 'zh-cn' && defalutLanguage !== 'ja-jp') {
    defalutLanguage = 'zh-cn';
}
const i18n = createI18n({
    locale: defalutLanguage,
    fallbackLocale: 'en',
    messages: {
        'en': en,
        'zh-cn': zhCN,
        'ja-jp': jaJP,
    }
});

export default i18n;