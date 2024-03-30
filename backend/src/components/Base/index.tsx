import { FC, memo } from 'hono/jsx';
import { Meta } from '../../types/meta';
import { html } from 'hono/html';
import { Style } from 'hono/css';

const Base: FC<{ meta: Meta; children: JSX.Element }> = (props: { meta: Meta; children: JSX.Element }) => {
    return (
        <>
            {html`<!DOCTYPE html>`}
            <html lang={props.meta.lang}>
                <head>
                    <meta charset="UTF-8" />
                    <title>{props.meta.title}</title>
                    <meta name="description" content={props.meta.metaDescription} />
                    <meta name="keyword" content={props.meta.metaKeyword} />
                    <meta property="og:title" content={props.meta.ogTitle} />
                    <meta property="og:description" content={props.meta.ogDescription} />
                    <meta property="og:image:width" content={String(props.meta.ogWidth ?? '')} />
                    <meta property="og:image:height" content={String(props.meta.ogHeight ?? '')} />
                    <meta property="og:image" content={props.meta.ogImage} />
                    <meta property="og:type" content={props.meta.ogType} />
                    <meta property="og:url" content={props.meta.ogUrl} />
                    <link rel="icon" type="image/svg+xml" href="https://debtbot.yukiosada.work/deer.svg" />
                    <Style />
                </head>
                <body style={'background-color: #cdeae9;'}>{props.children}</body>
            </html>
        </>
    );
};

export default Base;
