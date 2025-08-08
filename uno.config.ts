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

    theme: {
        colors: {
            accent: '#a57562',
            normal: '#a3a5aa',
            vibrant: '#b5bac1',
            brand: {
                primary: '#262626',
                secondary: '#232323',
                tertiary: '#212121',
                quarternary: '#282828',
                slate: '#191919',
            },
        },
        fontSize: {
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
        },
    },

    rules: [
        [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
        [/^p-(\d+)$/, match => ({ padding: `${match[1] / 4}rem` })],

        ['bold', { 'font-weight': 700 }],
        ['regular', { 'font-weight': 500 }],
        ['light', { 'font-weight': 300 }],

        ['center', { 'text-align': 'center' }],
        ['right', { 'text-align': 'right' }],
        ['left', { 'text-align': 'left' }],

        ['sans', { 'font-family': 'Inter, sans-serif' }],
        ['serif', { 'font-family': 'Shippori Mincho, serif' }],
        ['mono', { 'font-family': 'Roboto Mono, monospace' }],
    ]
})