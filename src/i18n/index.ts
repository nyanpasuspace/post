import en from './en-us';
import zhCN from './zh-cn';
import jaJP from './ja-jp';
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale: 'en',
    messages: {
        'en': en,
        'zh-cn': zhCN,
        'jp': jaJP,
    }
});

export default i18n;