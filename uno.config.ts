import { presetMini } from 'unocss'
import { presetAttributify } from 'unocss'
import { presetWebFonts } from 'unocss'
import { defineConfig } from 'unocss'

export default defineConfig({
    presets: [
        presetMini(),
        presetAttributify(),
        presetWebFonts({
            provider: 'google',
            fonts: {
                sans: 'Inter',
                serif: 'Shippori Mincho',
                mono: 'Roboto Mono',
            },
        }),
    ],
})