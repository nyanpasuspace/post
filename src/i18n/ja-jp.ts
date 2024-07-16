export default {
    index: {
        register: '新規登録',
        login: 'ログイン',
        username: 'ユーザー名',
        password: 'パスワード',
        usernameMinInfo: 'ユーザー名は 2 文字以上でなければなりません。',
        usernameMaxInfo: 'ユーザー名は 15 文字以内で入力してください。',
        passwordMinInfo: 'パスワードは 6 文字以上でなければなりません。',
        passwordMaxInfo: 'パスワードは 20 文字以内で入力してください。',
        passwordRexInfo: 'パスワードには、文字、数字、および ~!{\'@\'}#%^&()_+=- しか含められません。',
        loginErrorInfo1: 'ユーザー名かパスワードが間違っています。',
        loginErrorInfo2: 'サーバーエラー',
        registerErrorInfo1: 'ユーザー名はすでに存在しています。',
        registerErrorInfo2: 'サーバーエラー'
    },
    navbar: {
        home: '世界線',
        account: 'アカウント',
        search: '検索'
    },
    home: {
        emptyContent: 'ここには何もありません～',
    },
    search: {
        emptyContent: 'ここには何もありません～',
    },
    account: {
        message: '予定のメッセージ',
        isSendToWorld: '世界線へ送信',
        editAccount: '編集',
        logoutAccount: 'ログアウト',
        editMessage: '編集',
        saveMessage: '保存',
        saveMessageError: 'エラー起きました',
        saveMessageServerError: 'サーバーエラー',
        saveMessageSuccess: '保存成功',
        heartbeatSetting: 'ハートビート設定',
        mastodonSettingInstance: 'Mastodon インスタンス',
        mastodonSettingToken: 'Mastodon トークン',
        mastodonHint: 'トークンの入手方法',
        mastodonError: 'エラー起きました',
        mastodonSuccess: '保存成功',
        mastodonServerError: 'サーバーエラー',
        saveMastodon: '保存',
        resetMastodon: 'リセット',
        sendTimeSetting: '送信時間設定',
        saveTimeSetting: '保存',
        timeSettingUnit: '日',
        saveTimeInfo: '時間は3650より小さい1以上の整数しかできません',
        saveTimeServerError: 'サーバーエラー',
        saveTimeSuccess: '保存成功',
    }
}