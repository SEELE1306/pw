// @ts-check
import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/astro'

export default defineConfig({
    prefetch: true,
    site: "https://seele1306.com",
    integrations: [
        UnoCSS({
            injectReset: true,
        }),
    ],
    markdown: {
        shikiConfig: {
            theme: 'vitesse-dark',
            defaultColor: false,
        }
    }
});
