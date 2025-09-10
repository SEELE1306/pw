// @ts-check
import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/astro'

export default defineConfig({
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
