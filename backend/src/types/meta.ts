type Meta = {
    lang: string;
    title: string;
    metaDescription: string;
    metaKeyword: string;
    ogTitle: string;
    ogDescription: string;
    ogWidth: number | null;
    ogHeight: number | null;
    ogImage: string;
    ogType: string;
    ogUrl: string;
};

const meta: Meta = {
    lang: 'en',
    title: 'DebtBot',
    metaDescription: 'This is a DebtBot.',
    metaKeyword: 'discord OAuth DebtBot',
    ogTitle: 'DebtBot',
    ogDescription: 'This is a DebtBot.',
    ogWidth: 980,
    ogHeight: 1184,
    ogImage: 'https://debtbot.yukiosada.work/debtbot.png',
    ogType: 'website',
    ogUrl: 'https://debtbot.yukiosada.work/',
};

export { meta, Meta };
