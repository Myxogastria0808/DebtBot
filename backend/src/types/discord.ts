type tokenDataType = {
    token_type: 'Bearer';
    access_token: string;
    expires_in: 604800;
    refresh_token: string;
    scope: string;
};

type discordDataType = {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    premium_type: number;
    flags: number;
    banner: unknown;
    accent_color: number;
    global_name: string;
    avatar_decoration_data: unknown;
    banner_color: string;
    mfa_enabled: boolean;
    locale: string;
};

export { tokenDataType, discordDataType };
