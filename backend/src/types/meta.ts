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
    lang: 'ja',
    title: 'discord-oauth',
    metaDescription: 'This is a discord-oauth.',
    metaKeyword: 'discord OAuth',
    ogTitle: 'discord-oauth',
    ogDescription: 'This is a discord-oauth.',
    ogWidth: null,
    ogHeight: null,
    ogImage: '',
    ogType: 'website',
    ogUrl: '',
};

export { meta, Meta };
