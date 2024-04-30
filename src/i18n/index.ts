import en from './en-us';
import zhCN from './zh-cn';
import jaJP from './ja-jp';
import { createI18n } from 'vue-i18n'

// 浏览器默认语言列表参考 https://stackoverflow.com/questions/5580876/navigator-language-list-of-all-languages/36042028#36042028

var defalutLanguage = navigator.language.substring(0, 2) || 'zh';
var lang;
if(localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
}
else {
    if(defalutLanguage == 'zh') {
        lang = 'zh-cn';
    }
    else if(defalutLanguage == 'en') {
        lang = 'en';
    }
    else if(defalutLanguage == 'ja') {
        lang = 'ja-jp';
    }
    else {
        lang = 'zh-cn';
    }
    localStorage.setItem('lang', lang);
}

const i18n = createI18n({
    locale: lang!,
    messages: {
        'en': en,
        'zh-cn': zhCN,
        'ja-jp': jaJP,
    }
});

export default i18n;